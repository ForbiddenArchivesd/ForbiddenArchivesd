// Fusion button component that handles the fusion process
import React from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const FusionButton = ({ entityIdA, entityIdB, catalystId, onFusionComplete }) => {
  // Get game state and actions
  const { 
    resources, 
    fusion, 
    performFusion 
  } = useGameStore();
  
  // Check if fusion is possible
  const canFuse = entityIdA && entityIdB;
  
  // Check if we have enough resources
  const hasEnoughGold = resources.gold >= fusion.fusionCost;
  
  // Check if we have daily uses remaining
  const hasFusionsRemaining = fusion.fusionsToday < fusion.dailyFusionLimit;
  
  // Determine button disabled state
  const isDisabled = !canFuse || !hasEnoughGold || !hasFusionsRemaining;
  
  // Handle fusion button click
  const handleFusionClick = () => {
    if (isDisabled) return;
    
    // Perform fusion
    performFusion(entityIdA, entityIdB, catalystId);
    
    // Notify parent component
    if (onFusionComplete) {
      onFusionComplete();
    }
  };
  
  // Get appropriate button text based on state
  const getButtonText = () => {
    if (!canFuse) return 'Select Two Entities';
    if (!hasEnoughGold) return `Need ${fusion.fusionCost} Gold`;
    if (!hasFusionsRemaining) return 'Daily Limit Reached';
    return 'Initiate Fusion';
  };
  
  return (
    <div className="fusion-button-container">
      <div className="fusion-cost">
        <span className="cost-label">Cost:</span>
        <span className={`cost-value ${hasEnoughGold ? '' : 'insufficient'}`}>
          {fusion.fusionCost} Gold
        </span>
      </div>
      
      <button 
        className={`fusion-button ${isDisabled ? 'disabled' : ''}`}
        onClick={handleFusionClick}
        disabled={isDisabled}
      >
        {getButtonText()}
      </button>
      
      <div className="fusion-limit">
        <span className="limit-label">Uses:</span>
        <span className="limit-value">
          {fusion.fusionsToday} / {fusion.dailyFusionLimit}
        </span>
      </div>
    </div>
  );
};

export default FusionButton; 