import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import DiscordIcon from 'components/icons/Discord';
import GithubIcon from 'components/icons/GithubSolid';
import TwitterIcon from 'components/icons/Twitter';
import { navigate } from 'stacks/Browser/shared';

export interface ButtonText {
	title: string;
	isAvailable: boolean;
	onPress?: () => void;
}

interface Props {
	size?: number;
	color?: string;
	style?: ViewStyle;
}

export interface SocialLink {
	href: string;
	Component: FC<Props>;
	props: Props;
}

export const buttonList: ButtonText[] = [
	{
		title: 'Play on Web',
		isAvailable: true,
		onPress: () => navigate('Game'),
	},
	{
		title: 'Mobile App',
		isAvailable: false,
	},
	{
		title: 'Desktop App',
		isAvailable: false,
	},
];

export const socialLinkList: SocialLink[] = [
	{
		href: 'https://discord.gg/sXcz9Em4AR',
		Component: DiscordIcon,
		props: {
			size: 42,
		},
	},
	{
		href: 'https://twitter.com/PlayUnderRealm',
		Component: TwitterIcon,
		props: {
			size: 40,
		},
	},
	{
		href: 'https://github.com/cocrafts',
		Component: GithubIcon,
		props: {
			size: 32,
		},
	},
];
