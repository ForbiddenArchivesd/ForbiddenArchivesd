import React from 'react';
import './ResearchStyles.css';

const NodeDetailPanel = ({ 
  node, 
  isAvailable, 
  hasResources, 
  isActive, 
  isCompleted, 
  onStartResearch 
}) => {
  // If no node is selected, show placeholder
  if (!node) {
    return (
      <div className="node-detail-panel">
        <div className="no-node-selected">
          <div className="no-node-icon">🔍</div>
          <p>Select a research node to view details</p>
        </div>
      </div>
    );
  }
  
  // Determine node status
  const getNodeStatus = () => {
    if (isCompleted) return { text: 'Completed', className: 'status-completed' };
    if (isActive) return { text: 'In Progress', className: 'status-active' };
    if (isAvailable) return { text: 'Available', className: 'status-available' };
    return { text: 'Locked', className: 'status-locked' };
  };
  
  // Format time required in a human-readable format
  const formatTimeRequired = (timeMs) => {
    const minutes = timeMs / (60 * 1000);
    const hours = minutes / 60;
    
    if (hours >= 1) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };
  
  const nodeStatus = getNodeStatus();
  
  return (
    <div className="node-detail-panel">
      <div className="node-detail-header">
        <div className="node-detail-title-area">
          <h3 className="node-detail-title">{node.name}</h3>
          <p className="node-detail-subtitle">{node.effect}</p>
        </div>
        <span className={`node-status ${nodeStatus.className}`}>
          {nodeStatus.text}
        </span>
      </div>
      
      <div className="node-detail-content">
        <div className="detail-section">
          <h4 className="section-title">Description</h4>
          <p className="node-description">{node.description}</p>
        </div>
        
        <div className="detail-section">
          <h4 className="section-title">Requirements</h4>
          <div className="resource-cost">
            <div className="cost-item">
              <span className="cost-icon">G</span>
              <span className={`cost-value ${!hasResources && node.cost.gold > 0 ? 'insufficient' : ''}`}>
                {node.cost.gold}
              </span>
            </div>
            <div className="cost-item">
              <span className="cost-icon">R</span>
              <span className={`cost-value ${!hasResources && node.cost.research > 0 ? 'insufficient' : ''}`}>
                {node.cost.research}
              </span>
            </div>
            <div className="cost-item">
              <span className="cost-icon">⏱️</span>
              <span className="cost-value">
                {formatTimeRequired(node.timeRequired)}
              </span>
            </div>
          </div>
        </div>
        
        {node.unlocks && node.unlocks.length > 0 && (
          <div className="detail-section">
            <h4 className="section-title">Prerequisites</h4>
            <ul className="prerequisites">
              {node.unlocks.map(prerequisiteId => (
                <li key={prerequisiteId} className="prerequisite-item">
                  <div className={`prerequisite-status ${isAvailable ? 'completed' : ''}`}></div>
                  <span className="prerequisite-name">{prerequisiteId}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <button
        className="research-button"
        onClick={onStartResearch}
        disabled={!isAvailable || !hasResources || isActive || isCompleted}
      >
        {isCompleted ? 'Completed' :
         isActive ? 'In Progress' :
         !isAvailable ? 'Locked' :
         !hasResources ? 'Insufficient Resources' :
         'Begin Research'}
      </button>
    </div>
  );
};

export default NodeDetailPanel; 