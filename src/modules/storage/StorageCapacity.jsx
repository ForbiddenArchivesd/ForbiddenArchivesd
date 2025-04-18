// Storage Capacity component to show storage usage
import './StorageModule.css';

const StorageCapacity = ({ current, max }) => {
  // Calculate percentage filled
  const fillPercentage = (current / max) * 100;
  
  // Determine status class based on capacity
  const getStatusClass = () => {
    if (fillPercentage >= 90) return 'status-critical';
    if (fillPercentage >= 70) return 'status-warning';
    return 'status-normal';
  };
  
  return (
    <div className="storage-capacity">
      <div className="capacity-text">
        <span>Stored {current} / {max}</span>
      </div>
      
      <div className="capacity-bar-container">
        <div 
          className={`capacity-bar-fill ${getStatusClass()}`}
          style={{ width: `${Math.min(fillPercentage, 100)}%` }}
        ></div>
      </div>
      
      {/* Show warning if approaching capacity */}
      {fillPercentage >= 90 && (
        <div className="capacity-warning">
          Storage almost full!
        </div>
      )}
    </div>
  );
};

export default StorageCapacity; 