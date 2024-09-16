import type { QuestProps } from './QuestItem';
import { Platform } from './QuestItem';

export const mockQuests: QuestProps[] = [
	{
		title: 'Connect Discord',
		description: 'Connect Discord to unlock Tavern Guest quests',
		platform: Platform.DISCORD,
		points: 100,
	},
	{
		title: 'Tavern Guest',
		description: 'Introduce yourself in Discord challen #the-tavern',
		platform: Platform.DISCORD,
		points: 100,
	},
	{
		title: 'Connect X (Twitter)',
		description: 'Connect X to unlock Horseback Messenger quests',
		platform: Platform.X,
		points: 100,
	},
	{
		title: 'Horseback Messenger',
		description: 'Like & Retweet Tweet “Announcement of Game”',
		platform: Platform.X,
		points: 100,
	},
	{
		title: 'Retweet a latest post from X',
		description: 'Retweet a post from X account',
		platform: Platform.X,
		points: 100,
	},
];

export enum TabId {
	QUEST = 'Social Quest',
	REFERRAL = 'Referral',
}
