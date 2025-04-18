// Enemy pool for Battle Module
// Contains 40 structured enemies divided by rarity categories

// Common enemies (12 units)
const commonEnemies = [
  {
    id: 'enemy_01',
    name: 'Subject R-08',
    rarity: 'Common',
    stats: {
      attack: 14,
      defense: 10,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Mental Pulse',
        effect: 'Small chance to disorient 1 enemy for 1 turn',
      },
    ],
    description: 'Unstable humanoid clone, partially conscious.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_02',
    name: 'Anomaly Husk',
    rarity: 'Common',
    stats: {
      attack: 18,
      defense: 6,
      efficiency: 0.9,
    },
    skills: [
      {
        name: 'Decay Touch',
        effect: 'Inflicts -10% DEF for 2 turns',
      },
    ],
    description: 'Empty shell of an anomalous entity, still moving.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_03',
    name: 'Containment Slug',
    rarity: 'Common',
    stats: {
      attack: 10,
      defense: 16,
      efficiency: 1.2,
    },
    skills: [
      {
        name: 'Armor Shedding',
        effect: '+5 DEF self (1 stack)',
      },
    ],
    description: 'Amorphous entity that absorbs materials for protection.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_04',
    name: 'Void-Touched Mole',
    rarity: 'Common',
    stats: {
      attack: 12,
      defense: 9,
      efficiency: 1.3,
    },
    skills: [
      {
        name: 'Blind Dash',
        effect: 'Random target hit',
      },
    ],
    description: 'Subterranean creature mutated by exposure to anomalous materials.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_05',
    name: 'Echo Fragment',
    rarity: 'Common',
    stats: {
      attack: 9,
      defense: 12,
      efficiency: 0.8,
    },
    skills: [
      {
        name: 'Resonance',
        effect: '10% chance to reduce all enemy ATK by -5',
      },
    ],
    description: 'Broken piece of a larger consciousness, emitting harmful frequencies.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_06',
    name: 'SCP-W0RM',
    rarity: 'Common',
    stats: {
      attack: 15,
      defense: 11,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Self-Burrow',
        effect: '20% evasion chance next round',
      },
    ],
    description: 'Segmented entity that can phase through solid surfaces.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_07',
    name: 'Aberrant Tick',
    rarity: 'Common',
    stats: {
      attack: 16,
      defense: 9,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Burst Bite',
        effect: 'Bonus damage if target < 50% HP',
      },
    ],
    description: 'Parasitic lifeform that targets weakened entities.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_08',
    name: 'Ember Gnawer',
    rarity: 'Common',
    stats: {
      attack: 13,
      defense: 13,
      efficiency: 0.9,
    },
    skills: [
      {
        name: 'Sear',
        effect: 'Burn 3 damage for 2 turns',
      },
    ],
    description: 'Rodent-like entity that generates extreme heat from its core.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_09',
    name: 'Phantom Node',
    rarity: 'Common',
    stats: {
      attack: 11,
      defense: 12,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Blink',
        effect: '10% evasion each turn',
      },
    ],
    description: 'Semi-corporeal entity that fades in and out of visibility.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_10',
    name: 'Static Mite',
    rarity: 'Common',
    stats: {
      attack: 14,
      defense: 10,
      efficiency: 1.2,
    },
    skills: [
      {
        name: 'Zap',
        effect: '5% chance to disable target',
      },
    ],
    description: 'Minuscule entity that generates electric discharges.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_11',
    name: 'Fleshbud',
    rarity: 'Common',
    stats: {
      attack: 17,
      defense: 7,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Latch',
        effect: 'Leech 5 HP on hit',
      },
    ],
    description: 'Carnivorous plant-like entity that drains life force.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_12',
    name: 'SCP-H1VE',
    rarity: 'Common',
    stats: {
      attack: 10,
      defense: 18,
      efficiency: 1.3,
    },
    skills: [
      {
        name: 'Multiply',
        effect: 'Summons copy at 10% stats (1x per match)',
      },
    ],
    description: 'Colony organism that functions as a single entity.',
    icon: '/assets/entities/dripspine.png'
  }
];

// Uncommon enemies (12 units)
const uncommonEnemies = [
  {
    id: 'enemy_13',
    name: 'Static Shambler',
    rarity: 'Uncommon',
    stats: {
      attack: 20,
      defense: 14,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'EMP Glitch',
        effect: 'Disables enemy skill next round',
      },
    ],
    description: 'Electrically charged humanoid that disrupts nearby technology.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_14',
    name: 'Plague Root Drone',
    rarity: 'Uncommon',
    stats: {
      attack: 22,
      defense: 12,
      efficiency: 0.9,
    },
    skills: [
      {
        name: 'Spore Spread',
        effect: 'Poison 1 target for 2 rounds',
      },
    ],
    description: 'Fungal entity that releases toxic spores when threatened.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_15',
    name: 'Containment Reject-B7',
    rarity: 'Uncommon',
    stats: {
      attack: 19,
      defense: 18,
      efficiency: 0.95,
    },
    skills: [
      {
        name: 'Overload',
        effect: 'On death, deals 50% ATK to attacker',
      },
    ],
    description: 'Failed containment experiment with unstable energy core.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_16',
    name: 'Dustborn Agent',
    rarity: 'Uncommon',
    stats: {
      attack: 21,
      defense: 10,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Phaseout',
        effect: '30% evade once',
      },
    ],
    description: 'Partially corporeal entity that can momentarily phase through attacks.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_17',
    name: 'Skinless Seeker',
    rarity: 'Uncommon',
    stats: {
      attack: 24,
      defense: 8,
      efficiency: 0.9,
    },
    skills: [
      {
        name: 'Bleed Slash',
        effect: '25% chance to apply bleed (5/tick)',
      },
    ],
    description: 'Flayed humanoid that seeks to recover its missing skin.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_18',
    name: 'Null-Eye Capsule',
    rarity: 'Uncommon',
    stats: {
      attack: 18,
      defense: 20,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Void Gaze',
        effect: 'Reflects 10% damage',
      },
    ],
    description: 'Floating orb containing a void-like substance that reflects attacks.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_19',
    name: 'SCP-SHKR',
    rarity: 'Uncommon',
    stats: {
      attack: 20,
      defense: 15,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Pulse Shock',
        effect: 'AoE -5 DEF',
      },
    ],
    description: 'Entity that generates seismic vibrations that weaken structures.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_20',
    name: 'Shifting Plague',
    rarity: 'Uncommon',
    stats: {
      attack: 23,
      defense: 13,
      efficiency: 0.95,
    },
    skills: [
      {
        name: 'Infect',
        effect: 'Spread negative effect on death',
      },
    ],
    description: 'Contagious anomaly that transfers effects upon neutralization.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_21',
    name: 'Ritual Drone',
    rarity: 'Uncommon',
    stats: {
      attack: 21,
      defense: 12,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Curse Bolt',
        effect: 'Reduces ATK by 10% for 2 turns',
      },
    ],
    description: 'Cultist-created automaton that weakens targets with arcane energy.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_22',
    name: 'Hollow-Bone Walker',
    rarity: 'Uncommon',
    stats: {
      attack: 19,
      defense: 14,
      efficiency: 1.2,
    },
    skills: [
      {
        name: 'Bone Crack',
        effect: '15% stun',
      },
    ],
    description: 'Animated skeleton that can temporarily immobilize targets.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_23',
    name: 'SCP-XN-12',
    rarity: 'Uncommon',
    stats: {
      attack: 22,
      defense: 11,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Null Glitch',
        effect: 'Random skill copied from enemy',
      },
    ],
    description: 'Chameleon-like entity that mimics the abilities of nearby anomalies.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_24',
    name: 'Chain-Eater',
    rarity: 'Uncommon',
    stats: {
      attack: 20,
      defense: 17,
      efficiency: 0.95,
    },
    skills: [
      {
        name: 'Iron Clamp',
        effect: 'Stops enemy from escaping',
      },
    ],
    description: 'Metal-consuming entity that prevents target movement.',
    icon: '/assets/entities/dripspine.png'
  }
];

// Rare enemies (10 units)
const rareEnemies = [
  {
    id: 'enemy_25',
    name: 'Phasewalker LK-22',
    rarity: 'Rare',
    stats: {
      attack: 30,
      defense: 18,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Phase Shift',
        effect: 'Avoids 1st attack',
      },
    ],
    description: 'Entity that exists partially between dimensions, difficult to target.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_26',
    name: 'Grave-Seed Harvester',
    rarity: 'Rare',
    stats: {
      attack: 26,
      defense: 20,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Harvest Hook',
        effect: 'Steals 5% HP on hit',
      },
    ],
    description: 'Death-aspected entity that absorbs life force from victims.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_27',
    name: 'Scorchroot Hybrid',
    rarity: 'Rare',
    stats: {
      attack: 28,
      defense: 14,
      efficiency: 1.3,
    },
    skills: [
      {
        name: 'Ignite',
        effect: 'Burns for 3 turns (4 dmg/tick)',
      },
    ],
    description: 'Fusion of plant and fire elemental that causes persistent burning.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_28',
    name: 'Cyst-Born Oracle',
    rarity: 'Rare',
    stats: {
      attack: 24,
      defense: 26,
      efficiency: 0.9,
    },
    skills: [
      {
        name: 'Echo Curse',
        effect: 'Reflects last received skill',
      },
    ],
    description: 'Prophetic entity that predicts and redirects incoming attacks.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_29',
    name: 'SCP-███-A',
    rarity: 'Rare',
    stats: {
      attack: 34,
      defense: 12,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'REDACTED Pulse',
        effect: 'Random effect: debuff/crit/null',
      },
    ],
    description: 'Classified anomaly with unpredictable reality-altering abilities.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_30',
    name: 'The Black Child',
    rarity: 'Rare',
    stats: {
      attack: 32,
      defense: 20,
      efficiency: 0.9,
    },
    skills: [
      {
        name: 'No Light',
        effect: 'Reduces vision, disables targeting',
      },
    ],
    description: 'Humanoid void that absorbs all light in its vicinity.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_31',
    name: 'Signal-Breaker',
    rarity: 'Rare',
    stats: {
      attack: 27,
      defense: 25,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Jam',
        effect: 'Negates buffs for 2 turns',
      },
    ],
    description: 'Electronic anomaly that disrupts information transfer and enhancements.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_32',
    name: 'Bone Hound MK-4',
    rarity: 'Rare',
    stats: {
      attack: 29,
      defense: 16,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Shred Howl',
        effect: 'Piercing AoE, 10% ATK ignore',
      },
    ],
    description: 'Skeletal canine construct that emits armor-piercing sonic attacks.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_33',
    name: 'SCP-CRN',
    rarity: 'Rare',
    stats: {
      attack: 30,
      defense: 19,
      efficiency: 0.95,
    },
    skills: [
      {
        name: 'Cranium Crush',
        effect: '50% crit chance',
      },
    ],
    description: 'Entity with heightened awareness of structural weak points.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_34',
    name: 'Lurking Witness',
    rarity: 'Rare',
    stats: {
      attack: 25,
      defense: 27,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Marked',
        effect: 'Doubles next damage from allies',
      },
    ],
    description: 'Entity that tags targets for increased vulnerability.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  }
];

// Epic enemies (6 units)
const epicEnemies = [
  {
    id: 'enemy_35',
    name: 'Entity KX-001',
    rarity: 'Epic',
    stats: {
      attack: 42,
      defense: 28,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Mind Collapse',
        effect: 'AoE stun',
      },
      {
        name: 'Phase Loop',
        effect: 'Revives once',
      }
    ],
    description: 'Apex psionic entity with multi-phase existence.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_36',
    name: 'Aberrant Idol',
    rarity: 'Epic',
    stats: {
      attack: 38,
      defense: 34,
      efficiency: 0.8,
    },
    skills: [
      {
        name: 'Sonic Pulse',
        effect: 'AoE silence',
      },
      {
        name: 'Mana Leak',
        effect: 'Remove buffs',
      }
    ],
    description: 'Ancient statue that absorbs energy from nearby entities.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_37',
    name: 'Gravitic Singularity',
    rarity: 'Epic',
    stats: {
      attack: 45,
      defense: 22,
      efficiency: 1.2,
    },
    skills: [
      {
        name: 'Pull In',
        effect: 'Pulls targets closer',
      },
      {
        name: 'Collapse',
        effect: 'Final AoE explosion',
      }
    ],
    description: 'Miniaturized black hole with unstable gravitic field.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  },
  {
    id: 'enemy_38',
    name: 'SCP-OMEGA',
    rarity: 'Epic',
    stats: {
      attack: 50,
      defense: 18,
      efficiency: 1.1,
    },
    skills: [
      {
        name: 'Red Zone',
        effect: 'Instakill chance',
      },
      {
        name: 'Blackout',
        effect: 'Disable UI for 1 turn',
      }
    ],
    description: 'Legendary, one-of-a-kind apex predator among anomalies.',
    icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__'
  },
  {
    id: 'enemy_39',
    name: 'The Architect',
    rarity: 'Epic',
    stats: {
      attack: 35,
      defense: 40,
      efficiency: 1.0,
    },
    skills: [
      {
        name: 'Reality Bend',
        effect: 'Change target stats temporarily',
      },
      {
        name: 'Construct Minion',
        effect: 'Summon helper entity',
      }
    ],
    description: 'Reality-altering entity that can create temporary constructs.',
    icon: '/assets/entities/dripspine.png'
  },
  {
    id: 'enemy_40',
    name: 'Void Collective',
    rarity: 'Epic',
    stats: {
      attack: 40,
      defense: 30,
      efficiency: 1.3,
    },
    skills: [
      {
        name: 'Assimilate',
        effect: 'Gains part of defeated enemy stats',
      },
      {
        name: 'Void Call',
        effect: 'Chance to summon additional enemy',
      }
    ],
    description: 'Hive mind consciousness that exists across multiple planes.',
    icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__'
  }
];

// Combine all enemies into a single pool
export const enemyPool = [
  ...commonEnemies,
  ...uncommonEnemies,
  ...rareEnemies,
  ...epicEnemies
];

// Helper functions for selecting enemies
export const getEnemiesByRarity = (rarity) => {
  return enemyPool.filter(enemy => enemy.rarity === rarity);
};

export const getRandomEnemy = (rarity) => {
  const enemiesOfRarity = getEnemiesByRarity(rarity);
  return enemiesOfRarity[Math.floor(Math.random() * enemiesOfRarity.length)];
};

export const getRandomEnemies = (count, rarityDistribution = { Common: 0.6, Uncommon: 0.3, Rare: 0.08, Epic: 0.02 }) => {
  const enemies = [];
  
  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    let selectedRarity = 'Common';
    
    let cumulativeProbability = 0;
    for (const [rarity, probability] of Object.entries(rarityDistribution)) {
      cumulativeProbability += probability;
      if (roll <= cumulativeProbability) {
        selectedRarity = rarity;
        break;
      }
    }
    
    const randomEnemy = getRandomEnemy(selectedRarity);
    if (randomEnemy) {
      // Create a copy with a unique ID to avoid duplicates
      const uniqueEnemy = {
        ...randomEnemy,
        id: `${randomEnemy.id}-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
      };
      enemies.push(uniqueEnemy);
    }
  }
  
  return enemies;
};

// Format enemy for battle system (compatibility with existing structures)
export const formatEnemyForBattle = (enemy) => {
  return {
    id: enemy.id,
    name: enemy.name,
    type: 'Enemy',
    rarity: enemy.rarity,
    level: enemy.rarity === 'Common' ? 1 : 
           enemy.rarity === 'Uncommon' ? 2 :
           enemy.rarity === 'Rare' ? 3 : 4,
    attack: enemy.stats.attack,
    defense: enemy.stats.defense,
    efficiency: enemy.stats.efficiency,
    skills: enemy.skills.map(skill => skill.name),
    skillEffects: enemy.skills.reduce((obj, skill) => {
      obj[skill.name] = skill.effect;
      return obj;
    }, {}),
    icon: enemy.icon,
    description: enemy.description
  };
}; 