// Drop table configuration for Battle Module reward system
export const dropTable = {
  commonPool: [
    { type: 'gold', min: 50, max: 100, chance: 0.8 },
    { type: 'items', id: 'Unmarked Coin', chance: 0.15 },
    { type: 'materials', id: 'Soul Fragment', chance: 0.1 },
  ],
  uncommonPool: [
    { type: 'equipment', id: 'Technician Gloves', chance: 0.15 },
    { type: 'gold', min: 100, max: 160, chance: 0.6 },
    { type: 'items', id: 'Hollow Key', chance: 0.25 },
    { type: 'materials', id: 'SCP-Grade Alloy', chance: 0.15 },
  ],
  rarePool: [
    { type: 'equipment', id: 'Resonant Binding Straps', chance: 0.25 },
    { type: 'materials', id: 'Blank Containment Tag', chance: 0.2 },
    { type: 'gold', min: 160, max: 220, chance: 0.5 },
    { type: 'items', id: 'Broken Reality Core', chance: 0.15 },
  ],
  epicPool: [
    { type: 'equipment', id: 'Spectral Conductive Plate', chance: 0.25 },
    { type: 'materials', id: 'Soul Fragment', chance: 0.25 },
    { type: 'gold', min: 220, max: 400, chance: 0.6 },
    { type: 'items', id: 'Null Entropy Visor', chance: 0.2 },
  ],
};

// Define actual item details for each drop ID
export const itemDetails = {
  // Equipment items
  'Technician Gloves': {
    id: 'battle-reward-technician-gloves',
    name: 'Technician Gloves',
    type: 'Gear',
    rarity: 'Common',
    level: 1,
    defenseBonus: 10,
    icon: 'https://media-hosting.imagekit.io/969e99c78797463f/Technician%20Gloves.webp?Expires=1839564784&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xqCS-P2PcjtUZNtbKvovA9TMq7jBPwvaj5MgUT31B6yUJx2nOrLL55mu-RKFPA7r5CBNg8rkMFc9iTUwvwQhpJ~3dPzahChT~ulCqzG2qql6Da13wnpqE1PvggOxUz6ZLkbfgBM~pnkpQKkG9U6iNAjR8d2Xsl2CxQ-8ZgbQYC4yex1aa5dD0PkKMhwTd05vd-5angbCceJCUymvdOJL9o8ESFEVTsd3QMcEQktX9lN7Dx9Es6JvIuyH0mDtyIKl0dFzMIM6YMPwaBjEuvD7pRwxny6do5mtuBA3~W3jvnaYsXlJrUvcr93VuFyLYSL3zzxc2mcAiSWkT68lFM8Y~A__',
    description: 'Reinforced gloves used during biohazard transfer.'
  },
  'Resonant Binding Straps': {
    id: 'battle-reward-binding-straps',
    name: 'Resonant Binding Straps',
    type: 'Gear',
    rarity: 'Rare',
    level: 2,
    defenseBonus: 18,
    icon: '/assets/gear/binding-straps.png',
    description: 'Suppresses minor telekinetic flares during transfer.'
  },
  'Spectral Conductive Plate': {
    id: 'battle-reward-conductive-plate',
    name: 'Spectral Conductive Plate',
    type: 'Gear',
    rarity: 'Epic',
    level: 3,
    defenseBonus: 25,
    efficiencyBonus: 0.15,
    icon: '/assets/gear/conductive-plate.png',
    description: 'Advanced protective gear that channels anomalous energy safely.'
  },
  'Null Entropy Visor': {
    id: 'battle-reward-null-visor',
    name: 'Null Entropy Visor',
    type: 'Gear',
    rarity: 'Epic',
    level: 3,
    efficiencyBonus: 0.3,
    icon: '/assets/gear/null-visor.png',
    description: 'Protects wearer\'s brain from external cognitive noise.'
  },
  
  // Items
  'Unmarked Coin': {
    id: 'battle-reward-unmarked-coin',
    name: 'Unmarked Coin',
    type: 'Object',
    rarity: 'Common',
    effect: {
      type: 'gold',
      value: 50
    },
    icon: '/assets/items/crystal.png',
    description: 'Ancient currency with anomalous properties. Can be exchanged for gold.'
  },
  'Hollow Key': {
    id: 'battle-reward-hollow-key',
    name: 'Hollow Key',
    type: 'Object',
    rarity: 'Uncommon',
    effect: {
      type: 'unlock',
      value: 1
    },
    icon: '/assets/items/cell-cluster.png',
    description: 'Key with no interior. Opens doors that don\'t exist.'
  },
  'Broken Reality Core': {
    id: 'battle-reward-reality-core',
    name: 'Broken Reality Core',
    type: 'Object',
    rarity: 'Rare',
    effect: {
      type: 'rarityBoost',
      value: 20
    },
    icon: '/assets/items/crystal.png',
    description: 'Fragment of broken reality. Enhances fusion outcomes significantly.'
  },
  
  // Materials
  'Soul Fragment': {
    id: 'battle-reward-soul-fragment',
    name: 'Soul Fragment',
    type: 'Material',
    rarity: 'Uncommon',
    effect: {
      type: 'statBias',
      stat: 'efficiency'
    },
    icon: '/assets/materials/alloy.png',
    description: 'Crystallized consciousness fragment with strange properties.'
  },
  'SCP-Grade Alloy': {
    id: 'battle-reward-scp-alloy',
    name: 'SCP-Grade Alloy',
    type: 'Material',
    rarity: 'Common',
    effect: {
      type: 'research',
      value: 10
    },
    icon: '/assets/materials/alloy.png',
    description: 'Military-grade metal recovered from Site-Δ12.'
  },
  'Blank Containment Tag': {
    id: 'battle-reward-blank-tag',
    name: 'Blank Containment Tag',
    type: 'Material',
    rarity: 'Rare',
    effect: {
      type: 'unlock',
      value: 2
    },
    icon: '/assets/materials/obsidian-tag.png',
    description: 'Advanced identification tag used in high-security containment procedures.'
  }
};

// Helper functions for the reward system
export const getRarityPool = (rarity) => {
  switch (rarity) {
    case 'Common':
      return dropTable.commonPool;
    case 'Uncommon':
      return dropTable.uncommonPool;
    case 'Rare':
      return dropTable.rarePool;
    case 'Epic':
      return dropTable.epicPool;
    default:
      return dropTable.commonPool;
  }
};

export const generateUniqueId = (baseId) => {
  return `${baseId}-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}; 