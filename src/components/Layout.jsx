// Layout component to structure the application
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ResourceBar from './ResourceBar';
import Navigation from './Navigation';
import StatusPanel from './StatusPanel';
import IntroOverlay from './IntroOverlay';
import './Layout.css';

const Layout = () => {
  // State to control the visibility of the intro overlay
  const [showIntroOverlay, setShowIntroOverlay] = useState(false);
  
  // Check local storage to see if the user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('agent-x-visited');
    if (!hasVisited) {
      setShowIntroOverlay(true);
    }
  }, []);
  
  // Handle overlay close
  const handleCloseOverlay = () => {
    setShowIntroOverlay(false);
    localStorage.setItem('agent-x-visited', 'true');
  };
  
  return (
    <div className="app-container">
      {/* Intro overlay for first-time visitors */}
      {showIntroOverlay && <IntroOverlay onClose={handleCloseOverlay} />}
      
      {/* Top bar with player info and resources */}
      <ResourceBar />
      
      <div className="main-container">
        {/* Left side navigation */}
        <Navigation />
        
        {/* Main content area */}
        <main className="content-area">
          <Outlet />
        </main>
        
        {/* Right side status panel */}
        <StatusPanel />
      </div>
    </div>
  );
};

export default Layout; 