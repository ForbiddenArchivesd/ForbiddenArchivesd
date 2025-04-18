// Component for quick resource collection and total output display
import React, { useState, useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import './ContainmentStyles.css';

const QuickCollectBar = () => {
  // Get data and actions from game store
  const { 
    calculateContainmentOutput, 
    collectContainmentResources, 
    getTotalOutputRate 
  } = useGameStore();
  
  // State for current accumulated gold
  const [currentGold, setCurrentGold] = useState(0);
  
  // Total output rate per minute
  const totalRate = getTotalOutputRate();
  
  // Update currentGold every second
  useEffect(() => {
    // Initial calculation
    setCurrentGold(calculateContainmentOutput());
    
    // Set up interval for regular updates
    const interval = setInterval(() => {
      setCurrentGold(calculateContainmentOutput());
    }, 1000);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, [calculateContainmentOutput]);
  
  // Handle collect button click
  const handleCollect = () => {
    collectContainmentResources();
    setCurrentGold(0); // Reset display immediately for user feedback
  };
  
  // Format the gold value
  const formatGold = (value) => {
    return Math.floor(value).toLocaleString();
  };
  
  return (
    <div className="quick-collect-bar gothic-frame">
      <div className="output-display">
        <div className="output-rate">
          <span className="rate-label">Total Output:</span>
          <span className="rate-value">+{totalRate} Gold/min</span>
        </div>
        
        <div className="accumulated-resources">
          <span className="resource-label">Accumulated Gold:</span>
          <span className="resource-value">{formatGold(currentGold)}</span>
        </div>
      </div>
      
      <button 
        className="collect-button"
        onClick={handleCollect}
        disabled={currentGold <= 0}
      >
        Collect Resources
      </button>
    </div>
  );
};

export default QuickCollectBar; 