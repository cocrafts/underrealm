import type { FC } from 'react';
import {
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Hyperlink, Text } from '@metacraft/ui';
import UnderRealmModal from 'components/layouts/UnderRealmModal';

export const Subscribed: FC = () => {
	const shareTwitter = () =>
		Linking.openURL(
			'https://twitter.com/intent/tweet?text=I%27ve%20subscribed%20to&url=https%3A%2F%2Fstormgate.io%2F&via=StormgateIO',
		);
	const joinDiscord = () => Linking.openURL('https://discord.gg/sXcz9Em4AR');
	const followTwitter = () =>
		Linking.openURL('https://twitter.com/StormgateIO');

	return (
		<UnderRealmModal style={styles.container}>
			<Text style={styles.heading}>
				You have successfully subscribed to the Alpha Launch
			</Text>
			<Text style={styles.message}>
				Thank you for your interests in Under Realm!
			</Text>
			<View style={styles.blockContainer}>
				<View style={styles.tweetContainer}>
					<Text style={[styles.message, { marginRight: 16 }]}>Tweet this:</Text>
					<TouchableOpacity style={styles.command} onPress={shareTwitter}>
						<Image
							style={styles.twitterImage}
							source={{
								uri: 'https://stormgate.io/external/twitter-share-button-icon.png',
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.followContainer}>
				<Text style={styles.message}>
					Follow our community for quick updates:
				</Text>
				<View style={styles.commandContainer}>
					<Hyperlink
						style={styles.command}
						title="Discord"
						onPress={joinDiscord}
					/>
					<Hyperlink
						style={styles.command}
						title="Twitter"
						onPress={followTwitter}
					/>
				</View>
			</View>
		</UnderRealmModal>
	);
};

export default Subscribed;

const styles = StyleSheet.create({
	container: {
		maxWidth: 650,
		paddingVertical: 50,
		paddingHorizontal: 80,
	},
	heading: {
		color: '#CFCDB3',
		fontSize: 24,
		lineHeight: 32,
		fontWeight: '400',
		textAlign: 'center',
		marginBottom: 30,
	},
	message: {
		fontSize: 18,
		fontWeight: '200',
		color: '#ffffff',
		textAlign: 'center',
	},
	blockContainer: {
		marginVertical: 20,
	},
	tweetContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
	},
	commandContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 15,
	},
	command: {
		marginHorizontal: 8,
	},
	twitterImage: {
		width: 100,
		height: 32,
	},
	followContainer: {
		marginBottom: 8,
	},
});
