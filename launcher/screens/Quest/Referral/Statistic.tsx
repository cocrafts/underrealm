import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import UserSolidIcon from 'components/icons/UserSolid';
import { useBreakpoints } from 'utils/hook';
import resources from 'utils/resources';

export const ReferralStatistic: FC = () => {
	const { mobileScreen } = useBreakpoints();
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<View style={[styles.bonusContainer]}>
				<Text
					style={[
						styles.statisticTitle,
						mobileScreen && responsiveStyle.statisticTitle,
					]}
				>
					Bonus Referral Rewards:
				</Text>
				<View style={[styles.pointGroup]}>
					<Image
						source={resources.quest.referral.uCoin}
						style={styles.coinImage}
					/>
					<Text
						style={[
							styles.statisticNumber,
							mobileScreen && responsiveStyle.statisticNumber,
						]}
					>
						800
					</Text>
				</View>
			</View>
			<View
				style={[
					styles.countContainer,
					mobileScreen && responsiveStyle.countContainer,
				]}
			>
				<Text
					style={[
						styles.statisticTitle,
						mobileScreen && responsiveStyle.statisticTitle,
					]}
				>
					Referrals:
				</Text>
				<View style={[styles.pointGroup]}>
					<UserSolidIcon size={28} color="#F2E0C3" />
					<Text
						style={[
							styles.statisticNumber,
							mobileScreen && responsiveStyle.statisticNumber,
						]}
					>
						4
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ReferralStatistic;

const stylesheet = createStyleSheet({
	container: {
		flexDirection: 'row',
		gap: { xs: 12, md: 24 },
	},
	bonusContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		gap: 8,
		borderWidth: 1,
		borderColor: '#9F835F',
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	pointGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	statisticTitle: {
		fontFamily: 'Vollkorn',
		fontSize: { xs: 14, md: 18 },
		fontWeight: '700',
		lineHeight: 28,
		textAlign: 'center',
	},
	statisticNumber: {
		fontFamily: 'Vollkorn',
		fontSize: { xs: 16, md: 24 },
		fontWeight: '700',
		color: '#F2E0C3',
	},
	coinImage: {
		width: 24,
		aspectRatio: 24 / 25,
	},
	countContainer: {
		borderWidth: 1,
		borderColor: '#9F835F',
		paddingHorizontal: 20,
		paddingVertical: 16,
		width: { xs: 'auto', lg: 240 },
		alignItems: 'center',
		gap: 8,
		justifyContent: 'center',
		flexGrow: { xs: 1, lg: 0 },
		// flexShrink: { xs: 1, lg: 0 },
		flexBasis: { xs: 0, lg: 'auto' },
	},
});

const responsiveStyle = StyleSheet.create({
	statistic: {
		gap: 12,
	},
	statisticTitle: {
		fontSize: 14,
	},
	statisticNumber: {
		fontSize: 16,
	},
	countContainer: {
		flex: 1,
		width: 'auto',
	},
});
