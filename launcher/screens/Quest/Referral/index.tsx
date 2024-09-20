import { Fragment } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useReferral } from 'utils/hook';
import resources from 'utils/resources';

import ReferralGuide from './Guide';
import ReferralHistory from './History';
import { ReferralLink } from './Link';
import ReferralStatistic from './Statistic';

export const ReferralSection = () => {
	const { styles } = useStyles(stylesheet);
	const { loading } = useReferral();

	return (
		<Fragment>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
			) : (
				<View style={styles.container}>
					<ImageBackground
						source={resources.quest.referral.backgroundMain}
						resizeMode="contain"
						style={styles.backgroundContainer}
					>
						<ReferralStatistic />
						<ReferralLink />
						<ReferralGuide />
					</ImageBackground>
					<ReferralHistory />
				</View>
			)}
		</Fragment>
	);
};

export default ReferralSection;

const stylesheet = createStyleSheet({
	container: {
		padding: { lg: 64 },
		paddingHorizontal: { xs: 13, lg: 64 },
	},
	backgroundContainer: {
		marginTop: 40,
		paddingVertical: { xs: 24, lg: 64 },
	},
	loadingContainer: {
		width: '100%',
		paddingVertical: 50,
		alignItems: 'center',
	},
});
