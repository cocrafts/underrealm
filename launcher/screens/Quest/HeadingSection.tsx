import type { FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import { launcherTheme } from 'utils/theme';

const HeadingSection: FC = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<UnderRealmLogo size={'90%'} />
			<Text style={[styles.subtitle]}>
				Embark on a thrilling adventure in UnderRealm, where strategic card play
				meets cooperative quests!
			</Text>
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
	};
});
