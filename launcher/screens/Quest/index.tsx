import type { FC } from 'react';
import { ImageBackground } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ScrollLayout from 'components/layouts/Scroll';
import resources from 'utils/resources';

import HeadingSection from './HeadingSection';
import QuestContent from './QuestContent';

const QuestScreen: FC = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<ScrollLayout style={styles.container}>
			<ImageBackground
				source={resources.quest.headingBackground}
				style={styles.imageBackground}
			>
				<HeadingSection />
				<QuestContent />
			</ImageBackground>
		</ScrollLayout>
	);
};

export default QuestScreen;

const stylesheet = createStyleSheet(() => {
	return {
		container: {
			backgroundColor: '#190E0E',
		},
		frameCharm: {
			alignSelf: 'center',
		},
		imageBackground: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			alignSelf: 'stretch',
			paddingHorizontal: { xs: 16, sm: 20, md: 40, lg: 80, xl: 120 },
		},
	};
});
