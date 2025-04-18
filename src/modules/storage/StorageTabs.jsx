// Storage Tabs component for category navigation
import './StorageModule.css';

const StorageTabs = ({ activeTab, onTabChange }) => {
  // Tab definitions
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'entities', label: 'Entities' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'items', label: 'Items' },
    { id: 'materials', label: 'Materials' }
  ];
  
  return (
    <div className="storage-tabs">
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

export default StorageTabs; 