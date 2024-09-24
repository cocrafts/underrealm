import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useProfile } from 'utils/hook';

import Signed from './Signed';
import SignIn from './SignIn';

interface Props {
	style?: ViewStyle;
}

export const AuthenticationBundle: FC<Props> = ({ style }) => {
	const { profile, loading } = useProfile();

	const containerStyle = [styles.container, style];

	return (
		<View style={containerStyle}>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={commandSize - 6} />
				</View>
			) : profile.id ? (
				<Signed profile={profile} />
			) : (
				<SignIn />
			)}
		</View>
	);
};

export default AuthenticationBundle;

const commandSize = 24;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 6,
	},
	loadingContainer: {
		width: commandSize,
		height: commandSize,
		borderRadius: commandSize / 2,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
