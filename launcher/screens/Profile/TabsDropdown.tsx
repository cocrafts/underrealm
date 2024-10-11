import type { FC } from 'react';
import { useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import Avatar from 'components/Avatar';
import { useProfile } from 'utils/hooks';
import resources from 'utils/resources';

import type { MenuProps } from './internal';
import { Tabs } from './internal';
import TabSelection from './TabSelection';

const TabsDropdown: FC<MenuProps> = ({ onSelectTab, tab }) => {
	const [isDropped, setIsDropped] = useState(false);
	const { styles } = useStyles(stylesheet);
	const { profile } = useProfile();

	const handleSelectTab = (tab: Tabs) => {
		onSelectTab(tab);
		setIsDropped(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Avatar imageUri={profile?.avatarUrl} size={64} />
				<Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
					{profile?.name || ''}
				</Text>
				<Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
					{profile?.email}
				</Text>
			</View>

			<ImageBackground
				style={styles.dropdown}
				source={resources.profile.dropdown}
				resizeMode="stretch"
			>
				<TouchableOpacity
					style={styles.dropdownButton}
					onPress={() => setIsDropped(!isDropped)}
				>
					<Text>{tab}</Text>

					<Image
						style={styles.dropdownIcon}
						source={resources.marketplace.chevronDown}
					/>
				</TouchableOpacity>

				{isDropped && (
					<Image
						style={styles.separateLine}
						source={resources.profile.separateLine}
					/>
				)}

				{isDropped && (
					<View>
						<TabSelection
							title={Tabs.INFORMATION}
							isActive={tab === Tabs.INFORMATION}
							onPress={() => handleSelectTab(Tabs.INFORMATION)}
						/>
						{__DEV__ && (
							<TabSelection
								title={Tabs.ACCOUNT_LINKING}
								isActive={tab === Tabs.ACCOUNT_LINKING}
								onPress={() => handleSelectTab(Tabs.ACCOUNT_LINKING)}
							/>
						)}
						{__DEV__ && (
							<TabSelection
								title={Tabs.INVENTORY}
								isActive={tab === Tabs.INVENTORY}
								onPress={() => handleSelectTab(Tabs.INVENTORY)}
							/>
						)}
					</View>
				)}
			</ImageBackground>
		</View>
	);
};

export default TabsDropdown;

const stylesheet = createStyleSheet(() => ({
	container: {
		marginTop: 32,
		paddingVertical: 20,
		gap: 12,
	},
	infoContainer: {
		alignItems: 'center',
		gap: 8,
	},
	name: {
		color: '#ffffff',
		fontSize: 16,
	},
	email: {
		color: '#F2E0C3',
		fontSize: 12,
	},
	separateLine: {
		width: 216,
		height: 2,
	},
	dropdown: {
		minHeight: 40,
		paddingVertical: 16,
		gap: 4,
		alignItems: 'center',
	},
	dropdownIcon: {
		height: 12,
		width: 12,
	},
	dropdownButton: {
		flexDirection: 'row',
		paddingVertical: 12,
		alignItems: 'center',
		gap: 8,
	},
}));
