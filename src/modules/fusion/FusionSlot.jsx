// Component for fusion slot to select an entity
import React from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const FusionSlot = ({ 
  slotId, // 'A' or 'B'
  entityId,
  onSelectEntity
}) => {
  // Get game state
  const { storage } = useGameStore();
  
  // Get entity data if selected
  const entity = entityId 
    ? storage.entities.find(e => e.id === entityId) 
    : null;
  
  // Handle entity selection
  const handleSelect = () => {
    onSelectEntity(slotId);
  };
  
  // Handle entity removal
  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering select on the slot
    onSelectEntity(slotId, null); // Pass null to remove
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
    <div 
      className={`fusion-slot gothic-frame ${entity ? 'has-entity' : 'empty'}`}
      onClick={handleSelect}
    >
      <div className="slot-header">
        <span className="slot-label">Slot {slotId}</span>
        {entity && (
          <button className="remove-entity" onClick={handleRemove}>✕</button>
        )}
      </div>
      
      {entity ? (
        // Entity selected
        <div className="fusion-entity">
          <div className="entity-portrait">
            <img 
              src={entity.imageUrl || entity.icon || '/assets/entities/default.png'} 
              alt={entity.name} 
              className={`portrait-img ${getRarityClass(entity.rarity)}`}
            />
          </div>
          
          <div className="entity-info">
            <h3 className={`entity-name ${getRarityClass(entity.rarity)}`}>
              {entity.name}
            </h3>
            
            <div className="entity-details">
              <span className="entity-level">Level {entity.level}</span>
              <span className="entity-rarity">{entity.rarity}</span>
            </div>
            
            <div className="entity-stats">
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
          </div>
        </div>
      ) : (
        // Empty slot
        <div className="fusion-empty">
          <div className="empty-icon">
            <span>SCP</span>
          </div>
          <div className="empty-text">
            <p>Select Entity</p>
            <p className="help-text">Click to choose an entity for fusion</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FusionSlot; 