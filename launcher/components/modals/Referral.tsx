import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import {
	createStyleSheet,
	UnistylesRuntime,
	useStyles,
} from 'react-native-unistyles';
import { modalActions, Text } from '@metacraft/ui';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import AncientPaper from 'components/icons/underRealm/AncientPaper';
import { graphQlClient } from 'utils/graphql';
import { makeReferral } from 'utils/graphql/mutation';
import { getReferralCode } from 'utils/referral';
import { accountActions } from 'utils/state/account';

import { modalStyles } from './shared';

export const REFERRAL_MODAL_ID = 'referral-modal';

export const ReferralModal = () => {
	const [focus, setFocus] = useState(false);
	const [referralCode, setReferralCode] = useState('');
	const [error, setError] = useState('');
	const { styles } = useStyles(stylesheet);
	const onConfirmPress = async () => {
		const { errors } = await graphQlClient.mutate({
			mutation: makeReferral,
			variables: {
				referralCode,
			},
		});

		if (errors) {
			setError(errors[0].message);
			return;
		}
		accountActions.syncProfile();
		modalActions.hide(REFERRAL_MODAL_ID);
	};

	const maskStyle = {
		width: UnistylesRuntime.screen.width,
		height: UnistylesRuntime.screen.height,
	};

	useEffect(() => {
		const refFromStorage = getReferralCode();
		if (refFromStorage !== 'null') setReferralCode(refFromStorage);
	}, []);

	return (
		<View style={[styles.mask, maskStyle]} pointerEvents="box-only">
			<View
				style={[modalStyles.container, styles.container]}
				pointerEvents="box-none"
			>
				<View style={styles.upperContainer}>
					<UnderRealmLogo size={250} style={styles.logo} />
					<Text style={styles.description}>
						Please enter your referral code
					</Text>
					<TextInput
						style={[styles.input, focus && styles.activeInput]}
						placeholder="Enter your code here"
						placeholderTextColor="rgba(242, 224, 195, 0.4)"
						autoCapitalize="characters"
						onChangeText={(text) => setReferralCode(text)}
						defaultValue={referralCode}
						onFocus={() => {
							setFocus(true);
						}}
						onBlur={() => {
							setFocus(false);
						}}
					/>
					{error && <Text>{error}</Text>}
				</View>
				<View style={styles.confirmContainer}>
					<TouchableOpacity
						style={styles.confirmButton}
						onPress={onConfirmPress}
					>
						<AncientPaper width={100} />
						<View style={styles.labelContainer}>
							<Text style={styles.label}>Confirm</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ReferralModal;

const stylesheet = createStyleSheet({
	mask: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		paddingHorizontal: 36,
		backgroundColor: '#000000',
		width: 400,
		height: 500,
		justifyContent: 'space-between',
		position: 'relative',
	},
	upperContainer: {
		flex: 1,
	},
	logo: {
		alignSelf: 'center',
	},
	description: {
		marginTop: 24,
		fontWeight: '500',
		lineHeight: 32,
		textAlign: 'center',
	},
	input: {
		marginTop: 16,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderWidth: 1,
		borderColor: '#5A5A5A',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 32,
		textAlign: 'center',
		color: '#F2E0C3',
	},
	activeInput: {
		borderColor: '#A8906F',
	},
	confirmContainer: {
		paddingBottom: 50,
		alignItems: 'center',
	},
	confirmButton: {
		width: 100,
		aspectRatio: 90 / 40,
	},
	labelContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontWeight: '500',
		lineHeight: 28,
	},
});
