import { useState } from 'react';
import { Text, View } from 'react-native';
import {
	createStyleSheet,
	UnistylesRuntime,
	useStyles,
} from 'react-native-unistyles';
import { Button } from '@metacraft/ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { signOut } from 'aws-amplify/auth';
import ScrollLayout from 'components/layouts/Scroll';
import { useProfile } from 'utils/hooks';
import { setPendingRedirect } from 'utils/lib/auth/redirect';

import AccountLinkingTab from './AccountLinkingTab';
import InformationTab from './InformationTab';
import { Tabs } from './internal';
import InventoryTab from './InventoryTab';
import SideBar from './SideBar';
import TabsDropdown from './TabsDropdown';

const ProfileScreen = () => {
	const [tab, setTab] = useState(Tabs.INFORMATION);
	const { styles } = useStyles(stylesheet);
	const { wallet } = useWallet();
	const { refetch } = useProfile();

	const isMobile =
		UnistylesRuntime.breakpoint === 'xs' ||
		UnistylesRuntime.breakpoint === 'sm';

	const handleSignOut = async () => {
		setPendingRedirect();
		await signOut();
		await wallet?.adapter?.disconnect();
		try {
			await refetch();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ScrollLayout style={styles.container}>
			<View style={[styles.container, isMobile && { flexDirection: 'column' }]}>
				{isMobile ? (
					<TabsDropdown tab={tab} onSelectTab={setTab} />
				) : (
					<SideBar tab={tab} onSelectTab={setTab} onSignOut={handleSignOut} />
				)}

				{tab === Tabs.ACCOUNT_LINKING ? (
					<AccountLinkingTab />
				) : tab === Tabs.INVENTORY ? (
					<InventoryTab />
				) : (
					<InformationTab />
				)}

				{isMobile && (
					<Button style={styles.logoutButton} onPress={handleSignOut}>
						<Text style={styles.logoutText}>Log out</Text>
					</Button>
				)}
			</View>
		</ScrollLayout>
	);
};

export default ProfileScreen;

const stylesheet = createStyleSheet((_, { screen }) => ({
	container: {
		flexDirection: 'row',
		width: screen.width,
		backgroundColor: '#24120F',
	},
	logoutButton: {
		width: screen.width - 60,
		padding: 12,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 60,
		marginBottom: 40,
	},
	logoutText: {
		color: '#ffffff',
		fontSize: 16,
	},
}));
