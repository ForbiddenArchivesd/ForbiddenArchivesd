// Main StorageModule component
import { useState } from 'react';
import StorageTabs from './StorageTabs';
import StorageGrid from './StorageGrid';
import StorageDetailPanel from './StorageDetailPanel';
import StorageCapacity from './StorageCapacity';
import useGameStore from '../../store/gameStore';
import './StorageModule.css';

const StorageModule = () => {
  // Get storage data from global state
  const { storage } = useGameStore();
  
  // State for active tab and selected item
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Filter items based on active tab
  const getFilteredItems = () => {
    if (activeTab === 'all') {
      return [
        ...storage.entities,
        ...storage.gear,
        ...storage.items,
        ...storage.materials
      ];
    }
    
    // Return items of specific category
    switch(activeTab) {
      case 'entities':
        return storage.entities;
      case 'equipment':
        return storage.gear;
      case 'items':
        return storage.items;
      case 'materials':
        return storage.materials;
      default:
        return [];
    }
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedItem(null); // Clear selection when changing tabs
  };
  
  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };
  
  return (
    <div className="storage-module">
      {/* Top navigation tabs */}
      <StorageTabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="storage-content">
        {/* Left side: Grid of items */}
        <StorageGrid 
          items={getFilteredItems()} 
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
        />
        
        {/* Right side: Item details panel */}
        <StorageDetailPanel 
          item={selectedItem} 
          allItems={[
            ...storage.entities,
            ...storage.gear,
            ...storage.items,
            ...storage.materials
          ]}
        />
      </div>
      
      {/* Bottom: Storage capacity indicator */}
      <StorageCapacity 
        current={storage.entities.length + storage.gear.length + 
                storage.items.length + storage.materials.length}
        max={storage.capacity}
      />
    </div>
  );
};

export default StorageModule; 