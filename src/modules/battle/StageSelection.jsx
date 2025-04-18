import React from 'react';
import './BattleStyles.css';

const StageSelection = ({ stages, onSelectStage, selectedStage, attemptsRemaining }) => {
  // Group stages by sector
  const groupedStages = stages.reduce((acc, stage) => {
    if (stage) {
      // Check if it's a daily challenge
      if (stage.id.includes('daily')) {
        if (!acc['Daily']) {
          acc['Daily'] = [];
        }
        acc['Daily'].push(stage);
      } else {
        // Get sector name from id (e.g., 'sector1-trial1' -> 'Sector-1')
        const sectorMatch = stage.id.match(/sector(\d+)/);
        
        if (sectorMatch) {
          const sectorName = `Sector-${sectorMatch[1]}`;
          
          if (!acc[sectorName]) {
            acc[sectorName] = [];
          }
          
          acc[sectorName].push(stage);
        }
      }
    }
    return acc;
  }, {});

  return (
    <div className="stage-selection-panel">
      <div className="stage-selection-header">
        <h2>Select Battle Stage</h2>
        <div className="daily-attempts">
          <span>Daily Attempts Remaining: {attemptsRemaining}</span>
        </div>
      </div>
      
      <div className="stage-list">
        {Object.entries(groupedStages).map(([sectorName, sectorStages]) => (
          <div key={sectorName} className="sector-group">
            <div className="sector-header">
              <h3>{sectorName}</h3>
            </div>
            
            <div className="sector-stages">
              {sectorStages.map(stage => (
                <div 
                  key={stage.id}
                  className={`stage-item ${selectedStage?.id === stage.id ? 'selected' : ''}`}
                  onClick={() => onSelectStage(stage)}
                >
                  <div className="stage-name">
                    {stage.name}
                  </div>
                  <div className="stage-difficulty">
                    {Array(stage.difficulty).fill('⬤').join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StageSelection; 