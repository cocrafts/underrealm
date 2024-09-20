import { Fragment } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useReferral } from 'utils/hook';
import resources from 'utils/resources';

import ReferralGuide from './Guide';
import { ReferralLink } from './Link';
import ReferralStatistic from './Statistic';

export const ReferralSection = () => {
	const { styles } = useStyles(stylesheet);
	const { loading } = useReferral();

	return (
		<ImageBackground
			source={resources.quest.referral.backgroundMain}
			resizeMode="contain"
			style={styles.container}
		>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
			) : (
				<Fragment>
					<ReferralStatistic />
					<ReferralLink />
					<ReferralGuide />
				</Fragment>
			)}
		</ImageBackground>
	);
};

export default ReferralSection;

const stylesheet = createStyleSheet({
	container: {
		padding: { lg: 64 },
		paddingHorizontal: { xs: 13, lg: 64 },
		paddingVertical: { xs: 24, lg: 64 },
		marginTop: 40,
	},
	loadingContainer: {
		width: '100%',
		paddingVertical: 50,
		alignItems: 'center',
	},
});
