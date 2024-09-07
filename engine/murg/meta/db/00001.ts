import { interpolate } from '../../utils/card';
import type { Attribute, Card, CleaverAttackEffect } from '../../utils/type';
import {
	ActivationType,
	CardType,
	ClassType,
	InspireSource,
} from '../../utils/type';

const cardList: Card[] = [
	{
		id: '999990000',
		name: 'Troop',
		kind: CardType.Troop,
		rarity: 0,
		class: ClassType.Beast,
		attribute: {
			attack: 20,
			defense: 0,
			health: 40,
		},
		skill: {
			template: '',
		},
	},
	{
		id: '999980000',
		name: 'Wolf',
		kind: CardType.Troop,
		rarity: 0,
		class: ClassType.Beast,
		attribute: {
			attack: 20,
			defense: 0,
			health: 20,
		},
		skill: {
			template: '',
		},
	},
	{
		id: '999970000',
		name: 'Snake',
		kind: CardType.Troop,
		rarity: 0,
		class: ClassType.Beast,
		attribute: {
			attack: 10,
			defense: 0,
			health: 20,
		},
		skill: {
			template: '',
		},
	},
	/* <-- end of Troop cards */
	{
		id: '00001',
		name: 'The Raven',
		class: ClassType.Assassin,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 30,
		},
		skill: {
			template: 'Destroy first facing [Hero].',
			activation: ActivationType.Summon,
			attribute: {
				id: 'DestroyFacingMinHealth',
				minHealth: 9999,
				unitTypes: [CardType.Hero],
			},
		},
	},
	{
		id: '00002',
		name: 'The Mystic',
		class: ClassType.Assassin,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 40,
			defense: 0,
			health: 30,
		},
		skill: {
			template: "[Gain Attack:Buff] equal to facing enemy's [Defense].",
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'GainAttackByEnemyDefense',
			},
		},
	},
	{
		id: '00003',
		name: 'The Shield Breaker',
		class: ClassType.Assassin,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 40,
			defense: 0,
			health: 30,
		},
		skill: {
			template: 'Permanently [{{defense}} Defense:Danger].',
			activation: ActivationType.Attack,
			attribute: {
				id: 'FrontMutate',
				defense: -10,
			},
		},
	},
	{
		id: '00004',
		name: 'The Stinger',
		class: ClassType.Assassin,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 60,
			defense: 0,
			health: 20,
		},
		skill: {
			template: "Ignore enemy's [Defense].",
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'IgnoreEnemyDefense',
			},
		},
	},
	{
		id: '00005',
		name: 'Vesu Beast',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template: "[Gain Attack:Buff] equal to facing enemy's missing [Health].",
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'GainAttackByEnemyMissingHealth',
			},
		},
	},
	{
		id: '00006',
		name: 'Cavalier',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 5,
			health: 35,
		},
		skill: {
			template:
				'[Destroy:Danger] facing enemy if [{{minHealth}} or less] health.',
			activation: ActivationType.PreFight,
			attribute: {
				id: 'DestroyFacingMinHealth',
				minHealth: 30,
				unitTypes: [CardType.Hero, CardType.Troop],
			},
		},
	},
	{
		id: '00007',
		name: 'Fire Champion',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template:
				'Self buff [+{{buff.attack}} Attack:Buff], [+{{cleaver.damage}} Cleaver:Danger] damage in [2] turns.',
			activation: ActivationType.Charge,
			charge: 2,
			attribute: {
				id: 'SelfBuffAndCleaver',
				life: 1,
				buff: {
					health: 0,
					defense: 0,
					attack: 20,
				} as Attribute,
				cleaver: {
					type: 'Fixed',
					damage: 20,
					radius: 1,
				} as CleaverAttackEffect,
			},
		},
	},
	{
		id: '00008',
		name: 'War Chief',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 0,
			defense: 0,
			health: 60,
		},
		skill: {
			template: '[Deal Damage:Danger] equal to remaining health.',
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'GainAttackByRemainingHealth',
			},
		},
	},
	{
		id: '00009',
		name: 'Marcus',
		title: 'The Doom Bringer',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 0,
			health: 50,
		},
		skill: {
			template: 'Deal [{{damage}} Damage:Danger] to random enemy.',
			activation: ActivationType.Charge,
			charge: 1,
			attribute: {
				id: 'RandomEnemyMutate',
				health: -30,
				damage() {
					return Math.abs(this.health);
				},
			},
		},
	},
	{
		id: '00010',
		name: 'Nepia',
		title: 'The King Slayer',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 40,
		},
		skill: {
			template: 'Deal [{{percentage}}% damage:Danger] against [Hero].',
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'DamageMultiplier',
				multiplyFactor: 2.5,
				cardTypes: [CardType.Hero],
				percentage() {
					return this.multiplyFactor * 100;
				},
			},
		},
	},
	{
		id: '00011',
		name: 'Knight Captain',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template: 'Permanently gain [+{{attack}} Attack:Buff].',
			activation: ActivationType.Inspire,
			inspire: InspireSource.Skill,
			attribute: {
				id: 'SelfMutate',
				attack: 5,
			},
		},
	},
	{
		id: '00012',
		name: 'Brawler',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template: 'Gain [+{{attack}} Attack:Buff].',
			activation: ActivationType.Inspire,
			inspire: InspireSource.Death,
			attribute: {
				id: 'SelfMutate',
				attack: 5,
			},
		},
	},
	{
		id: '00013',
		name: 'Legionnaire',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 5,
			health: 50,
		},
		skill: {
			template: 'Deal additional [+{{damage}} Damage:Danger].',
			activation: ActivationType.Glory,
			attribute: {
				id: 'PlayerMutate',
				health: -25,
				isTargetEnemyPlayer: true,
				damage() {
					return Math.abs(this.health);
				},
			},
		},
	},
	{
		id: '00014',
		name: 'Head Hunter',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template:
				'Stack [+10 Attack:Buff] against same enemy. Reset when facing new enemy.',
			activation: ActivationType.Attack,
			attribute: {
				id: 'AttributeStack',
				attack: 10,
			},
		},
	},
	{
		id: '00015',
		name: 'War Hound',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template: 'Double attack.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00016',
		name: 'Paladin',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 50,
		},
		skill: {
			template: 'Ignore [{{defense}} Defense:Danger] on hit.',
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'IgnoreEnemyDefense',
				defense: 10,
			},
		},
	},
	{
		id: '00017',
		name: 'Knight of Vesu',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 5,
			health: 55,
		},
		skill: {
			template: '',
		},
	},
	{
		id: '00018',
		name: 'Fire Warrior',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 35,
			defense: 0,
			health: 35,
		},
		skill: {
			template: '[Immune:Special], and gain [+20 Attack:Buff] next turn.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00019',
		name: 'Destroyer',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template: 'Deal [{{damage}} damage:Danger] to [{{range}}] front enemies',
			activation: ActivationType.Charge,
			charge: 2,
			attribute: {
				id: 'FrontMutate',
				health: -30,
				radius: 1,
				damage() {
					return Math.abs(this.health);
				},
				range() {
					return this.radius * 2 + 1;
				},
			},
		},
	},
	{
		id: '00020',
		name: 'Infiltrator',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 5,
			health: 50,
		},
		skill: {
			template: 'Transform [Damage:Danger] to [Heals:Buff].',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00021',
		name: 'Bjorn Troll',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 10,
			health: 40,
		},
		skill: {
			template:
				'Take extra [+{{attack}} Damage:Danger] against [Assassin:Type] or [Wizard:Type].',
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'MutateByClass',
				isTargetEnemy: true,
				classTypes: [ClassType.Assassin, ClassType.Wizard],
				attack: 15,
			},
		},
	},
	{
		id: '00022',
		name: 'Iron Karhu',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 10,
			health: 40,
		},
		skill: {
			template: 'Self heal [+{{health}} Health:Buff].',
			activation: ActivationType.Charge,
			charge: 2,
			attribute: {
				id: 'SelfMutate',
				health: 20,
			},
		},
	},
	{
		id: '00023',
		name: 'Jøtul',
		title: 'Ironside',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 10,
			defense: 10,
			health: 50,
		},
		skill: {
			template: 'Heal [+10 Health:Buff] for lowest health ally.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00024',
		name: 'Ivar',
		title: 'The Myst',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 10,
			defense: 5,
			health: 50,
		},
		skill: {
			template: 'Create [10/0/10:Type] [Illusion] on nearest position.',
			activation: ActivationType.PostFight,
			attribute: {
				id: 'CreateIllusion',
			},
		},
	},
	{
		id: '00025',
		name: 'Thick Skin',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 0,
			health: 55,
		},
		skill: {
			template: 'Gain [+{{defense}} Defense:Buff].',
			activation: ActivationType.Defense,
			attribute: {
				id: 'SelfMutate',
				defense: 5,
			},
		},
	},
	{
		id: '00026',
		name: 'Tyrkir',
		title: 'The Wall',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 5,
			defense: 10,
			health: 60,
		},
		skill: {
			template: '[+10 Defense:Buff] for [2] nearby allies.',
			activation: ActivationType.Banner,
		},
	},
	{
		id: '00027',
		name: 'Frostbite',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template: 'Permanently [{{attack}} Attack:Danger] of attacker.',
			activation: ActivationType.Defense,
			attribute: {
				id: 'FrontMutate',
				attack: -10,
			},
		},
	},
	{
		id: '00028',
		name: 'Valkyrie',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 5,
			health: 35,
		},
		skill: {
			template: '[Reborn!] (once).',
			activation: ActivationType.Death,
		},
	},
	{
		id: '00029',
		name: 'Ragnar',
		title: 'The Phoenix',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template: '[50%:Buff] [Lifesteal].',
			activation: ActivationType.Attack,
			attribute: {
				id: 'SelfMutate',
				health: 10,
			},
		},
	},
	{
		id: '00030',
		name: 'Gladiator',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 35,
			defense: 0,
			health: 35,
		},
		skill: {
			template: '[+1 Defense:Buff] for each missing health.',
			activation: ActivationType.Passive,
			passiveAttribute: {
				id: 'GainDefenseByMissingHealth',
			},
		},
	},
	{
		id: '00031',
		name: 'Bjorn Defender',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 5,
			defense: 15,
			health: 65,
		},
		skill: {
			template: '',
		},
	},
	{
		id: '00032',
		name: 'Guild Guardian',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 10,
			health: 60,
		},
		skill: {
			template: '',
		},
	},
	{
		id: '00033',
		name: 'Dreki',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 5,
			health: 50,
		},
		skill: {
			template:
				'[Toss] highest and lowest health enemies, deal [30 damage:Danger] to each.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00034',
		name: 'Jarl Guardian',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 5,
			health: 50,
		},
		skill: {
			template:
				'Self buff [Shield] with [20 Defense:Buff], deal [10 Damage:Danger] to 3 front enemies.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00035',
		name: 'Cleric',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 0,
			health: 55,
		},
		skill: {
			template: 'Reduce [1] [Charge] for allies, exclude this unit.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00036',
		name: 'Izel',
		title: 'Shadowdancer',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 0,
			health: 55,
		},
		skill: {
			template:
				'Heal [+30 Health:Buff] for lowest heath ally, and deal [10 Damage:Danger] to 3 front enemies.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00037',
		name: 'Spellcaster',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template:
				'Heal [+20 Health:Buff], deal [20 Damage:Danger] to facing enemy.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00038',
		name: 'Chipahua',
		title: 'Warcry',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 5,
			defense: 5,
			health: 50,
		},
		skill: {
			template: '[+5 Attack:Buff] for ally units.',
			activation: ActivationType.Banner,
		},
	},
	{
		id: '00039',
		name: 'Doom Warlock',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 5,
			defense: 5,
			health: 60,
		},
		skill: {
			template:
				'For each unit on the battlefield, deal [10 Damage:Danger] to all enemies.',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00040',
		name: 'Amoxtli',
		title: 'The Silencer',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 45,
		},
		skill: {
			template: '[Froze] attacker in 1 turn.',
			activation: ActivationType.Defense,
		},
	},
	{
		id: '00041',
		name: 'Healer',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 45,
		},
		skill: {
			template: 'Heal [+{{health}} Health:Buff] for lowest health ally.',
			activation: ActivationType.Charge,
			charge: 2,
			attribute: {
				id: 'LowestHealthMutate',
				isTargetEnemy: false,
				cardTypes: [CardType.Hero, CardType.Troop],
				health: 30,
			},
		},
	},
	{
		id: '00042',
		name: 'Death Dodger',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 45,
		},
		skill: {
			template: 'Heal [+30 Health:Buff] for lowest health ally [Troop].',
			activation: ActivationType.Charge,
			charge: 2,
			attribute: {
				id: 'LowestHealthMutate',
				isTargetEnemy: false,
				cardTypes: [CardType.Troop],
				health: 30,
			},
		},
	},
	{
		id: '00043',
		name: 'Spell Thief',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 5,
			health: 50,
		},
		skill: {
			template: 'Repeat last activated spell.',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00044',
		name: 'Uqiohn',
		title: 'Backslash',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template: 'Deal [{{damage}} Damage:Danger] to facing enemy.',
			activation: ActivationType.Inspire,
			inspire: InspireSource.Skill,
			attribute: {
				id: 'FrontMutate',
				health: -10,
				damage() {
					return Math.abs(this.health);
				},
			},
		},
	},
	{
		id: '00045',
		name: 'Oxone',
		title: 'The Archmage',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 10,
			defense: 0,
			health: 60,
		},
		skill: {
			template: 'Deal [25 Damage:Danger] to all units on the battlefield.',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00046',
		name: 'Blood Tracer',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 30,
			defense: 0,
			health: 40,
		},
		skill: {
			template:
				'[Toss] lowest health and facing enemy, deal [30 Damage] to each.',
			activation: ActivationType.Summon,
		},
	},
	{
		id: '00047',
		name: 'Sage',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template:
				'[Seal] facing enemy, on next turn [Explode], deal [20 Damage:Danger] to 4 nearby enemies.',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00048',
		name: 'Slow Death',
		class: ClassType.Wizard,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 45,
		},
		skill: {
			template:
				'[Seal] facing enemy, on next turn [Explode], deal [20 Damage:Danger] to 4 nearby enemies.',
			activation: ActivationType.Charge,
			charge: 2,
		},
	},
	{
		id: '00049',
		name: 'Trapsmith',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 45,
		},
		skill: {
			template:
				"Set random [Trap] with [30 Damage:Danger] on enemy's battlefield.",
			activation: ActivationType.Summon,
		},
	},
	{
		id: '00050',
		name: 'Dube',
		title: 'The Twins',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 0,
			health: 55,
		},
		skill: {
			template: 'Create [Illusion] of this unit, which live in 2 turns.',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00051',
		name: 'Impela',
		title: 'The Oath Taker',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template:
				'[Steal] and buff [+20 Health:Buff], [+20 Attack:Buff] to closest enemy [Troop].',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
	{
		id: '00052',
		name: 'Unku Shaman',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 15,
			defense: 5,
			health: 55,
		},
		skill: {
			template: '[+10 Attack:Buff] for ally [Troops].',
			activation: ActivationType.Banner,
		},
	},
	{
		id: '00053',
		name: 'Flute Artist',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 45,
		},
		skill: {
			template: 'Summon [20/0/10:Type] [Snake:Type] to nearest place.',
			activation: ActivationType.PreFight,
			// attribute: {
			// 	id: 'SummonSnake',
			// },
		},
	},
	{
		id: '00054',
		name: 'Mind Bender',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 10,
			defense: 5,
			health: 55,
		},
		skill: {
			template:
				'[Steal] facing [Troop] if it have [{{minHealth}} or less] Health.',
			activation: ActivationType.PreFight,
			attribute: {
				id: 'MinHealthSteal',
				minHealth: 20,
				cardTypes: [CardType.Troop],
			},
		},
	},
	{
		id: '00055',
		name: 'Death Whisperer',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 25,
			defense: 0,
			health: 15,
		},
		skill: {
			template: '[Steal] facing enemy.',
			activation: ActivationType.Death,
		},
	},
	{
		id: '00056',
		name: 'Kosan',
		title: 'The Beast Master',
		class: ClassType.Summoner,
		kind: CardType.Hero,
		rarity: 0,
		attribute: {
			attack: 20,
			defense: 0,
			health: 50,
		},
		skill: {
			template: '[Summon] two [20/0/20:Type] [Wolves].',
			activation: ActivationType.Charge,
			charge: 3,
		},
	},
];

export default cardList.map(interpolate);
