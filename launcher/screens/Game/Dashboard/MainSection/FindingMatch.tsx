import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '@metacraft/ui';
import { useFindMatchSubscription } from 'utils/graphql';
import { useProfile } from 'utils/hooks';

export const FindingMatch = () => {
	const { profile } = useProfile();
	const { data, loading } = useFindMatchSubscription({
		variables: { userId: profile.id },
	});

	const matchId = data?.findMatch.id;
	if (matchId) console.log('Match found', matchId);

	if (loading) return <ActivityIndicator color="white" />;
	return <Text style={styles.title}>Match found</Text>;
};

export default FindingMatch;

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 18,
	},
});