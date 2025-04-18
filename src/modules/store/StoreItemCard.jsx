// StoreItemCard component for displaying and purchasing items
import React, { useState, useRef } from 'react';
import GoldCostDisplay from './GoldCostDisplay';
import useGameStore from '../../store/gameStore';
import ItemTooltip from './ItemTooltip';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import './StoreStyles.css';

// Treasury wallet address
const TREASURY_WALLET = new PublicKey("4Hp8P5EGSzHrfydKJxN2ihwc13wqBrJzEpqSUyJNx29Y");
// SOL price for entities (0.2 SOL)
const SOL_PRICE = 0.2;
// Solana cluster connection - use environment variable with fallback to Helius RPC
const endpoint = import.meta.env.VITE_SOLANA_RPC_ENDPOINT || "https://mainnet.helius-rpc.com/?api-key=4fb05a4e-b999-4375-b303-6d4a57ad32d4";
const connection = new Connection(endpoint, "confirmed");

const StoreItemCard = ({ item, onPurchase, isEntityLimited }) => {
  // Get current state for checking conditions
  const { resources, storage } = useGameStore();
  // Get wallet connection state
  const { publicKey, sendTransaction, connected } = useWallet();
  
  // State for purchase feedback
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showWalletMessage, setShowWalletMessage] = useState(false);
  const [transactionError, setTransactionError] = useState(null);
  
  // Reference to the card element for tooltip positioning
  const cardRef = useRef(null);
  
  // Handle purchase button click
  const handlePurchaseClick = () => {
    // Cannot purchase if out of stock
    if (item.stock <= 0) {
      setPurchaseStatus('out-of-stock');
      setTimeout(() => setPurchaseStatus(null), 2000);
      return;
    }
    
    // Pre-check for storage capacity to provide immediate feedback
    const currentItems = storage.entities.length + storage.gear.length + 
                         storage.items.length + storage.materials.length;
                         
    if (currentItems >= storage.capacity) {
      setPurchaseStatus('storage-full');
      setTimeout(() => setPurchaseStatus(null), 2000);
      return;
    }
    
    // Pre-check for gold
    if (resources.gold < item.price) {
      setPurchaseStatus('failed');
      setTimeout(() => setPurchaseStatus(null), 2000);
      return;
    }
    
    // Try to purchase
    const success = onPurchase(item);
    
    if (success) {
      setPurchaseStatus('success');
    } else {
      // If we still get a failure despite our pre-checks, determine why
      if (isEntityLimited) {
        setPurchaseStatus('limit-reached');
      } else {
        setPurchaseStatus('failed');
      }
    }
    
    setTimeout(() => setPurchaseStatus(null), 2000);
  };
  
  // Handle SOL purchase button click
  const handleSolPurchase = async () => {
    // Check if wallet is connected
    if (!connected) {
      setShowWalletMessage(true);
      setTimeout(() => setShowWalletMessage(false), 3000);
      return;
    }
    
    try {
      // Show pending state
      setPurchaseStatus('sol-pending');
      setTransactionError(null);
      
      // Create a transfer transaction (0.2 SOL)
      const lamports = LAMPORTS_PER_SOL * SOL_PRICE;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: TREASURY_WALLET,
          lamports
        })
      );
      
      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      
      // Send transaction and await signature
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction sent with signature:', signature);
      
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value && confirmation.value.err) {
        throw new Error('Transaction failed to confirm');
      }
      
      // Transaction confirmed! Now add the entity to inventory
      // Pass an additional parameter to indicate this was a SOL purchase
      const success = onPurchase(item, true);
      
      if (success) {
        setPurchaseStatus('sol-success');
        console.log('SOL purchase successful for:', item.name);
      } else {
        if (isEntityLimited) {
          setPurchaseStatus('limit-reached');
          setTransactionError('Daily purchase limit reached, but transaction was successful.');
        } else {
          throw new Error('Failed to add item to inventory');
        }
      }
    } catch (error) {
      console.error('SOL payment error:', error);
      setPurchaseStatus('sol-failed');
      setTransactionError(error.message || 'Transaction failed or was cancelled');
      setTimeout(() => setTransactionError(null), 3000);
    } finally {
      // Reset purchase status after a delay
      setTimeout(() => setPurchaseStatus(null), 3000);
    }
  };
  
  // Get CSS class based on rarity
  const getRarityClass = () => {
    switch (item.rarity.toLowerCase()) {
      case 'epic':
        return 'rarity-epic';
      case 'rare':
        return 'rarity-rare';
      default:
        return 'rarity-common';
    }
  };
  
  return (
    <div 
      className={`store-item-card gothic-frame ${getRarityClass()}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      ref={cardRef}
    >
      <div className="item-card-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-rarity">{item.rarity}</span>
      </div>
      
      <div className="item-card-body">
        <div className="item-icon">
          <img src={item.icon} alt={item.name} />
        </div>
        
        <div className="item-details">
          <div className="item-stock">
            Stock: {item.stock} remaining
          </div>
          
          <div className="item-price">
            <GoldCostDisplay amount={item.price} />
            {item.type === 'Entity' && (
              <div className="sol-price">or {SOL_PRICE} SOL</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="item-card-footer">
        <button 
          className={`buy-button ${purchaseStatus || ''} ${item.stock <= 0 ? 'disabled' : ''}`}
          onClick={handlePurchaseClick}
          disabled={item.stock <= 0}
        >
          {purchaseStatus === 'success' ? 'Purchased ✓' : 
           purchaseStatus === 'failed' ? 'Not enough gold' :
           purchaseStatus === 'storage-full' ? 'Storage full' :
           purchaseStatus === 'limit-reached' ? 'Daily limit reached' :
           purchaseStatus === 'out-of-stock' ? 'Out of stock' : 
           purchaseStatus === 'sol-pending' ? 'Processing...' :
           purchaseStatus === 'sol-success' ? 'Purchased with SOL ✓' : 
           purchaseStatus === 'sol-failed' ? 'Transaction failed' : 'Buy'}
        </button>
        
        {/* SOL payment option (for Entities only) */}
        {item.type === 'Entity' && (
          <button 
            className={`sol-button ${item.stock <= 0 || purchaseStatus === 'sol-pending' ? 'disabled' : ''}`}
            onClick={handleSolPurchase}
            disabled={item.stock <= 0 || purchaseStatus === 'sol-pending'}
            title={item.stock <= 0 ? "Out of stock" : `Purchase with ${SOL_PRICE} SOL`}
          >
            Pay with SOL
          </button>
        )}
      </div>
      
      {/* Wallet connection message */}
      {showWalletMessage && (
        <div className="wallet-message">
          Please connect your Phantom wallet before purchasing.
        </div>
      )}
      
      {/* Transaction error message */}
      {transactionError && (
        <div className="wallet-message error">
          {transactionError}
        </div>
      )}
      
      {/* Use the portal-based ItemTooltip component instead of inline tooltip */}
      <ItemTooltip 
        item={item}
        isVisible={showTooltip}
        targetRef={cardRef}
        isEntityLimited={isEntityLimited}
      />
    </div>
  );
};

export default StoreItemCard; 