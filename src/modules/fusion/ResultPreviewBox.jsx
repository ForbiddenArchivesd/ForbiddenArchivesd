// Component for previewing potential fusion results
import React from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const ResultPreviewBox = ({ 
  entityIdA, 
  entityIdB, 
  catalystId
}) => {
  // Get game state
  const { getAdjustedRarityChances } = useGameStore();
  
  // Calculate rarity chances based on catalyst
  const chances = getAdjustedRarityChances(catalystId);
  
  // Get catalyst effect description
  const getCatalystEffect = () => {
    if (!catalystId) return null;
    
    // Add specific effect descriptions based on catalyst types
    return '+15% Epic chance'; // Simplified for demo
  };
  
  // Check if fusion is possible
  const canFuse = entityIdA && entityIdB;
  
  // Generate a random preview name
  const getRandomName = () => {
    const names = [
      'Subject ZK-04',
      'Adaptive Entity',
      'Anomalous Lifeform',
      'Quantum Parasite',
      'Reality Shifter'
    ];
    
    return names[Math.floor(Math.random() * names.length)];
  };
  
  return (
    <div className="result-preview gothic-frame">
      <h3 className="preview-title">Fusion Preview</h3>
      
      {canFuse ? (
        <div className="preview-content">
          <div className="preview-entity">
            <div className="preview-icon">
              <img src="/assets/entities/unknown.png" alt="Unknown Entity" />
            </div>
            <h4 className="preview-name">{getRandomName()}</h4>
          </div>
          
          <div className="rarity-chances">
            <h4>Rarity Chances:</h4>
            <div className="chance-row">
              <span className="chance-label">Common:</span>
              <span className="chance-value">{chances.common}%</span>
            </div>
            <div className="chance-row">
              <span className="chance-label">Rare:</span>
              <span className="chance-value">{chances.rare}%</span>
            </div>
            <div className="chance-row">
              <span className="chance-label">Epic:</span>
              <span className="chance-value">
                {chances.epic}%
                {getCatalystEffect() && <span className="catalyst-bonus"> (+15% from catalyst)</span>}
              </span>
            </div>
          </div>
          
          <div className="preview-disclaimer">
            <p>Result guaranteed but attributes will vary.</p>
            <p>Source entities will be consumed.</p>
          </div>
        </div>
      ) : (
        <div className="preview-empty">
          <p>Select two entities to preview fusion result.</p>
        </div>
      )}
    </div>
  );
};

export default ResultPreviewBox; 