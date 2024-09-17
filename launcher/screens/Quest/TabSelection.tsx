import type { FC } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

import type { TabId } from './internal';

interface Props {
	onChangeTab?: (value: TabId) => void;
	title: string;
	value: TabId;
	isActive?: boolean;
}

const TabSelection: FC<Props> = ({
	onChangeTab,
	value,
	title,
	isActive = false,
}) => {
	const { styles } = useStyles(stylesheet);

	return (
		<TouchableOpacity
			style={[styles.container]}
			onPress={() => onChangeTab(value)}
		>
			<Text
				style={[
					styles.title,
					isActive ? styles.activeTitle : styles.inactiveTitle,
				]}
			>
				{title}
			</Text>
			{isActive ? (
				<Image source={resources.quest.activeTab} style={styles.activeIcon} />
			) : (
				<View style={styles.inactiveIcon} />
			)}
		</TouchableOpacity>
	);
};

export default TabSelection;

const stylesheet = createStyleSheet(() => {
	return {
		container: {
			width: { xs: 152, lg: 200 },
			alignItems: 'center',
			gap: 12,
			paddingTop: 20,
		},
		title: {
			fontFamily: 'Volkhov',
			color: '#ffffff',
			fontWeight: '500',
			fontSize: 16,
		},
		activeTitle: {
			textShadowColor: '#FFF9A0',
			textShadowOffset: {
				height: 0,
				width: 0,
			},
			textShadowRadius: 6,
		},
		inactiveTitle: {
			opacity: 0.5,
		},
		activeIcon: {
			width: 16,
			height: 16,
			marginBottom: -8,
		},
		inactiveIcon: {
			position: 'absolute',
			bottom: -5,
			width: 9,
			height: 9,
			transform: [{ rotateZ: '45deg' }],
			backgroundColor: '#ffffff',
			opacity: 0.3,
		},
	};
});
