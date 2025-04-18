import React, { useState, useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import StageSelection from './StageSelection';
import EntityDeployment from './EntityDeployment';
import EnemyPreview from './EnemyPreview';
import BattleResult from './BattleResult';
import { battleStages, generateDailyChallenge } from './BattleData';
import { itemDetails, getRarityPool, generateUniqueId } from './dropTable';
import './BattleStyles.css';

const BattleModule = () => {
  // State management
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [battleState, setBattleState] = useState('selection'); // selection, battle, result
  const [battleResult, setBattleResult] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [dailyChallengeStage, setDailyChallengeStage] = useState(null);
  
  // Game store hooks
  const {
    storage,
    battle: battleProgress,
    updateBattleAttempts,
    addStorageItem,
    updateGold,
    gainEntityXP,
    addStatusUpdate,
    initializeBattleState,
    checkBattleDailyReset,
    completeBattle: completeBattleInStore // Rename to avoid confusion
  } = useGameStore();

  // Initialize daily challenge
  useEffect(() => {
    // Check and reset battle attempts daily
    checkBattleDailyReset();
    
    // Generate today's daily challenge
    const todayChallenge = generateDailyChallenge();
    setDailyChallengeStage(todayChallenge);
    
    // Initialize battle state if needed
    if (!battleProgress) {
      initializeBattleState();
    }
  }, [checkBattleDailyReset, initializeBattleState, battleProgress]);
  
  // Reset local component state when game is reset
  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = useGameStore.subscribe(
      (state) => state.battle,
      (battle, previousBattle) => {
        // If battle was reset (attempts changed from non-zero to zero)
        if (previousBattle && 
            previousBattle.dailyAttemptsUsed > 0 && 
            battle && 
            battle.dailyAttemptsUsed === 0) {
          // Reset component state
          setSelectedStage(null);
          setSelectedEntities([]);
          setBattleState('selection');
          setBattleResult(null);
          setBattleLog([]);
          
          // Regenerate daily challenge
          const todayChallenge = generateDailyChallenge();
          setDailyChallengeStage(todayChallenge);
        }
      }
    );
    
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Handle stage selection
  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
    setSelectedEntities([]);
    setBattleState('selection');
  };

  // Handle entity selection for battle
  const handleEntitySelect = (entity) => {
    // Check if entity is already selected
    if (selectedEntities.find(e => e.id === entity.id)) {
      // Remove from selection
      setSelectedEntities(selectedEntities.filter(e => e.id !== entity.id));
    } else {
      // Add to selection (max 3)
      if (selectedEntities.length < 3) {
        setSelectedEntities([...selectedEntities, entity]);
      }
    }
  };

  // Check if entity is available (not in containment, etc.)
  const isEntityAvailable = (entityId) => {
    // Check containment
    const isDeployed = useGameStore.getState().isEntityDeployed(entityId);
    return !isDeployed;
  };

  // Start battle simulation
  const startBattle = () => {
    // Validate battle can start
    if (!selectedStage || selectedEntities.length === 0) {
      return;
    }
    
    // Check if daily attempts are exhausted
    if (battleProgress.dailyAttemptsUsed >= battleProgress.dailyAttemptsLimit) {
      addStatusUpdate({
        id: `battle-limit-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
        type: 'battle',
        title: 'Battle Limit Reached',
        description: 'You have used all your daily battle attempts. Try again tomorrow.',
        time: 'Just now'
      });
      return;
    }
    
    // Start battle
    setBattleState('battle');
    
    // Simulate battle (with small delay for effect)
    setTimeout(() => {
      const result = simulateBattle(selectedEntities, selectedStage.enemies);
      setBattleResult(result);
      setBattleLog(result.battleLog);
      setBattleState('result');
      
      // Update battle attempts
      updateBattleAttempts();
      
      // Create battle state for store
      const battleState = {
        id: `battle-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
        startTime: Date.now() - 1500, // Account for animation time
        playerEntities: selectedEntities,
        enemyEntities: selectedStage.enemies,
        stageName: selectedStage.name,
        difficulty: selectedStage.difficulty,
        active: true
      };
      
      // Generate rewards if victory
      if (result.victory) {
        // Pass the enemies to generateRewards
        const rewards = generateRewards(selectedStage, selectedStage.enemies);
        
        // Add rewards to storage
        rewards.items.forEach(item => {
          addStorageItem(item);
        });
        
        // Add gold
        if (rewards.gold > 0) {
          updateGold(rewards.gold);
        }
        
        // Add XP to entities
        selectedEntities.forEach(entity => {
          gainEntityXP(entity.id, result.xpGained);
        });
        
        // Update result with rewards
        setBattleResult({
          ...result,
          rewards
        });
        
        // Complete battle in store
        completeBattleInStore(battleState, 'victory', rewards);
        
        // Add status update
        addStatusUpdate({
          id: `battle-win-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'battle',
          title: 'Battle Victory',
          description: `Won battle against ${selectedStage.name}. Earned ${rewards.gold} gold${rewards.items.length > 0 ? ' and items' : ''}.`,
          time: 'Just now'
        });
      } else {
        // Complete battle in store as defeat
        completeBattleInStore(battleState, 'defeat', null);
        
        // Add status update for defeat
        addStatusUpdate({
          id: `battle-loss-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'battle',
          title: 'Battle Defeat',
          description: `Lost battle against ${selectedStage.name}.`,
          time: 'Just now'
        });
      }
    }, 1500);
  };

  // Simulate battle between player entities and enemies
  const simulateBattle = (playerEntities, enemies) => {
    // Initialize battle log
    const battleLog = [];
    
    // Clone entities and enemies to avoid modifying originals
    const playerTeam = playerEntities.map(entity => ({
      ...entity,
      currentHealth: entity.defense * 10, // Health = defense * 10
      isAlive: true
    }));
    
    const enemyTeam = enemies.map(enemy => ({
      ...enemy,
      currentHealth: enemy.defense * 10,
      isAlive: true
    }));
    
    // Log battle start
    battleLog.push(`Battle initiated: ${playerTeam.length} entities vs ${enemyTeam.length} enemies`);
    
    // Track turn count
    let turn = 1;
    const maxTurns = 20; // Prevent infinite battles
    
    // Battle continues until one team is defeated or maxTurns reached
    while (
      playerTeam.some(entity => entity.isAlive) && 
      enemyTeam.some(enemy => enemy.isAlive) && 
      turn <= maxTurns
    ) {
      battleLog.push(`Turn ${turn}`);
      
      // Player entities attack
      for (const entity of playerTeam) {
        if (!entity.isAlive) continue;
        
        // Find first alive enemy
        const target = enemyTeam.find(enemy => enemy.isAlive);
        if (!target) break;
        
        // Calculate damage
        const damage = Math.floor(entity.attack * (0.8 + Math.random() * 0.4));
        target.currentHealth -= damage;
        
        // Log attack
        battleLog.push(`${entity.name} attacks ${target.name} for ${damage} damage`);
        
        // Check if enemy defeated
        if (target.currentHealth <= 0) {
          target.isAlive = false;
          target.currentHealth = 0;
          battleLog.push(`${target.name} was defeated!`);
        }
        
        // Use skills (simplified)
        if (entity.skills && entity.skills.length > 0) {
          const skill = entity.skills[0];
          battleLog.push(`${entity.name} uses ${skill}!`);
          
          // Skill effects (simplified)
          if (skill.includes('Resonance') || skill.includes('Disruption')) {
            // Damage all enemies
            const skillDamage = Math.floor(entity.attack * 0.3);
            
            for (const enemy of enemyTeam) {
              if (enemy.isAlive) {
                enemy.currentHealth -= skillDamage;
                battleLog.push(`${skill} deals ${skillDamage} damage to ${enemy.name}`);
                
                if (enemy.currentHealth <= 0) {
                  enemy.isAlive = false;
                  enemy.currentHealth = 0;
                  battleLog.push(`${enemy.name} was defeated!`);
                }
              }
            }
          }
        }
      }
      
      // Check if all enemies defeated
      if (!enemyTeam.some(enemy => enemy.isAlive)) {
        battleLog.push('All enemies defeated!');
        break;
      }
      
      // Enemies attack
      for (const enemy of enemyTeam) {
        if (!enemy.isAlive) continue;
        
        // Find first alive player entity
        const target = playerTeam.find(entity => entity.isAlive);
        if (!target) break;
        
        // Calculate damage
        const damage = Math.floor(enemy.attack * (0.8 + Math.random() * 0.4));
        target.currentHealth -= damage;
        
        // Log attack
        battleLog.push(`${enemy.name} attacks ${target.name} for ${damage} damage`);
        
        // Check if player entity defeated
        if (target.currentHealth <= 0) {
          target.isAlive = false;
          target.currentHealth = 0;
          battleLog.push(`${target.name} was defeated!`);
        }
        
        // Enemy skills (simplified)
        if (enemy.skills && enemy.skills.length > 0) {
          const skill = enemy.skills[0];
          battleLog.push(`${enemy.name} uses ${skill}!`);
          
          // Skill effects (simplified)
          if (skill.includes('Shock') || skill.includes('Wave')) {
            // Damage all player entities
            const skillDamage = Math.floor(enemy.attack * 0.3);
            
            for (const entity of playerTeam) {
              if (entity.isAlive) {
                entity.currentHealth -= skillDamage;
                battleLog.push(`${skill} deals ${skillDamage} damage to ${entity.name}`);
                
                if (entity.currentHealth <= 0) {
                  entity.isAlive = false;
                  entity.currentHealth = 0;
                  battleLog.push(`${entity.name} was defeated!`);
                }
              }
            }
          }
        }
      }
      
      // Check if all player entities defeated
      if (!playerTeam.some(entity => entity.isAlive)) {
        battleLog.push('All entities defeated!');
        break;
      }
      
      // Next turn
      turn++;
    }
    
    // Determine result
    const victory = playerTeam.some(entity => entity.isAlive);
    const xpGained = victory ? 12 : 3; // More XP for victory
    
    // Log result
    battleLog.push(victory ? 'Victory!' : 'Defeat!');
    
    return {
      victory,
      battleLog,
      xpGained,
      turn,
      finalState: {
        playerTeam,
        enemyTeam
      }
    };
  };

  // Generate rewards for winning battle
  const generateRewards = (stage, enemies) => {
    const rewards = {
      gold: 0,
      items: []
    };

    // Count enemies by rarity
    const enemyCounts = {
      'Common': 0,
      'Uncommon': 0,
      'Rare': 0,
      'Epic': 0
    };

    // Count each enemy type
    enemies.forEach(enemy => {
      if (enemyCounts[enemy.rarity] !== undefined) {
        enemyCounts[enemy.rarity]++;
      }
    });

    // Process drops for each rarity tier that has enemies
    Object.keys(enemyCounts).forEach(rarity => {
      if (enemyCounts[rarity] > 0) {
        const pool = getRarityPool(rarity);
        
        // Roll for each potential drop
        pool.forEach(drop => {
          // Scale chance by the number of enemies of this rarity
          // More enemies = higher chance, but don't exceed 100%
          const scaledChance = Math.min(drop.chance * enemyCounts[rarity], 1.0);
          
          // Roll for the drop
          if (Math.random() < scaledChance) {
            switch (drop.type) {
              case 'gold': {
                // Gold amount from min-max range
                const goldAmount = Math.floor(drop.min + Math.random() * (drop.max - drop.min));
                rewards.gold += goldAmount;
                break;
              }
                
              case 'equipment':
              case 'items':
              case 'materials': {
                // Check if we already have 2 items (max limit)
                if (rewards.items.length < 2) {
                  // Get the item details
                  const item = { ...itemDetails[drop.id] };
                  
                  // Generate a unique ID for this drop
                  item.id = generateUniqueId(item.id);
                  
                  // Add to rewards
                  rewards.items.push(item);
                }
                break;
              }
                
              default:
                break;
            }
          }
        });
      }
    });

    // Ensure minimum gold reward based on difficulty
    const minGoldByDifficulty = {
      1: 50,
      2: 100,
      3: 150,
      4: 200
    };
    
    if (rewards.gold < minGoldByDifficulty[stage.difficulty]) {
      rewards.gold = minGoldByDifficulty[stage.difficulty];
    }

    return rewards;
  };

  // Reset to stage selection
  const returnToSelection = () => {
    setBattleState('selection');
    setSelectedEntities([]);
    setBattleResult(null);
    setBattleLog([]);
  };

  return (
    <div className="battle-module">
      {battleState === 'selection' && (
        <div className="battle-selection-container">
          <div className="battle-left-panel">
            <StageSelection
              stages={[...battleStages, dailyChallengeStage]}
              onSelectStage={handleStageSelect}
              selectedStage={selectedStage}
              attemptsRemaining={battleProgress ? battleProgress.dailyAttemptsLimit - battleProgress.dailyAttemptsUsed : 0}
            />
            
            {selectedStage && (
              <EnemyPreview enemies={selectedStage.enemies} />
            )}
          </div>
          
          <div className="battle-right-panel">
            <EntityDeployment
              entities={storage.entities}
              selectedEntities={selectedEntities}
              onEntitySelect={handleEntitySelect}
              isEntityAvailable={isEntityAvailable}
              maxSelections={3}
            />
            
            <div className="battle-actions">
              <button 
                className="battle-btn start-battle-btn" 
                onClick={startBattle}
                disabled={!selectedStage || selectedEntities.length === 0 || 
                  (battleProgress && battleProgress.dailyAttemptsUsed >= battleProgress.dailyAttemptsLimit)}
              >
                Start Battle
              </button>
              <button 
                className="battle-btn cancel-btn" 
                onClick={returnToSelection}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {battleState === 'battle' && (
        <div className="battle-simulation">
          <div className="battle-loading">
            <div className="loader"></div>
            <h2>Battle in Progress...</h2>
          </div>
        </div>
      )}
      
      {battleState === 'result' && battleResult && (
        <BattleResult
          result={battleResult}
          battleLog={battleLog}
          onReturn={returnToSelection}
          onRetry={() => {
            setSelectedEntities([]);
            setBattleState('selection');
          }}
        />
      )}
    </div>
  );
};

export default BattleModule; 