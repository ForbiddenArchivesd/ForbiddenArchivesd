import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ItemTooltip Component
 * 
 * Uses React Portal to render tooltips outside their natural DOM position,
 * preventing overlap with adjacent elements.
 */
const ItemTooltip = ({ item, isVisible, targetRef, isEntityLimited }) => {
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef(null);
  
  // Helper to get effect description for display
  const getEffectDescription = () => {
    if (!item.effect) return 'No special effect';
    
    switch (item.effect.type) {
      case 'rarityBoost':
        return `+${item.effect.value}% Epic chance`;
      case 'levelBoost':
        return `Result starts at level ${1 + item.effect.value}`;
      case 'statBias':
        return `Increased ${item.effect.stat} on result`;
      case 'research':
        return `Used for research upgrades`;
      case 'unlock':
        return `Exchange/unlock items`;
      case 'rarityBias':
        return `Biases fusion results toward ${item.effect.value} rarity`;
      case 'maturityBoost':
        return `Increases maturity by ${item.effect.value} levels`;
      case 'skillQuality':
        return `Enhances skill quality by ${item.effect.value}`;
      case 'cooldownReduction':
        return `Reduces cooldown by ${item.effect.value * 100}%`;
      case 'stabilityBoost':
        return `Increases stability by ${item.effect.value * 100}%`;
      case 'crafting':
        return `Used in crafting (level ${item.effect.value})`;
      case 'upgrade':
        return `Used for upgrades (tier ${item.effect.value})`;
      case 'catalyst':
        return `Acts as fusion catalyst (potency ${item.effect.value})`;
      case 'mutation':
        return `Enables mutations (class ${item.effect.value})`;
      default:
        return `${item.effect.type}: ${item.effect.value}`;
    }
  };

  // Position tooltip based on the target element
  useEffect(() => {
    if (!isVisible || !targetRef.current) return;
    
    const updatePosition = () => {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipElement = tooltipRef.current;
      
      if (!tooltipElement) return;
      
      // Calculate the tooltip dimensions
      const tooltipRect = tooltipElement.getBoundingClientRect();
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      
      // Default position (right of element)
      let left = targetRect.right + 10;
      let top = targetRect.top;
      
      // Check if tooltip would go off-screen to the right
      if (left + tooltipRect.width > viewportWidth - 20) {
        // Position to the left of the element instead
        left = targetRect.left - tooltipRect.width - 10;
        
        // If that would go off-screen to the left, position it above or below
        if (left < 20) {
          left = targetRect.left;
          top = targetRect.bottom + 10;
          
          // If it would go below the viewport, place it above
          if (top + tooltipRect.height > window.innerHeight - 20) {
            top = targetRect.top - tooltipRect.height - 10;
          }
        }
      }
      
      setTooltipStyle({
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 1000
      });
    };
    
    updatePosition();
    
    // Update position when window resizes
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isVisible, targetRef]);
  
  if (!isVisible) return null;
  
  // Create a portal to render the tooltip at the document body level
  return createPortal(
    <div 
      className="item-tooltip"
      style={tooltipStyle}
      ref={tooltipRef}
    >
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <p className="effect-desc">Effect: {getEffectDescription()}</p>
      {isEntityLimited && item.type === 'Entity' && (
        <p className="limit-warning">Daily purchase limit reached!</p>
      )}
    </div>,
    document.body
  );
};

export default ItemTooltip; 