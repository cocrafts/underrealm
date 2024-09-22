import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

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
			<Image source={resources.quest.referral.guideLg} style={styles.guide} />
		</View>
	);
};

export default ReferralGuide;

const stylesheet = createStyleSheet({
	container: {
		flexDirection: { xs: 'column', md: 'row' },
		justifyContent: { xs: 'flex-start', md: 'space-between' },
		alignItems: 'center',
		marginTop: { xs: 8, lg: 40 },
		paddingVertical: { xs: 8, lg: 48 },
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
	guide: {
		width: { xs: 201, lg: 201 },
		aspectRatio: { xs: 201 / 365, lg: 201 / 365 },
		marginTop: { xs: 8, lg: 0 },
	},
});
