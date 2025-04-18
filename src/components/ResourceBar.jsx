// ResourceBar component displaying player information and resources
import { useState, useEffect, useRef } from 'react';
import useGameStore from '../store/gameStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faBolt, faFlask, faTimes, faArrowUp, faWallet, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './ResourceBar.css';

// X/Twitter SVG icon component
const XTwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ResourceBar = () => {
  // Get player and resources data from the store
  const { player, resources, statusUpdates } = useGameStore();
  
  // Get wallet connection state
  const { publicKey, connected } = useWallet();
  
  // State for player profile popup and level-up animation
  const [showProfile, setShowProfile] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showWalletHelp, setShowWalletHelp] = useState(false);
  const [showTwitterTooltip, setShowTwitterTooltip] = useState(false);
  const prevLevelRef = useRef(player.level);
  
  // Check if Phantom wallet is installed
  const isPhantomInstalled = () => {
    const phantom = window?.phantom?.solana;
    return !!phantom && phantom.isPhantom;
  };
  
  // Handle wallet connection click
  const handleWalletClick = () => {
    if (!isPhantomInstalled()) {
      setShowWalletHelp(true);
      setTimeout(() => {
        setShowWalletHelp(false);
      }, 5000);
    }
  };
  
  // Toggle player profile popup
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  
  // Social media link handlers
  const handleTwitterHover = (isHovering) => {
    setShowTwitterTooltip(isHovering);
  };
  
  // Get truncated wallet address for display
  const getDisplayName = () => {
    if (connected && publicKey) {
      const walletAddress = publicKey.toString();
      return `${player.name} - ${walletAddress.slice(0, 3).toUpperCase()}`;
    }
    return player.name;
  };
  
  // Calculate experience percentage for the progress bar
  const expPercentage = (player.xp / player.xpToNextLevel) * 100;
  
  // Check for level-up notifications
  useEffect(() => {
    // If player level increased, show level-up animation
    if (player.level > prevLevelRef.current) {
      setShowLevelUp(true);
      
      // Hide the animation after 3 seconds
      const timer = setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    // Also check for level-up status updates
    const levelUpUpdate = statusUpdates.find(update => update.type === 'level');
    if (levelUpUpdate && player.level > prevLevelRef.current) {
      setShowLevelUp(true);
      
      // Hide the animation after 3 seconds
      const timer = setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    // Update the ref to the current level
    prevLevelRef.current = player.level;
  }, [player.level, statusUpdates]);
  
  return (
    <div className="resource-bar gothic-frame">
      {/* Player Info Section (left side of bar) */}
      <div className="player-section">
        <div className="avatar-container" onClick={toggleProfile}>
          <img 
            src="https://media-hosting.imagekit.io/423d617109694ced/assets_task_01js46sj47fassm3q0k0dbhyx5_img_0.webp?Expires=1839582544&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fdsDFittgx1ashoTJ1y6vzZmxLidOPPdM673QAZsa7UFcCnAobvyRW9Dril5CFRy-oXZyNFsNeAhC5FeTzxQXG6ylWw~v7-fENwx9ipTgWyiPfttSgngM8E52y8jo0z61PyzcccVFecHEZ7PC6-TB-PefgLsFdFKohPP5UNTyzhvpQrPe2uHUVbbbhrmCp8hGTTemgbX0K~TBsfOy~7EfpZsL-TLykrf2FdagY4GPuNCeRSoD5dHNJG~pXhF2ytQ3Gn1VD9MlTFksNn8yQBIv3c3CUVsbCFyVqbwUE5ucpVR49IlWA7w2RFTNOFv57o6hTCwCqBYCwhvgTeZC0z4Ig__"
            alt={`${player.name}'s avatar`} 
            className="player-avatar"
          />
          {showLevelUp && (
            <div className="level-up-indicator">
              <FontAwesomeIcon icon={faArrowUp} className="level-up-icon" />
              <span>Level Up!</span>
            </div>
          )}
        </div>
        
        <div className="player-info">
          <div className="top-info-row">
            <h3 className="player-name">{player.name}</h3>
            <div className="wallet-button-container" onClick={handleWalletClick}>
              <WalletMultiButton className="wallet-button" />
              {showWalletHelp && (
                <div className="wallet-help-tooltip">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
                  <span>Phantom wallet not detected. Please install it from <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">phantom.app</a></span>
                </div>
              )}
            </div>
            {/* Twitter/X Social Media Button */}
            <div className="social-button-container"
                 onMouseEnter={() => handleTwitterHover(true)}
                 onMouseLeave={() => handleTwitterHover(false)}>
              <a href="https://x.com/ArchivesForden" target="_blank" rel="noopener noreferrer" className="twitter-button">
                <XTwitterIcon />
              </a>
              {showTwitterTooltip && (
                <div className="social-tooltip">
                  <span>Follow us on X (Twitter)</span>
                </div>
              )}
            </div>
            {connected && publicKey && (
              <span className="wallet-address">{publicKey.toString().slice(0, 3).toUpperCase()}</span>
            )}
          </div>
          <div className="level-container">
            <span className="level-text">Level {player.level}</span>
            <div className="exp-bar-container">
              <div 
                className="exp-bar-fill" 
                style={{ width: `${expPercentage}%` }}
              ></div>
            </div>
            <span className="exp-text">{player.xp} / {player.xpToNextLevel} XP</span>
          </div>
        </div>
      </div>
      
      {/* Resource Display (right side of bar) */}
      <div className="resources-section">
        <div className="resource">
          <FontAwesomeIcon icon={faCoins} className="resource-icon gold" />
          <span className="resource-value">{resources.gold}</span>
        </div>
        
        <div className="resource">
          <FontAwesomeIcon icon={faBolt} className="resource-icon energy" />
          <span className="resource-value">{resources.energy} / {resources.energyCap}</span>
        </div>
        
        <div className="resource">
          <FontAwesomeIcon icon={faFlask} className="resource-icon research" />
          <span className="resource-value">{resources.research}</span>
        </div>
      </div>
      
      {/* Player profile popup */}
      {showProfile && (
        <div className="profile-popup gothic-frame">
          <div className="popup-header">
            <h2>Agent Profile</h2>
            <button className="close-btn" onClick={toggleProfile}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="popup-content">
            <img 
              src="https://media-hosting.imagekit.io/423d617109694ced/assets_task_01js46sj47fassm3q0k0dbhyx5_img_0.webp?Expires=1839582544&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fdsDFittgx1ashoTJ1y6vzZmxLidOPPdM673QAZsa7UFcCnAobvyRW9Dril5CFRy-oXZyNFsNeAhC5FeTzxQXG6ylWw~v7-fENwx9ipTgWyiPfttSgngM8E52y8jo0z61PyzcccVFecHEZ7PC6-TB-PefgLsFdFKohPP5UNTyzhvpQrPe2uHUVbbbhrmCp8hGTTemgbX0K~TBsfOy~7EfpZsL-TLykrf2FdagY4GPuNCeRSoD5dHNJG~pXhF2ytQ3Gn1VD9MlTFksNn8yQBIv3c3CUVsbCFyVqbwUE5ucpVR49IlWA7w2RFTNOFv57o6hTCwCqBYCwhvgTeZC0z4Ig__"
              alt={`${player.name}'s avatar`} 
              className="popup-avatar"
            />
            <h3>{getDisplayName()}</h3>
            <p>Clearance Level: {player.level}</p>
            
            {/* Wallet connection status */}
            <div className="wallet-status">
              <FontAwesomeIcon icon={faWallet} className="wallet-icon" />
              {connected ? (
                <span>Connected: {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}</span>
              ) : (
                <span>
                  Not Connected 
                  {!isPhantomInstalled() && (
                    <span className="wallet-install-link">
                      <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">Install Phantom</a>
                    </span>
                  )}
                </span>
              )}
            </div>
            
            <div className="popup-exp-bar">
              <div 
                className="popup-exp-fill" 
                style={{ width: `${expPercentage}%` }}
              ></div>
            </div>
            <p>Experience: {player.xp} / {player.xpToNextLevel}</p>
            <p className="level-progress">
              Next level requires: {player.xpToNextLevel - player.xp} more XP
            </p>
            
            <div className="level-stats">
              <h4>Agent Statistics</h4>
              <p>Total XP Earned: {player.totalXpEarned || 0}</p>
              <p>Level Progression:</p>
              <div className="level-history">
                {(player.levelHistory ? player.levelHistory.slice(-3) : []).map((record, index) => (
                  <div key={index} className="level-record">
                    <span className="level-badge">Level {record.level}</span>
                    <span className="level-time">
                      {new Date(record.achievedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {!player.levelHistory && (
                  <div className="level-record">
                    <span className="level-badge">Level {player.level}</span>
                    <span className="level-time">Current</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceBar; 