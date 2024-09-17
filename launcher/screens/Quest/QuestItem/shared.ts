export enum SocialPlatform {
	DISCORD = 'Discord',
	X = 'X',
}

export enum SocialQuestType {
	LIKE_X = 'LIKE_X',
	RETWEET_X = 'RETWEET_X',
	JOIN_DISCORD = 'JOIN_DISCORD',
	COMMENT_X = 'COMMENT_X',
}

export const questPlatformMapping: Record<SocialQuestType, SocialPlatform> = {
	[SocialQuestType.LIKE_X]: SocialPlatform.X,
	[SocialQuestType.RETWEET_X]: SocialPlatform.X,
	[SocialQuestType.COMMENT_X]: SocialPlatform.X,
	[SocialQuestType.JOIN_DISCORD]: SocialPlatform.DISCORD,
};
