import type { FC } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

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
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);

	const iconUri = getIconByPlatform(platform);
	const textMaxWidthOnWeb = useMemo(
		() => (windowSize.width * 400) / 1440,
		[windowSize.width],
	);

	return (
		<View style={[styles.container, isMobile ? styles.containerOnMobile : {}]}>
			<Image
				source={iconUri}
				style={isMobile ? styles.iconOnMobile : styles.icon}
			/>

			<View
				style={isMobile ? styles.textContainerOnMobile : styles.textContainer}
			>
				<Text
					style={[
						styles.title,
						{ maxWidth: textMaxWidthOnWeb },
						isMobile ? styles.titleOnMobile : {},
					]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{title}
				</Text>
				<Text
					style={[
						styles.description,
						{ maxWidth: textMaxWidthOnWeb },
						isMobile ? styles.desOnMobile : {},
					]}
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

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24,
	},
	iconOnMobile: {
		width: 16,
		height: 16,
	},
	title: {
		fontFamily: 'Volkhov',
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 28,
		color: '#ffffff',
	},
	description: {
		color: '#929292',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 28,
	},
	textContainer: {
		gap: 8,
	},
	textContainerOnMobile: {
		gap: 4,
	},
	container: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
	containerOnMobile: {
		gap: 12,
	},
	titleOnMobile: {
		fontSize: 12,
		lineHeight: 16,
		maxWidth: 100,
	},
	desOnMobile: {
		fontSize: 10,
		lineHeight: 12,
		maxWidth: 140,
	},
	buttonTextOnMobile: {
		fontSize: 12,
	},
});
