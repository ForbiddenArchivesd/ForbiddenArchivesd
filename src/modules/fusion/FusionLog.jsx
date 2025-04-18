// Component for displaying recent fusion history
import React from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const FusionLog = () => {
  // Get game state
  const { fusion } = useGameStore();
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    
    // Convert to minutes
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    
    // Convert to hours
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    
    // Convert to days
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} d ago`;
  };
  
  // Get rarity style class
  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common': return 'common';
      case 'Rare': return 'rare';
      case 'Epic': return 'epic';
      default: return '';
    }
  };
  
  return (
    <div className="fusion-log gothic-frame">
      <h3 className="log-title">Recent Fusions</h3>
      
      {fusion.recentFusions.length > 0 ? (
        <div className="log-entries">
          {fusion.recentFusions.map(entry => (
            <div key={entry.id} className="log-entry">
              <div className="entry-time">
                {formatTimestamp(entry.timestamp)}
              </div>
              <div className="entry-content">
                <span className="entry-sources">{entry.entityA} + {entry.entityB}</span>
                <span className="entry-arrow">→</span>
                <span className={`entry-result ${getRarityClass(entry.resultRarity)}`}>
                  {entry.result} ({entry.resultRarity})
                </span>
                {entry.catalyst && (
                  <span className="entry-catalyst">
                    (Catalyst: {entry.catalyst})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-fusions">
          <p>No fusion history available.</p>
          <p>Complete your first fusion to begin the log.</p>
        </div>
      )}
    </div>
  );
};

export default FusionLog; 