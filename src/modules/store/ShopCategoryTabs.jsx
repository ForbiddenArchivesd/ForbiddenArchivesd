// ShopCategoryTabs component for the store module
import React from 'react';
import './StoreStyles.css';

const ShopCategoryTabs = ({ activeTab, onTabChange }) => {
  // Tab configuration
  const tabs = [
    { id: 'entities', label: 'Entities' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'items', label: 'Items' },
    { id: 'materials', label: 'Materials' }
  ];
  
  return (
    <div className="shop-category-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ShopCategoryTabs; 