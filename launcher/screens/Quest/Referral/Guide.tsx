import { Image, ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

import { guideContent } from './internal';

export const ReferralGuide = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<View style={styles.visualContainer}>
				<Text style={styles.visualText}>
					Hey there! Looking to earn some extra coins?
				</Text>
				<Image source={resources.quest.referral.chest} style={styles.visual} />
			</View>
			<View style={styles.guideContainer}>
				<View style={styles.verticalLine} />
				{guideContent.map((content) => (
					<View key={content.title}>
						<ImageBackground
							imageStyle={styles.backgroundStyle}
							style={styles.guideTitleContainer}
							source={resources.quest.referral.guideTitleBg}
							resizeMode="contain"
						>
							<Image
								source={resources.quest.referral.visualBullet}
								style={styles.bullet}
							/>
							<Text style={styles.guideTitle}>{content.title}</Text>
						</ImageBackground>
						<Text style={styles.guideContent}>{content.content}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default ReferralGuide;

const stylesheet = createStyleSheet({
	container: {
		flexDirection: { xs: 'column', md: 'row' },
		justifyContent: { xs: 'flex-start', md: 'space-around' },
		alignItems: 'center',
		marginTop: { xs: 8, lg: 40 },
		paddingVertical: { xs: 8, lg: 48 },
		flexWrap: 'wrap',
	},
	visualContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexGrow: 1,
		gap: { xs: 20, lg: 40 },
		maxWidth: { xs: 400, lg: 600 },
	},
	visualText: {
		fontFamily: 'Vollkorn',
		fontSize: { xs: 13, lg: 24 },
		fontWeight: '700',
		lineHeight: { xs: 18, md: 33 },
		maxWidth: { xs: 150, md: 270 },
	},
	visual: {
		width: { xs: 107, lg: 228 },
		aspectRatio: 228 / 225,
	},
	guideContainer: {
		position: 'relative',
		marginLeft: { xs: 0, md: 40 },
		gap: 16,
		maxWidth: { xs: 250, lg: 185 },
	},
	verticalLine: {
		position: 'absolute',
		left: -14,
		top: 12,
		bottom: 0,
		borderLeftWidth: 1,
		borderLeftColor: '#A28888',
	},
	guideTitleContainer: {
		width: 140,
		height: 35,
		justifyContent: 'center',
		position: 'relative',
	},
	backgroundStyle: {
		left: -12,
		top: -3,
	},
	bullet: {
		width: 13,
		height: 13,
		position: 'absolute',
		left: -20,
		top: 9,
		backgroundColor: '#000000',
	},
	guideTitle: {
		fontFamily: 'Vollkorn',
		fontWeight: '700',
		fontSize: { xs: 13, lg: 16 },
		lineHeight: { xs: 18, lg: 22 },
	},
	guideContent: {
		fontWeight: '500',
		fontSize: { xs: 12, lg: 13 },
		lineHeight: { xs: 20, lg: 24 },
		opacity: 0.8,
	},
});
