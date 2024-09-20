import type { FC } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Hyperlink, Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import { useInput } from 'utils/hook';
import { validateEmail } from 'utils/validation';

import { socialLinkList } from './shared';

export const StayConnected: FC = () => {
	const [loading, setLoading] = useState(false);
	const [subscribePressed, setSubscribePressed] = useState(false);
	const emailInput = useInput();
	const { hasError, errorMess } = validateEmail(emailInput.value);
	// TODO: Fix error "Unexpected <EOF> while using graphql"

	// const [subscribeGame] = useMutation(mutations.subscribeGame);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubscribe = () => {
		setSubscribePressed(true);

		if (!hasError) {
			setLoading(true);

			// TODO: Fix error "Unexpected <EOF> while using graphql"
			// subscribeGame({
			// 	variables: {
			// 		input: {
			// 			email: emailInput.value,
			// 			game: MetacraftGames.Murg,
			// 		},
			// 	},
			// 	onCompleted: () => {
			// 		setLoading(false);
			// 		emailInput.onChangeText('');

			// 		modalActions.hide('gameSubscribe');

			// 		modalActions.show({
			// 			id: 'subscribed',
			// 			component: Subscribed,
			// 		});
			// 	},
			// });
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const buttonContent = loading ? (
		<ActivityIndicator color="white" />
	) : (
		<Text style={sharedStyle.buttonText}>Sign up to Newsletter</Text>
	);

	return (
		<View style={styles.container}>
			<Text style={sharedStyle.heading} responsiveSizes={headingSize}>
				Stay connected - Stay updated!
			</Text>
			<View style={styles.hyperLinkContainer}>
				{socialLinkList.map(({ href, Component, props }, index) => (
					<Hyperlink
						key={index}
						style={styles.hyperLink}
						href={href}
						target="_blank"
					>
						<Component {...props} />
					</Hyperlink>
				))}
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.inputBackgroundOverlay} />
				{/* <View>
					<TextInput
						placeholder="Enter your email"
						placeholderTextColor={'#93867c'}
						style={styles.input}
						{...emailInput}
					/>
				</View> */}
			</View>
			{subscribePressed && hasError && (
				<Text style={styles.warning}>{errorMess}</Text>
			)}
			{/* <UnderRealmButton style={styles.button} onPress={onSubscribe}>
				{buttonContent}
			</UnderRealmButton> */}
			{/* <Text style={styles.subText}>
				By signing up, you consent to receive latest updates and special offers
				about Under Realm.
			</Text> */}
		</View>
	);
};

export default StayConnected;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	hyperLinkContainer: {
		marginVertical: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	hyperLink: {
		marginHorizontal: 10,
	},
	inputContainer: {
		borderRadius: 5,
		overflow: 'hidden',
	},
	inputBackgroundOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#130e0c',
		opacity: 0.9,
	},
	input: {
		width: 350,
		paddingHorizontal: 15,
		paddingVertical: 15,
		color: '#fff',
	},
	warning: {
		marginTop: 10,
		fontSize: 12,
		fontWeight: '300',
		color: '#ffc107',
	},
	button: {
		width: 250,
		marginVertical: 15,
	},
	subText: {
		textAlign: 'center',
		fontSize: 10,
		fontWeight: '300',
		color: '#fff',
		width: 250,
	},
});
