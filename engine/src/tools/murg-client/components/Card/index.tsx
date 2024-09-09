import type { FC } from 'react';
import { Fragment } from 'react';
import type { DuelState } from '@underrealm/murg';
import {
	getCard,
	getCardState,
	getComputedAttribute,
	getElementalDisplay,
	getPlaceDisplay,
} from '@underrealm/murg';
import { Box, Text } from 'ink';

import Attribute from './Attribute';
import EmptyCard from './Empty';
import SkillDesc from './SkillDesc';

interface Props {
	duel: DuelState;
	predict: DuelState;
	color?: string;
	id?: string;
	index?: number;
	width?: number;
}

export const Card: FC<Props> = ({ duel, predict, color, index, id, width }) => {
	const card = getCard(duel.cardMap, id);
	const state = getCardState(duel.stateMap, id);
	const future = getCardState(predict.stateMap, id);

	if (!card?.id || !state?.id) return <EmptyCard width={width} index={index} />;

	const origin = card.attribute;
	const computed = getComputedAttribute(duel, id);
	const borderColor = future?.health <= 0 ? 'red' : 'gray';

	return (
		<Box
			width={width}
			flexDirection="column"
			borderStyle="round"
			alignItems="center"
			borderColor={borderColor}
		>
			<Box>
				<Text>
					<Text color="gray">
						{state.owner.substring(0, 1)}
						{index}
					</Text>
					<Text color={color}>•</Text>
					<Text color="gray">{state?.id.substring(10)}</Text>
					<Text color={color}> {card.name}</Text>
				</Text>
			</Box>
			<Box
				paddingLeft={1}
				paddingBottom={1}
				paddingRight={1}
				flexGrow={1}
				alignItems="flex-end"
			>
				<SkillDesc skill={card.skill} />
			</Box>
			<Box>
				<Box width="33%" justifyContent="center">
					<Text color="gray">{getPlaceDisplay(state.place)}</Text>
				</Box>
				<Box width="34%" justifyContent="center">
					{!!card.skill.charge && (
						<Fragment>
							<Text color="gray"> (</Text>
							<Text color="blue">{state?.charge}</Text>
							<Text color="gray">) </Text>
						</Fragment>
					)}
				</Box>
				<Box width="33%" justifyContent="center">
					<Text color="gray">{getElementalDisplay(card.elemental)}</Text>
				</Box>
			</Box>
			<Box>
				<Attribute pair={[origin.health, computed.health, future.health]} />
				<Attribute pair={[origin.defense, computed.defense, future.defense]} />
				<Attribute pair={[origin.attack, computed.attack, future.attack]} />
			</Box>
		</Box>
	);
};

Card.defaultProps = {
	color: 'white',
	width: 21,
};

export default Card;
