// PurchaseLog component for tracking recent store purchases
import React from 'react';
import './StoreStyles.css';

const PurchaseLog = ({ purchases }) => {
  // Format time for display
  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    // Convert to minutes
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return 'Today';
    }
  };
  
  // Format price to display with appropriate icon
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.includes('SOL')) {
      // This is a SOL purchase
      return <span className="sol-price-log">{price}</span>;
    } else {
      // This is a gold purchase
      return <span className="gold-price-log">{price} <span className="gold-icon"></span></span>;
    }
  };
  
  return (
    <div className="purchase-log">
      <h3>Recent Purchases</h3>
      
      {purchases.length === 0 ? (
        <div className="no-purchases">
          <p>No recent purchases.</p>
        </div>
      ) : (
        <ul className="purchase-list">
          {purchases.map(purchase => (
            <li key={purchase.id} className="purchase-entry">
              <div className="purchase-info">
                <span className="purchase-item">{purchase.item}</span>
                <span className="purchase-price">{formatPrice(purchase.price)}</span>
              </div>
              <span className="purchase-time">{formatTimestamp(purchase.timestamp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseLog; 