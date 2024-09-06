import type { FC } from 'react';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import Icon from './Icon';

const labels = {
	heading: 'How To Play',
	subHeading:
		'Under Realm is a strategy card game that focus heavily on grand strategy so understanding the Game rules carefully can help you the 1st understanding on how to setup our Battlefield',
};

const headingBackgroundRatio = 404 / 1296;

export enum ViewType {
	Battlefield,
	Play,
	Card,
}

interface Props {
	onPress: (index: number) => void;
}

const Header: FC<Props> = ({ onPress }) => {
	const [activeIconIndex, setActiveIconIndex] = useState(0);
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.wideContainer.maxWidth);

	const headingBackgroundStyle = {
		width,
		height: width * headingBackgroundRatio,
	};

	const onIconPress = (index: number) => {
		onPress(index);
		setActiveIconIndex(index);
	};

	return (
		<View style={[styles.container, sharedStyle.sectionContainer]}>
			<Image
				source={resources.guide.headingBackground}
				style={[styles.headingBackground, headingBackgroundStyle]}
			/>
			<View style={styles.contentContainer}>
				<Text
					style={[sharedStyle.heading, sharedStyle.textShadow]}
					responsiveSizes={headingSize}
				>
					{labels.heading}
				</Text>
				<Text style={[sharedStyle.subHeading, styles.subHeading]}>
					{labels.subHeading}
				</Text>
				<View style={styles.icons}>
					<Icon
						type={ViewType.Battlefield}
						onPress={() => onIconPress(0)}
						isActive={activeIconIndex === 0}
					/>
					<Icon
						type={ViewType.Play}
						onPress={() => onIconPress(1)}
						isActive={activeIconIndex === 1}
					/>
					<Icon
						type={ViewType.Card}
						onPress={() => onIconPress(2)}
						isActive={activeIconIndex === 2}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		paddingBottom: 20,
	},
	contentContainer: {
		paddingHorizontal: 24,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headingBackground: {
		width: '100%',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
	},
	subHeading: {
		textAlign: 'center',
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		minWidth: 380,
	},
});

export default Header;
