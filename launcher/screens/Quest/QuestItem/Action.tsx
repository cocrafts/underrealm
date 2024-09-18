import type { FC } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import {
	createStyleSheet,
	UnistylesRuntime,
	useStyles,
} from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import HoverableButton from 'components/HoverableButton';
import Refresh from 'components/icons/Refresh';
import {
	type Quest,
	useActiveQuestsQuery,
	useCreateQuestActionMutation,
} from 'utils/graphql';
import resources from 'utils/resources';

type Props = {
	quest: Quest;
	isTaskOpened: boolean;
	isDone: boolean;
};

const Action: FC<Props> = ({ quest, isTaskOpened, isDone }) => {
	const { refetch } = useActiveQuestsQuery();
	const [createQuestAction] = useCreateQuestActionMutation();
	const { styles } = useStyles(stylesheet);
	const isMobile = UnistylesRuntime.breakpoint === 'xs';

	const handlePressVerify = async () => {
		await createQuestAction({
			variables: { questId: quest.id },
		});
		await refetch();
	};

	return !isDone ? (
		<View style={styles.buttonsContainer}>
			<View style={styles.pointContainer}>
				<Image source={resources.quest.coinU} style={styles.coinU} />
				<Text style={styles.pointText}>{quest.points}</Text>
			</View>

			{isTaskOpened && (
				<HoverableButton
					onPress={handlePressVerify}
					style={styles.refreshButton}
					hoverStyle={styles.hovered}
				>
					<ImageBackground
						source={
							isMobile
								? resources.quest.smallRefreshButton
								: resources.quest.refreshButton
						}
						style={styles.refreshButtonImage}
					>
						<Refresh size={16} />
						{!isMobile && <Text style={styles.buttonText}>Verify</Text>}
					</ImageBackground>
				</HoverableButton>
			)}
		</View>
	) : (
		<View style={styles.completeContainer}>
			{!isMobile && <Text style={styles.pointText}>Completed</Text>}
			<Image source={resources.quest.checked} style={styles.checked} />
		</View>
	);
};

export default Action;

const stylesheet = createStyleSheet(() => {
	return {
		refreshButton: {
			overflow: 'visible',
			alignItems: 'center',
			justifyContent: 'center',
		},
		refreshButtonImage: {
			flexDirection: 'row',
			width: { xs: 40, sm: 90 },
			height: { xs: 40, sm: 40 },
			alignItems: 'center',
			justifyContent: 'center',
			gap: 8,
		},
		refreshButtonContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 12,
		},
		buttonsContainer: {
			flexDirection: { xs: 'column', sm: 'row' },
			gap: { xs: 8, sm: 20 },
		},
		buttonText: {
			color: '#ffffff',
			fontSize: 12,
			fontWeight: '500',
			textAlign: 'center',
		},
		pointText: {
			color: '#F2E0C3',
			fontFamily: 'Volkhov',
			fontWeight: '600',
			fontSize: { xs: 12, lg: 16 },
		},
		hovered: {
			shadowColor: '#FFF9A0',
			shadowOffset: {
				height: 0,
				width: 0,
			},
			shadowOpacity: 0.5,
			shadowRadius: 12,
		},
		pointContainer: {
			alignItems: 'center',
			flexDirection: 'row',
			gap: 8,
		},
		coinU: {
			width: { xs: 20, md: 24 },
			height: { xs: 20, md: 24 },
		},
		completeContainer: {
			flexDirection: 'row',
			gap: 12,
			alignItems: 'center',
		},
		checked: {
			width: 32,
			height: 32,
		},
	};
});
