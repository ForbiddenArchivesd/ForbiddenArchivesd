// Storage Grid component to display item cards
import StorageCard from './StorageCard';
import './StorageModule.css';

const StorageGrid = ({ items, selectedItem, onItemSelect }) => {
  return (
    <div className="storage-grid">
      {items && items.length > 0 ? (
        items.map(item => (
          <StorageCard
            key={item.id}
            item={item}
            isSelected={selectedItem && selectedItem.id === item.id}
            onClick={() => onItemSelect(item)}
          />
        ))
      ) : (
        <div className="empty-grid-message">
          <p>No items found in this category</p>
        </div>
      )}
    </div>
  );
};

export default StorageGrid; 