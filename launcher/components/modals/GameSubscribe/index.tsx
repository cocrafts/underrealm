import type { FC } from 'react';
import { useState } from 'react';
import type { ScaledSize, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { modalActions } from '@metacraft/ui';
import { Text } from '@metacraft/ui';
import UnderRealmModal from 'components/layouts/UnderRealmModal';
import UnderRealmButton from 'components/Marketplace/Button';
import * as mutations from 'utils/graphql/mutation';
import { useInput } from 'utils/hook';
import { MetacraftGames } from 'utils/types';
import { validateEmail } from 'utils/validation';

import Subscribed from './Subscribed';

interface Props {
	dimensions: ScaledSize;
}

export const GameSubscribe: FC<Props> = ({ dimensions }) => {
	const [loading, setLoading] = useState(false);
	const [subscribePressed, setSubscribePressed] = useState(false);
	const [subscribeGame] = useMutation(mutations.subscribeGame);
	const emailInput = useInput();
	const { hasError, errorMess } = validateEmail(emailInput.value);
	const contentWidth = Math.min(dimensions.width - 16, 480);
	const containerStyle = {
		alignSelf: 'center',
		width: contentWidth,
		paddingVertical: 50,
		paddingHorizontal: 40,
		backgroundColor: '#512b18',
	} as ViewStyle;

	const onSubscribe = () => {
		setSubscribePressed(true);

		if (!hasError) {
			setLoading(true);

			subscribeGame({
				variables: {
					input: {
						email: emailInput.value,
						game: MetacraftGames.Murg,
					},
				},
				onCompleted: () => {
					setLoading(false);
					emailInput.onChangeText('');

					modalActions.hide('gameSubscribe');

					modalActions.show({
						id: 'subscribed',
						component: Subscribed,
					});
				},
			});
		}
	};

	return (
		<UnderRealmModal style={containerStyle}>
			<Text style={styles.title}>Alpha Sign-up</Text>
			<View style={styles.inputBlock}>
				<View style={styles.inputContainer}>
					<TextInput
						{...emailInput}
						placeholder="Enter Your Email"
						style={styles.input}
						onKeyPress={({ nativeEvent: { key } }) => {
							if (key === 'Enter') onSubscribe();
						}}
					/>
				</View>
				{subscribePressed && hasError && (
					<Text style={styles.warning}>{errorMess}</Text>
				)}
			</View>
			<UnderRealmButton
				style={styles.button}
				onPress={onSubscribe}
				title="Subscribe"
			>
				{loading && <ActivityIndicator color="white" />}
			</UnderRealmButton>
			<Text style={styles.footerDesc}>
				Only 10,000 free slots available.{'\n'}
				Get a chance to experience soonest
			</Text>
		</UnderRealmModal>
	);
};

export default GameSubscribe;

const styles = StyleSheet.create({
	title: {
		color: '#CFCDB3',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 25,
	},
	separator: {
		alignSelf: 'center',
	},
	inputBlock: {
		marginBottom: 25,
	},
	inputContainer: {
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#CFCDB3',
		borderRadius: 10,
	},
	input: {
		marginVertical: 15,
		color: '#CFCDB3',
	},
	warning: {
		marginTop: 10,
		fontSize: 12,
		fontWeight: '300',
		color: '#ffc107',
	},
	button: {
		alignSelf: 'center',
		width: 180,
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
	footerDesc: {
		marginTop: 30,
		fontWeight: '300',
		fontSize: 13,
		lineHeight: 16,
		textAlign: 'center',
	},
});
