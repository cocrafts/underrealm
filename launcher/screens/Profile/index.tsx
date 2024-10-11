import { useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ScrollLayout from 'components/layouts/Scroll';

import AccountLinkingTab from './AccountLinkingTab';
import InformationTab from './InformationTab';
import InventoryTab from './InventoryTab';
import SideBar, { Tabs } from './SideBar';

const ProfileScreen = () => {
	const [tab, setTab] = useState(Tabs.INFORMATION);
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
					<InformationTab />
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
}));
