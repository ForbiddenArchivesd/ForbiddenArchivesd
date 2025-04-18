// Navigation component with Gothic-styled buttons
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBoxesStacked,
  faFlask,
  faShield,
  faBook,
  faSkull,
  faStore
} from '@fortawesome/free-solid-svg-icons';
import './Navigation.css';

// Navigation items configuration
const navItems = [
  { id: 'home', label: 'Home', path: '/', icon: faHome },
  { id: 'storage', label: 'Storage', path: '/storage', icon: faBoxesStacked },
  { id: 'fusion', label: 'Fusion Lab', path: '/fusion', icon: faFlask },
  { id: 'containment', label: 'Containment', path: '/containment', icon: faShield },
  { id: 'research', label: 'Research Tree', path: '/research', icon: faBook },
  { id: 'battle', label: 'Battle', path: '/battle', icon: faSkull },
  { id: 'store', label: 'Store', path: '/store', icon: faStore },
];

const Navigation = () => {
  // State to track which button is being hovered
  const [hoveredButton, setHoveredButton] = useState(null);
  
  return (
    <nav className="navigation gothic-frame">
      <div className="nav-title">
        <h2 className="glitch-text" data-text="SCP COMMAND">SCP COMMAND</h2>
      </div>
      
      <div className="nav-buttons">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => 
              `nav-button ${isActive ? 'active' : ''} ${hoveredButton === item.id ? 'hovered' : ''}`
            }
            onMouseEnter={() => setHoveredButton(item.id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="button-content">
              <FontAwesomeIcon icon={item.icon} className="button-icon" />
              <span className="button-label">{item.label}</span>
            </div>
            
            {/* Gothic decorations for the buttons */}
            <div className="button-decoration left-decoration"></div>
            <div className="button-decoration right-decoration"></div>
            
            {/* Glow effect on hover */}
            <div className="button-glow"></div>
          </NavLink>
        ))}
      </div>
      
      <div className="nav-footer">
        <span>Secure. Contain. Protect.</span>
      </div>
    </nav>
  );
};

export default Navigation; 