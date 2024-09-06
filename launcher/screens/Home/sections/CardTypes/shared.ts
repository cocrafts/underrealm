import type { ImageSourcePropType } from 'react-native';
import resources from 'utils/resources';

export interface CardTypeItem {
	title: string;
	content: string[];
	image: ImageSourcePropType;
}

export const cardTypeList: CardTypeItem[] = [
	{
		title: 'Hero',
		content: [
			'Every hero card has a distinctively high set amount of Attack/ Defense/ Health Points and usually has a special ability described in the card text.',
			'Hero cards can be placed on the board and used to attack the opponent’s hero or adventurer.',
			'The hero card is destroyed when its health is reduced to 0 and it is sent to the graveyard.',
		],
		image: resources.home.cardTypesHeroVisual,
	},
	{
		title: 'Spell',
		content: [
			'Spell cards do not have a set amount of Attack/ Defense/ Health points on the card design.',
			'Spell cards can be used to cast potentially match-turning spells determined by their abilities. Use spell cards to reinforce your creatures and play style, from supportive to damaging spells.',
			'Once a spell card has been used, the card will be sent to the void. The spell card is destroyed when it is used.',
		],
		image: resources.home.cardTypesSpellVisual,
	},
	{
		title: 'Troop',
		content: [
			'Troop Card usually just has a set of Attack/ Defense/ Health Points, without special ability.',
			'Troop cards can be used to reinforce the hero card on the battlefield.',
			'The troop card is destroyed when its health is reduced to 0 and it is sent to the graveyard.',
		],
		image: resources.home.cardTypesTroopVisual,
	},
];
