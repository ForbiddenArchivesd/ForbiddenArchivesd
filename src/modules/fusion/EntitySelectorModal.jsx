// Modal for selecting entities for fusion
import React, { useState } from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const EntitySelectorModal = ({ 
  onClose, 
  onSelectEntity, 
  excludeEntityIds = [], 
  slotId 
}) => {
  // Get game state
  const { storage, containment } = useGameStore();
  
  // State for rarity filter
  const [rarityFilter, setRarityFilter] = useState('all');
  
  // Get all available entities (not in containment and not already selected)
  const availableEntities = storage.entities.filter(entity => {
    // Check if entity is not already deployed in containment
    const isInContainment = containment.slots.some(slot => slot.entityId === entity.id);
    
    // Check if entity is not already selected in another fusion slot
    const isExcluded = excludeEntityIds.includes(entity.id);
    
    // Entity is available if it's not in containment and not excluded
    return !isInContainment && !isExcluded;
  });
  
  // Apply rarity filter
  const filteredEntities = rarityFilter === 'all' 
    ? availableEntities
    : availableEntities.filter(entity => 
        entity.rarity.toLowerCase() === rarityFilter.toLowerCase()
      );
  
  // Sort entities by rarity (epic first), then by level
  const sortedEntities = [...filteredEntities].sort((a, b) => {
    // Sort by rarity first
    const rarityOrder = { 'Epic': 0, 'Rare': 1, 'Common': 2 };
    const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
    
    if (rarityDiff !== 0) return rarityDiff;
    
    // Then by level (higher level first)
    return b.level - a.level;
  });
  
  // Get rarity class for styling
  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common': return 'common';
      case 'Rare': return 'rare';
      case 'Epic': return 'epic';
      default: return '';
    }
  };
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setRarityFilter(filter);
  };
  
  // Handle entity selection
  const handleEntitySelect = (entityId) => {
    onSelectEntity(slotId, entityId);
    onClose();
  };
  
  return (
    <div className="entity-selector-overlay">
      <div className="entity-selector-modal gothic-frame">
        <div className="modal-header">
          <h2>Select Entity for Slot {slotId}</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="filter-controls">
          <button 
            className={`filter-button ${rarityFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${rarityFilter === 'common' ? 'active' : ''}`}
            onClick={() => handleFilterChange('common')}
          >
            Common
          </button>
          <button 
            className={`filter-button ${rarityFilter === 'rare' ? 'active' : ''}`}
            onClick={() => handleFilterChange('rare')}
          >
            Rare
          </button>
          <button 
            className={`filter-button ${rarityFilter === 'epic' ? 'active' : ''}`}
            onClick={() => handleFilterChange('epic')}
          >
            Epic
          </button>
        </div>
        
        <div className="entities-grid">
          {sortedEntities.length > 0 ? (
            sortedEntities.map(entity => (
              <div 
                key={entity.id}
                className="entity-card gothic-frame"
                onClick={() => handleEntitySelect(entity.id)}
              >
                <div className="entity-card-header">
                  <h3 className={`entity-name ${getRarityClass(entity.rarity)}`}>
                    {entity.name}
                  </h3>
                  <span className="entity-level">Lvl {entity.level}</span>
                </div>
                
                <div className="entity-card-portrait">
                  <img 
                    src={entity.imageUrl || entity.icon || '/assets/entities/default.png'} 
                    alt={entity.name} 
                    className={`portrait-img ${getRarityClass(entity.rarity)}`}
                  />
                </div>
                
                <div className="entity-card-stats">
                  <div className="stat-row">
                    <span className="stat-label">Attack:</span>
                    <span className="stat-value">{entity.attack}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Defense:</span>
                    <span className="stat-value">{entity.defense}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Efficiency:</span>
                    <span className="stat-value">{entity.efficiency}x</span>
                  </div>
                </div>
                
                <div className="select-button">Select</div>
              </div>
            ))
          ) : (
            <div className="no-entities">
              <p>No available entities found.</p>
              <p>Recall deployed entities or acquire new ones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntitySelectorModal; 