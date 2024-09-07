import type { CardConfig } from '../types';
import { CardClass, CardType, SpellTurn } from '../types';

export const initialCardConfigs: CardConfig[] = [
	{
		id: '9999',
		name: 'Troop',
		type: CardType.Troop,
		class: CardClass.Knight,
		attack: [200],
		health: [400],
		defense: [0],
	},
	{
		id: '0001',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [200],
		defense: [0],
		health: [900],
		cooldown: [2],
		skill: {
			desc: 'All damage dealt to this card will heal instead of harm',
		},
	},
	{
		id: '0002',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [200],
		defense: [200],
		health: [900],
		skill: {
			desc: 'Receive addition 100 damage when attacked by Assassin or Spell Caster',
		},
	},
	{
		id: '0003',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [300],
		defense: [0],
		health: [500],
		cooldown: [3],
		skill: {
			desc: 'Heals itself 200 Health',
		},
	},
	{
		id: '0004',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [300],
		defense: [0],
		health: [900],
		cooldown: [2],
		skill: {
			desc: 'Heal an ally 300 Health and deal 100 damage to each its adjacent enemies.',
		},
	},
	{
		id: '0005',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [400],
		defense: [0],
		health: [400],
		skill: {
			desc:
				'Create an illusion to the closest position after attacking' +
				'*Illusion have 100 Attack, 100 Health',
		},
	},
	{
		id: '0006',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [400],
		defense: [100],
		health: [600],
		skill: {
			desc: '+100 def after getting attacked',
		},
		visualUri: 'dark-angel',
	},
	{
		id: '0007',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [200],
		defense: [0],
		health: [800],
		skill: {
			desc: '+200 def for units next to this Card',
		},
		visualUri: 'twin-dragon',
	},
	{
		id: '0008',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [400],
		defense: [0],
		health: [1000],
		skill: {
			desc: '-100 atk permanently when attacking this card',
		},
		visualUri: 'east-warrior',
	},
	{
		id: '0009',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [300],
		defense: [0],
		health: [600],
		skill: {
			desc:
				'Reborn when this card is destroyed' +
				'\n This effect can only be used once',
		},
	},
	{
		id: '0010',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [500],
		defense: [100],
		health: [400],
		skill: {
			desc: 'After attacking, heal itself 100 Health',
		},
	},
	{
		id: '0011',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [200],
		defense: [0],
		health: [500],
		skill: {
			desc: '+100 def for each missing Heath',
		},
	},
	{
		id: '0012',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [400],
		defense: [200],
		health: [600],
	},
	{
		id: '0013',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [100],
		defense: [300],
		health: [700],
	},
	{
		id: '0014',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [300],
		defense: [100],
		health: [600],
		cooldown: [3],
		skill: {
			desc: 'Toss opposite card to the lowest hp card deal 300 damage to both cards',
		},
	},
	{
		id: '0015',
		type: CardType.Hero,
		class: CardClass.Tanker,
		attack: [200],
		defense: [0],
		health: [500],
		cooldown: [3],
		skill: {
			desc:
				'Buff a shield to itself in 2 turns\n' +
				'Shield +200 Defense, deal 100 damage(ignore shield) to 3 cards in front of it',
		},
	},
	{
		id: '0016',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [300],
		defense: [0],
		health: [500],
		skill: {
			desc: '+Attack equal to missing hp of opposite card',
		},
	},
	{
		id: '0017',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [300],
		defense: [100],
		health: [600],
		skill: {
			desc: 'Destroy opposite Unit if less than 300 Health',
		},
	},
	{
		id: '0018',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [300],
		defense: [0],
		health: [500],
		cooldown: [3],
		skill: {
			desc: '+200 Attack, +2 Cleaver in 2 turns',
		},
	},
	{
		id: '0019',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [0],
		defense: [0],
		health: [900],
		skill: {
			desc: 'Deal Attack equal to remaining Health',
		},
	},
	{
		id: '0020',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [200],
		defense: [0],
		health: [600],
		skill: {
			desc: 'Deal 100 Damage to random enemy unit',
		},
	},
	{
		id: '0021',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [400],
		defense: [0],
		health: [400],
		skill: {
			desc: 'x2 Attack power against Hero unit',
		},
	},
	{
		id: '0022',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [200],
		defense: [0],
		health: [500],
		skill: {
			desc: '+100 Attack for each skill activated',
		},
	},
	{
		id: '0023',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [200],
		defense: [0],
		health: [500],
		skill: {
			desc: 'Gain 100 Attack each destroyed unit',
		},
		visualUri: 'skeletal-warrior',
	},
	{
		id: '0024',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [400],
		defense: [0],
		health: [400],
		skill: {
			desc: 'Deal additional 200 damage if attack Player',
		},
	},
	{
		id: '0025',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [200],
		defense: [0],
		health: [600],
		skill: {
			desc:
				'+100 Attack each turn if fighting same unit' +
				'This skill reset once attacking new unit',
		},
	},
	{
		id: '0026',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [400],
		defense: [0],
		health: [600],
		cooldown: [3],
		skill: {
			desc: 'Double attack',
		},
	},
	{
		id: '0027',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [500],
		defense: [0],
		health: [700],
		skill: {
			desc:
				'-100 Defense each turn if fighting same unit' +
				'\n This kill reset once attacking new unit',
		},
	},
	{
		id: '0028',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [600],
		defense: [0],
		health: [400],
	},
	{
		id: '0029',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [200],
		defense: [0],
		health: [500],
		cooldown: [2],
		skill: {
			desc: 'Immune to attack and +200 Attack in 1 turn',
		},
	},
	{
		id: '0030',
		type: CardType.Hero,
		class: CardClass.Knight,
		attack: [300],
		defense: [0],
		health: [600],
		cooldown: [4],
		skill: {
			desc: 'Deal 300 Damage to 5 opposing units',
		},
	},
	{
		id: '0031',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [300],
		defense: [0],
		health: [600],
		skill: {
			desc:
				'Summon 2 Wolves with 300 Attack, 300 Health' +
				'\n+100 Attack for nearby Wolves',
		},
	},
	{
		id: '0032',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [300],
		defense: [0],
		health: [400],
		cooldown: [3],
		skill: {
			desc: 'Create a clone of this card with same attributes, effect in 2 turns',
		},
	},
	{
		id: '0033',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [300],
		defense: [0],
		health: [700],
		cooldown: [2],
		skill: {
			desc: 'Steal a troop, Buff +200 Attack & +200 Heath for that unit',
		},
	},
	{
		id: '0034',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [300],
		defense: [0],
		health: [600],
		skill: {
			desc: "Aura: +200 Attack for owner's Troops",
		},
	},
	{
		id: '0035',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [100],
		defense: [0],
		health: [500],
		skill: {
			desc: 'Each attack summon 1 Snake with 100 Attack, 200 Health',
		},
	},
	{
		id: '0036',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [300],
		defense: [0],
		health: [400],
		skill: {
			desc: 'Take control opposing unit if it have less than 250 Health',
		},
	},
	{
		id: '0037',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [300],
		defense: [0],
		health: [500],
		skill: {
			desc: 'Reborn killed unit in your side',
		},
		visualUri: 'visual-king',
	},
	{
		id: '0038',
		type: CardType.Hero,
		class: CardClass.Summoner,
		attack: [200],
		defense: [0],
		health: [400],
		skill: {
			desc: 'On summon: also summon 2 Troops on your side',
		},
	},
	{
		id: '0039',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [200],
		defense: [0],
		health: [400],
		cooldown: [2],
		skill: {
			desc: 'Reduce 1 cooldown for allies',
		},
		visualUri: 'icy-mage',
	},
	{
		id: '0040',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [200],
		defense: [0],
		health: [600],
		cooldown: [2],
		skill: {
			desc: "Heal chosen ally 100 Health and deal 100 Damage to it's opposing unit",
		},
	},
	{
		id: '0041',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [300],
		cooldown: [2],
		skill: {
			desc: 'Heal 200 Health and deal 200 Damage to opposing unit',
		},
		visualUri: 'dragon-destroyer',
	},
	{
		id: '0042',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [500],
		skill: {
			desc: '+100 Attack for all allies',
		},
		visualUri: 'light-angel',
	},
	{
		id: '0043',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [200],
		defense: [0],
		health: [600],
		cooldown: [6],
		skill: {
			desc: 'Attack all enemy units',
		},
		visualUri: 'mage-angel',
	},
	{
		id: '0044',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [500],
		skill: {
			desc: 'Put attacker to sleep on next round',
		},
	},
	{
		id: '0045',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [400],
		defense: [0],
		health: [400],
		cooldown: [3],
		skill: {
			desc: '+200 Health for an ally',
		},
	},
	{
		id: '0046',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [500],
		cooldown: [2],
		skill: {
			desc: 'Heal full Health for most wounded Troop',
		},
	},
	{
		id: '0047',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [200],
		defense: [200],
		health: [500],
		cooldown: [2],
		skill: {
			desc: 'Repeat first spell from ally unit',
		},
	},
	{
		id: '0048',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [600],
		skill: {
			desc: 'Deal 100 Damage to enemy card once they use skill',
		},
	},
	{
		id: '0049',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [400],
		defense: [0],
		health: [600],
		cooldown: [3],
		skill: {
			desc: 'Deal 200 Damage to all units',
		},
		visualUri: 'sealed-dragon',
	},
	{
		id: '0050',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [600],
		skill: {
			desc: 'Toss opposing unit to the lowest Heath ally, deal 300 Damage to both',
		},
	},
	{
		id: '0051',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [400],
		defense: [0],
		health: [500],
		cooldown: [2],
		skill: {
			desc: 'Frozen opposing unit 1 turn. After 1 turn explode it, deal 300 Damage to sealed unit and 200 nearby',
		},
		visualUri: 'icy-bird',
	},
	{
		id: '0052',
		type: CardType.Hero,
		class: CardClass.SpellCaster,
		attack: [300],
		defense: [0],
		health: [400],
		cooldown: [2],
		skill: {
			desc: 'Trap enemy slot, deal 3 damage to unit summoned on that slot',
		},
	},
	{
		id: '0053',
		type: CardType.Hero,
		class: CardClass.Assassin,
		attack: [300],
		defense: [0],
		health: [300],
		skill: {
			desc: 'Destroy facing Hero card',
		},
		visualUri: 'canine-crawler',
	},
	{
		id: '0054',
		type: CardType.Hero,
		class: CardClass.Assassin,
		attack: [200],
		defense: [0],
		health: [600],
		skill: {
			desc: 'Gain Attack equal to Defense of opposing unit',
		},
	},
	{
		id: '0055',
		type: CardType.Hero,
		class: CardClass.Assassin,
		attack: [300],
		defense: [0],
		health: [500],
		skill: {
			desc: 'Attacker lost 100 Defense once attacking this unit',
		},
		visualUri: 'night-hunter',
	},
	{
		id: '0056',
		type: CardType.Hero,
		class: CardClass.Assassin,
		attack: [400],
		defense: [0],
		health: [200],
		skill: {
			desc: 'This unit Attack ignore enemy Defense',
		},
		visualUri: 'succubus',
	},
	{
		id: '0057',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Challenge: Select 2 card, they fight until one left',
		},
	},
	{
		id: '0058',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc:
				'Choose your troop and enemy, they duel each other' +
				'\n+2 Attack to Troop if win duel',
		},
	},
	{
		id: '0059',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Choose 2 enemies, they battle each other',
		},
	},
	{
		id: '0060',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Swap position of 2 unit, your side',
		},
	},
	{
		id: '0061',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Swap position of 2 unit, opponent side',
		},
	},
	{
		id: '0062',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Swap position of selected unit with center unit, opponent side',
		},
	},
	{
		id: '0063',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Swap position of selected unit with center unit, opponent side',
		},
	},
	{
		id: '0064',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Deal 300 Damage to selected target',
		},
	},
	{
		id: '0065',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Deal 200 Damage to all units',
		},
	},
	{
		id: '0066',
		type: CardType.Spell,
		spellTurn: SpellTurn.Post,
		skill: {
			desc: 'Silence enemy unit in 2 turns',
		},
	},
	{
		id: '0067',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Deal 200 Damage directly to the opponent',
		},
	},
	{
		id: '0068',
		type: CardType.Spell,
		spellTurn: SpellTurn.Post,
		skill: {
			desc: 'Heal 200 Heath for yourself',
		},
	},
	{
		id: '0069',
		type: CardType.Spell,
		spellTurn: SpellTurn.Post,
		skill: {
			desc: '+200 Attack, +200 Health for your Troops',
		},
	},
	{
		id: '0070',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Destroy selected unit',
		},
	},
	{
		id: '0071',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Stun an enemy in 1 turn',
		},
	},
	{
		id: '0072',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Deal 4 Damage to all cards',
		},
	},
	{
		id: '0073',
		type: CardType.Spell,
		spellTurn: SpellTurn.Post,
		skill: {
			desc: 'Shield ally unit from one attack',
		},
	},
	{
		id: '0074',
		type: CardType.Spell,
		spellTurn: SpellTurn.Post,
		skill: {
			desc: 'Shield ally unit from one spell',
		},
	},
	{
		id: '0075',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: '+2 Clever an ally next turn',
		},
	},
	{
		id: '0076',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: '+300 Attack to an ally unit',
		},
	},
	{
		id: '0077',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Deal 200 Damage, and -200 Defense to a unit',
		},
	},
	{
		id: '0078',
		type: CardType.Spell,
		spellTurn: SpellTurn.Post,
		skill: {
			desc: '+200 Defense and Deal 100 Damage to 3 opposite units for 3 turns',
		},
	},
	{
		id: '0079',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Destroy a spell Card from opponent',
		},
	},
	{
		id: '0080',
		type: CardType.Spell,
		spellTurn: SpellTurn.Pre,
		skill: {
			desc: 'Destroy all spell Cards from opponent',
		},
	},
];
