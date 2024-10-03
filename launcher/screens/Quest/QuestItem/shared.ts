import { QuestType } from 'utils/graphql';

export enum SocialPlatform {
	DISCORD = 'Discord',
	X = 'X',
}

export const questPlatformMapping: Record<QuestType, SocialPlatform> = {
	[QuestType.LikeX]: SocialPlatform.X,
	[QuestType.RetweetX]: SocialPlatform.X,
	[QuestType.CommentX]: SocialPlatform.X,
	[QuestType.FollowX]: SocialPlatform.X,
	[QuestType.JoinDiscord]: SocialPlatform.DISCORD,
	[QuestType.ChatDiscord]: SocialPlatform.DISCORD,
};
