import React, { useState, useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import ResearchCategoryTabs from './ResearchCategoryTabs';
import ResearchNodeGrid from './ResearchNodeGrid';
import CurrentResearchPanel from './CurrentResearchPanel';
import NodeDetailPanel from './NodeDetailPanel';
import './ResearchStyles.css';

// Research node data structure
const researchNodes = {
  // Containment Tech
  containment: [
    {
      id: 'CT-01',
      name: 'Containment Protocol I',
      effect: '+1 containment slot',
      description: 'Expands facility to accommodate an additional anomalous entity in containment.',
      cost: { gold: 150, research: 100 },
      timeRequired: 10 * 60 * 1000, // 10 minutes in ms
      unlocks: [], // Default node, no prerequisites
      position: { x: 0, y: 0 } // For node positioning in grid
    },
    {
      id: 'CT-02',
      name: 'Containment Efficiency I',
      effect: '+10% containment output',
      description: 'Optimizes energy distribution and monitoring protocols, increasing resource generation.',
      cost: { gold: 200, research: 150 },
      timeRequired: 30 * 60 * 1000, // 30 minutes in ms
      unlocks: ['CT-01'], // Requires CT-01
      position: { x: 1, y: 0 }
    },
    {
      id: 'CT-03',
      name: 'Containment Protocol II',
      effect: '+1 containment slot',
      description: 'Further expands facility capacity through spatial reconfiguration techniques.',
      cost: { gold: 300, research: 200 },
      timeRequired: 60 * 60 * 1000, // 1 hour in ms
      unlocks: ['CT-02'], // Requires CT-02
      position: { x: 2, y: 0 }
    },
    {
      id: 'CT-04',
      name: 'Recovery Node',
      effect: 'Enable auto-recall toggle',
      description: 'Implements automated recall protocols for entities approaching critical instability.',
      cost: { gold: 500, research: 300 },
      timeRequired: 3 * 60 * 60 * 1000, // 3 hours in ms
      unlocks: ['CT-03'], // Requires CT-03
      position: { x: 3, y: 0 }
    },
    // Containment Tech II (Phase II)
    {
      id: 'CT-05',
      name: 'Adaptive Containment Cells',
      effect: 'Enables support for high-risk anomaly types',
      description: 'Advanced chamber design adaptively reconfigures to support future high-risk entity classes.',
      cost: { gold: 600, research: 400 },
      timeRequired: 3 * 60 * 60 * 1000, // 3 hours in ms
      unlocks: ['CT-04'], // Requires CT-04
      position: { x: 4, y: 0 }
    },
    {
      id: 'CT-06',
      name: 'Multi-Type Containment Grid',
      effect: 'Slots accept either entity or equipment',
      description: 'Revolutionary containment grid technology allows a single chamber to house either entity or equipment anomalies.',
      cost: { gold: 750, research: 500 },
      timeRequired: 4 * 60 * 60 * 1000, // 4 hours in ms
      unlocks: ['CT-05'], // Requires CT-05
      position: { x: 5, y: 0 }
    },
    {
      id: 'CT-07',
      name: 'Emergency Protocols',
      effect: '5-min auto-recovery after breach',
      description: 'Intelligent containment system automatically recovers functionality after entity breaches, reducing downtime.',
      cost: { gold: 1000, research: 600 },
      timeRequired: 5 * 60 * 60 * 1000, // 5 hours in ms
      unlocks: ['CT-06'], // Requires CT-06
      position: { x: 6, y: 0 }
    }
  ],
  
  // Fusion Science
  fusion: [
    {
      id: 'FS-01',
      name: 'Fusion Stability I',
      effect: '+1 daily fusion use',
      description: 'Enhances quantum stabilizers, allowing for additional daily fusion operations.',
      cost: { gold: 200, research: 150 },
      timeRequired: 20 * 60 * 1000, // 20 minutes in ms
      unlocks: [], // Default node
      position: { x: 0, y: 0 }
    },
    {
      id: 'FS-02',
      name: 'Catalyst Optimization',
      effect: '+5% catalyst effectiveness',
      description: 'Improves catalyst binding algorithms, increasing the effectiveness of all catalysts.',
      cost: { gold: 300, research: 200 },
      timeRequired: 45 * 60 * 1000, // 45 minutes in ms
      unlocks: ['FS-01'], // Requires FS-01
      position: { x: 1, y: 0 }
    },
    {
      id: 'FS-03',
      name: 'Result Refinement',
      effect: 'Min rarity = Uncommon',
      description: 'Establishes minimum quality threshold for fusion results, eliminating low-value outcomes.',
      cost: { gold: 400, research: 300 },
      timeRequired: 2 * 60 * 60 * 1000, // 2 hours in ms
      unlocks: ['FS-02'], // Requires FS-02
      position: { x: 2, y: 0 }
    },
    // Fusion Lab II (Phase II)
    {
      id: 'FS-04',
      name: 'Fusion Slot Expansion',
      effect: 'Allows 3 entities in fusion instead of 2',
      description: 'Breakthrough in containment field geometry allows three entities to participate in fusion simultaneously.',
      cost: { gold: 800, research: 500 },
      timeRequired: 3 * 60 * 60 * 1000, // 3 hours in ms
      unlocks: ['FS-03'], // Requires FS-03
      position: { x: 3, y: 0 }
    },
    {
      id: 'FS-05',
      name: 'Core Memory Retention',
      effect: 'Fusion inherits 1 random parent skill',
      description: 'Advanced quantum entanglement techniques allow fusion results to inherit traits from parent entities.',
      cost: { gold: 1000, research: 700 },
      timeRequired: 5 * 60 * 60 * 1000, // 5 hours in ms
      unlocks: ['FS-04'], // Requires FS-04
      position: { x: 4, y: 0 }
    },
    {
      id: 'FS-06',
      name: 'Catalytic Triggering',
      effect: 'Catalyst bonus +15% effectiveness',
      description: 'Revolutionary catalyst activation protocol dramatically increases fusion catalyst efficiency.',
      cost: { gold: 1200, research: 800 },
      timeRequired: 6 * 60 * 60 * 1000, // 6 hours in ms
      unlocks: ['FS-05'], // Requires FS-05
      position: { x: 5, y: 0 }
    }
  ],
  
  // Resource Management
  resources: [
    {
      id: 'RM-01',
      name: 'Storage Expansion I',
      effect: '+10 inventory slots',
      description: 'Expands secure storage capacity through dimensional compression techniques.',
      cost: { gold: 150, research: 100 },
      timeRequired: 15 * 60 * 1000, // 15 minutes in ms
      unlocks: [], // Default node
      position: { x: 0, y: 0 }
    },
    {
      id: 'RM-02',
      name: 'Energy Rebalancing',
      effect: '+10% passive energy gain',
      description: 'Optimizes energy harvesting from anomalous interactions, increasing passive generation.',
      cost: { gold: 250, research: 180 },
      timeRequired: 45 * 60 * 1000, // 45 minutes in ms
      unlocks: ['RM-01'], // Requires RM-01
      position: { x: 1, y: 0 }
    },
    {
      id: 'RM-03',
      name: 'Auto-Collect Alpha',
      effect: 'Unlock auto-collect toggle',
      description: 'Implements autonomous collection systems for passive resource accumulation.',
      cost: { gold: 500, research: 350 },
      timeRequired: 2 * 60 * 60 * 1000, // 2 hours in ms
      unlocks: ['RM-02'], // Requires RM-02
      position: { x: 2, y: 0 }
    },
    // Resource Control (Phase II)
    {
      id: 'RM-04',
      name: 'Passive Resource Overclock',
      effect: 'Resource generation rate +10% (all types)',
      description: 'Optimized resource extraction algorithms increase all passive resource generation systems.',
      cost: { gold: 600, research: 400 },
      timeRequired: 2 * 60 * 60 * 1000, // 2 hours in ms
      unlocks: ['RM-03'], // Requires RM-03
      position: { x: 3, y: 0 }
    },
    {
      id: 'RM-05',
      name: 'Overcap Auto-Sell',
      effect: 'Excess inventory auto-sold for gold (max 200/hr)',
      description: 'Automated systems identify and liquidate excess inventory items, converting them to gold.',
      cost: { gold: 900, research: 500 },
      timeRequired: 4 * 60 * 60 * 1000, // 4 hours in ms
      unlocks: ['RM-04'], // Requires RM-04
      position: { x: 4, y: 0 }
    },
    {
      id: 'RM-06',
      name: 'Bio-Extract Reprocessor',
      effect: 'Entities in storage generate 0.1 XP/sec',
      description: 'Passive scanning systems extract knowledge from contained entities, generating research XP over time.',
      cost: { gold: 1200, research: 600 },
      timeRequired: 5 * 60 * 60 * 1000, // 5 hours in ms
      unlocks: ['RM-05'], // Requires RM-05
      position: { x: 5, y: 0 }
    }
  ],
  
  // Store Optimization
  store: [
    {
      id: 'ST-01',
      name: 'Store Tier I',
      effect: 'Unlock Material-class items',
      description: 'Authorizes procurement of specialized material-class anomalous components.',
      cost: { gold: 150, research: 150 },
      timeRequired: 20 * 60 * 1000, // 20 minutes in ms
      unlocks: [], // Default node
      position: { x: 0, y: 0 }
    },
    {
      id: 'ST-02',
      name: 'Stock Refresh+',
      effect: 'Add 1 extra slot per refresh',
      description: 'Expands procurement network, allowing for additional items in each store category.',
      cost: { gold: 250, research: 200 },
      timeRequired: 60 * 60 * 1000, // 1 hour in ms
      unlocks: ['ST-01'], // Requires ST-01
      position: { x: 1, y: 0 }
    },
    {
      id: 'ST-03',
      name: 'Store Discount Token',
      effect: 'Unlock price-reduction tokens',
      description: 'Develops influence tokens that temporarily reduce procurement costs.',
      cost: { gold: 400, research: 300 },
      timeRequired: 3 * 60 * 60 * 1000, // 3 hours in ms
      unlocks: ['ST-02'], // Requires ST-02
      position: { x: 2, y: 0 }
    }
  ],
  
  // Exploration Unlocks (New Phase II Branch)
  exploration: [
    {
      id: 'EX-01',
      name: 'Expedition Alpha Protocol',
      effect: 'Unlocks new module: Expeditions',
      description: 'Establish protocols for field teams to explore and recover anomalous materials from remote locations.',
      cost: { gold: 800, research: 600 },
      timeRequired: 3 * 60 * 60 * 1000, // 3 hours in ms
      unlocks: [], // Default node for this branch
      position: { x: 0, y: 0 }
    },
    {
      id: 'EX-02',
      name: 'Map Unlock: Sector-6',
      effect: 'Unlocks the first map: Sector-6 Ruins',
      description: 'Declassifies map data for Sector-6, an abandoned research complex with valuable anomalous artifacts.',
      cost: { gold: 1000, research: 700 },
      timeRequired: 4 * 60 * 60 * 1000, // 4 hours in ms
      unlocks: ['EX-01'], // Requires EX-01
      position: { x: 1, y: 0 }
    },
    {
      id: 'EX-03',
      name: 'Hazard Compensation Bonus',
      effect: 'Expeditions yield +20% materials',
      description: 'Improved expedition protocols and equipment allow teams to recover more materials from dangerous environments.',
      cost: { gold: 1200, research: 800 },
      timeRequired: 6 * 60 * 60 * 1000, // 6 hours in ms
      unlocks: ['EX-02'], // Requires EX-02
      position: { x: 2, y: 0 }
    }
  ]
};

const ResearchModule = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('containment');
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Get data from game store
  const { 
    resources, 
    currentResearch,
    research: researchProgress,
    startResearch,
    cancelResearch,
    checkResearchCompletion
  } = useGameStore();

  // Check for research completion on an interval
  useEffect(() => {
    const checkInterval = setInterval(() => {
      checkResearchCompletion();
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(checkInterval);
  }, [checkResearchCompletion]);

  // Handle changing the active category
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedNode(null); // Clear selected node when changing categories
  };

  // Handle selecting a node
  const handleNodeSelect = (nodeId) => {
    // Find the node from the current category
    const node = researchNodes[activeCategory].find(n => n.id === nodeId);
    setSelectedNode(node);
  };

  // Handle starting research on a node
  const handleStartResearch = () => {
    if (selectedNode) {
      startResearch(selectedNode.id, selectedNode.cost, selectedNode.timeRequired);
    }
  };

  // Handle canceling active research
  const handleCancelResearch = () => {
    if (currentResearch && currentResearch.nodeId) {
      cancelResearch();
    }
  };

  // Check if a node is available for research
  const isNodeAvailable = (nodeId) => {
    const node = researchNodes[activeCategory].find(n => n.id === nodeId);
    
    // If node is already completed, it's not available
    if (researchProgress && researchProgress[nodeId]) {
      return false;
    }
    
    // If node has no prerequisites, it's available
    if (!node.unlocks || node.unlocks.length === 0) {
      return true;
    }
    
    // Check if all prerequisites are completed
    return node.unlocks.every(prerequisiteId => 
      researchProgress && researchProgress[prerequisiteId]);
  };

  // Check if player has enough resources for a node
  const hasEnoughResources = (nodeCost) => {
    return (
      resources.gold >= nodeCost.gold &&
      resources.research >= nodeCost.research
    );
  };

  return (
    <div className="research-module">
      <div className="research-container">
        {/* Left panel - Research Tree */}
        <div className="research-tree-panel">
          <ResearchCategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          <ResearchNodeGrid 
            nodes={researchNodes[activeCategory]} 
            progress={researchProgress}
            activeResearch={currentResearch?.nodeId}
            onNodeSelect={handleNodeSelect} 
            isNodeAvailable={isNodeAvailable}
          />
        </div>
        
        {/* Right panel - Info and Status */}
        <div className="research-info-panel">
          <CurrentResearchPanel 
            currentResearch={currentResearch} 
            onCancel={handleCancelResearch} 
          />
          <NodeDetailPanel 
            node={selectedNode} 
            isAvailable={selectedNode ? isNodeAvailable(selectedNode.id) : false}
            hasResources={selectedNode ? hasEnoughResources(selectedNode.cost) : false}
            isActive={currentResearch?.nodeId === selectedNode?.id}
            isCompleted={selectedNode ? researchProgress?.[selectedNode.id] : false}
            onStartResearch={handleStartResearch} 
          />
        </div>
      </div>
    </div>
  );
};

export default ResearchModule; 