import React, { useRef, useEffect } from 'react';
import './ResearchStyles.css';

// Icons for different research categories
const getNodeIcon = (nodeId) => {
  const category = nodeId.split('-')[0];
  
  switch (category) {
    case 'CT':
      return '🔒'; // Containment
    case 'FS':
      return '⚗️'; // Fusion
    case 'RM':
      return '📦'; // Resources
    case 'ST':
      return '🛒'; // Store
    default:
      return '🔬'; // Default
  }
};

const ResearchNodeGrid = ({ 
  nodes, 
  progress, 
  activeResearch, 
  onNodeSelect,
  isNodeAvailable 
}) => {
  const svgRef = useRef(null);
  
  // Draw connections between nodes
  useEffect(() => {
    if (!svgRef.current || !nodes || nodes.length <= 1) return;
    
    const svg = svgRef.current;
    
    // Clear existing lines
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Draw connections
    nodes.forEach(node => {
      // Skip nodes with no prerequisites
      if (!node.unlocks || node.unlocks.length === 0) return;
      
      // Find prerequisite nodes and draw lines
      node.unlocks.forEach(prereqId => {
        const prereqNode = nodes.find(n => n.id === prereqId);
        if (!prereqNode) return;
        
        // Calculate line coordinates
        const startX = (prereqNode.position.x * 130) + 50;
        const startY = (prereqNode.position.y * 130) + 50;
        const endX = (node.position.x * 130) + 50;
        const endY = (node.position.y * 130) + 50;
        
        // Create line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        
        // Set line class based on progress
        if (progress && progress[prereqId] && progress[node.id]) {
          line.setAttribute('class', 'connection-line completed');
        } else if (progress && progress[prereqId] && activeResearch === node.id) {
          line.setAttribute('class', 'connection-line active');
        } else {
          line.setAttribute('class', 'connection-line');
        }
        
        svg.appendChild(line);
      });
    });
  }, [nodes, progress, activeResearch]);
  
  // Get node status class
  const getNodeStatusClass = (node) => {
    if (progress && progress[node.id]) {
      return 'completed';
    }
    
    if (activeResearch === node.id) {
      return 'active';
    }
    
    if (isNodeAvailable(node.id)) {
      return 'available';
    }
    
    return 'locked';
  };
  
  return (
    <div className="node-grid">
      {/* SVG layer for connections */}
      <svg ref={svgRef} className="node-connections" />
      
      {/* Render nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className={`research-node ${getNodeStatusClass(node)}`}
          style={{
            gridColumn: node.position.x + 1,
            gridRow: node.position.y + 1
          }}
          onClick={() => onNodeSelect(node.id)}
          title={node.name}
        >
          <div className="node-icon">
            {getNodeIcon(node.id)}
          </div>
          <div className="node-name">
            {node.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResearchNodeGrid; 