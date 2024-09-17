import type { FC } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { useActiveQuestsQuery } from 'utils/graphql';
import resources from 'utils/resources';

import QuestItem from './QuestItem';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { data, loading, error } = useActiveQuestsQuery();

	return (
		<View style={styles.container}>
			<Image style={styles.frameCharm} source={resources.quest.charm} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Quest To Conquer</Text>
				<Image source={resources.quest.titleCharm} style={styles.titleCharm} />
			</View>

			<View style={styles.tabsContainer}>
				<TabSelection title="Social Quest" isActive={true} />
				<TabSelection title="Referral" />
			</View>

			{loading ? (
				<ActivityIndicator />
			) : error ? (
				<View>
					<Text>{error.message}</Text>
				</View>
			) : (
				<View style={styles.quests}>
					{data.activeQuests.map((quest) => {
						return <QuestItem key={quest.id} quest={quest} />;
					})}
				</View>
			)}
		</View>
	);
};

export default QuestContent;

const styles = StyleSheet.create({
	frameCharm: {
		alignSelf: 'center',
	},
	imageBackground: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		borderColor: '#9F835F',
		borderWidth: 1,
		alignItems: 'stretch',
		paddingBottom: 80,
		marginBottom: 40,
		marginTop: 80,
	},
	title: {
		fontFamily: 'Volkhov',
		color: '#ffffff',
		fontSize: 22,
	},
	titleCharm: {
		position: 'absolute',
	},
	mapDescription: {
		marginBottom: 60,
		paddingHorizontal: 15,
	},
	quests: {
		alignItems: 'stretch',
		paddingHorizontal: 40,
		marginTop: 40,
		gap: 16,
	},
	questsOnMobile: {
		paddingHorizontal: 12,
	},
	titleContainer: {
		paddingVertical: 20,
		alignItems: 'center',
		alignSelf: 'center',
	},
	tabsContainer: {
		flexDirection: 'row',
		borderBottomColor: '#2E2E2E',
		borderBottomWidth: 1,
		justifyContent: 'center',
	},
});
