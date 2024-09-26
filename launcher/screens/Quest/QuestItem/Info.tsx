import type { FC } from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import UpRightArrow from 'components/icons/UpRightArrow';
import resources from 'utils/resources';

import { SocialPlatform } from './shared';

const getIconByPlatform = (platform: SocialPlatform) => {
	if (platform === SocialPlatform.DISCORD) return resources.quest.discord;

	return resources.quest.twitter;
};

interface Props {
	platform: SocialPlatform;
	title: string;
	description: string;
}

const Info: FC<Props> = ({ platform, title, description }) => {
	const { styles } = useStyles(stylesheet);

	const iconUri = getIconByPlatform(platform);

	return (
		<View style={styles.container}>
			<Image source={iconUri} style={styles.icon} />

			<View style={styles.textContainer}>
				<View style={styles.titleContainer}>
					<Text style={[styles.title]} numberOfLines={2} ellipsizeMode="tail">
						{title}
					</Text>
					<UpRightArrow size={12} />
				</View>
				<Text
					style={[styles.description]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{description}
				</Text>
			</View>
		</View>
	);
};

export default Info;

const stylesheet = createStyleSheet({
	icon: {
		width: { xs: 16, md: 24 },
		height: { xs: 16, md: 24 },
	},
	title: {
		fontFamily: 'Volkhov',
		fontSize: { xs: 14, lg: 18 },
		fontWeight: '600',
		lineHeight: { xs: 16, lg: 28 },
		color: '#ffffff',
		maxWidth: { xs: 100, md: 160, lg: 320, xl: 500 },
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	description: {
		color: '#929292',
		fontSize: { xs: 12, lg: 16 },
		fontWeight: '500',
		lineHeight: { xs: 16, lg: 28 },
		maxWidth: { xs: 120, md: 200, lg: 400, xl: 600 },
	},
	textContainer: {
		gap: 8,
	},
	container: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
});
