import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
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
	const { styles, breakpoint } = useStyles(stylesheet);
	const { wallet } = useWallet();
	const { refetch } = useProfile();
	const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

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
			<View style={styles.innerContainer}>
				{isMobile ? (
					<TabsDropdown tab={tab} onSelectTab={setTab} />
				) : (
					<SideBar tab={tab} onSelectTab={setTab} onSignOut={handleSignOut} />
				)}

				<View style={styles.contentContainer}>
					{tab === Tabs.ACCOUNT_LINKING ? (
						<AccountLinkingTab />
					) : tab === Tabs.INVENTORY ? (
						<InventoryTab />
					) : (
						<InformationTab />
					)}

					{isMobile && (
						<TouchableOpacity
							style={styles.logoutButton}
							onPress={handleSignOut}
						>
							<Text style={styles.logoutText}>Log out</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</ScrollLayout>
	);
};

export default ProfileScreen;

const stylesheet = createStyleSheet(() => ({
	container: {
		backgroundColor: '#24120F',
	},
	innerContainer: {
		flexDirection: {
			xs: 'column',
			md: 'row',
		},
	},
	contentContainer: {
		flex: 1,
		marginHorizontal: 24,
	},
	logoutButton: {
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
