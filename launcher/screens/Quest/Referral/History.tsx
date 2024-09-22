import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import { HeaderLine } from 'components/icons/underRealm/HeaderLine';
import { useReferral } from 'utils/hook';
import resources from 'utils/resources';

export const ReferralHistory = () => {
	const { styles } = useStyles(stylesheet);
	const { data } = useReferral();

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<HeaderLine style={{ transform: [{ rotate: '180deg' }] }} />
				<Text style={styles.header}>My Referrals</Text>
				<HeaderLine />
			</View>
			<View style={styles.row}>
				<Text style={[styles.columnTitle, styles.flex1]}>Date</Text>
				<Text style={[styles.columnTitle, styles.flex2]}>Player</Text>
				<Text style={[styles.columnTitle, styles.flex1]}>Points</Text>
			</View>
			{data?.referralHistory.length !== 0 &&
				data?.referralHistory.map((ref) => {
					const date = new Date(ref.createdAt);
					return (
						<View key={ref.id} style={[styles.row, styles.itemContainer]}>
							<Text style={[styles.flex1, styles.itemText]}>
								{`${date.getDay().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`}
							</Text>
							<Text style={[styles.flex2, styles.itemText]}>
								{`${ref.refereeUser.id.slice(0, 6)}...${ref.refereeUser.id.slice(-3)}`}
							</Text>
							<View style={[styles.flex1, styles.itemPoints]}>
								<Image
									source={resources.quest.referral.uCoin}
									style={styles.coinImage}
								/>
								<Text style={styles.points}>{ref.claimedPoints}</Text>
							</View>
						</View>
					);
				})}
		</View>
	);
};

export default ReferralHistory;

const stylesheet = createStyleSheet({
	container: {
		marginTop: 40,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	header: {
		fontFamily: 'Volkhov',
		fontSize: { xs: 14, lg: 18 },
		fontWeight: '700',
		lineHeight: 28,
	},
	row: {
		flexDirection: 'row',
		paddingHorizontal: { xs: 12, lg: 20 },
		paddingVertical: 6,
		gap: 8,
	},
	columnTitle: {
		fontWeight: '500',
		lineHeight: 28,
		color: '#929292',
	},
	flex1: {
		flex: 1,
	},
	flex2: {
		flex: 2,
	},
	itemContainer: {
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#5A5A5A',
	},
	itemText: {
		fontSize: { xs: 12, lg: 16 },
		fontWeight: '500',
		lineHeight: 28,
	},
	coinImage: {
		width: { xs: 20, lg: 24 },
		aspectRatio: 24 / 25,
	},
	itemPoints: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	points: {
		fontFamily: 'Vollkorn',
		fontSize: { xs: 16, lg: 20 },
		fontWeight: '700',
		lineHeight: 28,
		color: '#F2E0C3',
	},
});
