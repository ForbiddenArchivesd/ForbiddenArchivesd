import React from 'react';
import './BattleStyles.css';

const EnemyPreview = ({ enemies }) => {
  return (
    <div className="enemy-preview-panel">
      <div className="enemy-preview-header">
        <h2>Enemy Preview</h2>
      </div>
      
      <div className="enemy-list">
        {enemies.map(enemy => (
          <div key={enemy.id} className="enemy-item">
            <div className="enemy-header">
              <div className="enemy-name">{enemy.name}</div>
              <div className={`enemy-rarity ${enemy.rarity.toLowerCase()}`}>
                {enemy.rarity}
              </div>
            </div>
            
            <div className="enemy-stats">
              <div className="stat-row">
                <div className="stat-label">ATK:</div>
                <div className="stat-value">{enemy.attack}</div>
              </div>
              <div className="stat-row">
                <div className="stat-label">DEF:</div>
                <div className="stat-value">{enemy.defense}</div>
              </div>
              <div className="stat-row">
                <div className="stat-label">HP:</div>
                <div className="stat-value">{enemy.defense * 10}</div>
              </div>
            </div>
            
            <div className="enemy-skills">
              <div className="skills-label">Skills:</div>
              <div className="skills-list">
                {enemy.skills.map((skill, index) => (
                  <div key={index} className="skill-item">{skill}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnemyPreview; 