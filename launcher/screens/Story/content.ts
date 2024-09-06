import resources from 'utils/resources';

interface BannerType {
	label: string;
	icon: number;
	activeIcon: number;
	title: string;
	description: string;
	image: number;
}
export const banner: BannerType[] = [
	{
		label: 'Knight',
		icon: resources.story.knightIconNormal,
		activeIcon: resources.story.knightIconActive,
		title: 'Knight Legion',
		image: resources.story.knightImage,
		description:
			'The Knight Legion, led by Maximus the Strong is composed of brave warriors who put their faith in and worship the enormous fire of ignis Mountain.\n' +
			'\n' +
			'Minimus defhands all creatures on the ATEM continent to live honorably, battle with integrity, and behave them setves according to the "gnis Codes also known as the Absolute Truth, or else they will be reduced to ash by the volcanoes\n' +
			'\n' +
			"The Knight Legion's capital city, known as Vesu Atsu, may be found in the Southern region of the ATEM Continent",
	},
	{
		label: 'Tank',
		icon: resources.story.tankIconNormal,
		activeIcon: resources.story.tankIconActive,
		title: 'Tanker Guild',
		image: resources.story.tankImage,
		description:
			"The soldiers of the Tanker Guild, led by the ruthless Warlord Alvis the Short, are legendary for being the most formidable of all mercenaries. They're only loyal to the person who has the deepest pocket stuffed with gold. Depending on their contracts, this guild either protects or raids trading lines across ATEM, or even creates new lines.\n" +
			'\n' +
			'According to Alvis, the more disjointed and chaotic the world gets, the stronger the Tanker Guild will be. And he is dead serious about making this dream a reality.\n' +
			'\n' +
			'The Frorburg Fortress of the Tanker Guild can be found in the arctic regions of the ATEM Continent, where the icy Bjorn Mountains and the crashing waves of the [Ocean] meet.',
	},
	{
		label: 'Summoner',
		icon: resources.story.summonerIconNormal,
		activeIcon: resources.story.summonerIconActive,
		title: 'Summoner Clan',
		image: resources.story.summonerImage,
		description:
			'The Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate with the wild beasts and make them into reliable combat partners.\n' +
			'\n' +
			'The Summoner holds the view that all beings in ATEM must follow the laws of Unku, the  Nature Goddess. Anyone who goes against this will be put down by the tribe.\n' +
			'\n' +
			'Unku Sanctuary of the Summoner Clan can be found deep in the Silent Forest, southeast of ATEM.',
	},
	{
		label: 'Wizard',
		icon: resources.story.wizardIconNormal,
		activeIcon: resources.story.wizardIconActive,
		title: 'Wizard Council',
		image: resources.story.wizardImage,
		description:
			'The Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate with wild beast and make them into reliable combat partners.\n' +
			'\n' +
			"To the west edge of ATEM, The Wizard Council's seat of power, known as Atlan City, may be found on the tip of the Tormentas Cap.",
	},
	{
		label: 'Assasin',
		icon: resources.story.assasinIconNormal,
		activeIcon: resources.story.assasinIconActive,
		title: 'Assassin Order',
		image: resources.story.assasinImage,
		description:
			"When the Assassin Guild sets its sights on someone, that person has no chance of evading death. And the Order's ultimate objective is a mystery to everyone.\n" +
			'\n' +
			'The Myst Cliff of the Bjorn mount is where the stronghold of the Assassin Order is located. \n' +
			'No one knows who is the leader of this notorious organization but the person bears the Raven Mask. Known as Faceless Death, assassins never show their true identity, it’s either hidden behind a mask or layers of disguise.',
	},
];
