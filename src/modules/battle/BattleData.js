// Battle stages data
import { enemyPool, formatEnemyForBattle } from './EnemyPool';

export const battleStages = [
  {
    id: 'sector1-trial1',
    name: 'Sector-1: Trial 01',
    description: 'First test subject containment area.',
    difficulty: 1,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_01'))
    ]
  },
  {
    id: 'sector1-trial2',
    name: 'Sector-1: Trial 02',
    description: 'Testing chamber with dual entities.',
    difficulty: 1,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_02')),
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_05'))
    ]
  },
  {
    id: 'sector1-boss',
    name: 'Sector-1: Overseer',
    description: 'Facility security system gone rogue.',
    difficulty: 2,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_25'))
    ]
  },
  {
    id: 'sector2-trial1',
    name: 'Sector-2: Trial 01',
    description: 'Research wing containment breach.',
    difficulty: 2,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_13')),
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_20'))
    ]
  },
  {
    id: 'sector2-trial2',
    name: 'Sector-2: Trial 02',
    description: 'Temporal anomaly testing chamber.',
    difficulty: 2,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_14')),
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_22'))
    ]
  },
  {
    id: 'sector2-boss',
    name: 'Sector-2: Chrono-Sentinel',
    description: 'Temporal security failsafe activated.',
    difficulty: 3,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_30'))
    ]
  },
  {
    id: 'sector3-trial1',
    name: 'Sector-3: Trial 01',
    description: 'Advanced anomaly testing zone.',
    difficulty: 3,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_27')),
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_31'))
    ]
  },
  {
    id: 'sector3-trial2',
    name: 'Sector-3: Trial 02',
    description: 'High-risk entity chamber.',
    difficulty: 3,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_28')),
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_33')),
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_10'))
    ]
  },
  {
    id: 'sector3-boss',
    name: 'Sector-3: Apex Anomaly',
    description: 'Critical threat containment breach.',
    difficulty: 4,
    enemies: [
      formatEnemyForBattle(enemyPool.find(enemy => enemy.id === 'enemy_35'))
    ]
  }
];

// Daily challenge template
export const dailyChallenge = {
  id: 'daily-challenge',
  name: 'Daily Challenge',
  description: 'Random challenge that changes daily. Increased rewards!',
  difficulty: 2,
  enemies: [] // Will be populated dynamically
};

// Generate daily challenge enemies for the current day
export const generateDailyChallenge = () => {
  // Get current date to seed the random challenge (changes daily)
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  
  // Use date string as seed for consistent generation throughout the day
  let seedValue = dateString.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Deterministic "random" number based on date seed
  const getSeededRandom = () => {
    const x = Math.sin(seedValue++) * 10000;
    return x - Math.floor(x);
  };
  
  // Determine challenge difficulty (1-4)
  const challengeDifficulty = Math.floor(getSeededRandom() * 4) + 1;
  
  // Determine number of enemies (1-3)
  const enemyCount = Math.floor(getSeededRandom() * 3) + 1;
  
  // Custom rarity distribution based on difficulty
  const rarityDistribution = {
    1: { Common: 0.8, Uncommon: 0.2, Rare: 0.0, Epic: 0.0 },
    2: { Common: 0.5, Uncommon: 0.45, Rare: 0.05, Epic: 0.0 },
    3: { Common: 0.2, Uncommon: 0.5, Rare: 0.25, Epic: 0.05 },
    4: { Common: 0.1, Uncommon: 0.3, Rare: 0.5, Epic: 0.1 }
  }[challengeDifficulty];
  
  // Generate the enemies
  const challengeEnemies = [];
  for (let i = 0; i < enemyCount; i++) {
    const roll = getSeededRandom();
    let selectedRarity = 'Common';
    
    let cumulativeProbability = 0;
    for (const [rarity, probability] of Object.entries(rarityDistribution)) {
      cumulativeProbability += probability;
      if (roll <= cumulativeProbability) {
        selectedRarity = rarity;
        break;
      }
    }
    
    // Select a random enemy of that rarity
    const enemiesOfRarity = enemyPool.filter(enemy => enemy.rarity === selectedRarity);
    const selectedEnemy = enemiesOfRarity[Math.floor(getSeededRandom() * enemiesOfRarity.length)];
    
    if (selectedEnemy) {
      // Format the enemy for battle
      const battleEnemy = formatEnemyForBattle({
        ...selectedEnemy,
        // Create a unique ID to avoid duplicate keys
        id: `daily-${selectedEnemy.id}-${i}-${dateString}`
      });
      
      challengeEnemies.push(battleEnemy);
    }
  }
  
  // Update the daily challenge with the new enemies and difficulty
  return {
    ...dailyChallenge,
    difficulty: challengeDifficulty,
    enemies: challengeEnemies,
    date: dateString
  };
}; 