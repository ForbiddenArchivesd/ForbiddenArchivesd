// Home page component
import React, { useEffect, useState, useRef } from 'react';
import useGameStore from '../store/gameStore';
import './Home.css';

const Home = () => {
  const { 
    player, 
    dailyObjectives, 
    checkObjectivesRefresh, 
    refreshObjectivesManually,
    getObjectiveProgress,
    statusUpdates,
    playerStats
  } = useGameStore();
  const [loadTime, setLoadTime] = useState('');
  const [refreshCooldown, setRefreshCooldown] = useState(0);
  const [objectiveStats, setObjectiveStats] = useState({});
  const [notification, setNotification] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  
  // Track previous stats for change detection
  const prevStatsRef = useRef({
    anomaliesContained: 0,
    researchCompleted: 0,
    battlesWon: 0,
    resourcesCollected: 0
  });
  
  // Track which stats have increased for animation
  const [increasedStats, setIncreasedStats] = useState({
    anomaliesContained: false,
    researchCompleted: false,
    battlesWon: false,
    resourcesCollected: false
  });
  
  // Format number with commas for display
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Set load time when component mounts and check for objectives refresh
  useEffect(() => {
    const now = new Date();
    setLoadTime(now.toLocaleTimeString());
    
    // Check if objectives need to be refreshed based on time
    checkObjectivesRefresh();
    
    // Get the latest progress for all objectives
    updateObjectiveStats();
    
    // Set up interval to update cooldown timer and objective progress
    const intervalId = setInterval(() => {
      // Update cooldown timer
      const nextRefresh = new Date(dailyObjectives.lastRefreshTimestamp + (12 * 60 * 60 * 1000)); // 12 hours
      const timeRemaining = Math.max(0, nextRefresh - new Date());
      setRefreshCooldown(Math.floor(timeRemaining / 1000));
      
      // Update objective progress
      updateObjectiveStats();
    }, 1000);
    
    // Log to console for debugging
    console.log('Home component loaded at:', now.toLocaleTimeString());
    
    return () => clearInterval(intervalId);
  }, [checkObjectivesRefresh, dailyObjectives.lastRefreshTimestamp, dailyObjectives.objectives, getObjectiveProgress]);
  
  // Check for objective updates from status updates
  useEffect(() => {
    // Check if there's a new objective-related status update
    const objectiveUpdate = statusUpdates.find(update => 
      update.type === 'objective' && 
      new Date(update.timestamp || Date.now()).getTime() > lastUpdateTime
    );
    
    if (objectiveUpdate) {
      // Update notification with the new objective update
      setNotification({
        message: objectiveUpdate.description,
        type: 'success',
        id: objectiveUpdate.id
      });
      
      // Set a timer to clear the notification
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      // Update the last update time
      setLastUpdateTime(Date.now());
      
      return () => clearTimeout(timer);
    }
  }, [statusUpdates, lastUpdateTime]);
  
  // Check for player stats updates
  useEffect(() => {
    // Only run this effect if we have the last update timestamp from playerStats
    if (playerStats.lastUpdateTimestamp > lastUpdateTime) {
      // Determine what was updated by comparing with previous stats
      if (playerStats.anomaliesContained > 0) {
        setNotification({
          message: `You have contained ${playerStats.anomaliesContained} anomalies in total.`,
          type: 'info',
          id: `stats-update-${Date.now()}`
        });
      } else if (playerStats.battlesWon > 0) {
        setNotification({
          message: `You have won ${playerStats.battlesWon} battles in total.`,
          type: 'info',
          id: `stats-update-${Date.now()}`
        });
      }
      
      // Update the last update time
      setLastUpdateTime(playerStats.lastUpdateTimestamp);
      
      // Clear notification after 5 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [playerStats, lastUpdateTime]);
  
  // Effect to detect and highlight stat changes
  useEffect(() => {
    // Check if any stats have increased
    const newIncreasedStats = {
      anomaliesContained: playerStats.anomaliesContained > prevStatsRef.current.anomaliesContained,
      researchCompleted: playerStats.researchCompleted > prevStatsRef.current.researchCompleted,
      battlesWon: playerStats.battlesWon > prevStatsRef.current.battlesWon,
      resourcesCollected: playerStats.resourcesCollected > prevStatsRef.current.resourcesCollected
    };
    
    // Only update if there are changes
    if (Object.values(newIncreasedStats).some(val => val)) {
      setIncreasedStats(newIncreasedStats);
      
      // Reset animation after 2 seconds
      const timer = setTimeout(() => {
        setIncreasedStats({
          anomaliesContained: false,
          researchCompleted: false,
          battlesWon: false,
          resourcesCollected: false
        });
      }, 2000);
      
      // Update ref with current values
      prevStatsRef.current = {
        anomaliesContained: playerStats.anomaliesContained,
        researchCompleted: playerStats.researchCompleted,
        battlesWon: playerStats.battlesWon,
        resourcesCollected: playerStats.resourcesCollected
      };
      
      return () => clearTimeout(timer);
    }
  }, [playerStats]);
  
  // Update objective stats
  const updateObjectiveStats = () => {
    const stats = {};
    dailyObjectives.objectives.forEach(objective => {
      // Get fresh progress data from store
      const progress = getObjectiveProgress(objective.type);
      stats[objective.type] = progress;
    });
    setObjectiveStats(stats);
  };
  
  // Format cooldown time to hours:minutes:seconds
  const formatCooldown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle manual refresh
  const handleManualRefresh = () => {
    refreshObjectivesManually();
    setNotification({
      message: "Daily objectives refreshed! Complete them to earn rewards.",
      type: 'info',
      id: `refresh-${Date.now()}`
    });
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  
  return (
    <div className="home-page">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="debug-info" style={{fontSize: '10px', position: 'absolute', top: '5px', right: '5px', color: '#666'}}>
        Page loaded at: {loadTime}
      </div>
      
      <div className="welcome-section gothic-frame">
        <h1 className="glitch-text" data-text="WELCOME AGENT">WELCOME AGENT</h1>
        <p>Greetings, Agent {player.name}. Your clearance level is {player.level}.</p>
        <p>The SCP Foundation is tasked with containing and studying anomalous entities, objects, and phenomena.</p>
        <p>Your mission is to help secure, contain, and protect humanity from these threats.</p>
      </div>
      
      <div className="dashboard-section">
        <div className="dashboard-card gothic-frame">
          <div className="objectives-header">
            <h2>Daily Objectives</h2>
            <div className="refresh-container">
              <span className="cooldown-timer">Next refresh: {formatCooldown(refreshCooldown)}</span>
              <button 
                className="refresh-button" 
                onClick={handleManualRefresh}
                disabled={refreshCooldown === 0}
              >
                Refresh (50 Gold)
              </button>
            </div>
          </div>
          <ul className="objectives-list">
            {dailyObjectives.objectives.map(objective => {
              // Get the most up-to-date progress
              const latestProgress = objectiveStats[objective.type] || { progress: objective.progress, target: objective.target };
              const isCompleted = latestProgress.progress >= latestProgress.target;
              const progressPercentage = Math.min(100, Math.floor((latestProgress.progress / latestProgress.target) * 100));
              
              return (
                <li key={objective.id} className={`objective ${isCompleted ? 'completed' : ''}`}>
                  <div className="objective-info">
                    <span className="objective-name">{objective.title}</span>
                    <span className="objective-reward">Reward: {objective.reward.xp} XP</span>
                  </div>
                  <div className="objective-progress-container">
                    <div className="objective-progress-bar">
                      <div 
                        className="objective-progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="objective-progress-text">
                      {isCompleted ? (
                        <span className="objective-complete-badge">Completed!</span>
                      ) : (
                        `${latestProgress.progress}/${latestProgress.target}`
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="dashboard-card gothic-frame">
          <h2>Agent Stats</h2>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-name">Anomalies Contained</span>
              <span className={`stat-value ${increasedStats.anomaliesContained ? 'stat-increased' : ''}`}>
                {formatNumber(playerStats.anomaliesContained)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Research Completed</span>
              <span className={`stat-value ${increasedStats.researchCompleted ? 'stat-increased' : ''}`}>
                {formatNumber(playerStats.researchCompleted)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Battles Won</span>
              <span className={`stat-value ${increasedStats.battlesWon ? 'stat-increased' : ''}`}>
                {formatNumber(playerStats.battlesWon)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Resources Collected</span>
              <span className={`stat-value ${increasedStats.resourcesCollected ? 'stat-increased' : ''}`}>
                {formatNumber(playerStats.resourcesCollected)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="featured-section gothic-frame">
        <h2>Featured SCP</h2>
        <div className="featured-content">
          <div className="featured-image">
            <div className="image-placeholder">SCP-173</div>
          </div>
          <div className="featured-info">
            <h3>SCP-173: The Sculpture</h3>
            <p>Object Class: Euclid</p>
            <p>SCP-173 is constructed from concrete and rebar with traces of Krylon brand spray paint...</p>
            <button className="view-button">View Full File</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home; 