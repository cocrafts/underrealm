import { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { useUpdateProfileMutation } from 'utils/graphql';
import { useProfile } from 'utils/hooks';
import resources from 'utils/resources';

import Avatar from './avatar';

const profileImages = [
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar1.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar2.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar3.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar4.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar5.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar6.png',
];

const ProfileInformationTab = () => {
	const { styles } = useStyles(stylesheet);
	const { profile, refetch } = useProfile();
	const [mutateProps, setMutateProps] = useState({
		name: profile?.name,
		avatarUrl: profile?.avatarUrl,
	});
	const [updateProfileMutation, { loading }] = useUpdateProfileMutation({
		variables: {
			props: {
				...mutateProps,
			},
		},
	});

	const handleSave = async () => {
		await updateProfileMutation();
		await refetch();
	};

	const handleSelectAvatar = (url: string) => {
		setMutateProps({ ...mutateProps, avatarUrl: url });
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Personal Information</Text>
				<Image style={styles.titleCharm} source={resources.quest.titleCharm} />
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.mutateView}>
					<Text style={styles.headingText}>Username</Text>
					<TextInput
						style={styles.input}
						placeholder="Change your username"
						onChangeText={(text) =>
							setMutateProps({ ...mutateProps, name: text })
						}
						value={mutateProps.name}
						placeholderTextColor={'#5A5A5A'}
					/>
				</View>

				<View style={styles.mutateView}>
					<Text style={styles.headingText}>Profile image</Text>
					<View style={styles.imageContainer}>
						{profileImages.map((image) => {
							const url = { uri: image };
							const isSelected = image === mutateProps.avatarUrl;

							return (
								<TouchableOpacity
									style={isSelected ? styles.selected : styles.notSelected}
									onPress={() => handleSelectAvatar(image)}
									key={image}
								>
									<Avatar source={url} size={72} />
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				<UnderRealmButton style={styles.button} onPress={handleSave}>
					{loading ? (
						<ActivityIndicator color="#FFF9A0" />
					) : (
						<Text style={styles.buttonText}>Save</Text>
					)}
				</UnderRealmButton>
			</View>
		</View>
	);
};

export default ProfileInformationTab;

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	titleContainer: {
		alignItems: 'center',
		gap: 20,
		paddingVertical: 24,
	},
	title: {
		fontFamily: 'Vollkorn',
		fontSize: 18,
		fontWeight: '600',
	},
	titleCharm: {
		width: 400,
		height: 13,
		opacity: 0.3,
	},
	avatarBorder: {
		width: 72,
		height: 72,
		padding: 2,
	},
	avatar: {
		width: 68,
		height: 68,
	},
	input: {
		width: 480,
		height: 40,
		borderWidth: 2,
		borderColor: '#5A5A5A',
		backgroundColor: '#190E0E',
		color: '#ffffff',
		paddingHorizontal: 20,
	},
	headingText: {
		fontFamily: 'Volkhov',
		fontSize: 12,
		opacity: 0.64,
	},
	mutateView: {
		gap: 12,
	},
	imageContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	contentContainer: {
		gap: 32,
	},
	button: {
		width: 140,
		justifyContent: 'center',
	},
	buttonText: {
		textAlign: 'center',
	},
	selected: {
		shadowColor: '#FFF9A0',
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 12,
	},
	notSelected: {
		opacity: 0.4,
	},
}));
