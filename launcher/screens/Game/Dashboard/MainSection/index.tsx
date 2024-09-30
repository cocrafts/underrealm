import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { modalActions, Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import SignInOptions from 'components/modals/SignInOptions';
import { useProfile } from 'utils/hooks';
import { iStyles } from 'utils/styles';

import FindingMatch from './FindingMatch';
import LeaderBoard from './LeaderBoard';
import StatisticBoard from './StatisticBoard';
import UnderRealmInfo from './UnderRealmInfo';

export const MainSection: FC = () => {
	const { profile } = useProfile();
	const [startFindMatch, setStartFindMatch] = useState(false);

	const onFindMatch = () => {
		if (profile.id) {
			setStartFindMatch((value) => !value);
		} else {
			modalActions.show({ id: 'signInOptions', component: SignInOptions });
		}
	};

	return (
		<View style={[iStyles.contentContainer, styles.container]}>
			<View>
				<Text style={styles.heading}>Blind Duel</Text>
				<View style={styles.rowContainer}>
					<Text style={styles.subText}>
						Are you ready to face the unknown enemy? Do your best and winning
						might be on your side, Adventurer!
					</Text>

					<UnderRealmButton style={styles.button} onPress={onFindMatch}>
						{startFindMatch ? (
							<FindingMatch />
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
		marginBottom: 40,
	},
	subText: {
		fontSize: 18,
		maxWidth: 600,
	},
	button: {
		width: 220,
		height: 48,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 18,
	},
});
