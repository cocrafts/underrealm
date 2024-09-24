import type { FC } from 'react';
import {
	ImageBackground,
	Linking,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

export const UnderRealmInfo: FC = () => {
	return (
		<View style={styles.container}>
			{/* <TouchableOpacity
				activeOpacity={0.7}
				style={styles.bannerContainer}
				onPress={() =>
					Linking.openURL('https://bench.stormgate.io/thread/jDpHHUqU7lU56xAj')
				}
			>
				<ImageBackground
					source={resources.lobby.buildBannerBackground}
					style={styles.bannerContentContainer}
				>
					<View>
						<View style={styles.overlay} />
						<View>
							<Text style={styles.bannerText}>ALPHA FEEDBACKS & COMMENTS</Text>
						</View>
					</View>
				</ImageBackground>
			</TouchableOpacity> */}

			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.bannerContainer}
				onPress={() => Linking.openURL('https://underrealm.io/how-to-play')}
			>
				<ImageBackground
					source={resources.lobby.playBannerBackground}
					style={styles.bannerContentContainer}
				>
					<View>
						<View style={styles.overlay} />
						<View>
							<Text style={styles.bannerText}>HOW TO PLAY</Text>
						</View>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	);
};

export default UnderRealmInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	bannerContainer: {
		width: '100%',
		height: 140,
		marginBottom: 15,
		borderColor: '#9f835f',
		borderWidth: 1,
	},
	bannerContentContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		opacity: 0.7,
		backgroundColor: '#180d05',
	},
	bannerText: {
		padding: 15,
		fontFamily: 'Volkhov',
		fontSize: 20,
		fontWeight: '500',
	},
});
