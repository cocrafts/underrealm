import type { FC } from 'react';
import { useState } from 'react';
import type { LayoutRectangle, ScaledSize, ViewStyle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { idleLayout } from 'utils/helper';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

interface Props {
	dimension: ScaledSize;
	responsiveLevel: number;
}

export const GameIntroSection: FC<Props> = ({ dimension, responsiveLevel }) => {
	const [layout, setLayout] = useState<LayoutRectangle>(idleLayout);
	const width = Math.min(dimension.width, iStyles.contentContainer.maxWidth);
	const imageSize = {
		width,
		height: responsiveLevel > 1 ? width * 0.7 : width * 0.35945,
		marginBottom: 20,
	};

	const container = {
		height: layout.height - 130,
		alignItems: 'center',
	} as ViewStyle;

	return (
		<View style={container}>
			<View
				style={[styles.contentContainer, { width }]}
				onLayout={({ nativeEvent }) => {
					setLayout(nativeEvent.layout);
				}}
			>
				<Image source={resources.home.cardsImage} style={imageSize} />
				<Text style={styles.content}>
					Under Realm: Rise of Magic takes place in the chaotic, fragmented
					world of ATEM, where humans and other races are constantly fighting
					each other, to quench the endless thirst for power, and wealth, and
					gradually take control over ATEM.
				</Text>
				<Text style={styles.content}>
					Steel, blood, and brute force were the main material of the savage
					battles until mysteriously, mankind discovered the long-lost magical
					scripts that allow them to summon mighty, ancient creatures/ entities
					that can turn the tide in no time. And no one wants to be left behind
					in this race. Adventurers across ATEM are desired by factions to
					discover the forgotten dungeons across this continent. Players join
					the Under Realm as adventurers who will confront each other in the
					search for the long-lost scripts in hidden dungeons across ATEM.
				</Text>
				<Text style={styles.content}>
					Are you ready to discover the forgotten stories of this world,
					adventurer?
				</Text>
			</View>
		</View>
	);
};

export default GameIntroSection;

const styles = StyleSheet.create({
	contentContainer: {
		position: 'absolute',
		top: -130,
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingBottom: 40,
	},
	content: {
		textAlign: 'center',
		maxWidth: 800,
		paddingBottom: 20,
		color: '#fff',
	},
});
