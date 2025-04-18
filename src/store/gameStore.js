// Game state management with Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Initial item pools for the store
const storeItemPools = {
  entities: [
    {
      id: 'store-entity-1',
      name: 'Subject T-12',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 14,
      defense: 10,
      efficiency: 0.9,
      skills: ['Rapid Cellular Growth'],
      icon: 'https://media-hosting.imagekit.io/afe9022012844504/Subject%20T-12.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=f31EJ~Xe4CWyG9NRKMmPrllw3rNm4a~V-xHY5dtvcc2F8uFXK7i7hOLD6PnXzl1TyRsu0-1p~luuPjvVZeqDkUbsD4WImVSWZbuQ72ZSVfIKP1w0syfqgsg04t27LCMh8p38OzOsX~w4Lq3-cG8TMUs5aDjo2i75f6QRGQqK5-moi0cf8TFCohazLUl5mLdMj4L8YXRCLKQH097SgCN32~0CPqV3Rbo0X4o7WCbjWoeBCX8WE7GFrNEE7YyOWPg7ND2cDsuu9laiQ68pT5PBUOz8uXko-Gy4iMXJi~SfVmqtThZpLv0EaeGtVANbLOkn6G-3Maq~wVDtKCy37Y3O4w__',
      description: 'Humanoid with regenerative cellular structure that grows rapidly when stimulated.',
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
      defense: 14,
      efficiency: 1.1,
      skills: ['Phase Shift'],
      icon: 'https://media-hosting.imagekit.io/77269497954f4af0/Phase%20Larva.png?Expires=1839601521&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KkNjXQL4Fk5q54jUnFgIauVsf8nG74BsZExdAYDBjO8Ngn46Si4tMsMUXQeO2-O5MBck8ze1jgeq0~roJV2LhfLB4W3jIYqlpERiFj2R1SQd~ipu6iivjSTtCrCef~NDksTG2Ts66nnscdN-Y2e2JK9u9ECg7xbL22W4BpT30PsckpHBzbLTVFHbSCek1YLqNvgMlfkQpjqjPHtV7MdgFcG65eHnSpR2DWlYRGIAOsTI1a6R6F~EcZpybgm-gC0KWibUa0HM4HDChvyg6yPXlK5hTN19qAWWXz2Jq0gf20GxJDUr-ke27nzoSZ9f6OPwK627McVAAPDixOGeh5vvKg__',
      description: 'Insectoid that can shift between phases of matter unpredictably.',
      price: 375,
      stock: 1
    },
    {
      id: 'store-entity-3',
      name: 'Aberrant Choir',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 18,
      defense: 22,
      efficiency: 1.2,
      skills: ['Psionic Resonance', 'Harmonic Disruption'],
      icon: 'https://media-hosting.imagekit.io/8eb6fee7073542b9/Aberrant%20Choir.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RdkSHZIduTZAEBF32zBWYZHIY~NS-Syv6MNB8Esm7GDlScm0eCdcAGH~YmjE5IF4BQrmVKZ0-4dvs6KR0jdV4KXrcudPPanAWSUPBXMvmfRQKL58ZtQAk5SlEXlwOzr1srV7mIW4SEe9z5dhVpGlWRFC0nvWUE00jXFBuD17hC8izogypzv5c~W-PgqoQdIjh5ud310l2z~QFdUV-QGmGHt2Kvd~Zxn9Su0wu-WEq4lNhCOY9GwIfHpUsOToAa6Ct-vqFfumYE0SdgIMF0UZsihhoukbDWfJG3JCoVQwSBQP4Okdvk87g2p3i25kbiRXFym51czln8sIG5~VtieHZw__',
      description: 'A writhing mass of conjoined figures that constantly chant in a lost dialect. Reacts strongly to psionic frequencies.',
      price: 360,
      stock: 1
    },
    {
      id: 'store-entity-4',
      name: 'Subject ZK-04',
      type: 'Entity',
      rarity: 'Common',
      level: 1,
      attack: 20,
      defense: 16,
      efficiency: 1.3,
      skills: ['Phase Shift', 'Reality Anchor'],
      icon: 'https://media-hosting.imagekit.io/c98ac7d712ed4985/Subject%20ZK-04.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pBpKu2aA7Ou~FUZM8rzPCGM5ToduhFKm5miUCpGA4TnC9HxdDM63my9eUPNUeJXmndlLFeWuxGOGYIyc4HUEtAnIUBPosZOXZYuPRQzvOl8IWD7l18XlX7wbmhlaz1q-XaYZmxsSZxXtjql-W~UonZ97cXlNk499A0NIy32t7p033psYy7sLfofKrbgydJOa49bMPTPBpeMDvKQVU0oUjvbPytu~zMjBuhxT4NxS2NQFRN6YKa7r4kFYL6bMOdg0CoJayYibMwN59I31I1LpSPnOWkZH6MWtC3ONGMUU7yKgP97-ebB~uKFAfaGTVsdZoLU8bFD23ZXTk4nBhedXtQ__',
      description: 'A humanoid anomaly with inconsistent corporeality. Appears partially phased out of baseline reality.',
      price: 370,
      stock: 1
    },
    {
      id: 'store-entity-5',
      name: 'Glassbound Beast',
      type: 'Entity',
      rarity: 'Rare',
      level: 2,
      attack: 22,
      defense: 19,
      efficiency: 1.1,
      skills: ['Thermal Emission', 'Crystal Refraction'],
      icon: 'https://media-hosting.imagekit.io/6020f1e36c31454b/Glassbound%20Beast.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JyoW9BiwNCDkeA~LBVBPb6ET7bblgiY1rpAPtXM2nHZU8thBXaih2P5P8BOm-xesnBmTTJEoOk6H0sEE8Kkn-Ce7wyPV2eS4JVfrcQhh1KOIOG-hZ-vnMiKiAncqid09Q0JLC6crpzYmbAMEgZpmWkb8IYie~XUPrdaXATsyHGPQiKUbcXBIXxCN~s0KBvT9Hrwd6HB93GVvS17YsC-138Xryfl9PobXqXgPFlCoNhk7rG2hTD02JnKD0v1SDguRD7dIDwmBY~gXkuLFRn6KhKoM6ozEfMAYPuwMuUfBRlTHIaRQsKwD5aASShWx2LvCgw4R2DEUWJiFcdGvLL2Zag__',
      description: 'Semi-organic creature bound in crystalline growths. Its core emits anomalous heat signatures.',
      price: 570,
      stock: 1
    }
  ],
  equipment: [
    {
      id: 'store-equip-1',
      name: 'Technician Gloves',
      type: 'Gear',
      rarity: 'Common',
      level: 1,
      defenseBonus: 10,
      icon: '/assets/gear/tech-gloves.png',
      description: 'Reinforced gloves used during biohazard transfer.',
      price: 240,
      stock: 2
    },
    {
      id: 'store-equip-2',
      name: 'Null Entropy Visor',
      type: 'Gear',
      rarity: 'Common',
      level: 1,
      efficiencyBonus: 0.2,
      icon: 'https://media-hosting.imagekit.io/70be7e0c26384639/Null%20Entropy%20Visor.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=GHDKxePUattiwy1kiWTpOIAqjjq7JnA9u9nTB7NTHaD-2SED07COTiE3dwrF6hyNvC3TojoIDGTtGk1QFJ~-GxmZSJh~-nu3FdnJqu0ZjgD5uZiK3OGnZoxLUvxWHQOIS-h9ehqIRpF33coF5IqbM89KHLHyK8TitygNBWxQP4SgsxAa3LK3aTLsIrpT3VlP-m7U0zDcH0TsLz6O4rJEk7dqEKVXQlhIhzB5-NlvPVmKjLlXtXPj3l9xVlQ6N4LbvKSwQASnkZVj~7tGMa5UkIsO23yMVdnA7kI7EP3CWM4NfAax0J7hZI5t3Kj84yD0NKuPjjl3yIwAiaRpIfPp~A__',
      description: 'Protects wearer\'s brain from external cognitive noise.',
      price: 260,
      stock: 2
    },
    {
      id: 'store-equip-3',
      name: 'Resonant Binding Straps',
      type: 'Gear',
      rarity: 'Rare',
      level: 2,
      defenseBonus: 18,
      icon: 'https://media-hosting.imagekit.io/451d6cd50a764c77/Resonant%20Binding%20Straps.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=s8caeFGCWCvHcF0JBWrqgCnhU9nKro36TxhJdvBQ7AmnywCERG-ZuNszHUqa951hBHGt2iHhoSWT4dZ3f0nTj5urfV0lU3fNWsAMaPCZzm3KIOpqfZUVgMKQ-Xxn5vlDE5uxPyZSOJHNah-FZ5G3ZjmeaZ4sK-45fqtl7gdIF7eZ9g4jKJkkMzsaN5h~H9t0xe7ypr3YRWoheN-jxrltAD-WiL8HgD2eIzToyQFXISjd87D5sjYKTRZxRvS5sArdZRsDGxA9sFI9zG7Vthz1gWHSVhWh1-njT7Yj8ekJ6a8Kh5y4ph3--KYYPHtGYQd2Gdac99tNCYtdmwoKQ~TGig__',
      description: 'Suppresses minor telekinetic flares during transfer.',
      price: 420,
      stock: 2
    },
    {
      id: 'store-equip-4',
      name: 'Hollow-Eye Goggles',
      type: 'Gear',
      rarity: 'Rare',
      level: 2,
      efficiencyBonus: 0.3,
      icon: 'https://media-hosting.imagekit.io/bb8ee0bb4dfd48c3/Hollow-Eye%20Goggles.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pDDeeHvMqlSihd53kNHc~I0eHXK8HqPGXq0JOPZjcui-syUQCAdWvFEKmxkuRmDWTPDWDDIHGVEazIn-pemqCFj1fe2lX8195kTVMssNHQ8O6LnPGQTi26zX5HxhT8FNLfAfWaLmLfR-ARhP7b0My8BPfdXEYzFeCHPmPerWIgJsaAAxZ5wlZ5h~IZzgFPkwZr7ApgO1ywLXB4U3yccjhIQdJddzduG6Bzjfmu~QTRV31n8tcW-NQqRC22RAYHbYTdyfgK-cKN9S9spNUddSPUEu4vzgbbdaD58kNDWNffW1Xof0TYpOqVPyPeAR8rguJrIfyxB~aAQRvcLygMyaeA__',
      description: 'Improves anomaly interaction stability.',
      price: 440,
      stock: 2
    },
    {
      id: 'store-equip-5',
      name: 'Carbon Spinal Harness',
      type: 'Gear',
      rarity: 'Rare',
      level: 2,
      defenseBonus: 16,
      icon: 'https://media-hosting.imagekit.io/dcd5980674e64ab6/Carbon%20Spinal%20Harness.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ZXvQzUMovkBf2AtuQZJN~guS0pBZaV72ybPslremLHQyfdiIsAk2Ai-ynSCVKh0OSej2wUppluzxPy8k5sAzH2HzuU8sF-rWrnOc42F70V0p3o-dZ9iyFbx8J4JMvuecbwLtSdAb3mKTIQBH7GNuCxKwAwUA4t~POmxeWvDHmfdn3kuxYpGTCS41Ep8cfEBH86ab7QwJ7UqzBblQXI8HZpkfv8MhxhoJHEsGaRB6uhK9cES65W1Pxf69ATX8GKNM2WJ6c4hEwe7FBGGVV73aCRyRRM~XC1M9hZh1uM9xQPGxP9mj3wqoRtJQ09V2NIt5CDMeyB~1ozqYMVSMLWJvYg__',
      description: 'Military reinforcement vest with spinal override chip.',
      price: 400,
      stock: 2
    },
    {
      id: 'store-equip-6',
      name: 'Containment Suit',
      type: 'Gear',
      rarity: 'Rare',
      level: 2,
      defenseBonus: 15,
      icon: 'https://media-hosting.imagekit.io/40a4042ab1044886/Containment%20Suit.png?Expires=1839583009&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0PmkCpREh0QFBhhuJWV7uBXQ4fYwWub6vSRbB9XCeyqnx3ppjYvgINPouCDkhPdN41k5aWqKPk-jo2Kke-HUZ4J9ExTgKpN36lQ4z4uBS3Ej6q97bVfZj197dl~SI4W26gIXZqvQssr-pMafJV82v51JVXRL6uJ7VIpir7oAR0~eAs94tTA33cD66ENkQUQ1mTK3lbNebFoEG529FMcf-wABxj5omyDme08Tdmtm0wTUUZucQyy2tyZyMER3uMpPRbDAJqVRJKb4uZr1KFc0utBJlTyCMhjoXqBzFbeLVLbBgs5AazDjnwGJ5yw4FHGc4eWPnaWNhzUR5kmXczopDw__',
      description: 'A high-tech protective suit designed for exploring hostile or unstable environments. Provides enhanced defense and reduces the risk of contamination or injury. A must-have for any high-risk mission into SCP territories.',
      price: 430,
      stock: 2
    }
  ],
  items: [
    {
      id: 'store-item-1',
      name: 'Crystallized Thought Core',
      type: 'Object',
      rarity: 'Rare',
      effect: {
        type: 'rarityBoost',
        value: 15
      },
      icon: 'https://media-hosting.imagekit.io/76b96d344f3c4e23/Crystallized%20Thought%20Core.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2rZXwnfjhwzyFf3UEcOt376OJNIMBp6k3vOZ57Tjd-ItsGmcCmB5LLVfvTedz02jm8lsCwOCCd7NmdqiIo9A7DxXNiEYWfIgcUaHJroJPRJd9ciOHbWJ9YrnM7IEBjYDW0FiT-~vQDgabGzddGQwuTydvgFXJJSMIpZzKmWMk8gqp1ceTAJu5fY~z5PS~Gp7~crCSOLDY-ctnQb965DHMVY06gnEvQxf1Nv47ZL21izV5wwrkP30-I6kdTSXrwmNn55mcxgmWIruQYdbTztbzbtGrgzSp~7x-gu8AYpGUOMWbFVjTWbzrwU1kX2FMzZFbAAhxIO76ee2Ln6gjAglRA__',
      description: 'Solidified mental residue. Enhances high-tier fusion results.',
      price: 300,
      stock: 3
    },
    {
      id: 'store-item-2',
      name: 'Stabilized Cell Cluster',
      type: 'Object',
      rarity: 'Rare',
      effect: {
        type: 'levelBoost',
        value: 1
      },
      icon: 'https://media-hosting.imagekit.io/32de384f9ce44f15/Stabilized%20Cell%20Cluster.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=B4XmCki~u0qdyYo9XsnGd9-gIsTs-EhokuivxrENlyHygbXkqluXiESoE1OuAqLTpaWKjLeE0rAYXu0~jUr8Nn75~7yCwS4ei40nacjw8bCZxL6Y2xlsaY93MDax0nPRJDISvnTSjaa0IZNvmgTwvcfA1IL5SESohRpQpbHQbaqMwqSiiNBAMfy9UlIs9C2FHE8IwfS40ZGF8S1yo35Xe2fob~uJdO7O4fL6zL0J0dUl9IUbaN3FDPWDf4vTENwggNdfxHLSr~SLq9N1KwEwspb3o8B3Gad3c~nOrui40mdb4WfK4TofsivDfIHg~kOSte6xTslBa3O6C2F3EJktVA__',
      description: 'Experimental tissue sample stabilized for rapid evolution.',
      price: 280,
      stock: 3
    },
    {
      id: 'store-item-5',
      name: 'Neural Salt Ampoule',
      type: 'Object',
      rarity: 'Rare',
      effect: {
        type: 'skillQuality',
        value: 1
      },
      icon: 'https://media-hosting.imagekit.io/c71540061e6942ea/Neural%20Salt%20Ampoule.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lxBHv8TX3ufydHWZAO4BIBVM~irMXpSmHzSvegOdFCG6IHSGbYLRgcUsWv6~ynIiBrjoSRDWVor03dul1FhL~e~LngbTGgL3wLaIhtK~U9IC3c6etciLnVQXS6b08qHkTnPoL2FaYnaIBWp2VvFyWaLmwk3MNjdJPgKNw7Jvrez7s7HQHQtX53hiZf~ZtAmU~OVLzZtcKw7t-jjkkdN4YvFcGlgTaqkpL1L6a4QOIXQunkAyiBUjZSeRsj5Snkctq3JzY82jaG0dsjrHCY0spJFy7FfhH6NfDRSusON41A8JbRyJE7wb-IBZQma1uCVXRqxmc6uY5POYdTnkBAE7Jw__',
      description: 'Enhances neurological imprint of fused result.',
      price: 350,
      stock: 3
    },
    {
      id: 'store-item-3',
      name: 'Memory Seed',
      type: 'Object',
      rarity: 'Rare',
      effect: {
        type: 'rarityBias',
        value: 'Epic'
      },
      icon: 'https://media-hosting.imagekit.io/1d9000ae85194894/Memory%20Seed.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TyaZDwA5A6PZr3OdhWAP8qwTZ0gZF1b~ByM6bLQFZiL7BfvUZjiFmqJqJibXU4sozjhneYAYyP86J3lHWv5jEm2fUoErzBkDzkRYcZ5xZc-UQIy2K4uvyyAnH3s4bo3L6CMITQwnTEruqx1hobO2B6-L7PzVmIfYUgBAQWNHFljIzmxkMqgOL5qa0sBDwmYqhmiVJ1OmcH1e4NmTYIxM6UZklo24D7NYN5Q6T38YHls8EfIH6-XutLYsm~OwYdp2vl0gTXnRSCYiec7H0o9S3Y6nC73UiMFKO4zUuEad12PjdX64UVP-Gs5DeWqT8A6UB91AYtES9Ok7ocmD-WtJ5A__',
      description: 'Final fragment of consciousness from Class-Ω instance.',
      price: 360,
      stock: 3
    },
    {
      id: 'store-item-4',
      name: 'Entropy Splice Kit',
      type: 'Object',
      rarity: 'Rare',
      effect: {
        type: 'maturityBoost',
        value: 2
      },
      icon: 'https://media-hosting.imagekit.io/839badcbcd9f48f9/Entropy%20Splice%20Kit.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=QX1QhKNKI-CeO9~aqeiiWfqOGnNLu8PxVm2In95UNEeYZLposzLn0YKEbaQREwJ8CyrQ-LIvm4nGiDyJ71VytFKs0jqW~xuXl~~b1B8~8XBs9tOBbz3T-5E5-ceTVS1A5UDT35WNdsO3fz6Eulekv4A7j6kTy1p-IoDdILF6uFYVievx1jr8Wvu1iLRPtmPdLzHvr1lvd1VurmevvGGyVdK42EK4BOc4tMIJAJ4MqjGsyGCwvP4u3OHqI3m~tP3-I5cKHYD7baMmh~YZlKDDPkotfhkqRcG5hH8IrAneRQqHjEa9rnmoN16owjdO67fVEHNy~fFaSoUeO8nL7Wn0zw__',
      description: 'Splice-layer injectors from recursive clone trials.',
      price: 330,
      stock: 3
    }
  ],
  materials: [
    {
      id: 'store-mat-1',
      name: 'SCP-grade Alloy',
      type: 'Material',
      rarity: 'Common',
      effect: {
        type: 'research',
        value: 10
      },
      icon: 'https://media-hosting.imagekit.io/6806bdaf400641eb/SCP-grade%20Alloy.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=I1KpgIImOydyaWgNc7-f9NnBD9FdSbvajsoVpm~chyBjme2ekNcVzrNsKQBbU7wfxAqSNYRBhtKlO0JQ44pAA6RytpTx3i90KE~fqqgpDOa0lcFxVxxAF3sMA571UscJNxYZ-naHH3kcrM9e4TpPfLhOnNt1i4~a2tFZGO6ST66Ulpr~2tI9dHnDGCHce6aXtUk6GNGjV2o1uns0pVZsDg6FsARMfS6Ta0Pecaf74VkU~SPzGSjTQ879mjYK-XpzETiUiRRk2Pte3rAzs33KSsLakXLCRgSnDFzZGzoeEPlwsaKu2r0JmAw7eZ3BGDy0~2HevBmsBYNbW996FN3q6w__',
      description: 'Military-grade metal recovered from Site-Δ12.',
      price: 220,
      stock: 4
    },
    {
      id: 'store-mat-2',
      name: 'Obsidian Tag',
      type: 'Material',
      rarity: 'Common',
      effect: {
        type: 'unlock',
        value: 1
      },
      icon: 'https://media-hosting.imagekit.io/41a519478df5492b/Obsidian%20Tag.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=LUhx~TUWXd5YnfVZObaCDzifAnJQro7L0K7Z0QYuwYxWf4CYMZlNGrka0-uWgROMTweqXBeQY2OPGfkUDLLopSP7QMuEFgmO2YXpAaobuNd9nMiMa4qlVfpvFAuHIB29oHNhs8pmy4sAGq926x~2nc5-31HlVujTn1d4hk61LF1899bImYtKNQ16VOo1N07NbENYAXsp0Er6zYOeaMkbdNuruqKdhplhuwFYqh6lV5dPMmjRgTZOUvBzEbs7InXOLQY9UYmBxBA15WoUJfuYRv9KsIs5TFbjQX~PlOgC-f6CQ~XDQIPbDDrehcDKQmIZwWxf7evDHxY6V~dB62oRXA__',
      description: 'Ancient ID plate containing corrupted data.',
      price: 190,
      stock: 4
    },
    {
      id: 'store-mat-3',
      name: 'Blacksite Carbon Mesh',
      type: 'Material',
      rarity: 'Common',
      effect: {
        type: 'crafting',
        value: 1
      },
      icon: 'https://media-hosting.imagekit.io/c6b3c83984204081/Blacksite%20Carbon%20Mesh.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PUJVg32VR7bi8mIxybcfXfqsa3pL332Nkp8bG5QaHQBFdq2JyqpydMnM2EH8vg0mHjqnPU5hg8a78a0PZoNTyBKcV36VKh50YkhSjFiMEinY0q~5K2mzutU39A4kpPoEmeV73rA12lJg2au-G0eZRLffXPiVQg6mGxgswTe6~ivce65Hx5vLBMv2ivyQj63OiibD7gaBpzjFaVUYr5hBDIMNwzLUqzL7BrZYYIC-ey5Xm5yNboj5Pz9M-D1-HHpimAs~bABR6m1hLFrzEnfFBAjLkNjdd~jvfuEwmCrvLT-lz3Zv2czZ8pSQsZrhwi8ZCMn4ujeKxO0oF9VkD7qGiQ__',
      description: 'Salvaged from Sector-Δ rupture zone.',
      price: 280,
      stock: 4
    },
    {
      id: 'store-mat-4',
      name: 'Isolated Tag Fragment',
      type: 'Material',
      rarity: 'Common',
      effect: {
        type: 'research',
        value: 15
      },
      icon: 'https://media-hosting.imagekit.io/96ee1c3d447f4607/Isolated%20Tag%20Fragment.png?Expires=1839563441&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OkZi-TxojdLvTbJuYiFPwAXXC1QNj4uy8o5yJvsnnsa4Zs5QyxJXp4mZy~bWjTvuy0X9ESI4dgnByJV0X2oz2pfb8WepCBWF7NZVhUyR4r9ihWWTbJsnk900ws1wzljpOv8qy3~5bHLSRVKTdRK4hxLQhl7IGc66-6IOyu1fpXQlW8llALX5jEsLSqqI18lsKe~IdmbzH4Y1j9lYkITH1-WZq3K1AK6ow1W57~8Y3aOfUFl0wctBBpZtj3zDToIW~Sp5EZ6GYP4rNz~gB1o1ful1fB4aNgkJJGqkWXWN2bpVO9ZvHRJFrYw8omBRmEL0v7wOU84~t~EM9GU40p-2qQ__',
      description: 'Half-burned identifier with anomalous readings.',
      price: 250,
      stock: 4
    },
    {
      id: 'store-mat-5',
      name: 'Redline Growth Pod',
      type: 'Material',
      rarity: 'Rare',
      effect: {
        type: 'upgrade',
        value: 1
      },
      icon: 'https://media-hosting.imagekit.io/a208a4e8d9de4cdb/Redline%20Growth%20Pod.png?Expires=1839563441&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=QLRdJXWL7JkG3iYmShadI1VBJn12RTtqSpuKJtIIJXEkg0KET7hXXvjqkIGi7c-L8EMiZkZXQYF74Ava7~lU4r9xOpFilKf5WMPJby9aD63rjdQZOwbNZk92SPmTAAnPlT-z5nBaUlBRqwXXe7k2Jjj4J31q2lj06WdJ6wpf4EAKfpdwOq0GwUrkh9K0jOc39iGv-woBopr8YVac3ofVjWl7QAXv5dwpWRHlnO9ZreIdEts0cEkm8CmsQPN7J9xNce1Vnbrl4Y8MPudWZRAQ6FJOMrIqPTI61tulWXQu33Sfhzu731TmmM7IDRsSwyqN0o~f~Na2sxGGDnmstno4IA__',
      description: 'Accelerates organic material expansion.',
      price: 300,
      stock: 4
    }
  ]
};

// Initial state for resetting
const initialState = {
  player: {
    name: "Agent-X",
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    avatar: "/assets/avatar/default.png",
    levelHistory: [{
      level: 1,
      achievedAt: Date.now(),
      totalXpEarned: 0
    }],
    totalXpEarned: 0
  },
  // Player statistics for tracking achievements
  playerStats: {
    anomaliesContained: 0,
    researchCompleted: 0,
    battlesWon: 0,
    resourcesCollected: 0,
    lastUpdateTimestamp: Date.now()
  },
  resources: {
    gold: 1250,
    energy: 78,
    energyCap: 100,
    research: 325
  },
  storage: {
    capacity: 50,
    entities: [
      {
        id: "entity-1",
        name: "Aberrant Choir",
        type: "Entity",
        rarity: "Common",
        level: 1,
        attack: 18,
        defense: 22,
        efficiency: 1.2,
        skills: ["Psionic Resonance", "Harmonic Disruption"],
        icon: "https://media-hosting.imagekit.io/8eb6fee7073542b9/Aberrant%20Choir.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RdkSHZIduTZAEBF32zBWYZHIY~NS-Syv6MNB8Esm7GDlScm0eCdcAGH~YmjE5IF4BQrmVKZ0-4dvs6KR0jdV4KXrcudPPanAWSUPBXMvmfRQKL58ZtQAk5SlEXlwOzr1srV7mIW4SEe9z5dhVpGlWRFC0nvWUE00jXFBuD17hC8izogypzv5c~W-PgqoQdIjh5ud310l2z~QFdUV-QGmGHt2Kvd~Zxn9Su0wu-WEq4lNhCOY9GwIfHpUsOToAa6Ct-vqFfumYE0SdgIMF0UZsihhoukbDWfJG3JCoVQwSBQP4Okdvk87g2p3i25kbiRXFym51czln8sIG5~VtieHZw__",
        description: "A writhing mass of conjoined figures that constantly chant in a lost dialect. Reacts strongly to psionic frequencies."
      },
      {
        id: "entity-2",
        name: "Subject ZK-04",
        type: "Entity",
        rarity: "Common",
        level: 1,
        attack: 20,
        defense: 16,
        efficiency: 1.3,
        skills: ["Phase Shift", "Reality Anchor"],
        icon: "https://media-hosting.imagekit.io/c98ac7d712ed4985/Subject%20ZK-04.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pBpKu2aA7Ou~FUZM8rzPCGM5ToduhFKm5miUCpGA4TnC9HxdDM63my9eUPNUeJXmndlLFeWuxGOGYIyc4HUEtAnIUBPosZOXZYuPRQzvOl8IWD7l18XlX7wbmhlaz1q-XaYZmxsSZxXtjql-W~UonZ97cXlNk499A0NIy32t7p033psYy7sLfofKrbgydJOa49bMPTPBpeMDvKQVU0oUjvbPytu~zMjBuhxT4NxS2NQFRN6YKa7r4kFYL6bMOdg0CoJayYibMwN59I31I1LpSPnOWkZH6MWtC3ONGMUU7yKgP97-ebB~uKFAfaGTVsdZoLU8bFD23ZXTk4nBhedXtQ__",
        description: "A humanoid anomaly with inconsistent corporeality. Appears partially phased out of baseline reality."
      },
      {
        id: "entity-3",
        name: "Glassbound Beast",
        type: "Entity",
        rarity: "Rare",
        level: 1,
        attack: 22,
        defense: 19,
        efficiency: 1.1,
        skills: ["Thermal Emission", "Crystal Refraction"],
        icon: "https://media-hosting.imagekit.io/6020f1e36c31454b/Glassbound%20Beast.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JyoW9BiwNCDkeA~LBVBPb6ET7bblgiY1rpAPtXM2nHZU8thBXaih2P5P8BOm-xesnBmTTJEoOk6H0sEE8Kkn-Ce7wyPV2eS4JVfrcQhh1KOIOG-hZ-vnMiKiAncqid09Q0JLC6crpzYmbAMEgZpmWkb8IYie~XUPrdaXATsyHGPQiKUbcXBIXxCN~s0KBvT9Hrwd6HB93GVvS17YsC-138Xryfl9PobXqXgPFlCoNhk7rG2hTD02JnKD0v1SDguRD7dIDwmBY~gXkuLFRn6KhKoM6ozEfMAYPuwMuUfBRlTHIaRQsKwD5aASShWx2LvCgw4R2DEUWJiFcdGvLL2Zag__",
        description: "Semi-organic creature bound in crystalline growths. Its core emits anomalous heat signatures."
      }
    ],
    gear: [
      {
        id: "gear-1",
        name: "Containment Suit",
        type: "Gear",
        rarity: "Rare",
        level: 2,
        defenseBonus: 15,
        icon: "https://media-hosting.imagekit.io/40a4042ab1044886/Containment%20Suit.png?Expires=1839583009&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0PmkCpREh0QFBhhuJWV7uBXQ4fYwWub6vSRbB9XCeyqnx3ppjYvgINPouCDkhPdN41k5aWqKPk-jo2Kke-HUZ4J9ExTgKpN36lQ4z4uBS3Ej6q97bVfZj197dl~SI4W26gIXZqvQssr-pMafJV82v51JVXRL6uJ7VIpir7oAR0~eAs94tTA33cD66ENkQUQ1mTK3lbNebFoEG529FMcf-wABxj5omyDme08Tdmtm0wTUUZucQyy2tyZyMER3uMpPRbDAJqVRJKb4uZr1KFc0utBJlTyCMhjoXqBzFbeLVLbBgs5AazDjnwGJ5yw4FHGc4eWPnaWNhzUR5kmXczopDw__",
        description: "A high-tech protective suit designed for exploring hostile or unstable environments. Provides enhanced defense and reduces the risk of contamination or injury. A must-have for any high-risk mission into SCP territories."
      }
    ],
    items: [
      {
        id: "item-1",
        name: "Crystallized Thought Core",
        type: "Object",
        rarity: "Epic",
        effect: {
          type: "rarityBoost",
          value: 15
        },
        icon: "https://media-hosting.imagekit.io/76b96d344f3c4e23/Crystallized%20Thought%20Core.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2rZXwnfjhwzyFf3UEcOt376OJNIMBp6k3vOZ57Tjd-ItsGmcCmB5LLVfvTedz02jm8lsCwOCCd7NmdqiIo9A7DxXNiEYWfIgcUaHJroJPRJd9ciOHbWJ9YrnM7IEBjYDW0FiT-~vQDgabGzddGQwuTydvgFXJJSMIpZzKmWMk8gqp1ceTAJu5fY~z5PS~Gp7~crCSOLDY-ctnQb965DHMVY06gnEvQxf1Nv47ZL21izV5wwrkP30-I6kdTSXrwmNn55mcxgmWIruQYdbTztbzbtGrgzSp~7x-gu8AYpGUOMWbFVjTWbzrwU1kX2FMzZFbAAhxIO76ee2Ln6gjAglRA__",
        description: "A crystallized core of alien thought patterns. Increases rarity chance in fusion."
      },
      {
        id: "item-2",
        name: "Stabilized Cell Cluster",
        type: "Object",
        rarity: "Rare",
        effect: {
          type: "levelBoost",
          value: 1
        },
        icon: "https://media-hosting.imagekit.io/32de384f9ce44f15/Stabilized%20Cell%20Cluster.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=B4XmCki~u0qdyYo9XsnGd9-gIsTs-EhokuivxrENlyHygbXkqluXiESoE1OuAqLTpaWKjLeE0rAYXu0~jUr8Nn75~7yCwS4ei40nacjw8bCZxL6Y2xlsaY93MDax0nPRJDISvnTSjaa0IZNvmgTwvcfA1IL5SESohRpQpbHQbaqMwqSiiNBAMfy9UlIs9C2FHE8IwfS40ZGF8S1yo35Xe2fob~uJdO7O4fL6zL0J0dUl9IUbaN3FDPWDf4vTENwggNdfxHLSr~SLq9N1KwEwspb3o8B3Gad3c~nOrui40mdb4WfK4TofsivDfIHg~kOSte6xTslBa3O6C2F3EJktVA__",
        description: "A cluster of stabilized anomalous cells. Increases starting level of fusion results."
      }
    ],
    materials: [
      {
        id: "material-1",
        name: "Magnetic Isotope",
        type: "Material",
        rarity: "Rare",
        effect: {
          type: "statBias",
          stat: "defense"
        },
        icon: "https://media-hosting.imagekit.io/f198748b700f49cc/Magnetic%20Isotope%20.webp?Expires=1839563666&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TGLE2oNM1XuJrCKUmhPmkgb9khBi0VsarSifV3hoPdpHfvu5xfOKGgPxbmw94~8y1hdYIaFG4sobcY6jnVnxPO8E1SOAX0wGSKN27Jt4Jf~i5AyE51eCcwDniB7Zj~9VcICQBOS~ER6-46wTAiFlqsXlFElWuQGDX2Yke3M0txFVqY0iJuiE6cK6Ww854IOuldako5ltT4mTIhWUcpci14wO~6WnqQfcsmS34CaqDEVFtd4DWi8AEhB6igNyAQY~qjALik9ICZBJLmU7bZdbQhfAlziExG6WUsmQj19p8Ka-GnVd~XqApaNTJamlVuQ25gUUt9wuwk7VkHqTNRXbhg__",
        description: "A magnetically charged isotope. Biases fusion results toward higher defense."
      },
      {
        id: "material-2",
        name: "Quantum Particle",
        type: "Material",
        rarity: "Rare",
        effect: {
          type: "statBias",
          stat: "efficiency"
        },
        icon: "https://media-hosting.imagekit.io/4d264de1fb0a4f58/Quantum%20Particle.png?Expires=1839565347&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=IreDmVQc-KEFig3OGCUmffrV2qjy2ZpqXbQ6iCRUztB2Z6~liiCYozO74iFHIoMv3DkFP8NkRwwZICMK~aaXUUADTzRupPrJaTZ7WRioqZK-m82FHVsmpd~me1hOIbaLKpbC8NyMVRQUUa4ej54v4WkrtaONmTFc3exOt4FyqZ~39Ls4PFXVXzKFmUwf5ueLej1d~mhfu0sP~n6TAHQPTHcT749VQmnhD9QpG4llHK5ovN-RMNK2iZyND3DmHpp8SePBrqg4Soq~dmPu-249-gXPWIrKJ9wCDB4Ml56dWeSEPfVLBNdR~LuoO5OWtxxsDYIssDkB8JkEqIKIukr4QA__",
        description: "A stabilized quantum particle. Biases fusion results toward higher efficiency."
      }
    ]
  },
  statusUpdates: [
    {
      id: 'update-1',
      type: 'anomaly',
      title: 'SCP-173 Contained',
      description: 'Successfully contained the statue entity.',
      time: '10 min ago',
    },
    {
      id: 'update-2',
      type: 'research',
      title: 'New Research Available',
      description: 'Advanced containment procedures unlocked.',
      time: '25 min ago',
    },
    {
      id: 'update-3',
      type: 'resource',
      title: 'Energy Restored',
      description: '+15 energy points from time bonus.',
      time: '45 min ago',
    },
    {
      id: 'update-4',
      type: 'battle',
      title: 'Breach Contained',
      description: 'Successfully prevented SCP-106 breach.',
      time: '1 hour ago',
    },
    {
      id: 'update-5',
      type: 'anomaly',
      title: 'SCP-682 Sighting',
      description: 'Dangerous entity detected near sector 4.',
      time: '2 hours ago',
    },
  ],
  productionRates: {
    gold: 15,
    energy: 2,
    researchPoints: 5,
  },
  currentResearch: {
    name: 'Advanced Containment',
    progress: 65,
    timeRemaining: '2h 15m',
  },
  containment: {
    slots: [
      { id: 1, entityId: null, deployedAt: null, collected: 0 },
      { id: 2, entityId: null, deployedAt: null, collected: 0 },
      { id: 3, entityId: null, deployedAt: null, collected: 0 }
    ],
    lastCollectedAt: null,
    baseProductionRate: 10
  },
  fusion: {
    fusionsToday: 0,
    dailyFusionLimit: 2,
    lastResetTimestamp: Date.now(),
    fusionCost: 300,
    defaultRarityChances: {
      common: 70,
      rare: 10,
      epic: 20
    },
    recentFusions: []
  },
  store: {
    inventory: {
      entities: [...storeItemPools.entities].sort(() => 0.5 - Math.random()).slice(0, 5),
      equipment: [...storeItemPools.equipment].sort(() => 0.5 - Math.random()).slice(0, 5),
      items: [
        {
          id: 'store-item-1',
          name: 'Crystallized Thought Core',
          type: 'Object',
          rarity: 'Rare',
          effect: {
            type: 'rarityBoost',
            value: 15
          },
          icon: 'https://media-hosting.imagekit.io/76b96d344f3c4e23/Crystallized%20Thought%20Core.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2rZXwnfjhwzyFf3UEcOt376OJNIMBp6k3vOZ57Tjd-ItsGmcCmB5LLVfvTedz02jm8lsCwOCCd7NmdqiIo9A7DxXNiEYWfIgcUaHJroJPRJd9ciOHbWJ9YrnM7IEBjYDW0FiT-~vQDgabGzddGQwuTydvgFXJJSMIpZzKmWMk8gqp1ceTAJu5fY~z5PS~Gp7~crCSOLDY-ctnQb965DHMVY06gnEvQxf1Nv47ZL21izV5wwrkP30-I6kdTSXrwmNn55mcxgmWIruQYdbTztbzbtGrgzSp~7x-gu8AYpGUOMWbFVjTWbzrwU1kX2FMzZFbAAhxIO76ee2Ln6gjAglRA__',
          description: 'Solidified mental residue. Enhances high-tier fusion results.',
          price: 300,
          stock: 3
        },
        {
          id: 'store-item-2',
          name: 'Stabilized Cell Cluster',
          type: 'Object',
          rarity: 'Rare',
          effect: {
            type: 'levelBoost',
            value: 1
          },
          icon: 'https://media-hosting.imagekit.io/32de384f9ce44f15/Stabilized%20Cell%20Cluster.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=B4XmCki~u0qdyYo9XsnGd9-gIsTs-EhokuivxrENlyHygbXkqluXiESoE1OuAqLTpaWKjLeE0rAYXu0~jUr8Nn75~7yCwS4ei40nacjw8bCZxL6Y2xlsaY93MDax0nPRJDISvnTSjaa0IZNvmgTwvcfA1IL5SESohRpQpbHQbaqMwqSiiNBAMfy9UlIs9C2FHE8IwfS40ZGF8S1yo35Xe2fob~uJdO7O4fL6zL0J0dUl9IUbaN3FDPWDf4vTENwggNdfxHLSr~SLq9N1KwEwspb3o8B3Gad3c~nOrui40mdb4WfK4TofsivDfIHg~kOSte6xTslBa3O6C2F3EJktVA__',
          description: 'Experimental tissue sample stabilized for rapid evolution.',
          price: 280,
          stock: 3
        },
        {
          id: 'store-item-5',
          name: 'Neural Salt Ampoule',
          type: 'Object',
          rarity: 'Rare',
          effect: {
            type: 'skillQuality',
            value: 1
          },
          icon: 'https://media-hosting.imagekit.io/c71540061e6942ea/Neural%20Salt%20Ampoule.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lxBHv8TX3ufydHWZAO4BIBVM~irMXpSmHzSvegOdFCG6IHSGbYLRgcUsWv6~ynIiBrjoSRDWVor03dul1FhL~e~LngbTGgL3wLaIhtK~U9IC3c6etciLnVQXS6b08qHkTnPoL2FaYnaIBWp2VvFyWaLmwk3MNjdJPgKNw7Jvrez7s7HQHQtX53hiZf~ZtAmU~OVLzZtcKw7t-jjkkdN4YvFcGlgTaqkpL1L6a4QOIXQunkAyiBUjZSeRsj5Snkctq3JzY82jaG0dsjrHCY0spJFy7FfhH6NfDRSusON41A8JbRyJE7wb-IBZQma1uCVXRqxmc6uY5POYdTnkBAE7Jw__',
          description: 'Enhances neurological imprint of fused result.',
          price: 350,
          stock: 3
        },
        {
          id: 'store-item-3',
          name: 'Memory Seed',
          type: 'Object',
          rarity: 'Rare',
          effect: {
            type: 'rarityBias',
            value: 'Epic'
          },
          icon: 'https://media-hosting.imagekit.io/1d9000ae85194894/Memory%20Seed.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TyaZDwA5A6PZr3OdhWAP8qwTZ0gZF1b~ByM6bLQFZiL7BfvUZjiFmqJqJibXU4sozjhneYAYyP86J3lHWv5jEm2fUoErzBkDzkRYcZ5xZc-UQIy2K4uvyyAnH3s4bo3L6CMITQwnTEruqx1hobO2B6-L7PzVmIfYUgBAQWNHFljIzmxkMqgOL5qa0sBDwmYqhmiVJ1OmcH1e4NmTYIxM6UZklo24D7NYN5Q6T38YHls8EfIH6-XutLYsm~OwYdp2vl0gTXnRSCYiec7H0o9S3Y6nC73UiMFKO4zUuEad12PjdX64UVP-Gs5DeWqT8A6UB91AYtES9Ok7ocmD-WtJ5A__',
          description: 'Final fragment of consciousness from Class-Ω instance.',
          price: 360,
          stock: 3
        },
        {
          id: 'store-item-4',
          name: 'Entropy Splice Kit',
          type: 'Object',
          rarity: 'Rare',
          effect: {
            type: 'maturityBoost',
            value: 2
          },
          icon: 'https://media-hosting.imagekit.io/839badcbcd9f48f9/Entropy%20Splice%20Kit.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=QX1QhKNKI-CeO9~aqeiiWfqOGnNLu8PxVm2In95UNEeYZLposzLn0YKEbaQREwJ8CyrQ-LIvm4nGiDyJ71VytFKs0jqW~xuXl~~b1B8~8XBs9tOBbz3T-5E5-ceTVS1A5UDT35WNdsO3fz6Eulekv4A7j6kTy1p-IoDdILF6uFYVievx1jr8Wvu1iLRPtmPdLzHvr1lvd1VurmevvGGyVdK42EK4BOc4tMIJAJ4MqjGsyGCwvP4u3OHqI3m~tP3-I5cKHYD7baMmh~YZlKDDPkotfhkqRcG5hH8IrAneRQqHjEa9rnmoN16owjdO67fVEHNy~fFaSoUeO8nL7Wn0zw__',
          description: 'Splice-layer injectors from recursive clone trials.',
          price: 330,
          stock: 3
        }
      ],
      materials: [
        {
          id: 'store-mat-1',
          name: 'SCP-grade Alloy',
          type: 'Material',
          rarity: 'Common',
          effect: {
            type: 'research',
            value: 10
          },
          icon: 'https://media-hosting.imagekit.io/6806bdaf400641eb/SCP-grade%20Alloy.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=I1KpgIImOydyaWgNc7-f9NnBD9FdSbvajsoVpm~chyBjme2ekNcVzrNsKQBbU7wfxAqSNYRBhtKlO0JQ44pAA6RytpTx3i90KE~fqqgpDOa0lcFxVxxAF3sMA571UscJNxYZ-naHH3kcrM9e4TpPfLhOnNt1i4~a2tFZGO6ST66Ulpr~2tI9dHnDGCHce6aXtUk6GNGjV2o1uns0pVZsDg6FsARMfS6Ta0Pecaf74VkU~SPzGSjTQ879mjYK-XpzETiUiRRk2Pte3rAzs33KSsLakXLCRgSnDFzZGzoeEPlwsaKu2r0JmAw7eZ3BGDy0~2HevBmsBYNbW996FN3q6w__',
          description: 'Military-grade metal recovered from Site-Δ12.',
          price: 220,
          stock: 4
        },
        {
          id: 'store-mat-2',
          name: 'Obsidian Tag',
          type: 'Material',
          rarity: 'Common',
          effect: {
            type: 'unlock',
            value: 1
          },
          icon: 'https://media-hosting.imagekit.io/41a519478df5492b/Obsidian%20Tag.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=LUhx~TUWXd5YnfVZObaCDzifAnJQro7L0K7Z0QYuwYxWf4CYMZlNGrka0-uWgROMTweqXBeQY2OPGfkUDLLopSP7QMuEFgmO2YXpAaobuNd9nMiMa4qlVfpvFAuHIB29oHNhs8pmy4sAGq926x~2nc5-31HlVujTn1d4hk61LF1899bImYtKNQ16VOo1N07NbENYAXsp0Er6zYOeaMkbdNuruqKdhplhuwFYqh6lV5dPMmjRgTZOUvBzEbs7InXOLQY9UYmBxBA15WoUJfuYRv9KsIs5TFbjQX~PlOgC-f6CQ~XDQIPbDDrehcDKQmIZwWxf7evDHxY6V~dB62oRXA__',
          description: 'Ancient ID plate containing corrupted data.',
          price: 190,
          stock: 4
        },
        {
          id: 'store-mat-3',
          name: 'Blacksite Carbon Mesh',
          type: 'Material',
          rarity: 'Common',
          effect: {
            type: 'crafting',
            value: 1
          },
          icon: 'https://media-hosting.imagekit.io/c6b3c83984204081/Blacksite%20Carbon%20Mesh.png?Expires=1839562166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PUJVg32VR7bi8mIxybcfXfqsa3pL332Nkp8bG5QaHQBFdq2JyqpydMnM2EH8vg0mHjqnPU5hg8a78a0PZoNTyBKcV36VKh50YkhSjFiMEinY0q~5K2mzutU39A4kpPoEmeV73rA12lJg2au-G0eZRLffXPiVQg6mGxgswTe6~ivce65Hx5vLBMv2ivyQj63OiibD7gaBpzjFaVUYr5hBDIMNwzLUqzL7BrZYYIC-ey5Xm5yNboj5Pz9M-D1-HHpimAs~bABR6m1hLFrzEnfFBAjLkNjdd~jvfuEwmCrvLT-lz3Zv2czZ8pSQsZrhwi8ZCMn4ujeKxO0oF9VkD7qGiQ__',
          description: 'Salvaged from Sector-Δ rupture zone.',
          price: 280,
          stock: 4
        },
        {
          id: 'store-mat-4',
          name: 'Isolated Tag Fragment',
          type: 'Material',
          rarity: 'Common',
          effect: {
            type: 'research',
            value: 15
          },
          icon: 'https://media-hosting.imagekit.io/96ee1c3d447f4607/Isolated%20Tag%20Fragment.png?Expires=1839563441&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OkZi-TxojdLvTbJuYiFPwAXXC1QNj4uy8o5yJvsnnsa4Zs5QyxJXp4mZy~bWjTvuy0X9ESI4dgnByJV0X2oz2pfb8WepCBWF7NZVhUyR4r9ihWWTbJsnk900ws1wzljpOv8qy3~5bHLSRVKTdRK4hxLQhl7IGc66-6IOyu1fpXQlW8llALX5jEsLSqqI18lsKe~IdmbzH4Y1j9lYkITH1-WZq3K1AK6ow1W57~8Y3aOfUFl0wctBBpZtj3zDToIW~Sp5EZ6GYP4rNz~gB1o1ful1fB4aNgkJJGqkWXWN2bpVO9ZvHRJFrYw8omBRmEL0v7wOU84~t~EM9GU40p-2qQ__',
          description: 'Half-burned identifier with anomalous readings.',
          price: 250,
          stock: 4
        },
        {
          id: 'store-mat-5',
          name: 'Redline Growth Pod',
          type: 'Material',
          rarity: 'Rare',
          effect: {
            type: 'upgrade',
            value: 1
          },
          icon: 'https://media-hosting.imagekit.io/a208a4e8d9de4cdb/Redline%20Growth%20Pod.png?Expires=1839563441&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=QLRdJXWL7JkG3iYmShadI1VBJn12RTtqSpuKJtIIJXEkg0KET7hXXvjqkIGi7c-L8EMiZkZXQYF74Ava7~lU4r9xOpFilKf5WMPJby9aD63rjdQZOwbNZk92SPmTAAnPlT-z5nBaUlBRqwXXe7k2Jjj4J31q2lj06WdJ6wpf4EAKfpdwOq0GwUrkh9K0jOc39iGv-woBopr8YVac3ofVjWl7QAXv5dwpWRHlnO9ZreIdEts0cEkm8CmsQPN7J9xNce1Vnbrl4Y8MPudWZRAQ6FJOMrIqPTI61tulWXQu33Sfhzu731TmmM7IDRsSwyqN0o~f~Na2sxGGDnmstno4IA__',
          description: 'Accelerates organic material expansion.',
          price: 300,
          stock: 4
        }
      ]
    },
    refreshTimers: {
      entities: null, // Entities don't auto-refresh
      equipment: Date.now() + 3600000, // 1 hour from now
      items: Date.now() + 3600000,
      materials: Date.now() + 3600000
    },
    refreshCooldowns: {
      equipment: false,
      items: false,
      materials: false
    },
    entityPurchasesRemaining: 1,
    lastDailyReset: Date.now(),
    purchaseLog: []
  },
  // Daily objectives state
  dailyObjectives: {
    objectives: [
      {
        id: 'obj-1',
        title: 'Contain 3 anomalies',
        type: 'containment',
        target: 3,
        progress: 0,
        completed: false,
        reward: {
          xp: 75
        }
      },
      {
        id: 'obj-2',
        title: 'Research new containment protocols',
        type: 'research',
        target: 1,
        progress: 0,
        completed: false,
        reward: {
          xp: 50
        }
      },
      {
        id: 'obj-3',
        title: 'Complete 5 battles',
        type: 'battle',
        target: 5,
        progress: 0,
        completed: false,
        reward: {
          xp: 100
        }
      }
    ],
    lastRefreshTimestamp: Date.now(),
    refreshCost: 50 // Gold cost to refresh objectives manually
  }
};

// Game state store with Zustand
const useGameStore = create(
  persist(
    (set, get) => ({
      // Player information
      player: initialState.player,
      
      // Player statistics
      playerStats: initialState.playerStats,
      
      // Resources
      resources: initialState.resources,

      // Storage data
      storage: initialState.storage,
      
      // Game status updates - recent anomalies, notifications, etc.
      statusUpdates: initialState.statusUpdates,
      
      // Production rates
      productionRates: initialState.productionRates,
      
      // Current research
      currentResearch: initialState.currentResearch,
      
      // Containment module state
      containment: initialState.containment,
      
      // Fusion lab state
      fusion: initialState.fusion,
      
      // Store module state
      store: initialState.store,
      
      // Daily objectives
      dailyObjectives: initialState.dailyObjectives,
  
  // Action methods
      updateGold: (amount) => set((state) => ({
    resources: {
      ...state.resources,
      gold: state.resources.gold + amount,
    }
  })),
  
      updateEnergy: (amount) => set((state) => ({
        resources: {
          ...state.resources,
          energy: Math.max(0, Math.min(state.resources.energyCap, state.resources.energy + amount)),
        }
      })),
      
      updateResearch: (amount) => set((state) => ({
    resources: {
      ...state.resources,
          research: state.resources.research + amount,
    }
  })),
  
      gainXP: (amount) => set((state) => {
        let newXP = state.player.xp + amount;
        let newLevel = state.player.level;
        let newXPToNextLevel = state.player.xpToNextLevel;
        let didLevelUp = false;
        let totalXpEarned = state.player.totalXpEarned + amount;
        const levelHistory = [...state.player.levelHistory];
        
        // Level up if XP exceeds the threshold
        while (newXP >= newXPToNextLevel) {
          newXP -= newXPToNextLevel;
          newLevel++;
          // Use consistent scaling factor (20% more XP per level)
          newXPToNextLevel = Math.floor(newXPToNextLevel * 1.2);
          didLevelUp = true;
          
          // Add level-up record to history
          levelHistory.push({
            level: newLevel,
            achievedAt: Date.now(),
            totalXpEarned: totalXpEarned
          });
        }
        
        // Create a notification if player leveled up
        if (didLevelUp) {
          // Use setTimeout to avoid state inconsistency
          setTimeout(() => {
            get().addStatusUpdate({
              id: `level-up-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
              type: 'level',
              title: 'Level Up!',
              description: `You reached Level ${newLevel}! Your abilities have improved.`,
              time: 'Just now'
            });
          }, 0);
        }
        
        return {
          player: {
            ...state.player,
            level: newLevel,
            xp: newXP,
            xpToNextLevel: newXPToNextLevel,
            levelHistory: levelHistory,
            totalXpEarned: totalXpEarned
          }
        };
      }),
      
      // Add a new item to storage
      addStorageItem: (item) => set((state) => {
        const { entities, gear, items, materials } = state.storage;
        const currentTotal = entities.length + gear.length + items.length + materials.length;
        
        // Check if storage is full
        if (currentTotal >= state.storage.capacity) {
          return state; // Storage full, don't add item
        }
        
        // Normalize the type to lowercase for switch case
        const itemType = item.type.toLowerCase();
        
        // Add item to appropriate category
        switch (itemType) {
          case 'entity':
            return {
              storage: {
                ...state.storage,
                entities: [...state.storage.entities, item]
              }
            };
          case 'gear':
            return {
              storage: {
                ...state.storage,
                gear: [...state.storage.gear, item]
              }
            };
          case 'object':
            return {
              storage: {
                ...state.storage,
                items: [...state.storage.items, item]
              }
            };
          case 'material':
            return {
              storage: {
                ...state.storage,
                materials: [...state.storage.materials, item]
              }
            };
          default:
            return state;
        }
      }),
      
      // Remove an item from storage
      removeStorageItem: (itemId) => set((state) => {
        return {
          storage: {
            ...state.storage,
            entities: state.storage.entities.filter(item => item.id !== itemId),
            gear: state.storage.gear.filter(item => item.id !== itemId),
            items: state.storage.items.filter(item => item.id !== itemId),
            materials: state.storage.materials.filter(item => item.id !== itemId)
          }
        };
      }),
      
      // Sell an item for gold
      sellItem: (itemId) => set((state) => {
        // Find the item to get its rarity
        const allItems = [
          ...state.storage.entities,
          ...state.storage.gear,
          ...state.storage.items,
          ...state.storage.materials
        ];
        
        const item = allItems.find(item => item.id === itemId);
        if (!item) return state;
        
        // Determine sell value based on rarity
        let goldValue = 50; // Default value
        if (item.rarity === 'Rare') goldValue = 100;
        if (item.rarity === 'Epic') goldValue = 250;
        
        // Remove the item and add gold
        return {
    resources: {
      ...state.resources,
            gold: state.resources.gold + goldValue
          },
          storage: {
            ...state.storage,
            entities: state.storage.entities.filter(item => item.id !== itemId),
            gear: state.storage.gear.filter(item => item.id !== itemId),
            items: state.storage.items.filter(item => item.id !== itemId),
            materials: state.storage.materials.filter(item => item.id !== itemId)
          }
        };
      }),
      
      // Update capacity
      updateStorageCapacity: (newCapacity) => set((state) => ({
        storage: {
          ...state.storage,
          capacity: newCapacity
    }
  })),
  
  addStatusUpdate: (update) => set((state) => ({
    statusUpdates: [update, ...state.statusUpdates.slice(0, 9)],
  })),
  
      // Containment methods
      
      // Deploy entity to containment slot
      deployEntity: (slotId, entityId) => set((state) => {
        // Check if the slot exists
        const slotIndex = state.containment.slots.findIndex(slot => slot.id === slotId);
        if (slotIndex === -1) {
          return state;
        }
        
        // Check if the entity exists and is not deployed elsewhere
        const entity = state.storage.entities.find(entity => entity.id === entityId);
        if (!entity) return state;
        
        const isDeployed = state.containment.slots.some(
          slot => slot.id !== slotId && slot.entityId === entityId
        );
        if (isDeployed) return state;
        
        // Update slot with entity
        const newSlots = [...state.containment.slots];
        newSlots[slotIndex] = {
          ...newSlots[slotIndex],
          entityId: entityId,
          deployedAt: Date.now()
        };
        
        // Create status update
        const deployUpdate = {
          id: `deploy-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'containment',
          title: 'Entity Deployed',
          description: `${entity.name} deployed to containment slot ${slotId}.`,
          time: 'Just now'
        };
        
        // Update objective progress for containment
        setTimeout(() => {
          get().updateObjectiveProgress('containment', 1);
        }, 0);
        
        // Update player stats for anomalies contained
        const anomaliesContained = state.playerStats.anomaliesContained + 1;
        
        return {
          containment: {
            ...state.containment,
            slots: newSlots
          },
          playerStats: {
            ...state.playerStats,
            anomaliesContained,
            lastUpdateTimestamp: Date.now()
          },
          statusUpdates: [deployUpdate, ...state.statusUpdates.slice(0, 9)]
        };
      }),
      
      // Recall entity from containment slot
      recallEntity: (slotId) => set((state) => {
        // Find the slot
        const slotIndex = state.containment.slots.findIndex(slot => slot.id === slotId);
        if (slotIndex === -1) return state; // Slot not found
        
        // Check if the slot has an entity
        const slot = state.containment.slots[slotIndex];
        if (!slot.entityId) return state; // No entity in slot
        
        // Find the entity name for status update
        const entity = state.storage.entities.find(entity => entity.id === slot.entityId);
        const entityName = entity ? entity.name : "Unknown entity";
        
        // Create new slots array with updated slot
        const newSlots = [...state.containment.slots];
        newSlots[slotIndex] = {
          ...newSlots[slotIndex],
          entityId: null,
          deployedAt: null,
          collected: 0
        };
        
        // Create status update
        const recallUpdate = {
          id: `recall-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'containment',
          title: 'Entity Recalled',
          description: `${entityName} recalled from containment slot ${slotId}.`,
          time: 'Just now'
        };
        
        return {
          containment: {
            ...state.containment,
            slots: newSlots
          },
          statusUpdates: [recallUpdate, ...state.statusUpdates.slice(0, 9)]
        };
      }),
      
      // Calculate accumulated resources for all slots
      calculateContainmentOutput: () => {
        const state = get();
        const now = Date.now();
        let totalGold = 0;
        
        // Calculate for each slot
        state.containment.slots.forEach(slot => {
          if (slot.entityId && slot.deployedAt) {
            // Find entity to get efficiency
            const entity = state.storage.entities.find(e => e.id === slot.entityId);
            if (entity) {
              // Calculate minutes elapsed since deployment or last collection
              const lastCollection = state.containment.lastCollectedAt || slot.deployedAt;
              const minutesElapsed = (now - lastCollection) / (1000 * 60);
              
              // Calculate gold produced based on efficiency and time
              const efficiency = entity.efficiency || 1.0;
              const goldProduced = Math.floor(
                state.containment.baseProductionRate * efficiency * minutesElapsed
              );
              
              totalGold += goldProduced;
            }
          }
        });
        
        return totalGold;
      },
      
      // Collect all accumulated resources
      collectContainmentResources: () => set((state) => {
        const now = Date.now();
        let totalCollected = 0;
        
        // Calculate and collect for each slot
        const newSlots = state.containment.slots.map(slot => {
          if (slot.entityId && slot.deployedAt) {
            // Find entity to get efficiency
            const entity = state.storage.entities.find(e => e.id === slot.entityId);
            if (entity) {
              // Calculate minutes elapsed
              const lastCollection = state.containment.lastCollectedAt || slot.deployedAt;
              const minutesElapsed = (now - lastCollection) / (1000 * 60);
              
              // Calculate gold produced based on efficiency and time
              const efficiency = entity.efficiency || 1.0;
              const goldProduced = Math.floor(
                state.containment.baseProductionRate * efficiency * minutesElapsed
              );
              
              totalCollected += goldProduced;
              
              // Update slot collected amount
              return {
                ...slot,
                collected: slot.collected + goldProduced
              };
            }
          }
          return slot;
        });
        
        // Create status update if resources were collected
        let newStatusUpdates = [...state.statusUpdates];
        if (totalCollected > 0) {
          const collectUpdate = {
            id: `collect-${now}-${Math.random().toString(36).substring(2, 10)}`,
            type: 'resource',
            title: 'Resources Collected',
            description: `Collected ${totalCollected} gold from containment chambers.`,
            time: 'Just now'
          };
          
          newStatusUpdates = [collectUpdate, ...newStatusUpdates.slice(0, 9)];
        }
        
        // Update resources collected in player stats
        const resourcesCollected = state.playerStats.resourcesCollected + totalCollected;
        
        return {
          resources: {
            ...state.resources,
            gold: state.resources.gold + totalCollected
          },
          containment: {
            ...state.containment,
            slots: newSlots,
            lastCollectedAt: now
          },
          playerStats: {
            ...state.playerStats,
            resourcesCollected,
            lastUpdateTimestamp: Date.now()
          },
          statusUpdates: newStatusUpdates
        };
      }),
      
      // Get output rate per minute for a specific entity
      getEntityOutputRate: (entityId) => {
        const state = get();
        const entity = state.storage.entities.find(e => e.id === entityId);
        if (!entity) return 0;
        
        const efficiency = entity.efficiency || 1.0;
        return Math.floor(state.containment.baseProductionRate * efficiency);
      },
      
      // Get total output rate per minute for all deployed entities
      getTotalOutputRate: () => {
        const state = get();
        let totalRate = 0;
        
        state.containment.slots.forEach(slot => {
          if (slot.entityId) {
            const entity = state.storage.entities.find(e => e.id === slot.entityId);
            if (entity) {
              const efficiency = entity.efficiency || 1.0;
              totalRate += Math.floor(state.containment.baseProductionRate * efficiency);
            }
          }
        });
        
        return totalRate;
      },
      
      // Check if an entity is deployed in containment
      isEntityDeployed: (entityId) => {
        const state = get();
        return state.containment.slots.some(slot => slot.entityId === entityId);
      },
      
      // Fusion lab methods
      
      // Check if fusion daily limit has reset (24 hours)
      checkFusionDailyReset: () => set((state) => {
        const now = Date.now();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        // Check if 24 hours have passed since last reset
        if (now - state.fusion.lastResetTimestamp >= dayInMs) {
          return {
            fusion: {
              ...state.fusion,
              fusionsToday: 0,
              lastResetTimestamp: now
            }
          };
        }
        
        return state;
      }),
      
      // Get adjusted rarity chances with catalyst effects
      getAdjustedRarityChances: (catalystId) => {
        const state = get();
        const defaultChances = state.fusion.defaultRarityChances;
        
        // If no catalyst, return default chances
        if (!catalystId) return defaultChances;
        
        // Find catalyst item
        const catalystItem = [
          ...state.storage.items,
          ...state.storage.materials
        ].find(item => item.id === catalystId);
        
        // If catalyst not found, return default chances
        if (!catalystItem) return defaultChances;
        
        // Apply catalyst effects based on type
        switch (catalystItem.effect?.type) {
          case 'rarityBoost':
            return {
              common: Math.max(0, defaultChances.common - catalystItem.effect.value),
              rare: defaultChances.rare,
              epic: Math.min(100, defaultChances.epic + catalystItem.effect.value)
            };
          // Other catalyst effects could be added here
          default:
            return defaultChances;
        }
      },
      
      // Perform fusion with two entities and optional catalyst
      performFusion: (entityIdA, entityIdB, catalystId) => set((state) => {
        // Check if daily limit reached
        if (state.fusion.fusionsToday >= state.fusion.dailyFusionLimit) {
          return state;
        }
        
        // Check if enough gold
        if (state.resources.gold < state.fusion.fusionCost) {
          return state;
        }
        
        // Check if entities exist and are not in use
        const entityA = state.storage.entities.find(entity => entity.id === entityIdA);
        const entityB = state.storage.entities.find(entity => entity.id === entityIdB);
        
        if (!entityA || !entityB) return state;
        
        // Check if entities are not deployed in containment
        const isDeployedA = state.containment.slots.some(slot => slot.entityId === entityIdA);
        const isDeployedB = state.containment.slots.some(slot => slot.entityId === entityIdB);
        
        if (isDeployedA || isDeployedB) return state;
        
        // Find catalyst if provided
        let catalystItem = null;
        if (catalystId) {
          catalystItem = [
            ...state.storage.items,
            ...state.storage.materials
          ].find(item => item.id === catalystId);
        }
        
        // Get adjusted rarity chances based on catalyst
        const rarityChances = get().getAdjustedRarityChances(catalystId);
        
        // Determine result rarity
        let resultRarity = 'Common';
        const rarityRoll = Math.random() * 100;
        
        if (rarityRoll >= (100 - rarityChances.epic)) {
          resultRarity = 'Epic';
        } else if (rarityRoll >= (100 - rarityChances.epic - rarityChances.rare)) {
          resultRarity = 'Rare';
        }
        
        // Generate a unique ID for the new entity
        const newEntityId = `entity-fusion-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
        
        // Determine result level based on catalyst
        let resultLevel = 1;
        if (catalystItem && catalystItem.effect?.type === 'levelBoost') {
          resultLevel = 1 + catalystItem.effect.value;
        }
        
        // Generate attribute values based on catalyst and parent entities
        const baseAttack = Math.floor(Math.random() * 30) + 10;
        const baseDefense = Math.floor(Math.random() * 20) + 5;
        
        // Adjust attributes based on rarity
        let attackMod = 1;
        let defenseMod = 1;
        let efficiency = 1.0;
        
        switch (resultRarity) {
          case 'Rare':
            attackMod = 1.3;
            defenseMod = 1.3;
            efficiency = 1.2;
            break;
          case 'Epic':
            attackMod = 1.6;
            defenseMod = 1.5;
            efficiency = 1.5;
            break;
        }
        
        // Apply stat bias from catalyst
        if (catalystItem && catalystItem.effect?.type === 'statBias') {
          if (catalystItem.effect.stat === 'attack') {
            attackMod += 0.2;
          } else if (catalystItem.effect.stat === 'defense') {
            defenseMod += 0.2;
          } else if (catalystItem.effect.stat === 'efficiency') {
            efficiency += 0.2;
          }
        }
        
        // Create new entity
        const newEntity = {
          id: newEntityId,
          name: generateFusionName(),
          type: 'Entity',
          rarity: resultRarity,
          level: resultLevel,
          attack: Math.floor(baseAttack * attackMod),
          defense: Math.floor(baseDefense * defenseMod),
          efficiency: parseFloat(efficiency.toFixed(1)),
          skills: generateSkills(resultRarity),
          icon: `/assets/entities/fusion-${resultRarity.toLowerCase()}.png`,
          description: `A fusion result from combining anomalous entities.`
        };
        
        // Create fusion result record for history
        const fusionResult = {
          id: `fusion-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          timestamp: Date.now(),
          entityA: entityA.name,
          entityB: entityB.name,
          catalyst: catalystItem ? catalystItem.name : null,
          result: newEntity.name,
          resultRarity: resultRarity
        };
        
        // Create status update
        const fusionUpdate = {
          id: `fusion-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
          type: 'research',
          title: 'Fusion Successful',
          description: `Created ${newEntity.name} (${resultRarity}) from fusion.`,
          time: 'Just now'
        };
        
        // Update storage: remove source entities, add result
        const updatedEntities = state.storage.entities.filter(
          entity => entity.id !== entityIdA && entity.id !== entityIdB
        );
        
        // Update items/materials: remove catalyst if used
        let updatedItems = [...state.storage.items];
        let updatedMaterials = [...state.storage.materials];
        
        if (catalystItem) {
          if (catalystItem.type === 'object') {
            updatedItems = updatedItems.filter(item => item.id !== catalystId);
          } else if (catalystItem.type === 'material') {
            updatedMaterials = updatedMaterials.filter(material => material.id !== catalystId);
          }
        }
        
        // Update objective progress after successful fusion
        setTimeout(() => {
          get().updateObjectiveProgress('fusion', 1);
        }, 0);
        
        return {
          // Update resources (deduct gold)
          resources: {
            ...state.resources,
            gold: state.resources.gold - state.fusion.fusionCost
          },
          // Update storage
          storage: {
            ...state.storage,
            entities: [...updatedEntities, newEntity],
            items: updatedItems,
            materials: updatedMaterials
          },
          // Update fusion state
          fusion: {
            ...state.fusion,
            fusionsToday: state.fusion.fusionsToday + 1,
            recentFusions: [
              fusionResult,
              ...state.fusion.recentFusions.slice(0, 4) // Keep last 5 fusions
            ]
          },
          // Update status
          statusUpdates: [fusionUpdate, ...state.statusUpdates.slice(0, 9)]
        };
      }),
      
      // Reset fusion count (for testing)
      resetFusionCount: () => set((state) => ({
        fusion: {
          ...state.fusion,
          fusionsToday: 0,
          lastResetTimestamp: Date.now()
    }
  })),
      
      // Reset game state to initial values
      resetGameState: () => {
        console.log('Game state reset manually');
        set(() => ({
          player: { ...initialState.player },
          resources: { ...initialState.resources },
          storage: {
            ...initialState.storage,
            entities: [...initialState.storage.entities],
            gear: [...initialState.storage.gear],
            items: [...initialState.storage.items],
            materials: [...initialState.storage.materials]
          },
          statusUpdates: [...initialState.statusUpdates],
          productionRates: { ...initialState.productionRates },
          currentResearch: { ...initialState.currentResearch },
          containment: { ...initialState.containment },
          fusion: { ...initialState.fusion },
          store: { 
            ...initialState.store,
            inventory: {
              ...initialState.store.inventory,
              entities: [...storeItemPools.entities].sort(() => 0.5 - Math.random()).slice(0, 5)
            }
          },
          dailyObjectives: { 
            ...initialState.dailyObjectives,
            lastRefreshTimestamp: Date.now()
          },
          // Reset battle state
          battle: {
            dailyAttemptsLimit: 5,
            dailyAttemptsUsed: 0,
            lastResetTimestamp: Date.now(),
            completedStages: [],
            battleHistory: []
          },
          playerStats: { ...initialState.playerStats },
        }));
      },
      
      // Battle system methods
      initializeComplexBattle: (entities, enemyEntities) => {
        return initializeComplexBattle(entities, enemyEntities);
      },
      
      recordBattleTurn: (battleState, turnData) => {
        return recordBattleTurn(battleState, turnData);
      },
      
      completeBattle: (battleState, outcome, rewards) => {
        // Update battle objective if victory
        if (outcome === 'victory') {
          setTimeout(() => {
            get().updateObjectiveProgress('battle', 1);
          }, 0);
          
          // Update player stats for battles won
          set(state => ({
            playerStats: {
              ...state.playerStats,
              battlesWon: state.playerStats.battlesWon + 1,
              lastUpdateTimestamp: Date.now()
            }
          }));
        }
        return completeBattle(battleState, outcome, rewards);
      },
      
      getBattleStatistics: (battleHistory) => {
        return getBattleStatistics(battleHistory);
      },
      
      // Battle state methods
      initializeBattleState: () => set(() => ({
        battle: {
          dailyAttemptsLimit: 5,
          dailyAttemptsUsed: 0,
          lastResetTimestamp: Date.now(),
          completedStages: [],
          battleHistory: []
        }
      })),
      
      checkBattleDailyReset: () => set((state) => {
        const now = Date.now();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        // If battle state doesn't exist yet, initialize it
        if (!state.battle) {
          return {
            battle: {
              dailyAttemptsLimit: 5,
              dailyAttemptsUsed: 0,
              lastResetTimestamp: now,
              completedStages: [],
              battleHistory: []
            }
          };
        }
        
        // Check if 24 hours have passed since last reset
        if (now - state.battle.lastResetTimestamp >= dayInMs) {
          return {
            battle: {
              ...state.battle,
              dailyAttemptsUsed: 0,
              lastResetTimestamp: now
            }
          };
        }
        
        return state;
      }),
      
      updateBattleAttempts: () => set((state) => {
        // If battle state doesn't exist yet, initialize it
        if (!state.battle) {
          return {
            battle: {
              dailyAttemptsLimit: 5,
              dailyAttemptsUsed: 1,
              lastResetTimestamp: Date.now(),
              completedStages: [],
              battleHistory: []
            }
          };
        }
        
        return {
          battle: {
            ...state.battle,
            dailyAttemptsUsed: state.battle.dailyAttemptsUsed + 1
          }
        };
      }),
      
      // Battle record methods
      addBattleToHistory: (battleRecord) => set((state) => {
        // If battle state doesn't exist yet, initialize it
        if (!state.battle) {
          return {
            battle: {
              dailyAttemptsLimit: 5,
              dailyAttemptsUsed: 0,
              lastResetTimestamp: Date.now(),
              completedStages: [],
              battleHistory: [battleRecord]
            }
          };
        }
        
        // Add battle to history, keep last 20 battles
        return {
          battle: {
            ...state.battle,
            battleHistory: [
              battleRecord,
              ...state.battle.battleHistory
            ].slice(0, 20)
          }
        };
      }),
      
      markStageCompleted: (stageId) => set((state) => {
        // If battle state doesn't exist yet, initialize it
        if (!state.battle) {
          return {
            battle: {
              dailyAttemptsLimit: 5,
              dailyAttemptsUsed: 0,
              lastResetTimestamp: Date.now(),
              completedStages: [stageId],
              battleHistory: []
            }
          };
        }
        
        // Add stage to completed stages if not already there
        if (!state.battle.completedStages.includes(stageId)) {
          return {
            battle: {
              ...state.battle,
              completedStages: [...state.battle.completedStages, stageId]
            }
          };
        }
        
        return state;
      }),
      
      // Entity XP gain method
      gainEntityXP: (entityId, xpAmount) => set((state) => {
        // Find the entity in storage
        const entityIndex = state.storage.entities.findIndex(entity => entity.id === entityId);
        
        // If entity not found, return unchanged state
        if (entityIndex === -1) return state;
        
        // Clone the entity
        const updatedEntity = { ...state.storage.entities[entityIndex] };
        
        // Add XP and check for level up (simple implementation)
        updatedEntity.xp = (updatedEntity.xp || 0) + xpAmount;
        
        // Level up if XP reaches threshold (10 * current level)
        const xpThreshold = 10 * (updatedEntity.level || 1);
        
        if (updatedEntity.xp >= xpThreshold) {
          updatedEntity.level = (updatedEntity.level || 1) + 1;
          updatedEntity.xp = 0;
          
          // Increase stats on level up
          updatedEntity.attack = Math.floor(updatedEntity.attack * 1.1);
          updatedEntity.defense = Math.floor(updatedEntity.defense * 1.1);
          
          // Generate a truly unique ID (timestamp + random suffix)
          const uniqueId = `level-up-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
          
          // Add status update for level up
          const levelUpUpdate = {
            id: uniqueId,
            type: 'entity',
            title: 'Entity Level Up',
            description: `${updatedEntity.name} reached level ${updatedEntity.level}!`,
            time: 'Just now'
          };
          
          // Create updated entities array
          const updatedEntities = [...state.storage.entities];
          updatedEntities[entityIndex] = updatedEntity;
          
          return {
            storage: {
              ...state.storage,
              entities: updatedEntities
            },
            statusUpdates: [levelUpUpdate, ...state.statusUpdates.slice(0, 9)]
          };
        }
        
        // Just update XP without level up
        const updatedEntities = [...state.storage.entities];
        updatedEntities[entityIndex] = updatedEntity;
        
        return {
          storage: {
            ...state.storage,
            entities: updatedEntities
          }
        };
      }),
      
      // Daily objectives methods
      checkObjectivesRefresh: () => set((state) => {
        const now = Date.now();
        const halfDayInMs = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
        
        // Check if 12 hours have passed since last refresh
        if (now - state.dailyObjectives.lastRefreshTimestamp >= halfDayInMs) {
          return {
            dailyObjectives: {
              ...initialState.dailyObjectives,
              lastRefreshTimestamp: now
            }
          };
        }
        
        return state;
      }),
      
      refreshObjectivesManually: () => set((state) => {
        // Check if player has enough gold
        if (state.resources.gold < state.dailyObjectives.refreshCost) {
          return state;
        }
        
        // Generate new random objectives (different from initial ones to add variety)
        const objectiveTypes = [
          { type: 'containment', title: 'Contain anomalies', target: Math.floor(Math.random() * 3) + 1, reward: { xp: 75 } },
          { type: 'research', title: 'Complete research projects', target: Math.floor(Math.random() * 2) + 1, reward: { xp: 50 } },
          { type: 'battle', title: 'Win battles', target: Math.floor(Math.random() * 4) + 2, reward: { xp: 100 } },
          { type: 'fusion', title: 'Perform fusions', target: Math.floor(Math.random() * 2) + 1, reward: { xp: 60 } },
          { type: 'store', title: 'Purchase items', target: Math.floor(Math.random() * 3) + 1, reward: { xp: 70 } }
        ];
        
        // Select 3 random objective types without repetition
        const shuffledTypes = [...objectiveTypes].sort(() => 0.5 - Math.random());
        const selectedTypes = shuffledTypes.slice(0, 3);
        
        // Create new objectives
        const newObjectives = selectedTypes.map((objective, index) => ({
          id: `obj-${index + 1}`,
          title: `${objective.title} (${objective.target})`,
          type: objective.type,
          target: objective.target,
          progress: 0,
          completed: false,
          reward: objective.reward
        }));
        
        return {
          resources: {
            ...state.resources,
            gold: state.resources.gold - state.dailyObjectives.refreshCost
          },
          dailyObjectives: {
            ...state.dailyObjectives,
            objectives: newObjectives,
            lastRefreshTimestamp: Date.now()
          }
        };
      }),
      
      updateObjectiveProgress: (objectiveType, amount = 1) => set((state) => {
        // Find objectives of the given type
        const updatedObjectives = state.dailyObjectives.objectives.map(objective => {
          if (objective.type === objectiveType && !objective.completed) {
            const newProgress = Math.min(objective.progress + amount, objective.target);
            const completed = newProgress >= objective.target;
            
            // If newly completed, award XP
            if (completed && !objective.completed) {
              // Add XP in a separate action to avoid state inconsistency
              setTimeout(() => {
                const currentState = get();
                const player = currentState.player;
                let newXp = player.xp + objective.reward.xp;
                let newLevel = player.level;
                let newXpToNextLevel = player.xpToNextLevel;
                let didLevelUp = false;
                let totalXpEarned = player.totalXpEarned + objective.reward.xp;
                const levelHistory = [...player.levelHistory];
                
                // Level up if needed
                while (newXp >= newXpToNextLevel) {
                  newXp -= newXpToNextLevel;
                  newLevel++;
                  newXpToNextLevel = Math.floor(newXpToNextLevel * 1.2); // 20% more XP for next level
                  didLevelUp = true;
                  
                  // Add level-up record to history
                  levelHistory.push({
                    level: newLevel,
                    achievedAt: Date.now(),
                    totalXpEarned: totalXpEarned
                  });
                }
                
                set({
                  player: {
                    ...player,
                    level: newLevel,
                    xp: newXp,
                    xpToNextLevel: newXpToNextLevel,
                    levelHistory: levelHistory,
                    totalXpEarned: totalXpEarned
                  }
                });
                
                // Add status update for objective completion
                const timestamp = Date.now();
                get().addStatusUpdate({
                  id: `objective-${timestamp}-${Math.random().toString(36).substring(2, 10)}`,
                  type: 'objective',
                  title: 'Objective Completed',
                  description: `You completed "${objective.title}" and earned ${objective.reward.xp} XP!`,
                  time: 'Just now',
                  timestamp: timestamp,
                  objectiveType: objectiveType,
                  reward: objective.reward
                });
                
                // Add level-up notification if the player leveled up
                if (didLevelUp) {
                  get().addStatusUpdate({
                    id: `level-up-${timestamp}-${Math.random().toString(36).substring(2, 10)}`,
                    type: 'level',
                    title: 'Level Up!',
                    description: `You reached Level ${newLevel}! Your abilities have improved.`,
                    time: 'Just now',
                    timestamp: timestamp
                  });
                }
                
                // Log to console for debugging
                console.log(`[Objective] Completed "${objective.title}" (${objectiveType}): ${objective.progress} → ${newProgress}/${objective.target}`);
              }, 0);
            } else if (newProgress > objective.progress) {
              // Log progress update but not completion
              console.log(`[Objective] Progress on "${objective.title}" (${objectiveType}): ${objective.progress} → ${newProgress}/${objective.target}`);
            }
            
            return {
              ...objective,
              progress: newProgress,
              completed
            };
          }
          return objective;
        });
        
        return {
          dailyObjectives: {
            ...state.dailyObjectives,
            objectives: updatedObjectives
          }
        };
      }),
      
      getObjectiveProgress: (objectiveType) => {
        const state = get();
        const objective = state.dailyObjectives.objectives.find(obj => obj.type === objectiveType);
        return objective ? { progress: objective.progress, target: objective.target } : { progress: 0, target: 0 };
      },
      
      // Research methods
      // Start research on a node
      startResearch: (nodeId, cost, timeRequired) => set((state) => {
        // Check if already researching something
        if (state.currentResearch && state.currentResearch.nodeId) {
          return state;
        }
        
        // Check if enough resources
        if (state.resources.gold < cost.gold || state.resources.research < cost.research) {
          return state;
        }
        
        // Create research entry
        const research = {
          nodeId,
          startTime: Date.now(),
          endTime: Date.now() + timeRequired,
          progress: 0
        };
        
        // Deduct resources
        return {
          currentResearch: research,
          resources: {
            ...state.resources,
            gold: state.resources.gold - cost.gold,
            research: state.resources.research - cost.research
          }
        };
      }),
      
      // Cancel research
      cancelResearch: () => set((state) => {
        if (!state.currentResearch || !state.currentResearch.nodeId) {
          return state;
        }
        
        return {
          currentResearch: {
            nodeId: null,
            startTime: null,
            endTime: null,
            progress: 0
          }
        };
      }),
      
      // Check if research is complete
      checkResearchCompletion: () => set((state) => {
        if (!state.currentResearch || !state.currentResearch.nodeId) {
          return state;
        }
        
        const now = Date.now();
        const research = state.currentResearch;
        
        // Calculate progress
        const totalTime = research.endTime - research.startTime;
        const elapsedTime = now - research.startTime;
        const progress = Math.min(100, Math.floor((elapsedTime / totalTime) * 100));
        
        // If complete
        if (now >= research.endTime) {
          // Mark node as completed
          const updatedResearch = {
            ...state.research,
            [research.nodeId]: true
          };
          
          // Add status update
          const researchUpdate = {
            id: `research-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
            type: 'research',
            title: 'Research Complete',
            description: `Research project ${research.nodeId} has been completed!`,
            time: 'Just now'
          };
          
          // Update objective progress
          setTimeout(() => {
            get().updateObjectiveProgress('research', 1);
          }, 0);
          
          // Update player stats for research completed
          const researchCompleted = state.playerStats.researchCompleted + 1;
          
          return {
            currentResearch: {
              nodeId: null,
              startTime: null,
              endTime: null,
              progress: 0
            },
            research: updatedResearch,
            playerStats: {
              ...state.playerStats,
              researchCompleted,
              lastUpdateTimestamp: Date.now()
            },
            statusUpdates: [researchUpdate, ...state.statusUpdates.slice(0, 9)]
          };
        }
        
        // Just update progress
        return {
          currentResearch: {
            ...state.currentResearch,
            progress
          }
        };
      }),
    }),
    {
      name: 'scp-game-storage', // Local storage key,
      getStorage: () => {
        // Check if localStorage is available
        try {
          const testKey = '__storage_test__';
          localStorage.setItem(testKey, testKey);
          localStorage.removeItem(testKey);
          console.log('localStorage is available');
          return localStorage;
        } catch (e) {
          console.error('localStorage is not available:', e);
          // Fallback to memory storage if localStorage is not available
          return {
            getItem: () => null,
            setItem: () => null,
            removeItem: () => null
          };
        }
      },
      version: 2, // Increased version for migration
      onRehydrateStorage: () => (state) => {
        console.log('State hydrated from storage:', state ? 'successful' : 'failed');
        
        // Apply migrations if needed
        if (state && state.player) {
          // Ensure player has the new levelHistory property
          if (!state.player.levelHistory) {
            console.log('Migrating player data: Adding levelHistory');
            state.player.levelHistory = [{
              level: state.player.level || 1,
              achievedAt: Date.now(),
              totalXpEarned: state.player.xp || 0
            }];
          }
          
          // Ensure player has the totalXpEarned property
          if (state.player.totalXpEarned === undefined) {
            console.log('Migrating player data: Adding totalXpEarned');
            // Estimate total XP based on current level and XP
            // This is just an approximation
            let totalEstimatedXP = state.player.xp || 0;
            let currentLevel = state.player.level || 1;
            let xpForLevel = 100; // Base XP for level 1
            
            // Add XP for each completed level
            for (let i = 1; i < currentLevel; i++) {
              totalEstimatedXP += xpForLevel;
              xpForLevel = Math.floor(xpForLevel * 1.2); // 20% increase per level
            }
            
            state.player.totalXpEarned = totalEstimatedXP;
          }
        }
      }
    }
  )
);

// Helper functions for fusion
function generateFusionName() {
  const prefixes = ['Anomalous', 'Distorted', 'Unstable', 'Adaptive', 'Resonant', 'Paradoxical'];
  const types = ['Subject', 'Entity', 'Lifeform', 'Manifestation', 'Phenomenon'];
  const suffixes = ['ZK', 'KL', 'AX', 'RC', 'VT', 'QP'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const number = Math.floor(Math.random() * 99) + 1;
  
  return `${prefix} ${type} ${suffix}-${number.toString().padStart(2, '0')}`;
}

function generateSkills(rarity) {
  const basicSkills = ['Phase Shift', 'Energy Drain', 'Vitality', 'Mind Link'];
  const rareSkills = ['Time Warp', 'Reality Anchor', 'Void Touch', 'Quantum Leap'];
  const epicSkills = ['Dimensional Rift', 'Causality Break', 'Existence Erasure', 'Cosmic Awareness'];
  
  let skillPool = [...basicSkills];
  let skillCount = 1;
  
  if (rarity === 'Rare') {
    skillPool = [...basicSkills, ...rareSkills];
    skillCount = 2;
  } else if (rarity === 'Epic') {
    skillPool = [...basicSkills, ...rareSkills, ...epicSkills];
    skillCount = 3;
  }
  
  // Shuffle and pick skills
  const shuffled = [...skillPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, skillCount);
}

// Battle management helper functions
function initializeComplexBattle(entities, enemyEntities) {
  return {
    battleId: `battle-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
    startTime: Date.now(),
    playerEntities: entities,
    enemyEntities: enemyEntities,
    turns: [],
    active: true,
    outcome: null
  };
}

function recordBattleTurn(battleState, turnData) {
  return {
    ...battleState,
    turns: [...battleState.turns, { 
      turnNumber: battleState.turns.length + 1,
      timestamp: Date.now(),
      ...turnData
    }]
  };
}

function completeBattle(battleState, outcome, rewards) {
  // Create completed battle record
  const completedBattle = {
    ...battleState,
    endTime: Date.now(),
    active: false,
    outcome: outcome,
    rewards: rewards,
    duration: Date.now() - battleState.startTime
  };
  
  return completedBattle;
}

function getBattleStatistics(battleHistory) {
  if (!battleHistory || battleHistory.length === 0) {
    return {
      totalBattles: 0,
      victories: 0,
      defeats: 0,
      averageDuration: 0,
      mostUsedEntities: []
    };
  }
  
  // Calculate basic stats
  const totalBattles = battleHistory.length;
  const victories = battleHistory.filter(battle => battle.outcome === 'victory').length;
  const defeats = battleHistory.filter(battle => battle.outcome === 'defeat').length;
  
  // Calculate average duration
  const totalDuration = battleHistory.reduce((sum, battle) => sum + (battle.duration || 0), 0);
  const averageDuration = Math.floor(totalDuration / totalBattles);
  
  // Find most used entities
  const mostUsedEntities = getMostUsedEntities(battleHistory);
  
  return {
    totalBattles,
    victories,
    defeats,
    averageDuration,
    mostUsedEntities
  };
}

function getMostUsedEntities(battleHistory) {
  // Track entity usage counts
  const entityUsage = {};
  
  // Count each entity's appearances in battles
  battleHistory.forEach(battle => {
    if (battle.playerEntities) {
      battle.playerEntities.forEach(entity => {
        const entityId = entity.id;
        if (entityId) {
          entityUsage[entityId] = (entityUsage[entityId] || 0) + 1;
        }
      });
    }
  });
  
  // Convert to array and sort by usage count
  const entityArray = Object.entries(entityUsage).map(([id, count]) => ({ id, count }));
  entityArray.sort((a, b) => b.count - a.count);
  
  // Return top 5 most used entities
  return entityArray.slice(0, 5);
}

export default useGameStore; 