import type { FC } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

import { mockQuests } from './internal';
import QuestItem from './QuestItem';
import TabSelection from './TabSelection';

const QuestContent: FC = () => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);

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

			<View style={[styles.quests, isMobile ? styles.questsOnMobile : {}]}>
				{mockQuests.map((quest) => (
					<QuestItem key={quest.title} {...quest} />
				))}
			</View>
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
