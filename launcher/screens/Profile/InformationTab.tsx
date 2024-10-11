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
import Avatar from 'components/Avatar';
import UnderRealmButton from 'components/Marketplace/Button';
import { useUpdateProfileMutation } from 'utils/graphql';
import { useProfile } from 'utils/hooks';
import resources from 'utils/resources';

import { profileImages } from './internal';

const InformationTab = () => {
	const { styles } = useStyles(stylesheet);
	const { profile, refetch } = useProfile();
	const [updateProfileInput, setUpdateProfileInput] = useState({
		name: profile?.name,
		avatarUrl: profile?.avatarUrl,
	});
	const [updateProfileMutation, { loading }] = useUpdateProfileMutation({
		variables: {
			input: updateProfileInput,
		},
	});

	const handleSave = async () => {
		await updateProfileMutation();
		await refetch();
	};

	const handleSelectAvatar = (url: string) => {
		setUpdateProfileInput({ ...updateProfileInput, avatarUrl: url });
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
							setUpdateProfileInput({ ...updateProfileInput, name: text })
						}
						value={updateProfileInput.name}
						placeholderTextColor={'#5A5A5A'}
					/>
				</View>

				<View style={styles.mutateView}>
					<Text style={styles.headingText}>Profile image</Text>
					<View style={styles.imageContainer}>
						{profileImages.map((image) => {
							const isSelected = image === updateProfileInput.avatarUrl;

							return (
								<TouchableOpacity
									style={isSelected ? styles.selected : styles.notSelected}
									onPress={() => handleSelectAvatar(image)}
									key={image}
								>
									<Avatar imageUri={image} size={72} />
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

export default InformationTab;

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		marginHorizontal: 'auto',
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
		flexWrap: 'wrap',
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
