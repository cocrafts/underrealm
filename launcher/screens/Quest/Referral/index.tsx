import { useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
	Image,
	ImageBackground,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import UserSolidIcon from 'components/icons/UserSolid';
import resources from 'utils/resources';

export const ReferralSection = () => {
	const { width } = useWindowDimensions();
	const isMobile = useMemo(() => {
		return width < 640;
	}, [width]);

	return (
		<ImageBackground
			source={resources.quest.referral.backgroundMain}
			resizeMode="contain"
			style={[styles.container, isMobile && responsiveStyle.container]}
		>
			<View style={[styles.statistic, isMobile && responsiveStyle.statistic]}>
				<View style={[styles.bonusContainer]}>
					<Text
						style={[
							styles.statisticTitle,
							isMobile && responsiveStyle.statisticTitle,
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
								isMobile && responsiveStyle.statisticNumber,
							]}
						>
							800
						</Text>
					</View>
				</View>
				<View
					style={[
						styles.countContainer,
						isMobile && responsiveStyle.countContainer,
					]}
				>
					<Text
						style={[
							styles.statisticTitle,
							isMobile && responsiveStyle.statisticTitle,
						]}
					>
						Referrals:
					</Text>
					<View style={[styles.pointGroup]}>
						<UserSolidIcon size={28} color="#F2E0C3" />
						<Text
							style={[
								styles.statisticNumber,
								isMobile && responsiveStyle.statisticNumber,
							]}
						>
							4
						</Text>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default ReferralSection;

const styles = StyleSheet.create({
	container: {
		padding: 64,
		marginTop: 40,
	},
	statistic: {
		flexDirection: 'row',
		gap: 24,
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
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 28,
		textAlign: 'center',
	},
	statisticNumber: {
		fontFamily: 'Vollkorn',
		fontSize: 24,
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
		width: 240,
		alignItems: 'center',
		gap: 8,
		justifyContent: 'center',
	},
});

const responsiveStyle: Record<string, StyleProp<ViewStyle | TextStyle>> = {
	container: {
		paddingHorizontal: 13,
		paddingVertical: 24,
	},
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
};