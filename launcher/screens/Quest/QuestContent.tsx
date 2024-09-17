import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';
import { questActions, questState } from 'utils/state/social/internal';
import { useSnapshot } from 'valtio';

import type { SocialQuestType } from './QuestItem';
import QuestItem from './QuestItem';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { quests, activeDoneQuests } = useSnapshot(questState);
	const [isLoading, setIsLoading] = useState(true);
	const { styles } = useStyles(stylesheet);

	useEffect(() => {
		const getQuestData = async () => {
			await questActions.getQuests();
			await questActions.getDoneQuests();
		};

		getQuestData().then(() => setIsLoading(false));
	}, []);

	return (
		<View style={[styles.container]}>
			<Image style={styles.frameCharm} source={resources.quest.charm} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Quest To Conquer</Text>
				<Image source={resources.quest.titleCharm} style={styles.titleCharm} />
			</View>

			<View style={styles.tabsContainer}>
				<TabSelection title="Social Quest" isActive={true} />
				<TabSelection title="Referral" />
			</View>

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={[styles.quests]}>
					{quests.map((quest) => {
						const isDone = Array.from(activeDoneQuests).some(
							(doneQuest) => doneQuest.id === quest.id,
						);

						return (
							<QuestItem
								key={quest.id}
								id={quest.id}
								description={quest.description}
								title={quest.title}
								type={quest.type as SocialQuestType}
								points={quest.points}
								url={quest.url}
								isDone={isDone}
								onVerify={() =>
									questActions.verifyAndClaimQuest(quest.id, quest.points)
								}
							/>
						);
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
