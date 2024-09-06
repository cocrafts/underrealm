import type { FC } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { dimensionState } from '@metacraft/ui';
import InternalNavigation from 'components/Navigation/Internal';
import { navigationHeight } from 'components/Navigation/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

import LeftSection from './LeftSection';

export const LobbyScreen: FC = () => {
	const { windowSize } = useSnapshot(dimensionState);
	const height =
		windowSize.height - (navigationHeight.local + navigationHeight.storm);

	return (
		<ImageBackground
			source={resources.lobby.lobbyBackground}
			style={styles.container}
		>
			<InternalNavigation isHidingPlayButton />
			<View style={styles.contentContainer}>
				<View style={[styles.leftContainer, { height }]}>
					<LeftSection />
				</View>
				{/* <View style={[styles.rightContainer, { height }]}>
					<ScrollView>
						<View style={{ height: 1500 }} />
					</ScrollView>
				</View> */}
			</View>
		</ImageBackground>
	);
};

export default LobbyScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flexDirection: 'row',
	},
	leftContainer: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		flex: 1,
	},
	rightContainer: {
		paddingVertical: 15,
		width: 250,
		backgroundColor: 'transparent',
	},
});
