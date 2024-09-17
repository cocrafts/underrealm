import type { FC } from 'react';
import { ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import resources from 'utils/resources';
import { launcherTheme } from 'utils/theme';

const HeadingSection: FC = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<UnderRealmLogo size={'90%'} />
			<ImageBackground
				source={resources.quest.pointsBoard}
				style={{ width: 392, height: 68, flexDirection: 'row' }}
			>
				<View style={styles.pointInfoContainer}></View>
				<View style={styles.pointInfoContainer}></View>
			</ImageBackground>
		</View>
	);
};

export default HeadingSection;

const stylesheet = createStyleSheet(() => {
	return {
		container: {
			alignItems: 'center',
		},
		subtitle: {
			color: launcherTheme.colors.text,
			fontWeight: '500',
			textAlign: 'center',
			fontSize: { xs: 14, md: 16, lg: 18 },
			maxWidth: { xs: 280, sm: '50%' },
			marginTop: { sm: 20, md: 0, lg: -20 },
		},
		pointInfoContainer: {},
	};
});
