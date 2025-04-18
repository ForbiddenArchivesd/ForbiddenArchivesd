// Component for individual containment slot
import React from 'react';
import useGameStore from '../../store/gameStore';
import './ContainmentStyles.css';

const ContainmentSlot = ({ slotId, onDeploy }) => {
  // Get containment data and actions from the game store
  const { 
    containment, 
    storage, 
    recallEntity, 
    getEntityOutputRate 
  } = useGameStore();
  
  // Find this slot's data
  const slot = containment.slots.find(s => s.id === slotId);
  
  // Find entity if one is deployed
  const entity = slot?.entityId 
    ? storage.entities.find(e => e.id === slot.entityId) 
    : null;
  
  // Calculate output rate if entity is deployed
  const outputRate = entity ? getEntityOutputRate(entity.id) : 0;
  
  // Handler for recalling an entity
  const handleRecall = () => {
    recallEntity(slotId);
  };
  
  // Get the appropriate rarity class for styling
  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common': return 'common';
      case 'Rare': return 'rare';
      case 'Epic': return 'epic';
      default: return '';
    }
  };

  return (
    <div className="containment-slot gothic-frame">
      {entity ? (
        // Occupied slot with entity
        <>
          <div className="occupied-slot">
            <div className="entity-portrait">
              <img
                src={entity.imageUrl || '/assets/entities/default.png'}
                alt={entity.name}
                className="portrait-img"
                style={{ objectFit: 'contain' }}
              />
              <div className={`rarity-indicator ${getRarityClass(entity.rarity)}`}></div>
            </div>
            
            <div className="entity-info">
              <h3 className={`entity-name ${getRarityClass(entity.rarity)}`}>{entity.name}</h3>
              <div className="entity-details">
                <span className="entity-level">Level {entity.level}</span>
                <span className="entity-rarity">{entity.rarity}</span>
              </div>
              <div className="entity-stats">
                <div className="stat-row">
                  <span className="stat-label">Efficiency:</span>
                  <span className="stat-value">{entity.efficiency.toFixed(1)}x</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Output:</span>
                  <span className="stat-value">+{outputRate} Gold/min</span>
                </div>
              </div>
              <button 
                className="recall-button" 
                onClick={handleRecall}
              >
                Recall Entity
              </button>
            </div>
            
            {/* Hover info panel */}
            <div className="hover-info-panel">
              <h4>{entity.name}</h4>
              <p>Level: {entity.level}</p>
              <p>Rarity: {entity.rarity}</p>
              <p>Efficiency: {entity.efficiency.toFixed(1)}x</p>
              <p>Attack: {entity.attack}</p>
              <p>Defense: {entity.defense}</p>
              <p>Skills: {entity.skills.join(', ')}</p>
              <p className="description">{entity.description}</p>
            </div>
          </div>
        </>
      ) : (
        // Empty slot
        <div className="empty-slot">
          <div className="empty-icon">SCP</div>
          <div className="empty-text">
            <p>No entity deployed</p>
            <button 
              className="deploy-button" 
              onClick={() => onDeploy(slotId)}
            >
              Deploy Entity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContainmentSlot; 