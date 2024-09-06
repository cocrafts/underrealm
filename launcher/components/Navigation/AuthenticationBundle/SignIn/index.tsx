import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimateDirections, modalActions } from '@metacraft/ui';
import SignInOptions from 'components/modals/SignInOptions';

export const SignIn: FC = () => {
	const containerRef = useRef<View>(null);

	const showSignInOptions = (): void => {
		modalActions.show({
			id: 'signInOptions',
			component: SignInOptions,
			animateDirection: AnimateDirections.BottomLeft,
		});
	};

	return (
		<View ref={containerRef} style={styles.container}>
			<TouchableOpacity onPress={showSignInOptions}>
				<Text style={styles.buttonTitle}>Sign In</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {},
	buttonTitle: {
		color: '#FFFFFF',
	},
});
