import React from 'react';
import './ResearchStyles.css';

const CurrentResearchPanel = ({ currentResearch, onCancel }) => {
  // Format time remaining in a human-readable format
  const formatTimeRemaining = (timeMs) => {
    if (!timeMs) return '0m';
    
    const hours = Math.floor(timeMs / (60 * 60 * 1000));
    const minutes = Math.floor((timeMs % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!currentResearch) return 0;
    
    const { startTime, duration } = currentResearch;
    const elapsed = Date.now() - startTime;
    const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
    
    return progress;
  };
  
  return (
    <div className="current-research-panel">
      <div className="current-research-header">
        <h3 className="current-research-title">Current Research</h3>
        {currentResearch && (
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      
      {currentResearch ? (
        <div className="research-details">
          <div className="research-name">{currentResearch.name}</div>
          <div className="research-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <div className="time-remaining">
              {formatTimeRemaining(
                Math.max(0, currentResearch.startTime + currentResearch.duration - Date.now())
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-research">
          No active research. Select a node to begin.
        </div>
      )}
    </div>
  );
};

export default CurrentResearchPanel; 