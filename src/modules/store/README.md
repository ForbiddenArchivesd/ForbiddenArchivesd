# Store Module

## Overview
The Store Module provides a shop interface where players can purchase various items using in-game gold. The store features four categories of items (Entities, Equipment, Items, and Materials), timed inventory refreshes, manual refresh functionality, and a purchase log.

## Key Features
- Four item categories: Entities, Equipment, Items, and Materials
- Timed inventory refresh (hourly for most categories)
- Manual refresh option (costs 100 gold)
- Daily purchase limit for Entities (1 per day, persists through browser reloads)
- Purchase log to track recent transactions
- Visual support for future SOL token payments (currently disabled)
- Stock limits per item
- Storage capacity enforcement

## Components Structure
- **StoreModule.jsx**: Main component that manages the store state and orchestrates other components
- **ShopCategoryTabs.jsx**: Tab navigation for switching between item categories
- **StoreItemCard.jsx**: Individual item display with purchase functionality
- **ManualRefreshPanel.jsx**: UI for timed and manual inventory refresh
- **PurchaseLog.jsx**: Displays recent purchase history
- **GoldCostDisplay.jsx**: Reusable component for displaying gold costs
- **StoreStyles.css**: Styling for all Store components

## Refresh Behavior
- All categories except Entities refresh automatically every hour
- Players can manually refresh a category by spending 100 gold (5-minute cooldown)
- Entity tab never refreshes (entities have a daily purchase limit of 1)
- When a category refreshes, all item stocks are reset

## Purchase Rules
- Purchases deduct from the player's gold balance
- Purchased items are immediately added to the appropriate inventory category
- Entity purchases are limited to 1 per day (persisted in localStorage)
- Item stock is reduced with each purchase
- Purchases fail if storage capacity is exceeded

## Integration with Game State
The Store Module integrates with the global game state through:
- Reading and updating player's gold resources with updateGold()
- Adding purchased items to the appropriate storage category
- Tracking entity purchase limits
- Enforcing storage capacity limits

## Error Handling
- Provides visual feedback for purchase failures
- Shows specific error messages for:
  - Insufficient gold
  - Storage full
  - Daily entity limit reached
  - Out of stock

## Persistent Data
- Entity purchase limits are stored in localStorage to persist between sessions
- Daily reset occurs every 24 hours from the last reset

## Styling
- Dark theme consistent with SCP/Gothic design
- Rarity-based visual indicators (common, rare, epic)
- Responsive layout for different screen sizes
- Hover effects and tooltips for better user experience

## Future Enhancements
- SOL token integration for special purchases
- Expanded item selection
- Special time-limited offers
- Discount events 