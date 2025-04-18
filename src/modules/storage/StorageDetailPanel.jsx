// Storage Detail Panel component for showing item details
import { useState } from 'react';
import useGameStore from '../../store/gameStore';
import './StorageModule.css';

const StorageDetailPanel = ({ item, allItems }) => {
  // Get store methods
  const { sellItem } = useGameStore();
  
  // State for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [feedTooltip, setFeedTooltip] = useState(false);
  
  // Find equipped gear items for an entity
  const getEquippedGear = (entityItem) => {
    if (!entityItem || !entityItem.equipped || !entityItem.equipped.length) {
      return [];
    }
    
    return allItems.filter(item => 
      item.type === 'Gear' && 
      entityItem.equipped.includes(item.id)
    );
  };
  
  // Get rarity class for styling
  const getRarityClass = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case 'epic':
        return 'rarity-epic';
      case 'rare':
        return 'rarity-rare';
      case 'common':
      default:
        return 'rarity-common';
    }
  };
  
  // Handle selling an item
  const handleSellItem = () => {
    setShowConfirmDialog(false);
    sellItem(item.id);
  };
  
  // Handle feed button click
  const handleFeedClick = () => {
    setFeedTooltip(true);
    // Hide tooltip after 3 seconds
    setTimeout(() => setFeedTooltip(false), 3000);
  };
  
  // If no item is selected, show placeholder
  if (!item) {
    return (
      <div className="storage-detail-panel">
        <div className="no-item-selected">
          <h2>No Item Selected</h2>
          <p>Click on any item to view details</p>
        </div>
      </div>
    );
  }
  
  // Get equipped gear if entity
  const equippedGear = item.type === 'Entity' ? getEquippedGear(item) : [];
  
  return (
    <div className="storage-detail-panel">
      <div className={`detail-header ${getRarityClass(item.rarity)}`}>
        <h2>{item.name}</h2>
        <div className="detail-type-rarity">
          <span className="detail-type">{item.type}</span>
          <span className="detail-rarity">{item.rarity}</span>
        </div>
      </div>
      
      <div className="detail-icon-container">
        <img 
          src={item.icon || '/icons/placeholder.png'} 
          alt={item.name} 
          className="detail-icon" 
        />
      </div>
      
      <div className="detail-description">
        <p>{item.description}</p>
      </div>
      
      {/* Show attributes for Entity type */}
      {item.type === 'Entity' && (
        <div className="detail-attributes">
          <h3>Attributes</h3>
          <div className="attribute-grid">
            <div className="attribute">
              <span className="attribute-label">Level</span>
              <span className="attribute-value">{item.level}</span>
            </div>
            <div className="attribute">
              <span className="attribute-label">Attack</span>
              <span className="attribute-value">{item.attack}</span>
            </div>
            <div className="attribute">
              <span className="attribute-label">Defense</span>
              <span className="attribute-value">{item.defense}</span>
            </div>
            <div className="attribute">
              <span className="attribute-label">Efficiency</span>
              <span className="attribute-value">{item.efficiency}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Show skills for Entity type */}
      {item.type === 'Entity' && item.skills && item.skills.length > 0 && (
        <div className="entity-skills">
          <h3>Skills</h3>
          <ul className="skills-list">
            {item.skills.map((skill, index) => (
              <li key={index} className="skill-item">
                <span className="skill-bullet">•</span>
                <span className="skill-name">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Show equipped gear for Entity type */}
      {item.type === 'Entity' && equippedGear.length > 0 && (
        <div className="entity-equipped-gear">
          <h3>Equipped Gear</h3>
          <div className="equipped-gear-list">
            {equippedGear.map(gear => (
              <div key={gear.id} className={`equipped-item ${getRarityClass(gear.rarity)}`}>
                <img 
                  src={gear.icon || '/icons/placeholder.png'} 
                  alt={gear.name} 
                  className="equipped-item-icon" 
                />
                <div className="equipped-item-info">
                  <h4>{gear.name}</h4>
                  <span>{gear.rarity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Action buttons area */}
      <div className="detail-actions">
        {/* Feed button - only for entities */}
        {item.type === 'Entity' && (
          <div className="action-button-container">
            <button 
              className="action-button feed-button"
              onClick={handleFeedClick}
            >
              🍖 Feed
            </button>
            {feedTooltip && (
              <div className="action-tooltip">
                Please use the Feed function on the Entity panel.
              </div>
            )}
          </div>
        )}
        
        {/* Sell button - for all items */}
        <button 
          className="action-button sell-button"
          onClick={() => setShowConfirmDialog(true)}
        >
          💰 Sell
        </button>
      </div>
      
      {/* Sell confirmation dialog */}
      {showConfirmDialog && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <h3>Confirm Sale</h3>
            <p>Do you want to sell this item for gold?</p>
            <div className="confirmation-buttons">
              <button 
                className="confirm-button"
                onClick={handleSellItem}
              >
                Confirm
              </button>
              <button 
                className="cancel-button"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageDetailPanel; 