import type { FC } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import Profile from 'components/icons/Profile';
import { useProfile } from 'utils/hooks';
import resources from 'utils/resources';

const HeadingSection: FC = () => {
	const { styles } = useStyles(stylesheet);
	const { profile } = useProfile();

	return (
		<View style={styles.container}>
			<Image source={resources.quest.imageTitle} style={styles.imageTitle} />

			<UnderRealmLogo size={styles.logo.width} style={styles.logo} />

			<ImageBackground
				source={resources.quest.pointsBoard}
				style={styles.imageBoardBackground}
			>
				<View style={styles.pointInfoContainer}>
					<Profile color="#F2E0C3" />
					<Text style={styles.text}>Referrals:</Text>
					<Text style={styles.text}>0</Text>
				</View>
				<Image
					style={styles.separateLine}
					source={resources.quest.separateLine}
				/>
				<View style={styles.pointInfoContainer}>
					<Image source={resources.quest.coinU} style={styles.coinU} />
					<Text style={styles.text}>Coins:</Text>
					<Text style={styles.text}>{profile.points || 0}</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default HeadingSection;

const stylesheet = createStyleSheet({
	container: {
		alignItems: 'center',
	},
	logo: {
		marginTop: { xs: 92, sm: 128, md: 164, lg: 200, xl: 240 },
		width: { xs: 240, sm: 320, md: 400, lg: 580, xl: 660 },
	},
	pointInfoContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	imageTitle: {
		position: 'absolute',
		zIndex: -1,
		top: { xs: 30, sm: 42, md: 54, lg: 66, xl: 78 },
		width: { xs: 275, sm: 425, md: 564, lg: 638, xl: 750 },
		height: { xs: 161, sm: 242, md: 322, lg: 363, xl: 414 },
	},
	imageBoardBackground: {
		flexDirection: 'row',
		marginTop: { xs: 20, md: 40, lg: -8 },
		width: 392,
		height: 68,
		alignItems: 'center',
	},
	coinU: {
		width: 24,
		height: 24,
	},
	text: {
		fontFamily: 'Vollkorn',
		color: '#F2E0C3',
		fontSize: { xs: 14, md: 16, xl: 18 },
		fontWeight: '700',
	},
	separateLine: {
		width: 10,
		height: 45,
	},
});
