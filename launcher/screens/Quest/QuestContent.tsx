import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import resources from 'utils/resources';
import { questActions, questState } from 'utils/state/social/internal';
import { useSnapshot } from 'valtio';

import { TabId } from './internal';
import type { SocialQuestType } from './QuestItem';
import QuestItem from './QuestItem';
import ReferralSection from './Referral';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);
	const [tab, setTab] = useState(TabId.QUEST);
	const { quests, activeDoneQuests } = useSnapshot(questState);
	const [isLoading, setIsLoading] = useState(true);

	const frameCharmStyle = useMemo(() => {
		return {
			width: (windowSize.width * 400) / 1440,
			height: (windowSize.height * 20) / 1362,
			marginTop: -(windowSize.height * 20) / 1362,
		};
	}, [windowSize]);

	const containerStyle = useMemo(() => {
		const widthRatio = isMobile ? 203 / 215 : 5 / 6;
		const heightRatio = isMobile ? 1 / 12 : 60 / 227;
		return {
			marginTop: windowSize.height * heightRatio,
			width: windowSize.width * widthRatio,
		};
	}, [windowSize, isMobile]);

	const titleCharmStyle = useMemo(() => {
		return {
			width: (windowSize.width * 400) / 1440,
			height: (windowSize.height * 13) / 1024,
			bottom: -(windowSize.height * 13) / 1024,
		};
	}, [windowSize]);

	const onChangeTab = (tabId: TabId) => {
		setTab(tabId);
	};
	useEffect(() => {
		const getQuestData = async () => {
			await questActions.getQuests();
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
				<TabSelection
					title="Social Quest"
					value={TabId.QUEST}
					onChangeTab={onChangeTab}
					isActive={tab === TabId.QUEST}
				/>
				<TabSelection
					title="Referral"
					value={TabId.REFERRAL}
					onChangeTab={onChangeTab}
					isActive={tab === TabId.REFERRAL}
				/>
			</View>

			{isLoading ? (
				<ActivityIndicator />
			) : tab === TabId.QUEST ? (
				<View style={[styles.quests, isMobile ? styles.questsOnMobile : {}]}>
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
			) : (
				<ReferralSection />
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
