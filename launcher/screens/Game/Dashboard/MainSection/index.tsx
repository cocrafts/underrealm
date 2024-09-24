import type { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { modalActions, Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import SignInOptions from 'components/modals/SignInOptions';
import {
	useMatchFindSubscription,
	useStopMatchFindMutation,
} from 'utils/graphql';
import { useProfile } from 'utils/hooks';
import { iStyles } from 'utils/styles';

import LeaderBoard from './LeaderBoard';
import StatisticBoard from './StatisticBoard';
import UnderRealmInfo from './UnderRealmInfo';

export const MainSection: FC = () => {
	const { profile } = useProfile();
	const [stopFindMatch] = useStopMatchFindMutation();
	const { loading, restart: startFindMatch } = useMatchFindSubscription({
		variables: { userId: profile.id },
		skip: true,
	});

	const onFindMatch = () => {
		if (profile.id) {
			if (loading) {
				stopFindMatch();
			} else {
				startFindMatch();
			}
		} else {
			modalActions.show({ id: 'signInOptions', component: SignInOptions });
		}
	};

	return (
		<View style={[iStyles.contentContainer, styles.container]}>
			<View>
				<Text style={styles.heading}>Blind Duel</Text>
				<View style={[styles.rowContainer, { marginBottom: 40 }]}>
					<Text style={styles.subText}>
						Are you ready to face the unknown enemy? Do your best and winning
						might be on your side, Adventurer!
					</Text>

					<UnderRealmButton style={styles.button} onPress={onFindMatch}>
						{loading ? (
							<ActivityIndicator color="white" />
						) : (
							<Text style={styles.buttonText}>Find Match</Text>
						)}
					</UnderRealmButton>
				</View>
			</View>
			<View style={styles.rowContainer}>
				<LeaderBoard />
				<StatisticBoard />
				<UnderRealmInfo />
			</View>
		</View>
	);
};

export default MainSection;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-evenly',
		flex: 1,
	},
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
