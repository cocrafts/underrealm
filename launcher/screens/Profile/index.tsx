import { Image, ImageBackground, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import { useProfile } from 'utils/hooks';
import resources from 'utils/resources';

const ProfileScreen = () => {
	const { styles } = useStyles(stylesheet);
	const { profile } = useProfile();
	const avatar = { uri: profile?.avatarUrl };

	return (
		<ScrollLayout style={styles.container}>
			<ImageBackground
				style={styles.leftContainer}
				source={resources.profile.tabBar}
			>
				<View style={styles.basicInfoContainer}>
					<ImageBackground
						style={styles.avatarContainer}
						source={resources.profile.avatarBorder}
					>
						<Image style={styles.avatar} source={avatar} />
					</ImageBackground>
					<Text>{profile?.email}</Text>
				</View>
				<Image source={resources.profile.separateLine} />

				<View></View>
				<Image source={resources.profile.separateLine} />

				<View></View>
			</ImageBackground>
			<View></View>
		</ScrollLayout>
	);
};

export default ProfileScreen;

const stylesheet = createStyleSheet(() => ({
	container: {
		flexDirection: 'row',
	},
	avatarContainer: {
		width: 64,
		height: 64,
		padding: 2,
	},
	avatar: {
		width: 60,
		height: 60,
	},
	basicInfoContainer: {
		flexDirection: 'row',
	},
	leftContainer: {
		width: { lg: 280 },
		paddingLeft: 24,
		paddingTop: 40,
	},
}));
