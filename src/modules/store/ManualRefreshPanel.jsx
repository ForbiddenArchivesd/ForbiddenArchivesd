// ManualRefreshPanel component for store inventory refresh
import React, { useState } from 'react';
import GoldCostDisplay from './GoldCostDisplay';
import { useWallet } from '@solana/wallet-adapter-react';
import './StoreStyles.css';

// SOL price for entity refresh
const ENTITY_REFRESH_SOL_COST = 0.5;

const ManualRefreshPanel = ({ 
  category, 
  onRefresh,
  onSolRefresh, 
  timeRemaining, 
  onCooldown, 
  isEntityTab,
  goldCost = 100 // Default gold cost for refresh
}) => {
  const { connected } = useWallet();
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handle refresh button click
  const handleRefreshClick = () => {
    if (!isEntityTab && !onCooldown) {
      onRefresh(category);
    }
  };
  
  // Handle SOL refresh button click for Entity tab
  const handleSolRefreshClick = async () => {
    if (!connected) {
      setErrorMessage('Please connect your wallet first.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    if (refreshing) return;
    
    setRefreshing(true);
    setErrorMessage('');
    
    try {
      const success = await onSolRefresh(ENTITY_REFRESH_SOL_COST);
      if (!success) {
        setErrorMessage('Transaction failed. Entities not refreshed.');
      }
    } catch (error) {
      console.error('SOL refresh error:', error);
      setErrorMessage('Transaction failed. Entities not refreshed.');
    } finally {
      setTimeout(() => setRefreshing(false), 3000);
    }
  };
  
  return (
    <div className="manual-refresh-panel">
      <div className="refresh-timer">
        <span className="timer-icon">⏱</span>
        <span className="timer-label">Next refresh in:</span>
        <span className="time-remaining">{timeRemaining}</span>
      </div>
      
      <button 
        className={`refresh-button ${isEntityTab ? 'sol-refresh' : ''} ${onCooldown || refreshing ? 'cooldown' : ''}`}
        onClick={isEntityTab ? handleSolRefreshClick : handleRefreshClick}
        disabled={(isEntityTab && refreshing) || (!isEntityTab && (onCooldown || refreshing))}
        title={isEntityTab ? 
          `Pay ${ENTITY_REFRESH_SOL_COST} SOL to refresh entities` : 
          onCooldown ? 'On cooldown' : 
          `Spend ${goldCost} gold to refresh inventory`}
      >
        {isEntityTab ? 
          `Refresh Entities (${ENTITY_REFRESH_SOL_COST} SOL)` : 
          onCooldown ? 'Refresh On Cooldown' : (
            <>
              Manual Refresh <GoldCostDisplay amount={goldCost} small />
            </>
          )}
      </button>
      
      {errorMessage && (
        <div className="wallet-message error">
          {errorMessage}
        </div>
      )}
      
      {isEntityTab && !errorMessage && (
        <div className="entities-note">
          <p>Note: Refresh entities immediately by paying SOL.</p>
        </div>
      )}
    </div>
  );
};

export default ManualRefreshPanel; 