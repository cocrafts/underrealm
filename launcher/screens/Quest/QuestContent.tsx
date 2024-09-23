import type { FC } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import type { Quest } from 'utils/graphql';
import { useQuestsQuery } from 'utils/graphql';
import resources from 'utils/resources';

import { TabId } from './internal';
import QuestItem from './QuestItem';
import ReferralSection from './Referral';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { data, loading, error } = useQuestsQuery();
	console.log(data, loading, error);
	const [tab, setTab] = useState(TabId.QUEST);
	const { styles } = useStyles(stylesheet);

	const onChangeTab = (value: TabId) => {
		setTab(value);
	};

	return (
		<View style={styles.container}>
			<Image style={styles.frameCharm} source={resources.quest.charm} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Quest To Conquer</Text>
				<Image source={resources.quest.titleCharm} style={styles.titleCharm} />
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

			{loading ? (
				<ActivityIndicator color="#FFF9A0" style={styles.activityIndicator} />
			) : error ? (
				<View>
					<Text>{error.message}</Text>
				</View>
			) : tab === TabId.QUEST ? (
				error ? (
					<View>
						<Text>{error.message}</Text>
					</View>
				) : (
					<View style={styles.quests}>
						{data.quests.map((quest) => {
							return <QuestItem key={quest.id} quest={quest as Quest} />;
						})}
					</View>
				)
			) : (
				<ReferralSection />
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
		activityIndicator: {
			marginTop: 20,
		},
	};
});
