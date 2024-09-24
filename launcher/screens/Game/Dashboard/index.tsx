import type { FC } from 'react';
import { ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import InternalNavigation from 'components/Navigation/Internal';
import { navigationHeight as navHeight } from 'components/Navigation/shared';
import resources from 'utils/resources';

import LeftSection from './LeftSection';

export const LobbyScreen: FC = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<ImageBackground
			source={resources.lobby.lobbyBackground}
			style={styles.container}
		>
			<InternalNavigation isHidingPlayButton />
			<View style={styles.contentContainer}>
				<View style={styles.leftContainer}>
					<LeftSection />
				</View>
			</View>
		</ImageBackground>
	);
};

export default LobbyScreen;

const stylesheet = createStyleSheet((_, { screen }) => ({
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
		height: screen.height - (navHeight.local + navHeight.storm),
	},
	rightContainer: {
		paddingVertical: 15,
		width: 250,
		backgroundColor: 'transparent',
	},
}));
