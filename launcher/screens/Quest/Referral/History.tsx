import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import { HeaderLine } from 'components/icons/underRealm/HeaderLine';
import { useReferral } from 'utils/hooks';
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
				<Text style={[styles.columnTitle, styles.col1, styles.dateCol]}>
					Date
				</Text>
				<Text style={[styles.columnTitle, styles.col2]}>Player</Text>
				<Text style={[styles.columnTitle, styles.col1]}>Points</Text>
			</View>
			{data?.referralHistory.length !== 0 &&
				data?.referralHistory.map((ref) => {
					const date = new Date(ref.createdAt);
					return (
						<View key={ref.id} style={[styles.row, styles.itemContainer]}>
							<Text style={[styles.col1, styles.itemText, styles.dateCol]}>
								{`${date.toLocaleDateString()}`}
							</Text>
							<Text style={[styles.col2, styles.itemText]} numberOfLines={1}>
								{`${ref.refereeUser.id}`}
							</Text>
							<View style={[styles.col1, styles.itemPoints]}>
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
		textAlign: 'center',
	},
	row: {
		flexDirection: 'row',
		paddingHorizontal: { xs: 12, lg: 20 },
		paddingVertical: 6,
		borderWidth: 1,
		borderColor: 'transparent',
		gap: 16,
	},
	columnTitle: {
		fontWeight: '500',
		lineHeight: 28,
		color: '#929292',
	},
	dateCol: {
		minWidth: 72,
	},
	col1: {
		flex: 1,
		minWidth: 72,
	},
	col2: {
		flex: 2,
		minWidth: 72,
	},
	itemContainer: {
		marginBottom: 16,
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
