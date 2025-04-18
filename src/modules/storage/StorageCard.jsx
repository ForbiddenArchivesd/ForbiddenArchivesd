// Storage Card component for individual items
import './StorageModule.css';

const StorageCard = ({ item, isSelected, onClick }) => {
  // Get border class based on item rarity
  const getRarityClass = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'epic':
        return 'rarity-epic';
      case 'rare':
        return 'rarity-rare';
      case 'common':
      default:
        return 'rarity-common';
    }
  };
  
  // Create a placeholder icon if no icon is available
  const iconUrl = item.icon || '/icons/placeholder.png';
  
  // Get item type icon class
  const getTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'entity':
        return 'type-entity';
      case 'gear':
        return 'type-gear';
      case 'object':
        return 'type-item';
      case 'material':
        return 'type-material';
      default:
        return '';
    }
  };
  
  return (
    <div 
      className={`storage-card ${getRarityClass(item.rarity)} ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <div className="card-icon-container">
        <img src={iconUrl} alt={item.name} className="card-icon" />
      </div>
      
      <div className="card-info">
        <h3 className="card-name">{item.name}</h3>
        <span className={`card-type ${getTypeClass(item.type)}`}>{item.type}</span>
      </div>
      
      {/* Hover tooltip */}
      <div className="card-tooltip">
        <h4>{item.name}</h4>
        <span className="tooltip-rarity">{item.rarity}</span>
        {item.level && <span className="tooltip-level">Level {item.level}</span>}
      </div>
    </div>
  );
};

export default StorageCard; 