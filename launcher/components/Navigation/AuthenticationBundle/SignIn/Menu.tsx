import type { FC } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, modalActions, Text } from '@metacraft/ui';
import { googleSignIn } from 'utils/lib/auth';

export const Menu: FC = () => {
	const signInGoogle = useCallback(async () => {
		modalActions.hide('signInOptions');
		await googleSignIn();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Simple Sign-In</Text>
			<Button
				outline
				style={styles.buttonContainer}
				title="Sign-In with Google"
				onPress={signInGoogle}
			/>
		</View>
	);
};

export default Menu;

const walletIconSize = 18;
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		paddingVertical: 8,
		borderRadius: 18,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.025)',
	},
	heading: {
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		marginVertical: 6,
	},
	separator: {
		marginVertical: 12,
		borderTopWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.05)',
	},
	hyperLink: {
		fontSize: 11,
		textAlign: 'center',
		marginVertical: 6,
	},
	walletIcon: {
		marginLeft: 4,
		width: walletIconSize,
		height: walletIconSize,
	},
	buttonContainer: {
		marginVertical: 4,
		marginHorizontal: 12,
	},
	buttonTitleContainer: {
		flex: 1,
		paddingVertical: 10,
	},
	buttonTitle: {
		flex: 1,
		paddingVertical: 6,
		color: '#FFFFFF',
		textAlign: 'center',
	},
	disabledTitle: {
		color: 'rgba(255, 255, 255, 0.1)',
	},
});
