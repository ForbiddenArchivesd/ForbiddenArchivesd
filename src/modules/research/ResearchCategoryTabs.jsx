import React from 'react';
import './ResearchStyles.css';

const ResearchCategoryTabs = ({ activeCategory, onCategoryChange }) => {
  // Define the categories and their display names
  const categories = [
    { id: 'containment', label: 'Containment' },
    { id: 'fusion', label: 'Fusion Lab' },
    { id: 'resources', label: 'Resource Management' },
    { id: 'store', label: 'Store Boosts' },
    { id: 'exploration', label: 'Exploration' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default ResearchCategoryTabs; 