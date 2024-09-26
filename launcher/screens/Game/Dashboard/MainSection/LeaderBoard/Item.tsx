import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';

export interface RenderItem {
	rank: number;
	name: string;
	experience: number;
}

interface Props {
	item: RenderItem;
}

export const Item: FC<Props> = ({ item }) => {
	const { rank, name, experience } = item;
	const shortenedName = () => {
		if (name.length > 30) {
			return `${name.slice(0, 30)}...`;
		} else {
			return name;
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.overlay} />
			<View style={styles.contentContainer}>
				<Text style={[styles.text, styles.firstText]}>{rank}</Text>
				<Text style={[styles.text, styles.secondText]}>{shortenedName()}</Text>
				<Text style={styles.text}>{`${experience}%`}</Text>
			</View>
		</View>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		borderColor: '#4f3d2d',
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 5,
		overflow: 'hidden',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		opacity: 0.8,
		backgroundColor: '#000',
	},
	contentContainer: {
		flexDirection: 'row',
	},
	text: {
		marginHorizontal: 15,
		color: '#867766',
		marginVertical: 10,
	},
	firstText: {
		width: 50,
		marginRight: 0,
	},
	secondText: {
		flex: 1,
	},
});
