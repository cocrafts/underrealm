import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@metacraft/ui';
import Loading from 'components/Loading';
import { navigate } from 'stacks/Browser/shared';
import { useFindMatchSubscription } from 'utils/graphql';
import { useProfile } from 'utils/hooks';

export const FindingMatch = () => {
	const { profile } = useProfile();
	const { data, loading } = useFindMatchSubscription({
		variables: { userId: profile.id },
	});

	useEffect(() => {
		if (data) {
			console.log('Match found', data.findMatch.id);
			localStorage.setItem('GAME_JWT', data.findMatch.jwt);
			localStorage.setItem('GAME_WS_URI', SOCKET_URI);
			navigate('Game', { screen: 'Duel', params: { id: data.findMatch.id } });
		}
	}, [data]);

	if (loading) return <Loading />;
	return <Text style={styles.title}>Match found</Text>;
};

export default FindingMatch;

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 18,
	},
});
