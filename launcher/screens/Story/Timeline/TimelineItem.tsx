import type { FC } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

interface TimelineItemProps {
	isPassive: boolean;
	isActive: boolean;
	name?: string;
	icon?: number;
	iconActive?: number;
	isNarrow?: boolean;
}

const TimelineItem: FC<TimelineItemProps> = ({
	icon,
	iconActive,
	isPassive,
	isActive,
	name,
}) => {
	let source: number = icon || resources.story.externalWarNormal;
	if (isPassive) source = resources.story.externalWarPassive;
	if (isActive) source = iconActive || resources.story.externalWarActive;

	return (
		<View style={styles.itemContainer}>
			<Image source={source} style={styles.itemImage} />
			<ImageBackground
				source={resources.story.labelShape}
				style={[
					styles.itemLabel,
					{
						opacity: isPassive ? 0 : 1,
					},
				]}
			>
				<Text style={styles.itemLabelText} responsiveSizes={[15]}>
					{name}
				</Text>
			</ImageBackground>
		</View>
	);
};

export default TimelineItem;

const styles = StyleSheet.create({
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemImage: {
		width: 132,
		height: 130,
	},
	itemLabel: {
		height: 55,
		width: 258,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
	},
	itemLabelText: {
		color: '#000',
		fontWeight: 'bold',
	},
});
