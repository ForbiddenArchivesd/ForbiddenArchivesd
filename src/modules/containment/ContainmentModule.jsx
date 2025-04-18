// ContainmentModule - Main component for SCP containment facility
import React, { useState } from 'react';
import ContainmentSlot from './ContainmentSlot';
import EntitySelectorModal from './EntitySelectorModal';
import QuickCollectBar from './QuickCollectBar';
import useGameStore from '../../store/gameStore';
import './ContainmentStyles.css';

const ContainmentModule = () => {
  // Get data and actions from game store
  const { 
    containment, 
    deployEntity 
  } = useGameStore();
  
  // State for entity selector modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  
  // Handle clicking the deploy button on a slot
  const handleDeployClick = (slotId) => {
    setSelectedSlotId(slotId);
    setModalOpen(true);
  };
  
  // Handle selecting an entity in the modal
  const handleEntitySelect = (slotId, entityId) => {
    deployEntity(slotId, entityId);
    setModalOpen(false);
  };
  
  // Handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  // Check if all slots are filled
  const allSlotsFilled = containment.slots.every(slot => slot.entityId !== null);
  
  return (
    <div className="containment-module">
      <div className="module-header gothic-frame">
        <h1>Containment Chamber</h1>
        <p>Assign anomalous entities to containment slots to generate resources over time.</p>
      </div>
      
      <div className="containment-slots-wrapper">
        <div className="containment-slots">
          {containment.slots.map(slot => (
            <ContainmentSlot 
              key={slot.id} 
              slotId={slot.id} 
              onDeploy={handleDeployClick} 
            />
          ))}
        </div>
        
        {allSlotsFilled && (
          <div className="full-capacity-warning">
            <p>Containment chambers fully occupied.</p>
          </div>
        )}
      </div>
      
      <QuickCollectBar />
      
      <div className="containment-log gothic-frame">
        <h3>Facility Log</h3>
        <div className="log-entries">
          <div className="log-entry">
            <span className="log-time">Now</span>
            <span className="log-message">System ready for entity deployment.</span>
          </div>
          <div className="log-entry">
            <span className="log-time">3 min ago</span>
            <span className="log-message">Daily containment protocols verified.</span>
          </div>
          <div className="log-entry">
            <span className="log-time">15 min ago</span>
            <span className="log-message">Chamber decontamination complete.</span>
          </div>
        </div>
      </div>
      
      {/* Entity selector modal */}
      {modalOpen && (
        <EntitySelectorModal 
          onClose={handleCloseModal}
          onEntitySelect={handleEntitySelect}
          slotId={selectedSlotId}
        />
      )}
    </div>
  );
};

export default ContainmentModule; 