import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { AnimateDirections, modalActions } from '@metacraft/ui';
import HoverableButton from 'components/HoverableButton';
import SignInOptions from 'components/modals/SignInOptions';
import type { Quest } from 'utils/graphql';
import { useProfile } from 'utils/hooks';

import Action from './Action';
import Info from './Info';
import { questPlatformMapping } from './shared';

type Props = {
	quest: Quest;
};

const QuestItem: FC<Props> = ({ quest }) => {
	const { profile } = useProfile();
	const [isTaskOpened, setIsTaskOpened] = useState(false);
	const isDone = useMemo(() => {
		return quest.action !== null;
	}, [quest]);

	const handleGoToTask = () => {
		if (profile.id && profile.id !== '') {
			Linking.openURL(quest.url);
			setIsTaskOpened(true);
		} else {
			modalActions.show({
				id: 'signInOptions',
				component: SignInOptions,
				animateDirection: AnimateDirections.BottomLeft,
			});
		}
	};

	return (
		<HoverableButton
			onPress={handleGoToTask}
			style={[styles.container, isDone ? { opacity: 0.5 } : {}]}
			hoverStyle={isDone ? {} : styles.hovered}
			disabled={isDone}
		>
			<Info
				title={quest.title}
				platform={questPlatformMapping[quest.type]}
				description={quest.description}
			/>

			<Action quest={quest} isTaskOpened={isTaskOpened} isDone={isDone} />
		</HoverableButton>
	);
};

export default QuestItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
		flexBasis: 'auto',
		justifyContent: 'space-between',
		borderColor: '#5A5A5A',
		borderWidth: 1,
	},
	containerOnMobile: {
		paddingHorizontal: 12,
		paddingVertical: 8,
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
});
