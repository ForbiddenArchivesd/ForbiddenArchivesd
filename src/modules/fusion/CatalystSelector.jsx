// Component for selecting a catalyst item for fusion
import React from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const CatalystSelector = ({ catalystId, onSelectCatalyst }) => {
  // Get game state
  const { storage } = useGameStore();
  
  // Get all available catalyst items (from items and materials)
  const catalystItems = [
    ...storage.items,
    ...storage.materials
  ];
  
  // Get selected catalyst data
  const catalyst = catalystId 
    ? catalystItems.find(item => item.id === catalystId) 
    : null;
  
  // Handle catalyst selection
  const handleSelect = () => {
    onSelectCatalyst();
  };
  
  // Handle catalyst removal
  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering select
    onSelectCatalyst(null); // Pass null to remove
  };
  
  // Get effect description
  const getEffectDescription = (catalyst) => {
    if (!catalyst || !catalyst.effect) return 'No special effect';
    
    switch (catalyst.effect.type) {
      case 'rarityBoost':
        return `+${catalyst.effect.value}% Epic chance`;
      case 'levelBoost':
        return `Result starts at level ${1 + catalyst.effect.value}`;
      case 'statBias':
        return `Increased ${catalyst.effect.stat} on result`;
      default:
        return 'Unknown effect';
    }
  };
  
  return (
    <div 
      className={`catalyst-selector gothic-frame ${catalyst ? 'has-catalyst' : 'empty'}`}
      onClick={handleSelect}
    >
      <div className="catalyst-header">
        <span className="catalyst-label">Catalyst (Optional)</span>
        {catalyst && (
          <button className="remove-catalyst" onClick={handleRemove}>✕</button>
        )}
      </div>
      
      {catalyst ? (
        // Catalyst selected
        <div className="catalyst-content">
          <div className="catalyst-icon">
            <img 
              src={catalyst.icon} 
              alt={catalyst.name} 
            />
          </div>
          
          <div className="catalyst-info">
            <h3 className="catalyst-name">{catalyst.name}</h3>
            <p className="catalyst-type">{catalyst.type === 'object' ? 'Item' : 'Material'}</p>
            <p className="effect-description">{getEffectDescription(catalyst)}</p>
          </div>
        </div>
      ) : (
        // No catalyst selected
        <div className="catalyst-empty">
          <div className="empty-icon">
            <span>+</span>
          </div>
          <div className="empty-text">
            <p>Add Catalyst</p>
            <p className="help-text">Optional: Influence fusion result</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalystSelector; 