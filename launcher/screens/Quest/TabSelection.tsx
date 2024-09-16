import type { FC } from 'react';
import { useMemo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

import type { TabId } from './internal';

interface Props {
	onChangeTab?: (value: TabId) => void;
	title: string;
	value: TabId;
	isActive?: boolean;
}

const TabSelection: FC<Props> = ({
	onChangeTab,
	title,
	value,
	isActive = false,
}) => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);
	const containerStyle = useMemo(() => {
		if (isMobile) return { width: (180 * windowSize.width) / 430 };
	}, [windowSize.width, isMobile]);

	return (
		<TouchableOpacity
			style={[styles.container, containerStyle]}
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
				<Image
					source={resources.quest.inactiveTab}
					style={styles.inactiveIcon}
				/>
			)}
		</TouchableOpacity>
	);
};

export default TabSelection;

export const styles = StyleSheet.create({
	container: {
		width: 200,
		alignItems: 'center',
		gap: 12,
		paddingTop: 20,
		borderBottomColor: '#2E2E2E',
		borderBottomWidth: 1,
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
		width: 12,
		height: 12,
		marginBottom: -12,
	},
});
