import type { FC } from 'react';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { modalActions, Text } from '@metacraft/ui';
import UnderRealmBoard from 'components/Board';
import UnderRealmButton from 'components/Marketplace/Button';
import SignInOptions from 'components/modals/SignInOptions';
import { useSnapshot } from 'utils/hook';
import { accountState } from 'utils/state/account';

const StatisticBoard: FC = () => {
	const { profile } = useSnapshot(accountState);
	const isLoggedIn = profile.id ? true : false;

	const showSignInOptions = () => {
		modalActions.show({
			id: 'signInOptions',
			component: SignInOptions,
		});
	};

	const statisticContent = (
		<Fragment>
			<UnderRealmBoard
				style={styles.contentBoard}
				contentContainerStyle={styles.innerContentBoard}
			>
				<Text style={styles.statisticValue}>...</Text>
				<Text style={styles.statisticTitle}>Win Rate</Text>
			</UnderRealmBoard>
			<UnderRealmBoard
				style={styles.contentBoard}
				contentContainerStyle={styles.innerContentBoard}
			>
				<Text style={styles.statisticValue}>...</Text>
				<Text style={styles.statisticTitle}>Play Time</Text>
			</UnderRealmBoard>
			<UnderRealmBoard
				style={styles.contentBoard}
				contentContainerStyle={styles.lastContentBoard}
			>
				<View style={styles.verticalSeparator} />
				<View style={[styles.separatorPoint, { top: 20 }]} />
				<View style={[styles.separatorPoint, { bottom: 20 }]} />
				<View style={[styles.innerContentBoard, { flex: 1 }]}>
					<Text style={styles.statisticValue}>...</Text>
					<Text style={styles.statisticTitle}>Total Match</Text>
				</View>
				<View style={[styles.innerContentBoard, { flex: 1 }]}>
					<Text style={styles.statisticValue}>.../...</Text>
					<Text style={styles.statisticTitle}>Win / Lose</Text>
				</View>
			</UnderRealmBoard>
		</Fragment>
	);

	return (
		<UnderRealmBoard style={styles.container}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>Your Statistics</Text>
				{isLoggedIn ? (
					statisticContent
				) : (
					<View style={[{ flex: 1 }, styles.innerContentBoard]}>
						<Text style={[styles.statisticTitle, { marginBottom: 15 }]}>
							Please log-in to see your statistic
						</Text>
						<UnderRealmButton
							style={{ width: 180 }}
							onPress={showSignInOptions}
						>
							<Text style={{ textAlign: 'center', paddingVertical: 5 }}>
								Log in
							</Text>
						</UnderRealmButton>
					</View>
				)}
			</View>
		</UnderRealmBoard>
	);
};

export default StatisticBoard;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 15,
		padding: 5,
		alignItems: 'center',
		flex: 1,
		height: '100%',
	},
	contentContainer: {
		paddingHorizontal: 15,
		paddingBottom: 20,
		height: '100%',
		borderColor: '#9f835f',
		borderWidth: 1,
	},
	title: {
		marginBottom: 20,
		paddingVertical: 15,
		textAlign: 'center',
		fontFamily: 'Volkhov',
		fontSize: 22,
	},
	contentBoard: {
		flex: 1,
		marginBottom: 10,
	},
	innerContentBoard: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	statisticValue: {
		fontFamily: 'Volkhov',
		fontSize: 40,
		fontWeight: '500',
		textAlign: 'center',
	},
	statisticTitle: {
		fontFamily: 'Volkhov',
		color: '#e4deb5',
		textAlign: 'center',
	},
	lastContentBoard: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	verticalSeparator: {
		position: 'absolute',
		top: 20,
		bottom: 20,
		left: 0,
		width: '50%',
		borderRightColor: '#59473f',
		borderRightWidth: 2,
	},
	separatorPoint: {
		position: 'absolute',
		left: '50%',
		width: 8,
		height: 8,
		backgroundColor: '#59473f',
		transform: [{ translateX: -5 }, { rotate: '45deg' }],
	},
});
