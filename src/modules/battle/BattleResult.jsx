import React, { useState } from 'react';
import './BattleStyles.css';

const BattleResult = ({ result, battleLog, onReturn, onRetry }) => {
  const [showFullLog, setShowFullLog] = useState(false);
  
  // Get formatted battleLog for display
  const displayLog = showFullLog ? battleLog : battleLog.slice(0, 6);
  
  return (
    <div className="battle-result-panel">
      <div className="result-header">
        <h2 className={result.victory ? 'victory-text' : 'defeat-text'}>
          {result.victory ? 'Victory!' : 'Defeat!'}
        </h2>
      </div>
      
      <div className="result-summary">
        <div className="summary-item">
          <span className="summary-label">Turns:</span>
          <span className="summary-value">{result.turn}</span>
        </div>
        
        {result.victory && (
          <>
            <div className="summary-item">
              <span className="summary-label">XP Gained:</span>
              <span className="summary-value">+{result.xpGained} per entity</span>
            </div>
            
            {result.rewards && (
              <div className="rewards-container">
                <h3 className="rewards-title">Rewards</h3>
                
                <div className="summary-item">
                  <span className="summary-label">Gold:</span>
                  <span className="summary-value gold-value">+{result.rewards.gold}</span>
                </div>
                
                {result.rewards.items.length > 0 ? (
                  <div className="reward-items">
                    <span className="summary-label">Items:</span>
                    <div className="item-list">
                      {result.rewards.items.map((item) => (
                        <div key={item.id} className={`item-card ${item.rarity.toLowerCase()}`}>
                          <div className="item-icon">
                            <img src={item.icon} alt={item.name} />
                          </div>
                          <div className="item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="item-type">{item.type}</div>
                            <div className="item-rarity">{item.rarity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-items-message">
                    <span>No items dropped this time.</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="battle-log-section">
        <div className="log-header">
          <h3>Battle Log</h3>
          <button className="toggle-log-btn" onClick={() => setShowFullLog(!showFullLog)}>
            {showFullLog ? 'Show Less' : 'Show Full Log'}
          </button>
        </div>
        
        <div className="log-entries">
          {displayLog.map((entry, index) => (
            <div key={index} className="log-entry">
              {entry}
            </div>
          ))}
          
          {!showFullLog && battleLog.length > 6 && (
            <div className="log-ellipsis">
              ... {battleLog.length - 6} more entries
            </div>
          )}
        </div>
      </div>
      
      <div className="result-actions">
        <button className="battle-btn return-btn" onClick={onReturn}>
          Return to Stage Selection
        </button>
        
        {!result.victory && (
          <button className="battle-btn retry-btn" onClick={onRetry}>
            Retry with Different Team
          </button>
        )}
      </div>
    </div>
  );
};

export default BattleResult; 