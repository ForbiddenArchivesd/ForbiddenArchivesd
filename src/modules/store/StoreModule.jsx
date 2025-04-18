// Main StoreModule component - Shop interface for purchasing items with gold
import React, { useState, useEffect } from 'react';
import ShopCategoryTabs from './ShopCategoryTabs';
import StoreItemCard from './StoreItemCard';
import ManualRefreshPanel from './ManualRefreshPanel';
import PurchaseLog from './PurchaseLog';
import useGameStore from '../../store/gameStore';
import './StoreStyles.css';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Constants
const REFRESH_COST = 50; // Gold cost to refresh inventory
const SOL_PRICE = 0.2; // SOL price for entity purchases
const DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const DAILY_ENTITY_PURCHASE_LIMIT = 1; // Number of entities that can be purchased per day

// Define the item pools for reference (not to initialize the store)
const itemPools = {
  entities: [
    {
      id: 'store-entity-1',
      name: 'Subject T-12',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 15,
      defense: 20,
      efficiency: 1.0,
      skills: ['Rapid Cellular Growth'],
      icon: '/assets/entities/subject-t12.png',
      description: 'Prototype humanoid with unstable cell growth.',
      price: 350,
      stock: 1
    },
    {
      id: 'store-entity-2',
      name: 'Phase Larva',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 12,
      defense: 18,
      efficiency: 1.1,
      skills: ['Phase Shift'],
      icon: '/assets/entities/phase-larva.png',
      description: 'Insectoid anomaly with intermittent visibility.',
      price: 375,
      stock: 1
    },
    {
      id: 'store-entity-3',
      name: 'Entity KR-22 "The Mute Choir"',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 22,
      defense: 28,
      efficiency: 1.3,
      skills: ['Sound Absorption', 'Psychic Resonance'],
      icon: '/assets/entities/mute-choir.png',
      description: 'Eyeless humanoids producing no detectable sound.',
      price: 580,
      stock: 1
    },
    {
      id: 'store-entity-4',
      name: 'Anomaly S-88 "Veil Serpent"',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 25,
      defense: 24,
      efficiency: 1.4,
      skills: ['Dimensional Shift', 'Biophoton Emission'],
      icon: '/assets/entities/veil-serpent.png',
      description: 'Biophotonic being that phases between dimensions.',
      price: 600,
      stock: 1
    },
    {
      id: 'store-entity-5',
      name: 'Dripspine Offshoot',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 14,
      defense: 16,
      efficiency: 0.9,
      skills: ['Bio-slurry Production'],
      icon: '/assets/entities/dripspine.png',
      description: 'Vertebrate strain producing black bio-slurry.',
      price: 340,
      stock: 1
    },
    {
      id: 'store-entity-6',
      name: 'Cavern Echo',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 19,
      defense: 26,
      efficiency: 1.2,
      skills: ['Sound Mimicry', 'Acoustic Illusion'],
      icon: '/assets/entities/cavern-echo.png',
      description: 'Sound-reactive entity mimicking lost personnel.',
      price: 560,
      stock: 1
    },
    {
      id: 'store-entity-7',
      name: 'Subject R-0B "The Pre-Flesh"',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 24,
      defense: 25,
      efficiency: 1.3,
      skills: ['Biological Plasticity', 'Corporeal Restructure'],
      icon: '/assets/entities/pre-flesh.png',
      description: 'Early-stage corporeal construct from Site-41\'s lost batch.',
      price: 590,
      stock: 1
    },
    {
      id: 'store-entity-8',
      name: 'Collapsed Vector Core',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 13,
      defense: 15,
      efficiency: 1.0,
      skills: ['Temporal Leakage'],
      icon: '/assets/entities/vector-core.png',
      description: 'Non-sentient node leaking temporal distortion.',
      price: 320,
      stock: 1
    },
    {
      id: 'store-entity-9',
      name: 'Aberrant Choir',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 18,
      defense: 22,
      efficiency: 1.2,
      skills: ['Psionic Resonance', 'Harmonic Disruption'],
      icon: '/assets/entities/subject-t12.png',
      description: 'A writhing mass of conjoined figures that constantly chant in a lost dialect. Reacts strongly to psionic frequencies.',
      price: 575,
      stock: 1
    },
    {
      id: 'store-entity-10',
      name: 'Subject ZK-04',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 20,
      defense: 16,
      efficiency: 1.3,
      skills: ['Phase Shift', 'Reality Anchor'],
      icon: '/assets/entities/phase-larva.png',
      description: 'A humanoid anomaly with inconsistent corporeality. Appears partially phased out of baseline reality.',
      price: 585,
      stock: 1
    },
    {
      id: 'store-entity-11',
      name: 'Glassbound Beast',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 22,
      defense: 19,
      efficiency: 1.1,
      skills: ['Thermal Emission', 'Crystal Refraction'],
      icon: '/assets/entities/dripspine.png',
      description: 'Semi-organic creature bound in crystalline growths. Its core emits anomalous heat signatures.',
      price: 570,
      stock: 1
    }
  ],
  equipment: [
    {
      id: 'store-equip-1',
      name: 'Technician Gloves',
      type: 'gear',
      rarity: 'Common',
      level: 1,
      defenseBonus: 10,
      icon: 'https://media-hosting.imagekit.io/969e99c78797463f/Technician%20Gloves.webp?Expires=1839564784&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xqCS-P2PcjtUZNtbKvovA9TMq7jBPwvaj5MgUT31B6yUJx2nOrLL55mu-RKFPA7r5CBNg8rkMFc9iTUwvwQhpJ~3dPzahChT~ulCqzG2qql6Da13wnpqE1PvggOxUz6ZLkbfgBM~pnkpQKkG9U6iNAjR8d2Xsl2CxQ-8ZgbQYC4yex1aa5dD0PkKMhwTd05vd-5angbCceJCUymvdOJL9o8ESFEVTsd3QMcEQktX9lN7Dx9Es6JvIuyH0mDtyIKl0dFzMIM6YMPwaBjEuvD7pRwxny6do5mtuBA3~W3jvnaYsXlJrUvcr93VuFyLYSL3zzxc2mcAiSWkT68lFM8Y~A__',
      description: 'Worn by Site-9 staff during hazard extractions.',
      price: 240,
      stock: 2
    },
    {
      id: 'store-equip-2',
      name: 'Null Entropy Visor',
      type: 'gear',
      rarity: 'Common',
      level: 1,
      efficiencyBonus: 0.2,
      icon: '/assets/gear/null-visor.png',
      description: 'Blocks cognitive noise from interlinked entities.',
      price: 260,
      stock: 2
    },
    {
      id: 'store-equip-3',
      name: 'Resonant Binding Straps',
      type: 'gear',
      rarity: 'Rare',
      level: 2,
      defenseBonus: 18,
      icon: '/assets/gear/binding-straps.png',
      description: 'Suppresses minor telekinetic flares during transfer.',
      price: 420,
      stock: 2
    },
    {
      id: 'store-equip-4',
      name: 'Hollow-Eye Goggles',
      type: 'gear',
      rarity: 'Rare',
      level: 2,
      efficiencyBonus: 0.3,
      icon: '/assets/gear/hollow-eye.png',
      description: 'Improves anomaly interaction stability.',
      price: 440,
      stock: 2
    },
    {
      id: 'store-equip-5',
      name: 'Carbon Spinal Harness',
      type: 'gear',
      rarity: 'Rare',
      level: 2,
      defenseBonus: 16,
      icon: '/assets/gear/spinal-harness.png',
      description: 'Military reinforcement vest with spinal override chip.',
      price: 400,
      stock: 2
    },
    {
      id: 'store-equip-6',
      name: 'Mind-Still Cuffs',
      type: 'gear',
      rarity: 'Rare',
      level: 2,
      efficiencyBonus: 0.25,
      icon: '/assets/gear/mind-still.png',
      description: 'Temporarily halts neural divergence during contact.',
      price: 360,
      stock: 2
    },
    {
      id: 'store-equip-7',
      name: 'Reaction Dampener Boots',
      type: 'gear',
      rarity: 'Rare',
      level: 2,
      defenseBonus: 15,
      icon: '/assets/gear/dampener-boots.png',
      description: 'Limits chaos burst when approaching entity clusters.',
      price: 380,
      stock: 2
    },
    {
      id: 'store-equip-8',
      name: 'Spectral Conductive Plate',
      type: 'gear',
      rarity: 'Rare',
      level: 2,
      efficiencyBonus: 0.28,
      icon: '/assets/gear/conductive-plate.png',
      description: 'Boosts perception in fusion/hallucination environments.',
      price: 410,
      stock: 2
    }
  ],
  items: [
    {
      id: 'store-item-1',
      name: 'Crystallized Thought Core',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'rarityBoost',
        value: 15
      },
      icon: '/assets/items/crystal.png',
      description: 'Residual data from overprocessed entity minds.',
      price: 300,
      stock: 3
    },
    {
      id: 'store-item-2',
      name: 'Stabilized Cell Cluster',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'levelBoost',
        value: 1
      },
      icon: '/assets/items/cell-cluster.png',
      description: 'Mutation-safe cell matrix with stabilizer frame.',
      price: 280,
      stock: 3
    },
    {
      id: 'store-item-3',
      name: 'Memory Seed',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'rarityBias',
        value: 'Epic'
      },
      icon: '/assets/items/memory-seed.png',
      description: 'Final fragment of consciousness from Class-Ω instance.',
      price: 360,
      stock: 3
    },
    {
      id: 'store-item-4',
      name: 'Entropy Splice Kit',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'maturityBoost',
        value: 2
      },
      icon: '/assets/items/splice-kit.png',
      description: 'Splice-layer injectors from recursive clone trials.',
      price: 330,
      stock: 3
    },
    {
      id: 'store-item-5',
      name: 'Neural Salt Ampoule',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'skillQuality',
        value: 1
      },
      icon: '/assets/items/neural-salt.png',
      description: 'Enhances neurological imprint of fused result.',
      price: 350,
      stock: 3
    },
    {
      id: 'store-item-6',
      name: 'Temporal Residue Capsule',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'cooldownReduction',
        value: 0.3
      },
      icon: '/assets/items/temporal-capsule.png',
      description: 'Decreases post-fusion cooldown (future use).',
      price: 320,
      stock: 3
    },
    {
      id: 'store-item-7',
      name: 'Tethered Catalyst',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'stabilityBoost',
        value: 0.25
      },
      icon: '/assets/items/catalyst.png',
      description: 'Used in synchronizing unstable samples.',
      price: 310,
      stock: 3
    },
    {
      id: 'store-item-8',
      name: 'Echo Imprint Token',
      type: 'object',
      rarity: 'Rare',
      effect: {
        type: 'rarityBias',
        value: 'Rare'
      },
      icon: '/assets/items/echo-token.png',
      description: 'Holds partial traits of prior anomalies.',
      price: 340,
      stock: 3
    }
  ],
  materials: [
    {
      id: 'store-mat-1',
      name: 'SCP-grade Alloy',
      type: 'material',
      rarity: 'Common',
      effect: {
        type: 'research',
        value: 10
      },
      icon: '/assets/materials/alloy.png',
      description: 'Impact-resistant, magneto-stable experimental metal.',
      price: 220,
      stock: 4
    },
    {
      id: 'store-mat-2',
      name: 'Obsidian Tag',
      type: 'material',
      rarity: 'Common',
      effect: {
        type: 'unlock',
        value: 1
      },
      icon: '/assets/materials/obsidian-tag.png',
      description: 'Fractured ID tag with unknown origin.',
      price: 190,
      stock: 4
    },
    {
      id: 'store-mat-3',
      name: 'Blacksite Carbon Mesh',
      type: 'material',
      rarity: 'Common',
      effect: {
        type: 'crafting',
        value: 1
      },
      icon: '/assets/materials/carbon-mesh.png',
      description: 'Salvaged from Sector-Δ rupture zone.',
      price: 280,
      stock: 4
    },
    {
      id: 'store-mat-4',
      name: 'Isolated Tag Fragment',
      type: 'material',
      rarity: 'Common',
      effect: {
        type: 'research',
        value: 15
      },
      icon: '/assets/materials/tag-fragment.png',
      description: 'Half-burned identifier with anomalous readings.',
      price: 250,
      stock: 4
    },
    {
      id: 'store-mat-5',
      name: 'Biohazardous Lining Gel',
      type: 'material',
      rarity: 'Common',
      effect: {
        type: 'crafting',
        value: 2
      },
      icon: '/assets/materials/lining-gel.png',
      description: 'Used in anomaly incubation shells.',
      price: 260,
      stock: 4
    },
    {
      id: 'store-mat-6',
      name: 'Redline Growth Pod',
      type: 'material',
      rarity: 'Rare',
      effect: {
        type: 'upgrade',
        value: 1
      },
      icon: '/assets/materials/growth-pod.png',
      description: 'Accelerates organic material expansion.',
      price: 300,
      stock: 4
    },
    {
      id: 'store-mat-7',
      name: 'Quantum Fray Dust',
      type: 'material',
      rarity: 'Rare',
      effect: {
        type: 'catalyst',
        value: 2
      },
      icon: '/assets/materials/fray-dust.png',
      description: 'Solidified waveform collapse from Entity-711.',
      price: 310,
      stock: 4
    },
    {
      id: 'store-mat-8',
      name: 'Lattice Bound Membrane',
      type: 'material',
      rarity: 'Rare',
      effect: {
        type: 'mutation',
        value: 1
      },
      icon: '/assets/materials/bound-membrane.png',
      description: 'Tissue substrate for fusion experiments.',
      price: 295,
      stock: 4
    }
  ]
};

const StoreModule = () => {
  // Get state from game store
  const store = useGameStore(state => state.store);
  const resources = useGameStore(state => state.resources);
  const updateGold = useGameStore(state => state.updateGold);
  const addStatusUpdate = useGameStore(state => state.addStatusUpdate);
  const storage = useGameStore(state => state.storage);
  const addStorageItem = useGameStore(state => state.addStorageItem);
  const updateObjectiveProgress = useGameStore(state => state.updateObjectiveProgress);

  // Get wallet state
  const wallet = useWallet();

  // State for active tab
  const [activeTab, setActiveTab] = useState('entities');
  const [message, setMessage] = useState(null);
  
  // Check for daily reset on mount
  useEffect(() => {
    const now = Date.now();
    
    // Check if it's been a day since last reset
    if (now - store.lastDailyReset >= DAY_IN_MS) {
      useGameStore.setState(state => ({
        store: {
          ...state.store,
          entityPurchasesRemaining: 1,
          lastDailyReset: now
        }
      }));
    }
  }, []);
  
  // Check for daily reset of entity purchase limit
  useEffect(() => {
    const dailyCheck = setInterval(() => {
      const now = Date.now();
      const currentState = useGameStore.getState();
      
      // If it's been a day since last reset
      if (now - currentState.store.lastDailyReset >= DAY_IN_MS) {
        useGameStore.setState(state => ({
          store: {
            ...state.store,
            entityPurchasesRemaining: 1,
            lastDailyReset: now
          }
        }));
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(dailyCheck);
  }, []);
  
  // Check for auto-refresh timers
  useEffect(() => {
    const timerCheck = setInterval(() => {
      const now = Date.now();
      const currentState = useGameStore.getState();
      const { refreshTimers } = currentState.store;
      
      // Check categories that need refresh
      const updatedInventory = { ...currentState.store.inventory };
      let refreshed = false;
      
      ['equipment', 'items', 'materials'].forEach(category => {
        if (refreshTimers[category] && now >= refreshTimers[category]) {
          // Reset inventory for this category - random 3-5 items
          const categoryPool = itemPools[category];
          // Shuffle the category pool
          const shuffledItems = [...categoryPool].sort(() => 0.5 - Math.random());
          // Take random number between 3-5 items
          const itemCount = Math.floor(Math.random() * 3) + 3; // Random number 3-5
          // Get the random items with reset stock
          updatedInventory[category] = shuffledItems.slice(0, itemCount).map(item => ({
            ...item,
            stock: category === 'items' || category === 'materials' ? 3 : 2
          }));
          refreshed = true;
        }
      });
      
      // If any category was refreshed, update the state
      if (refreshed) {
        useGameStore.setState(state => ({
          store: {
            ...state.store,
            inventory: updatedInventory,
            refreshTimers: {
              ...state.store.refreshTimers,
              equipment: now + 3600000, // 1 hour from now
              items: now + 3600000,
              materials: now + 3600000
            }
          }
        }));
        
        // Add status update for automatic refresh
        addStatusUpdate({
          id: `auto-refresh-${now}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'resource',
          title: 'Store Auto-Refreshed',
          description: 'Store inventory has been automatically refreshed.',
          time: 'Just now'
        });
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(timerCheck);
  }, []);
  
  // Add an item to the player's inventory
  const addItemToInventory = (item) => {
    const cleanItem = { ...item };
    
    // Remove store-specific properties
    delete cleanItem.price;
    delete cleanItem.stock;
    
    // Generate a unique ID for the new item
    cleanItem.id = `${cleanItem.type}-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Map store categories to proper item types
    // In the store, categories are: entities, equipment, items, materials
    // In storage, types are: Entity, Gear, Object, Material (capitalized)
    if (activeTab === 'equipment') {
      cleanItem.type = 'Gear';
    } else if (activeTab === 'items') {
      cleanItem.type = 'Object';
    } else if (activeTab === 'entities') {
      cleanItem.type = 'Entity';
    } else if (activeTab === 'materials') {
      cleanItem.type = 'Material';
    }
    
    // Add item to storage using the gameStore method
    addStorageItem(cleanItem);
    
    return cleanItem;
  };
  
  // Handle purchase
  const handlePurchase = (item, isSolPurchase = false) => {
    const gold = useGameStore.getState().resources.gold;
    
    // Check if player has enough gold (skip for SOL purchases)
    if (!isSolPurchase && gold < item.price) {
      setMessage({ type: 'error', text: 'Not enough gold for this purchase!' });
      return false;
    }
    
    // For entities, check daily limit
    if (activeTab === 'entities' && store.entityPurchasesRemaining <= 0) {
      return false;
    }
    
    // Check if we have space in storage
    const currentItems = storage.entities.length + storage.gear.length + 
                         storage.items.length + storage.materials.length;
    
    if (currentItems >= storage.capacity) {
      return false; // Storage full
    }
    
    // Update player gold (skip for SOL purchases)
    if (!isSolPurchase) {
      updateGold(-item.price);
    }
    
    // Add item to inventory
    addItemToInventory(item);
    
    // Add purchase to log
    const logEntry = {
      id: `purchase-${Date.now()}`,
      item: isSolPurchase ? `${item.name} (SOL)` : item.name,
      price: isSolPurchase ? `${SOL_PRICE} SOL` : item.price,
      timestamp: Date.now()
    };
    
    // Update purchase log
    useGameStore.setState(prev => ({
      ...prev,
      store: {
        ...prev.store,
        purchaseLog: [logEntry, ...prev.store.purchaseLog.slice(0, 9)]
      }
    }));
    
    // Add status update
    addStatusUpdate({
      id: `store-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      type: 'store',
      title: 'Item Purchased',
      description: isSolPurchase 
        ? `You purchased ${item.name} for ${SOL_PRICE} SOL.`
        : `You purchased ${item.name} for ${item.price} gold.`,
      time: 'Just now'
    });

    // Update daily objective progress
    updateObjectiveProgress('store', 1);
    
    // Update entity purchase limit if applicable
    if (activeTab === 'entities') {
      useGameStore.setState(state => ({
        store: {
          ...state.store,
          entityPurchasesRemaining: state.store.entityPurchasesRemaining - 1
        }
      }));
    }
    
    // Update stock
    useGameStore.setState(state => {
      const updatedInventory = { ...state.store.inventory };
      const itemIndex = updatedInventory[activeTab].findIndex(i => i.id === item.id);
      
      if (itemIndex !== -1) {
        updatedInventory[activeTab][itemIndex].stock -= 1;
      }
      
      return {
        store: {
          ...state.store,
          inventory: updatedInventory
        }
      };
    });
    
    // Show success message
    setMessage({ 
      type: 'success', 
      text: isSolPurchase 
        ? `Successfully purchased ${item.name} with SOL!`
        : `Successfully purchased ${item.name}!` 
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
    
    return true;
  };
  
  // Handle manual refresh
  const handleManualRefresh = (category) => {
    // Check if player has enough gold
    if (resources.gold < REFRESH_COST) {
      return false;
    }
    
    // Check if on cooldown
    if (store.refreshCooldowns[category]) {
      return false;
    }
    
    // Deduct gold
    updateGold(-REFRESH_COST);
    
    // Add status update
    addStatusUpdate({
      id: `refresh-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      type: 'resource',
      title: 'Store Refreshed',
      description: `Spent ${REFRESH_COST} gold to refresh the ${category} category.`,
      time: 'Just now'
    });
    
    // Refresh inventory and set cooldown
    useGameStore.setState(state => {
      // Reset inventory for this category with new selection rules
      const updatedInventory = { ...state.store.inventory };
      
      // Different logic based on category
      if (category === 'entities') {
        // For entities: Always show 5 random entities
        const shuffledEntities = [...itemPools.entities].sort(() => 0.5 - Math.random());
        updatedInventory[category] = shuffledEntities.slice(0, 5).map(item => ({
          ...item,
          stock: 1 // Entities always have stock of 1
        }));
      } else {
        // For equipment, items, materials: Show random 3-5 items
        const categoryPool = itemPools[category];
        // Shuffle the category pool
        const shuffledItems = [...categoryPool].sort(() => 0.5 - Math.random());
        // Take random number between 3-5 items
        const itemCount = Math.floor(Math.random() * 3) + 3; // Random number 3-5
        // Get the random items with reset stock
        updatedInventory[category] = shuffledItems.slice(0, itemCount).map(item => ({
          ...item,
          stock: category === 'items' || category === 'materials' ? 3 : 2
        }));
      }
      
      // Set cooldown and update refresh timer
      const updatedCooldowns = { ...state.store.refreshCooldowns };
      updatedCooldowns[category] = true;
      
      const updatedTimers = { ...state.store.refreshTimers };
      updatedTimers[category] = Date.now() + 3600000; // 1 hour from now
      
      return {
        store: {
          ...state.store,
          inventory: updatedInventory,
          refreshTimers: updatedTimers,
          refreshCooldowns: updatedCooldowns
        }
      };
    });
    
    // Reset cooldown after 5 minutes
    setTimeout(() => {
      useGameStore.setState(state => ({
        store: {
          ...state.store,
          refreshCooldowns: {
            ...state.store.refreshCooldowns,
            [category]: false
          }
        }
      }));
    }, 300000); // 5 minutes
    
    return true;
  };
  
  // Handle SOL-based refresh for entities
  const handleSolRefresh = async (solCost) => {
    const { publicKey, sendTransaction, connected } = wallet;
    
    // Check if wallet is connected
    if (!connected || !publicKey) {
      return false;
    }
    
    try {
      // Treasury wallet is the same as used for entity purchases
      const TREASURY_WALLET = new PublicKey("4Hp8P5EGSzHrfydKJxN2ihwc13wqBrJzEpqSUyJNx29Y");
      
      // Get RPC endpoint from environment or use default
      const endpoint = import.meta.env.VITE_SOLANA_RPC_ENDPOINT || "https://mainnet.helius-rpc.com/?api-key=4fb05a4e-b999-4375-b303-6d4a57ad32d4";
      const connection = new Connection(endpoint, "confirmed");
      
      // Create transaction for 0.5 SOL
      const lamports = LAMPORTS_PER_SOL * solCost;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: TREASURY_WALLET,
          lamports
        })
      );
      
      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      
      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      console.log('Entity refresh transaction sent with signature:', signature);
      
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value && confirmation.value.err) {
        throw new Error('Transaction failed to confirm');
      }
      
      // Transaction confirmed! Now refresh entity inventory
      useGameStore.setState(state => {
        // Reset inventory for entities with new selection rules
        const updatedInventory = { ...state.store.inventory };
        
        // For entities: Create fresh set of 5 random entities
        const shuffledEntities = [...itemPools.entities].sort(() => 0.5 - Math.random());
        updatedInventory.entities = shuffledEntities.slice(0, 5).map(item => ({
          ...item,
          stock: 1 // Entities always have stock of 1
        }));
        
        // Add status update for SOL payment
        addStatusUpdate({
          id: `solrefresh-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'payment',
          title: 'Entities Refreshed',
          description: `Paid ${solCost} SOL to refresh entity selection.`,
          time: 'Just now'
        });
        
        // Update store state
        return {
          store: {
            ...state.store,
            inventory: updatedInventory,
            // Reset entity purchase limit with the new refresh
            entityPurchasesRemaining: DAILY_ENTITY_PURCHASE_LIMIT
          }
        };
      });
      
      // Success!
      setMessage({
        type: 'success',
        text: `Entities refreshed! Paid ${solCost} SOL.`
      });
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('SOL refresh error:', error);
      
      setMessage({
        type: 'error',
        text: 'Failed to refresh entities. Transaction error.'
      });
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      
      return false;
    }
  };
  
  // Format time remaining for refresh
  const formatTimeRemaining = (category) => {
    if (category === 'entities' || !store.refreshTimers[category]) {
      return 'No refresh';
    }
    
    const now = Date.now();
    const timeLeft = store.refreshTimers[category] - now;
    
    if (timeLeft <= 0) return 'Refreshing...';
    
    const minutes = Math.floor(timeLeft / 60000);
    return `${minutes}m`;
  };
  
  // Get filtered items based on active tab
  const getFilteredItems = () => {
    return store.inventory[activeTab] || [];
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="store-module">
      <div className="store-header">
        <h1>Anomalous Supply Terminal</h1>
        <p>Acquire useful assets via Gold.</p>
      </div>
      
      {/* Category tabs */}
      <ShopCategoryTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      {/* Store content grid */}
      <div className="store-content-grid">
        {getFilteredItems().map(item => (
          <StoreItemCard 
            key={item.id}
            item={item}
            onPurchase={handlePurchase}
            isEntityLimited={activeTab === 'entities' && store.entityPurchasesRemaining <= 0}
          />
        ))}
      </div>
      
      {/* Refresh panel */}
      <ManualRefreshPanel 
        category={activeTab}
        onRefresh={handleManualRefresh}
        onSolRefresh={handleSolRefresh}
        timeRemaining={formatTimeRemaining(activeTab)}
        onCooldown={store.refreshCooldowns[activeTab]}
        isEntityTab={activeTab === 'entities'}
        goldCost={REFRESH_COST}
      />
      
      {/* Purchase log */}
      <PurchaseLog purchases={store.purchaseLog} />
      
      {/* Message display */}
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default StoreModule; 