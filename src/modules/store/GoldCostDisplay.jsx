// GoldCostDisplay component for showing gold costs with icon
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import './StoreStyles.css';

const GoldCostDisplay = ({ amount, small }) => {
  return (
    <div className={`gold-cost-display ${small ? 'small' : ''}`}>
      <FontAwesomeIcon icon={faCoins} className="gold-icon" />
      <span className="gold-amount">{amount}</span>
    </div>
  );
};

export default GoldCostDisplay; 