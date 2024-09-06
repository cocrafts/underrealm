import type { ImageSourcePropType } from 'react-native';
import resources from 'utils/resources';

export interface ClassItem {
	id: string;
	title: string;
	color: string;
	image: {
		backgroundActive: ImageSourcePropType;
		logoBackgroundActive: ImageSourcePropType;
		logo: ImageSourcePropType;
		logoActive: ImageSourcePropType;
	};
	description: string;
	specialty: string[];
	position: {
		x: number;
		y: number;
	};
}

export const classList: ClassItem[] = [
	{
		id: 'summoner',
		title: 'SUMMONER',
		color: '#3abd9d',
		image: {
			backgroundActive: resources.home.classes.summoner.backgroundActive,
			logoBackgroundActive:
				resources.home.classes.summoner.logoBackgroundActive,
			logo: resources.home.classes.summoner.logo,
			logoActive: resources.home.classes.summoner.logoActive,
		},
		description:
			'The Summoner Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate to wild beast and make them into reliable combat partners.',
		specialty: ['Summoning troop card', "Taking control opponent's card"],
		position: {
			x: 0,
			y: 0,
		},
	},
	{
		id: 'assassin',
		title: 'ASSASSIN',
		color: '#651318',
		image: {
			backgroundActive: resources.home.classes.assassin.backgroundActive,
			logoBackgroundActive:
				resources.home.classes.assassin.logoBackgroundActive,
			logo: resources.home.classes.assassin.logo,
			logoActive: resources.home.classes.assassin.logoActive,
		},
		description:
			'No one knows who is the leader of this notorious organization but the person bears the Raven Mask. Assassins never show their true identity. When the Assassin Guild sets its sights on someone, that person has no chance of evading death. ',
		specialty: ['Ignore Defense', '1-hit-1-kill'],
		position: {
			x: 233,
			y: 0,
		},
	},
	{
		id: 'wizard',
		title: 'WIZARD',
		color: '#5295e7',
		image: {
			backgroundActive: resources.home.classes.wizard.backgroundActive,
			logoBackgroundActive: resources.home.classes.wizard.logoBackgroundActive,
			logo: resources.home.classes.wizard.logo,
			logoActive: resources.home.classes.wizard.logoActive,
		},
		description:
			'The Wizard Council, overseen by the powerful wizard Meztli the Wise, is admired for its mythological healing practices. But their magical power can also be terrifying and destructive, capable of destroying an entire army in the blink of an eye.',
		specialty: ['Mass damage', 'Health restoration'],
		position: {
			x: 460,
			y: 0,
		},
	},
	{
		id: 'tanker',
		title: 'TANKER',
		color: '#be3126',
		image: {
			backgroundActive: resources.home.classes.tanker.backgroundActive,
			logoBackgroundActive: resources.home.classes.tanker.logoBackgroundActive,
			logo: resources.home.classes.tanker.logo,
			logoActive: resources.home.classes.tanker.logoActive,
		},
		description:
			"The soldiers of the Tanker Guild, led by the ruthless Warlord Alvis the Short, are legendary for being the most formidable of all mercenaries. They're only loyal to the person who has the deepest pocket stuffed with gold.",
		specialty: ['High Defense & Health', 'Boosting Defense'],
		position: {
			x: 460,
			y: 324,
		},
	},
	{
		id: 'knight',
		title: 'KNIGHT',
		color: '#c67e44',
		image: {
			backgroundActive: resources.home.classes.knight.backgroundActive,
			logoBackgroundActive: resources.home.classes.knight.logoBackgroundActive,
			logo: resources.home.classes.knight.logo,
			logoActive: resources.home.classes.knight.logoActive,
		},
		description:
			'The Knight Legion, led by Maximus the Strong, is composed of brave warriors who put their faith in and worship the enormous fire of Ignis Mountain.',
		specialty: ['Balance Attack & Defense', 'Boosting Attack'],
		position: {
			x: 0,
			y: 324,
		},
	},
];
