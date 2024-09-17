import { ImageBackground } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import resources from 'utils/resources';

import { ReferralLink } from './Link';
import ReferralStatistic from './Statistic';

export const ReferralSection = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<ImageBackground
			source={resources.quest.referral.backgroundMain}
			resizeMode="contain"
			style={styles.container}
		>
			<ReferralStatistic />
			<ReferralLink />
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
});
