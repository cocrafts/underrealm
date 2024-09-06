import type { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { dimensionState, modalActions, Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import SignInOptions from 'components/modals/SignInOptions';
import { useSnapshot } from 'utils/hook';
import { accountState } from 'utils/state/account';
import { liveActions, liveState } from 'utils/state/live';
import { iStyles } from 'utils/styles';

import LeaderBoard from './LeaderBoard';
import StatisticBoard from './StatisticBoard';
import UnderRealmInfo from './UnderRealmInfo';

export const LeftSection: FC = () => {
	const { windowSize } = useSnapshot(dimensionState);
	const { profile } = useSnapshot(accountState);
	const { findingMatch } = useSnapshot(liveState);

	const onFindMatch = () => {
		if (profile.id) {
			if (findingMatch) {
				liveActions.stopMatchFind();
			} else {
				liveActions.matchFind(profile.id);
			}
		} else {
			modalActions.show({
				id: 'signInOptions',
				component: SignInOptions,
			});
		}
	};

	return (
		<View
			style={[
				iStyles.contentContainer,
				{ justifyContent: 'space-evenly', flex: 1 },
			]}
		>
			<View>
				<Text style={styles.heading}>Blind Duel</Text>
				<View style={[styles.rowContainer, { marginBottom: 40 }]}>
					<Text style={styles.subText}>
						Are you ready to face the unknown enemy? Do your best and winning
						might be on your side, Adventurer!
					</Text>
					<UnderRealmButton style={styles.button} onPress={onFindMatch}>
						{findingMatch ? (
							<ActivityIndicator color="white" />
						) : (
							<Text style={styles.buttonText}>Find Match</Text>
						)}
					</UnderRealmButton>
				</View>
			</View>
			<View style={styles.rowContainer}>
				<LeaderBoard windowSize={windowSize} />
				<StatisticBoard />
				<UnderRealmInfo />
			</View>
		</View>
	);
};

export default LeftSection;

const styles = StyleSheet.create({
	container: {},
	heading: {
		fontFamily: 'Volkhov',
		fontSize: 50,
		marginBottom: 15,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	subText: {
		fontSize: 18,
		maxWidth: 600,
	},
	button: {
		width: 220,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 18,
	},
});
