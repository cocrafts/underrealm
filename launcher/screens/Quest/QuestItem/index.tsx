import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState } from '@metacraft/ui';
import { useSnapshot } from 'valtio';

import Action from './Action';
import Info from './Info';

export enum Platform {
	DISCORD = 'Discord',
	X = 'X',
}

export interface QuestProps {
	platform: Platform;
	title: string;
	description: string;
	points: number;
	url?: string;
	onVerify?: () => void;
}

const QuestItem: FC<QuestProps> = ({
	platform,
	title,
	description,
	points,
}) => {
	const { isMobile } = useSnapshot<DimensionState>(dimensionState);

	const [isHovered, setIsHovered] = useState(false);
	return (
		<Pressable
			style={[
				styles.container,
				isHovered ? styles.hovered : {},
				isMobile ? styles.containerOnMobile : {},
			]}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
		>
			<Info title={title} platform={platform} description={description} />

			<Action points={points} />
		</Pressable>
	);
};

export default QuestItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
		flexBasis: 'auto',
		justifyContent: 'space-between',
		borderColor: '#5A5A5A',
		borderWidth: 1,
	},
	containerOnMobile: {
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	hovered: {
		shadowColor: '#FFF9A0',
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 12,
	},
});