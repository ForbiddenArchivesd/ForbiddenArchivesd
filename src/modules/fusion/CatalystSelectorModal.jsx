// Modal for selecting catalyst items
import React, { useState } from 'react';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const CatalystSelectorModal = ({ onClose, onSelectCatalyst }) => {
  // Get game state
  const { storage } = useGameStore();
  
  // State for type filter
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Get all items and materials (not just ones with effects)
  const allCatalysts = [
    ...storage.items.map(item => ({ ...item, sourceType: 'item' })),
    ...storage.materials.map(material => ({ ...material, sourceType: 'material' }))
  ];
  
  // Apply type filter
  const filteredCatalysts = typeFilter === 'all'
    ? allCatalysts
    : allCatalysts.filter(catalyst => catalyst.sourceType === typeFilter);
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setTypeFilter(filter);
  };
  
  // Handle catalyst selection
  const handleCatalystSelect = (catalystId) => {
    onSelectCatalyst(catalystId);
    onClose();
  };
  
  // Get effect description for display
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
    <div className="catalyst-selector-overlay">
      <div className="catalyst-selector-modal gothic-frame">
        <div className="modal-header">
          <h2>Select Catalyst (Optional)</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="catalyst-info-text">
          <p>Catalysts influence fusion results and are consumed when used.</p>
        </div>
        
        <div className="filter-controls">
          <button 
            className={`filter-button ${typeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${typeFilter === 'item' ? 'active' : ''}`}
            onClick={() => handleFilterChange('item')}
          >
            Items
          </button>
          <button 
            className={`filter-button ${typeFilter === 'material' ? 'active' : ''}`}
            onClick={() => handleFilterChange('material')}
          >
            Materials
          </button>
        </div>
        
        <div className="catalysts-grid">
          {filteredCatalysts.length > 0 ? (
            filteredCatalysts.map(catalyst => (
              <div 
                key={catalyst.id}
                className="catalyst-card gothic-frame"
                onClick={() => handleCatalystSelect(catalyst.id)}
              >
                <div className="catalyst-card-header">
                  <h3 className="catalyst-name">{catalyst.name}</h3>
                  <span className="catalyst-type">
                    {catalyst.sourceType === 'item' ? 'Item' : 'Material'}
                  </span>
                </div>
                
                <div className="catalyst-card-icon">
                  <img 
                    src={catalyst.icon} 
                    alt={catalyst.name}
                  />
                </div>
                
                <div className="catalyst-effect">
                  <span className="effect-label">Effect:</span>
                  <span className="effect-value">{getEffectDescription(catalyst)}</span>
                </div>
                
                <div className="select-button">Use as Catalyst</div>
              </div>
            ))
          ) : (
            <div className="no-catalysts">
              <p>No catalysts available.</p>
              <p>Acquire items with special effects from expeditions or the store.</p>
            </div>
          )}
        </div>
        
        <div className="skip-catalyst">
          <button className="skip-button" onClick={() => onClose()}>
            Skip (No Catalyst)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalystSelectorModal; 