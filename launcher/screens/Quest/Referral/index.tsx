import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';
import { useBreakpoints } from 'utils/hook';
import resources from 'utils/resources';

import { ReferralLink } from './Link';
import ReferralStatistic from './Statistic';

export const ReferralSection = () => {
	const { mobileScreen } = useBreakpoints();

	return (
		<ImageBackground
			source={resources.quest.referral.backgroundMain}
			resizeMode="contain"
			style={[styles.container, mobileScreen && responsiveStyle.container]}
		>
			<ReferralStatistic />
			<ReferralLink />
		</ImageBackground>
	);
};

export default ReferralSection;

const styles = StyleSheet.create({
	container: {
		padding: 64,
		marginTop: 40,
	},
});

const responsiveStyle: Record<string, StyleProp<ViewStyle | TextStyle>> = {
	container: {
		paddingHorizontal: 13,
		paddingVertical: 24,
	},
};
