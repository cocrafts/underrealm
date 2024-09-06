import type { ContentType } from 'screens/Guide/shared';
import resources from 'utils/resources';

export const battlefield: ContentType = {
	intro:
		'Take a look at the setup of the battlefield. Understanding this will give you an advantage in a match and get you closer to winning.',
	concepts: [
		{
			label: 'Hand',
			icon: resources.guide.handIcon,
			image: resources.guide.handImage,
			description:
				'Here are the cards you have available to summon on the battlefield each turn.\n' +
				'At the beginning of each turn, Adventurer will be able to draw 2 Cards from their deck. \n' +
				'\n' +
				'For every 3 turns, the player will draw 5 spell cards select 3 to keep on hand and discard 2.\n' +
				'\n' +
				'The maximum number of cards on hand is 7.  When hitting the limit, the Adventurer will have to choose to discard exceeded amount before choosing to end their turn. At the Soft Launch, this function is not activated yet as we want the players to test out all the strategy as they want before we can close down to a suitable on-hand card limit.',
		},
		{
			label: 'Deck',
			icon: resources.guide.deckIcon,
			image: resources.guide.deckImage,
			description:
				'The deck contains all the cards available to summon each match. The maximum number of cards in the deck is 40. \n' +
				'\n' +
				'From the deck, cards will be drawn randomly to Hand before summoning to the battlefield.\n' +
				'\n' +
				'In the Beta version, Adventurers can construct the deck as they want to serve the best of their playing styles.',
		},
		{
			label: 'Magic Tower',
			icon: resources.guide.spellIcon,
			image: resources.guide.magicTowerImage,
			description:
				'During a match, Spell Cards must be placed in the magic tower before being activated base on each card’s condition. \n' +
				'\n' +
				'At the beginning of the match, only 2 slots for Spell Card will be available. Every 5 turns, 1 more slot will be added. The maximum number of Spell Cards that can be stored in the Magic Tower is 5. ',
		},
		// {
		// 	label: 'Grave',
		// 	icon: resources.guide.graveIcon,
		// 	description:
		// 		'Destroyed/ used cards will be gathered in the Graveyard area.\n' +
		// 		'From the Graveyard, cards with special abilities can be brought back to the match.',
		// },
		{
			label: 'Summon Zone',
			icon: resources.guide.summonZoneIcon,
			image: resources.guide.summonImage,
			description:
				'Summon Zone is where Hero and Troop cards will be summoned to engage in combat\n' +
				'In the summon zone, cards will be placed on the left or right flank of the center card. \n' +
				'\n' +
				'When a card in the middle of the formation is destroyed, the empty position will be filled by the card next card to the left or right of it, based on the direction toward the center.',
		},
		{
			label: 'End Turn',
			icon: resources.guide.endTurnIcon,
			image: resources.guide.endTurnImage,
			description:
				'After finishing placing the Hero/ Troop card on the battlefield and activating Spell Card - Clicking End Turn to start engaging with the opponent’s cards.',
		},
		{
			label: 'Health Point',
			icon: resources.guide.healthPointIcon,
			image: resources.guide.healthPointImage,
			description:
				'Health Point is the decisive element to the result of a match. By reducing the HP of the opponent to 0, Adventurer will win the game.\n' +
				'\n' +
				'In the case the match time run out, Adventurer with a higher HP will win the match.',
		},
		{
			label: 'History',
			icon: resources.guide.historyIcon,
			image: resources.guide.battlefieldImage,
			description:
				'The history allows Adventurer to keep track of the match turn by turn',
		},
	],
};

export const play: ContentType = {
	intro:
		"To win the game, the player is required to: Reduce the opposing player's Health Points to zero",
	concepts: [
		{
			label: 'Draw',
			icon: resources.guide.drawIcon,
			description:
				'At each turn, draw from the deck 1 Hero Card + 1 Troop Card. Every 3 turns both players draw 5 spell cards select 3 and discard 2.',
		},
		{
			label: 'Setup',
			icon: resources.guide.setupIcon,
			description:
				'- At turn 1, place 1 Hero Card in the center and 1 Troop Card faced down on any side.\n' +
				'- Setup spell if needed in the tower Initially, both teams have 2 towers. At the beginning of the match, only 2 slots for Spell Card will be available. Every 5 turns, 1 more slot will be added. The maximum number of Spell Cards that can be stored in the Magic Tower is 5.\n' +
				'- 30 seconds to setup\n' +
				'- Confirm by clicking the End Turn button',
		},
		{
			label: 'Battle',
			icon: resources.guide.battleIcon,
			description:
				'After 2 Adventurers had completed the Card setup, Spell and all other card is automatically engaged on the battlefield\n' +
				'\n' +
				'Which card does not face the enemy card will attack directly to opposing Adventurer’s Health Point',
		},
	],
};

export const card: ContentType = {
	intro:
		'This quick read will teach you how to distinguish between the many types and classes of cards that are available in Under Realm: Rise of Magic, identify their characteristics, and maybe provide you with some advice and ideas on the kinds of strategy you can build.',
	concepts: [
		{
			label: 'Hero',
			icon: resources.guide.heroIcon,
			description:
				'Every hero card has a distinctively high set amount of Attack/ Defense/ Health Points and usually has a special ability described in the card text. \n' +
				'Hero cards can be placed on the board and used to attack the opponent’s hero or adventurer.\n' +
				'The hero card is destroyed when its health is reduced to 0 and it is sent to the graveyard.',
			additional: [
				{
					title: 'Card Rarity',
					text:
						'Card rarity can be recognized by the gems on the top of the card. Cards with higher rarities are harder to acquire in the NFT Minting Event as they have a lower drop rate.\n' +
						'\n' +
						'There are 7 rarities:\n' +
						'\n' +
						'- Common (Non-NFT): 0 Gem Stone\n' +
						'- Rare: 1 Ruby Gem Stone\n' +
						'- Epic: 2 Ruby Gem Stones\n' +
						'- Mystic: 3 Ruby Gem Stones\n' +
						'- Legendary: 4 Ruby Gem Stones\n' +
						'- Immortal: 5 Ruby Gem Stones\n' +
						'- Sentinel: TBD',
				},
				{
					title: '5 Hero Classes',
					text:
						'Knight:\n' +
						'The Knight Legion is composed of brave warriors who put their faith in and worship the enormous fire of Ignis Mountain. They are famous as warriors with balance Attack & Defense\n' +
						'and boosting attack abilities\n' +
						'\n' +
						'Tanker:\n' +
						'The soldiers of the Tanker Guild are legendary for being the most formidable of all mercenaries. With high defense, health points, plus boosting defense abilities, Tankers are an unbreakable defense line.\n' +
						'\n' +
						'Wizard:\n' +
						'The Wizard Council’s members are admired for their mythological healing practices. But the magical power can also be terrifying and destructive, capable of destroying an entire army in the blink of an eye. With their mass destruction, and health restoration skills, Wizards are the nightmare of their enemies on the battlefield. \n' +
						'\n' +
						'Summoner\n' +
						'The Summoner Clan is well-known for its members’ extraordinary ability to communicate with wild beasts and make them reliable combat partners. The summoner always can storm the battlefield by summoning reinforcement or even take control their enemy’s heroes and troops.\n' +
						'\n' +
						'Assassin\n' +
						'Mastering the abilities to ignore the opponent’s defense and critical damage hit, when the Assassin Guild sets its sights on someone, that person has no chance of evading death.',
				},
				{
					title: 'HERO ABILITY',
					text:
						'Each hero card usually has a special ability. These abilities can be boosting attack, defense, healing… Abilities are activated depending on certain condition described in the card text.\n' +
						'\n' +
						'The card text can break down into 2 components: **Activating Condition:** Effect Description\n' +
						'\n' +
						'List of Ability Activating Conditions:\n' +
						'\n' +
						'- **Summon**: Activated when a Card is summoned from Hand to Summon Zone\n' +
						'- **Death**: Activated when the Card HP is 0\n' +
						'- **Passive:** Always being activated\n' +
						'- **Pre-fight**: Activated before the Battle Phase\n' +
						'- **Post-fight:** Activated after the Battle Phase\n' +
						'- **Attack:** Activated When attacking other units\n' +
						'- **Defense:** Activated when being attacked\n' +
						'- **Charge** (X): Activated after every (X) turn\n' +
						'- **Glory:** Activated when this unit attacked the opposing player\n' +
						'- **Banner:** Activated when being on the battlefield\n' +
						'- **Inspire** **X:** Activated depends on X amount of inspiring condition\n' +
						'\n' +
						'Inspiring condition:\n' +
						'+ Inspire Skill: Number of Abilities being activated\n' +
						'+ Inspire Death: Number of allied units destroyed\n' +
						'+ Inspire Summon: Number of summoned units each round\n' +
						'+ Inspire Metal: Number of Metal Spell/ Ability being activated\n' +
						'+ Inspire Wood: Number of Wood Spell/ Ability being activated\n' +
						'+ Inspire Water: Number of Water Spell/ Ability being activated\n' +
						'+ Inspire Fire: Number of Fire Spell/ Ability being activated\n' +
						'+ Inspire Earth: Number of Earth Spell/ Ability being activated\n' +
						'+ Inspire Light: Number of Light Spell/ Ability being activated\n' +
						'+ Inspire Dark: Number of Dark Spell/ Ability being activated',
				},
			],
		},
		{
			label: 'Spell',
			icon: resources.guide.spellIcon,
			description:
				'Spell cards do not have a set amount of Attack/ Defense/ Health points on the card design.\n' +
				'Spell cards can be used to cast potentially match-turning spells determined by their abilities. Use spell cards to reinforce your creatures and play style, from supportive to damaging spells.\n' +
				'Once a spell card has been used, the card will be dusted and come to the graveyard.',
		},
		{
			label: 'Troop',
			icon: resources.guide.troopIcon,
			description:
				'Troop Card usually just has a set of Attack/ Defense/ Health Points, without special ability.\n' +
				'Troop cards can be used to reinforce the hero card on the battlefield.\n' +
				'The troop card is destroyed when its health is reduced to 0 and it is sent to the graveyard',
		},
	],
};
