import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import resources from 'utils/resources';
import { questActions, questState } from 'utils/state/social/internal';
import { useSnapshot } from 'valtio';

import type { SocialQuestType } from './QuestItem';
import QuestItem from './QuestItem';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);
	const { activeQuests, activeDoneQuests } = useSnapshot(questState);
	const [isLoading, setIsLoading] = useState(true);

	const frameCharmStyle = useMemo(() => {
		return {
			width: (windowSize.width * 400) / 1440,
			height: (windowSize.height * 20) / 1362,
			marginTop: -(windowSize.height * 20) / 1362,
		};
	}, [windowSize]);

	const containerStyle = useMemo(() => {
		if (isMobile)
			return {
				width: windowSize.width - (windowSize.width * 24) / 430,
				marginTop: (windowSize.height * 80) / 960,
			};
		return {
			marginTop: (windowSize.height * 360) / 1362,
			width: windowSize.width - (windowSize.width * 120) / 720,
		};
	}, [windowSize, isMobile]);

	const titleCharmStyle = useMemo(() => {
		return {
			width: (windowSize.width * 400) / 1440,
			height: (windowSize.height * 13) / 1024,
			bottom: -(windowSize.height * 13) / 1024,
		};
	}, [windowSize]);

	useEffect(() => {
		const getQuestData = async () => {
			await questActions.getActiveQuests();
			await questActions.getDoneQuests();
		};

		getQuestData().then(() => setIsLoading(false));
	}, []);

	return (
		<View style={[styles.container, containerStyle]}>
			<Image
				style={[styles.frameCharm, frameCharmStyle]}
				source={resources.quest.charm}
			/>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Quest To Conquer</Text>
				<Image
					source={resources.quest.titleCharm}
					style={[titleCharmStyle, styles.titleCharm]}
				/>
			</View>

			<View style={styles.tabsContainer}>
				<TabSelection title="Social Quest" isActive={true} />
				<TabSelection title="Referral" />
			</View>

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={[styles.quests, isMobile ? styles.questsOnMobile : {}]}>
					{activeQuests.map((quest) => {
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
