// Modal for selecting entities to deploy in containment slots
import React, { useState } from 'react';
import useGameStore from '../../store/gameStore';
import './ContainmentStyles.css';

const EntitySelectorModal = ({ onClose, onEntitySelect, slotId }) => {
  // Get game state data from store
  const { 
    storage, 
    isEntityDeployed, 
    getEntityOutputRate 
  } = useGameStore();
  
  // State for filter selection
  const [filter, setFilter] = useState('all');
  
  // Filter entities that are not already deployed in containment
  const availableEntities = storage.entities.filter(entity => 
    !isEntityDeployed(entity.id)
  );
  
  // Sort entities by rarity and level
  const sortedEntities = [...availableEntities].sort((a, b) => {
    // Sort by rarity first
    const rarityOrder = { 'Epic': 0, 'Rare': 1, 'Common': 2 };
    const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
    
    if (rarityDiff !== 0) return rarityDiff;
    
    // Then by level (higher level first)
    return b.level - a.level;
  });
  
  // Get filtered entities
  const getFilteredEntities = () => {
    if (filter === 'all') return sortedEntities;
    
    // Filter by rarity
    return sortedEntities.filter(entity => entity.rarity.toLowerCase() === filter.toLowerCase());
  };
  
  // Get rarity class for styling
  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common': return 'common';
      case 'Rare': return 'rare';
      case 'Epic': return 'epic';
      default: return '';
    }
  };
  
  return (
    <div className="entity-selector-overlay">
      <div className="entity-selector-modal gothic-frame">
        <div className="modal-header">
          <h2>Select Entity for Containment</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="filter-controls">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'common' ? 'active' : ''}`} 
            onClick={() => setFilter('common')}
          >
            Common
          </button>
          <button 
            className={`filter-button ${filter === 'rare' ? 'active' : ''}`} 
            onClick={() => setFilter('rare')}
          >
            Rare
          </button>
          <button 
            className={`filter-button ${filter === 'epic' ? 'active' : ''}`} 
            onClick={() => setFilter('epic')}
          >
            Epic
          </button>
        </div>
        
        <div className="entities-grid">
          {getFilteredEntities().length > 0 ? (
            getFilteredEntities().map(entity => (
              <div 
                key={entity.id}
                className="entity-select-card gothic-frame"
                onClick={() => onEntitySelect(slotId, entity.id)}
              >
                <div className="entity-select-header">
                  <h3 className={`entity-name ${getRarityClass(entity.rarity)}`}>{entity.name}</h3>
                  <span className="entity-level">Lvl {entity.level}</span>
                </div>
                
                <div className="entity-select-portrait">
                  <img 
                    src={entity.imageUrl || entity.icon || '/assets/entities/default.png'} 
                    alt={entity.name} 
                    className={`portrait-img ${getRarityClass(entity.rarity)}`}
                  />
                </div>
                
                <div className="entity-select-stats">
                  <div className="stat-row">
                    <span className="stat-label">Efficiency:</span>
                    <span className="stat-value">{entity.efficiency?.toFixed(1) || '1.0'}x</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Output:</span>
                    <span className="stat-value">+{getEntityOutputRate(entity.id)} Gold/min</span>
                  </div>
                </div>
                
                <button className="select-entity-button">Deploy</button>
              </div>
            ))
          ) : (
            <div className="no-entities-message">
              <p>No available entities to deploy.</p>
              <p>Recall deployed entities or acquire more.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntitySelectorModal; 