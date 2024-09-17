import type { FC } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import { useActiveQuestsQuery } from 'utils/graphql';
import resources from 'utils/resources';

import QuestItem from './QuestItem';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { data, loading, error } = useActiveQuestsQuery();
	const { styles } = useStyles(stylesheet);

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

const stylesheet = createStyleSheet(() => {
	return {
		frameCharm: {
			alignSelf: 'center',
			width: { xs: 300, lg: 400 },
			height: { xs: 24, lg: 30 },
			marginTop: { xs: -16, lg: -20 },
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
			paddingHorizontal: { xs: 16, md: 20, lg: 40 },
			marginBottom: 40,
			marginTop: 80,
			alignSelf: 'stretch',
		},
		title: {
			fontFamily: 'Volkhov',
			color: '#ffffff',
			fontSize: 22,
		},
		titleCharm: {
			position: 'absolute',
			width: 400,
			height: 13,
			bottom: -13,
		},
		mapDescription: {
			marginBottom: 60,
			paddingHorizontal: 15,
		},
		quests: {
			alignItems: 'stretch',
			paddingHorizontal: { xs: 12, md: 40 },
			marginTop: 40,
			gap: 16,
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
	};
});
