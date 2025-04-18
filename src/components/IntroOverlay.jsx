import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './IntroOverlay.css';

/**
 * Full-screen overlay for first-time visitors
 * Offers two options: enter anonymously or connect via Phantom wallet
 */
const IntroOverlay = ({ onClose }) => {
  const { select, connect, connected, connecting, wallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  
  // Check if connection state changes
  useEffect(() => {
    if (isConnecting && !connecting && connected) {
      // Connection successful
      setTimeout(() => {
        onClose();
      }, 500);
    } else if (isConnecting && !connecting && !connected) {
      // Connection failed or was rejected
      setConnectionError('Connection canceled or failed. Please try again.');
      setIsConnecting(false);
    }
  }, [connected, connecting, isConnecting, onClose]);

  // Handle anonymous entry
  const handleAnonymousEntry = () => {
    onClose();
  };

  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (connecting || isConnecting) return;
    
    setIsConnecting(true);
    setConnectionError('');

    try {
      // Check if Phantom is installed
      if (!isPhantomInstalled()) {
        setConnectionError('Phantom wallet not found. Please install it from phantom.app');
        setIsConnecting(false);
        return;
      }

      // If already connected, just close
      if (connected) {
        onClose();
        return;
      }
      
      // Try to connect
      const phantomWalletName = 'Phantom';
      await select(phantomWalletName);
      
      // Need to add a slight delay before triggering connect
      setTimeout(async () => {
        if (wallet) {
          try {
            await connect();
          } catch (error) {
            console.error('Connect error:', error);
            setConnectionError('Connection error: ' + (error.message || 'Unknown error'));
            setIsConnecting(false);
          }
        } else {
          setConnectionError('Wallet selection failed. Please try again.');
          setIsConnecting(false);
        }
      }, 100);
      
    } catch (error) {
      console.error('Wallet connection error:', error);
      setConnectionError('Connection failed: ' + (error.message || 'Unknown error'));
      setIsConnecting(false);
    }
  };

  // Check if Phantom wallet is installed
  const isPhantomInstalled = () => {
    const phantom = window?.phantom?.solana;
    return !!phantom && phantom.isPhantom;
  };

  return (
    <div className="intro-overlay">
      <div className="overlay-content">
        <div className="overlay-card gothic-frame">
          <h2>Welcome to Agent-X</h2>
          <p>Choose how you'd like to proceed:</p>
          
          <div className="overlay-buttons">
            <button 
              className="entry-button anonymous-button"
              onClick={handleAnonymousEntry}
              disabled={isConnecting}
            >
              Enter Anonymously
            </button>
            
            <button 
              className="entry-button connect-button"
              onClick={handleConnectWallet}
              disabled={connecting || isConnecting}
            >
              {connecting || isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
          
          {connectionError && (
            <div className="connection-error">
              {connectionError}
              {!isPhantomInstalled() && (
                <div className="install-link">
                  <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">
                    Install Phantom Wallet
                  </a>
                </div>
              )}
            </div>
          )}
          
          <div className="overlay-footer">
            <p>Connecting wallet enables SOL payments and persistent data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay; 