import type { FC } from 'react';
import { useState } from 'react';
import { ImageBackground, Linking, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import HoverableButton from 'components/HoverableButton';
import Refresh from 'components/icons/Refresh';
import UnderRealmButton from 'components/Marketplace/Button';
import {
	type Quest,
	useActiveQuestsQuery,
	useCreateQuestActionMutation,
} from 'utils/graphql';
import resources from 'utils/resources';

type Props = {
	quest: Quest;
};

const Action: FC<Props> = ({ quest }) => {
	const [isTaskOpened, setIsTaskOpened] = useState(false);
	const { refetch } = useActiveQuestsQuery();
	const [createQuestAction] = useCreateQuestActionMutation();

	const handleGoToTask = () => {
		Linking.openURL(quest.url);
		setIsTaskOpened(true);
	};

	const handlePressVerify = async () => {
		// claimedPoints should no be here
		await createQuestAction({
			variables: { questId: quest.id, claimedPoints: 0 },
		});
		await refetch();
	};

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				{isTaskOpened && (
					<View style={styles.refreshButtonContainer}>
						<HoverableButton
							onPress={handlePressVerify}
							style={styles.refreshButton}
							hoverStyle={styles.hovered}
						>
							<ImageBackground
								source={resources.quest.refreshButton}
								style={styles.refreshButtonImage}
							>
								<Refresh size={16} />
							</ImageBackground>
						</HoverableButton>

						<Text style={styles.buttonText}>Verify</Text>
					</View>
				)}

				<UnderRealmButton onPress={handleGoToTask} style={styles.goButton}>
					<Text style={styles.buttonText}>Go</Text>
				</UnderRealmButton>
			</View>
		</View>
	);
};

export default Action;

const styles = StyleSheet.create({
	refreshButton: {
		width: 36,
		height: 36,
		borderRadius: 20,
		overflow: 'visible',
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonOnMobile: {
		width: 20,
		height: 20,
	},
	refreshButtonImage: {
		width: 39,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonImageOnMobile: {
		width: 24,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: 40,
	},
	container: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
	containerOnMobile: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
	},
	goButton: {
		width: 135,
		alignItems: 'center',
	},
	goButtonOnMobile: {
		width: 64,
		alignItems: 'center',
		height: 24,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	pointText: {
		color: '#F2E0C3',
		fontFamily: 'Volkhov',
		fontWeight: '600',
		fontSize: 16,
	},
	pointTextOnMobile: {
		color: '#F2E0C3',
		fontFamily: 'Volkhov',
		fontWeight: '500',
		fontSize: 12,
		marginBottom: 4,
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
	buttonTextOnMobile: {
		fontSize: 12,
	},
	pointContainer: {
		alignItems: 'center',
	},
});
