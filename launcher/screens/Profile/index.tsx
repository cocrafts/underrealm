import { useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ScrollLayout from 'components/layouts/Scroll';

import AccountLinkingTab from './AccountLinkingTab';
import InventoryTab from './InventoryTab';
import ProfileInformationTab from './ProfileInformationTab';
import SideBar, { Tabs } from './SideBar';

const ProfileScreen = () => {
	const [tab, setTab] = useState(Tabs.PERSONAL_INFORMATION);
	const { styles } = useStyles(stylesheet);

	return (
		<ScrollLayout style={styles.container}>
			<View style={styles.container}>
				<SideBar tab={tab} onSelectTab={setTab} />

				{tab === Tabs.ACCOUNT_LINKING ? (
					<AccountLinkingTab />
				) : tab === Tabs.INVENTORY ? (
					<InventoryTab />
				) : (
					<ProfileInformationTab />
				)}
			</View>
		</ScrollLayout>
	);
};

export default ProfileScreen;

const stylesheet = createStyleSheet((_, screen) => ({
	container: {
		flexDirection: 'row',
		width: screen.screen.width,
		backgroundColor: '#24120F',
	},
}));
