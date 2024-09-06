import type { FC } from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import resources from 'utils/resources';

interface Props {
	onChangeText: (text: string) => void;
	value: string;
}
const SearchBar: FC<Props> = ({ onChangeText, value }) => {
	return (
		<View style={styles.wrapper}>
			<ImageBackground
				source={resources.cardLibrary.searchBackground}
				style={styles.container}
				resizeMode="stretch"
			>
				<TextInput
					onChangeText={onChangeText}
					value={value}
					style={styles.textInput}
					placeholder={'Search'}
					placeholderTextColor="#76645e"
				/>
				<Image source={resources.cardLibrary.searchIcon} style={styles.icon} />
			</ImageBackground>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	wrapper: {
		height: 55,
		padding: 6,
	},
	container: {
		paddingHorizontal: 20,
		width: 400,
		backgroundColor: '#1e0f0d',
		flexDirection: 'row',
		alignItems: 'center',
		height: '100%',
	},
	textInput: {
		color: '#fff',
		fontFamily: 'Poppins',
		height: '100%',
		flex: 1,
	},
	icon: {
		width: 19,
		height: 19,
	},
});
