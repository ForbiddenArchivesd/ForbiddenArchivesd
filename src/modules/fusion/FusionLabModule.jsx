// Main FusionLabModule component for entity fusion
import React, { useState, useEffect } from 'react';
import FusionSlot from './FusionSlot';
import CatalystSelector from './CatalystSelector';
import ResultPreviewBox from './ResultPreviewBox';
import FusionButton from './FusionButton';
import FusionLog from './FusionLog';
import EntitySelectorModal from './EntitySelectorModal';
import CatalystSelectorModal from './CatalystSelectorModal';
import useGameStore from '../../store/gameStore';
import './FusionStyles.css';

const FusionLabModule = () => {
  // Get game state and actions
  const { checkFusionDailyReset } = useGameStore();
  
  // Component state
  const [entityA, setEntityA] = useState(null);
  const [entityB, setEntityB] = useState(null);
  const [catalyst, setCatalyst] = useState(null);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [catalystSelectorOpen, setCatalystSelectorOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  
  // Check if daily fusion limit has reset
  useEffect(() => {
    checkFusionDailyReset();
  }, [checkFusionDailyReset]);
  
  // Handle opening entity selector for a slot
  const handleOpenSelector = (slotId) => {
    setCurrentSlot(slotId);
    setSelectorOpen(true);
  };
  
  // Handle opening catalyst selector
  const handleOpenCatalystSelector = () => {
    setCatalystSelectorOpen(true);
  };
  
  // Handle entity selection
  const handleEntitySelect = (slotId, entityId) => {
    if (slotId === 'A') {
      setEntityA(entityId);
    } else if (slotId === 'B') {
      setEntityB(entityId);
    }
  };
  
  // Handle catalyst selection
  const handleCatalystSelect = (catalystId) => {
    setCatalyst(catalystId);
  };
  
  // Handle successful fusion
  const handleFusionComplete = () => {
    // Reset selected entities and catalyst
    setEntityA(null);
    setEntityB(null);
    setCatalyst(null);
  };
  
  // Get excluded entity IDs (entities already selected in other slots)
  const getExcludedEntityIds = () => {
    const excluded = [];
    if (entityA) excluded.push(entityA);
    if (entityB) excluded.push(entityB);
    return excluded;
  };
  
  return (
    <div className="fusion-lab-module">
      <div className="module-header gothic-frame">
        <h1>SCP-Ω Fusion Terminal</h1>
        <p>Combine anomalous entities to create new, potentially stronger subjects.</p>
      </div>
      
      <div className="fusion-input-area">
        <FusionSlot 
          slotId="A" 
          entityId={entityA} 
          onSelectEntity={handleOpenSelector} 
        />
        
        <div className="fusion-plus">+</div>
        
        <FusionSlot 
          slotId="B" 
          entityId={entityB} 
          onSelectEntity={handleOpenSelector} 
        />
      </div>
      
      <div className="catalyst-area">
        <CatalystSelector 
          catalystId={catalyst} 
          onSelectCatalyst={handleOpenCatalystSelector} 
        />
      </div>
      
      <div className="result-area">
        <ResultPreviewBox 
          entityIdA={entityA} 
          entityIdB={entityB} 
          catalystId={catalyst} 
        />
      </div>
      
      <div className="action-area">
        <FusionButton 
          entityIdA={entityA} 
          entityIdB={entityB} 
          catalystId={catalyst} 
          onFusionComplete={handleFusionComplete} 
        />
      </div>
      
      <div className="log-area">
        <FusionLog />
      </div>
      
      {/* Entity selector modal */}
      {selectorOpen && (
        <EntitySelectorModal 
          onClose={() => setSelectorOpen(false)} 
          onSelectEntity={handleEntitySelect} 
          excludeEntityIds={getExcludedEntityIds()} 
          slotId={currentSlot} 
        />
      )}
      
      {/* Catalyst selector modal */}
      {catalystSelectorOpen && (
        <CatalystSelectorModal 
          onClose={() => setCatalystSelectorOpen(false)} 
          onSelectCatalyst={handleCatalystSelect} 
        />
      )}
    </div>
  );
};

export default FusionLabModule; 