import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState } from '@metacraft/ui';
import type { Quest } from 'utils/graphql';
import { useSnapshot } from 'valtio';

import Action from './Action';
import Info from './Info';
import { questPlatformMapping } from './shared';

type Props = {
	quest: Quest;
};

const QuestItem: FC<Props> = ({ quest }) => {
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
			<Info
				title={quest.title}
				platform={questPlatformMapping[quest.type]}
				description={quest.description}
			/>

			<Action quest={quest} />
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
