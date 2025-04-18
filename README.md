# Gothic SCP Themed Game UI

This project implements a Gothic-styled SCP themed game interface using React and Vite.

## Project Overview

This application is a front-end interface for a game with SCP Foundation themes and Gothic aesthetic elements. The interface includes player information, resource management, navigation to different game modules, and real-time status updates.

## Layout Structure

- **Top Bar**: Contains player avatar (clickable to reveal profile popup), username, level with experience bar, and resource indicators (Gold, Energy, Research Points)
- **Main Navigation Area**: Vertically aligned Gothic-styled navigation buttons with hover animations and glow effects
- **Status Information Panel**: Real-time game updates in a vertically scrollable area, including production rates and current research

## Key Features

- **Gothic SCP Theme**: Dark, eerie aesthetic with elements of Gothic architecture and SCP Foundation style
- **Interactive Navigation**: Animated navigation buttons with glow effects on hover
- **Dynamic Status Updates**: Real-time game updates with clickable items that show detailed information
- **Responsive Layout**: Adapts to different screen sizes while maintaining the gothic aesthetic
- **State Management**: Uses Zustand for efficient state management
- **Routing**: Implements React Router for navigation between different game modules

## Technologies Used

- Vite for fast development and building
- React for component-based UI
- React Router DOM for navigation
- Zustand for state management
- Font Awesome for icons
- CSS for styling with responsive design

## Visual Style

- **Primary Colors**: Black, dark gray, muted tones
- **Accent Colors**: Dark red, deep purple, neon blue-purple
- **Typography**: Gothic-style fonts, sharp decorative elements
- **Atmosphere**: Dark, eerie, mysterious with a sophisticated aesthetic
- **Visual Elements**: Gothic architecture (spires, arches), rust, wear, electronic interface details

## Component Structure

- `/components`: Reusable UI components
  - `TopBar.jsx`: Player info and resources display
  - `Navigation.jsx`: Gothic-styled navigation menu
  - `StatusPanel.jsx`: Real-time game updates panel
  - `Layout.jsx`: Main layout component
- `/pages`: Page components
  - `Home.jsx`: Dashboard with player stats and objectives
- `/store`: State management with Zustand
  - `gameStore.js`: Game state for player info, resources, and updates
- `/styles`: Global and component-specific styles
  - `global.css`: Global styling and variables
  - `pages.css`: Common page styling

## Getting Started

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open your browser to the URL displayed in the terminal

## Notes for Further Development

- Replace placeholder images (`public/avatar.jpg`, `public/scp-background.jpg`) with actual images
- Implement backend integration with the existing state management
- Add more detailed page content for each navigation item
- Enhance responsive design for mobile experiences
