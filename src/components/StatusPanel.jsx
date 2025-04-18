// Status Panel component for displaying real-time game updates
import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVial,
  faFlask,
  faCoins,
  faBolt,
  faShield,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import './StatusPanel.css';

const StatusPanel = () => {
  // Get game state from store
  const { 
    statusUpdates, 
    currentResearch,
    getTotalOutputRate 
  } = useGameStore();
  
  // Real-time production rates
  const [currentRates, setCurrentRates] = useState({
    gold: 0,
    energy: 0,
    researchPoints: 0
  });
  
  // Update production rates based on containment output
  useEffect(() => {
    // Update rates from containment output
    const totalGoldRate = getTotalOutputRate();
    
    setCurrentRates({
      gold: totalGoldRate,
      energy: 0, // These can be updated with real values if implemented
      researchPoints: 0
    });
    
    // Refresh rates periodically
    const interval = setInterval(() => {
      const updatedGoldRate = getTotalOutputRate();
      setCurrentRates(prev => ({
        ...prev,
        gold: updatedGoldRate
      }));
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [getTotalOutputRate]);
  
  // State to track which update is selected for detailed view
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  
  // Get the appropriate icon for each update type
  const getUpdateIcon = (type) => {
    switch (type) {
      case 'anomaly':
        return faVial;
      case 'research':
        return faFlask;
      case 'resource':
        return faCoins;
      case 'battle':
        return faShield;
      default:
        return faVial;
    }
  };
  
  // Handle update item click
  const handleUpdateClick = (update) => {
    setSelectedUpdate(update);
  };
  
  // Close the detail panel
  const closeDetailPanel = () => {
    setSelectedUpdate(null);
  };
  
  return (
    <div className="status-panel gothic-frame">
      <div className="status-header">
        <h2>Status Updates</h2>
      </div>
      
      {/* Resource production rates section */}
      <div className="production-rates-section">
        <h3>Production Rates</h3>
        <div className="rates-container">
          <div className="rate-item">
            <FontAwesomeIcon icon={faCoins} className="rate-icon gold" />
            <span>+{currentRates.gold}/min</span>
          </div>
          <div className="rate-item">
            <FontAwesomeIcon icon={faBolt} className="rate-icon energy" />
            <span>+{currentRates.energy}/min</span>
          </div>
          <div className="rate-item">
            <FontAwesomeIcon icon={faFlask} className="rate-icon research" />
            <span>+{currentRates.researchPoints}/min</span>
          </div>
        </div>
      </div>
      
      {/* Current research progress */}
      <div className="current-research-section">
        <h3>Current Research</h3>
        {currentResearch ? (
          <div className="research-progress">
            <h4>{currentResearch.name}</h4>
            <div className="research-progress-bar">
              <div 
                className="research-progress-fill" 
                style={{ width: `${currentResearch.progress}%` }}
              ></div>
            </div>
            <div className="research-details">
              <span>{currentResearch.progress}% Complete</span>
              <span>Time remaining: {currentResearch.timeRemaining}</span>
            </div>
          </div>
        ) : (
          <div className="no-research">
            No active research. Visit the Research Tree to start a new project.
          </div>
        )}
      </div>
      
      {/* Status updates feed */}
      <div className="status-updates-section">
        <h3>Recent Updates</h3>
        <div className="updates-list">
          {statusUpdates.map((update) => (
            <div 
              key={update.id} 
              className="update-item"
              onClick={() => handleUpdateClick(update)}
            >
              <div className="update-icon">
                <FontAwesomeIcon 
                  icon={getUpdateIcon(update.type)} 
                  className={`icon ${update.type}`} 
                />
              </div>
              <div className="update-content">
                <h4>{update.title}</h4>
                <p>{update.description}</p>
                <span className="update-time">{update.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detail panel for selected update */}
      {selectedUpdate && (
        <div className="detail-panel gothic-frame">
          <div className="detail-header">
            <h3>
              <FontAwesomeIcon 
                icon={getUpdateIcon(selectedUpdate.type)} 
                className={`icon ${selectedUpdate.type}`} 
              /> 
              {selectedUpdate.title}
            </h3>
            <button className="close-btn" onClick={closeDetailPanel}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="detail-content">
            <p>{selectedUpdate.description}</p>
            <p className="detail-time">Reported: {selectedUpdate.time}</p>
            
            {/* Additional details could be rendered here based on update type */}
            {selectedUpdate.type === 'anomaly' && (
              <div className="anomaly-actions">
                <button>View SCP File</button>
                <button>Track Location</button>
              </div>
            )}
            
            {selectedUpdate.type === 'research' && (
              <div className="research-actions">
                <button>View Research</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPanel; 