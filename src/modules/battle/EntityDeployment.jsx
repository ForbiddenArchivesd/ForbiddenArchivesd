import React from 'react';
import './BattleStyles.css';

const EntityDeployment = ({ entities, selectedEntities, onEntitySelect, isEntityAvailable, maxSelections }) => {
  return (
    <div className="entity-deployment-panel">
      <div className="deployment-header">
        <h2>Your Selected Team</h2>
        <div className="selection-count">
          <span>{selectedEntities.length}/{maxSelections} Selected</span>
        </div>
      </div>
      
      <div className="selected-entities">
        {selectedEntities.length > 0 ? (
          selectedEntities.map(entity => (
            <div key={entity.id} className="entity-card selected" onClick={() => onEntitySelect(entity)}>
              <div className="entity-card-header">
                <div className="entity-name">{entity.name}</div>
                <div className={`entity-rarity ${entity.rarity.toLowerCase()}`}>
                  {entity.rarity}
                </div>
              </div>
              
              <div className="entity-stats">
                <div className="stat-item">
                  <span className="stat-label">ATK</span>
                  <span className="stat-value">{entity.attack}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">DEF</span>
                  <span className="stat-value">{entity.defense}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">LVL</span>
                  <span className="stat-value">{entity.level}</span>
                </div>
              </div>
              
              <div className="entity-skills">
                {entity.skills.map((skill, index) => (
                  <div key={index} className="skill-chip">{skill}</div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-entities-selected">
            Select entities from your collection below
          </div>
        )}
      </div>
      
      <div className="available-entities-header">
        <h3>Available Entities</h3>
      </div>
      
      <div className="available-entities">
        {entities.map(entity => {
          const isSelected = selectedEntities.some(e => e.id === entity.id);
          const isAvailable = isEntityAvailable(entity.id);
          const disabled = !isAvailable && !isSelected;
          
          return (
            <div 
              key={entity.id} 
              className={`entity-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && onEntitySelect(entity)}
            >
              <div className="entity-card-header">
                <div className="entity-name">{entity.name}</div>
                <div className={`entity-rarity ${entity.rarity.toLowerCase()}`}>
                  {entity.rarity}
                </div>
              </div>
              
              <div className="entity-stats">
                <div className="stat-item">
                  <span className="stat-label">ATK</span>
                  <span className="stat-value">{entity.attack}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">DEF</span>
                  <span className="stat-value">{entity.defense}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">LVL</span>
                  <span className="stat-value">{entity.level}</span>
                </div>
              </div>
              
              <div className="entity-skills">
                {entity.skills.map((skill, index) => (
                  <div key={index} className="skill-chip">{skill}</div>
                ))}
              </div>
              
              {disabled && (
                <div className="unavailable-overlay">
                  <span className="unavailable-text">Deployed</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EntityDeployment; 