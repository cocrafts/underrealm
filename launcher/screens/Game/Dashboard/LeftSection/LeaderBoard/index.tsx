import type { FC } from 'react';
import { useState } from 'react';
import type { ScaledSize } from 'react-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmBoard from 'components/Board';
import BottomTitleSeparator from 'components/icons/underRealm/BottomTitleSeparator';
import TopTitleSeparator from 'components/icons/underRealm/TopTitleSeparator';

import type { RenderItem } from './Item';
import Item from './Item';
import Option from './Option';

interface Props {
	windowSize: ScaledSize;
}

export const LeaderBoard: FC<Props> = ({ windowSize }) => {
	const [option, setOption] = useState('experience');

	const onOptionPress = (id: string) => {
		setOption(id);
	};

	return (
		<UnderRealmBoard style={styles.container}>
			<View style={styles.titleContainer}>
				<TopTitleSeparator size={400} style={styles.topSeparator} />
				<Text style={styles.boardTitle}>Hall of Fame</Text>
				<BottomTitleSeparator size={400} />
			</View>
			<View style={styles.optionRowContainer}>
				<View style={styles.indicatorBaseLine} />
				<Option
					id={'experience'}
					activeOption={option}
					title={'Experience'}
					onPress={onOptionPress}
				/>
				<Option
					id={'winningRate'}
					activeOption={option}
					title={'Winning Rate'}
					onPress={onOptionPress}
				/>
			</View>
			<View>
				<View style={styles.listHeaderContainer}>
					<Text style={[styles.listHeaderText, styles.firstListHeaderText]}>
						#
					</Text>
					<Text style={[styles.listHeaderText, styles.secondListHeaderText]}>
						Adventure
					</Text>
					<Text style={styles.listHeaderText}>
						{option === 'experience' ? 'Experience' : '%'}
					</Text>
				</View>
				<FlatList
					style={{ height: windowSize.height * 0.3 }}
					data={mockData}
					getItemLayout={(_, index) => ({
						length: 48,
						offset: 48 * index,
						index,
					})}
					renderItem={({ item }) => <Item item={item} />}
				/>
			</View>
		</UnderRealmBoard>
	);
};

export default LeaderBoard;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		alignItems: 'center',
		flex: 1,
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: 20,
	},
	boardTitle: {
		paddingVertical: 15,
		fontFamily: 'Volkhov',
		fontSize: 22,
	},
	topSeparator: {
		position: 'absolute',
		top: -20,
	},
	optionRowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'flex-end',
		marginBottom: 20,
	},
	indicatorBaseLine: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 5,
		borderColor: '#57423e',
		borderBottomWidth: 1,
	},
	listHeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#57423e',
		borderBottomWidth: 1,
		marginBottom: 10,
	},
	listHeaderText: {
		marginHorizontal: 15,
		color: '#787878',
		marginBottom: 15,
	},
	firstListHeaderText: {
		width: 50,
		marginRight: 0,
	},
	secondListHeaderText: {
		flex: 1,
	},
});

const mockData: RenderItem[] = [];
