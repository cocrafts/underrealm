import { injectCardState } from '../../utils/card';
import {
	cloneState,
	createCommandResult,
	createDuelFragment,
} from '../../utils/helper';
import type { CommandCreator, CommandRunner } from '../../utils/type';
import { DuelCommandType, DuelPlace } from '../../utils/type';

export const create: CommandCreator<'owner' | 'target'> = ({
	owner,
	target,
}) => {
	const { commands, registerCommand } = createCommandResult();

	registerCommand({
		owner,
		type: DuelCommandType.CardMove,
		target,
	});

	return commands;
};

const generatedPlaces = [DuelPlace.Player, DuelPlace.Ability];
export const run: CommandRunner = ({ duel, command: { target } }) => {
	const fragment = createDuelFragment(duel);
	const toCardFilter = (id: string) => id === target.to.id;
	const fromCardFilter = (id: string) => id === target.from.id;
	const fromAir = generatedPlaces.indexOf(target.from.place) >= 0;
	const fromGround = target.from.place === DuelPlace.Ground;
	const toGround = target.to.place === DuelPlace.Ground;

	if (fromGround && toGround) {
		/* <- Relocation, including swap and steal/borrow */
		if (target.from.owner === target.to.owner) {
			const groundClone = cloneState(duel, target.to.owner, DuelPlace.Ground);
			const fromIndex = groundClone.state.findIndex(fromCardFilter);
			const fromCardId = groundClone.state[fromIndex];

			if (target.to.id) {
				/* <- Swap card on the same Player's Ground */
				const toIndex = groundClone.state.findIndex(toCardFilter);
				const toCardId = groundClone.state[toIndex];

				groundClone.state[toIndex] = fromCardId;
				groundClone.state[fromIndex] = toCardId;
			} else {
				/* <- Move card to empty slot on the same Player's Ground */
				groundClone.state[fromIndex] = null;
				groundClone.state[target.to.index] = fromCardId;
			}

			fragment[groundClone.key] = groundClone.state;
		} else {
			const fromClone = cloneState(duel, target.from.owner, target.from.place);
			const toClone = cloneState(duel, target.to.owner, target.to.place);
			const fromIndex = fromClone.state.findIndex(fromCardFilter);
			const fromCardId = fromClone.state[fromIndex];

			if (target.to.id) {
				/* <- Swap card between Player's Ground */
				const toIndex = toClone.state.findIndex(toCardFilter);
				const toCardId = toClone.state[toIndex];

				toClone.state[toIndex] = fromCardId;
				fromClone.state[fromIndex] = toCardId;

				fragment.stateMap[fromCardId] = {
					...duel.stateMap[fromCardId],
					owner: target.to.owner,
				};

				fragment.stateMap[toCardId] = {
					...duel.stateMap[toCardId],
					owner: target.from.owner,
				};
			} else {
				/* <- Steal card from another Player's Ground */
				fromClone.state[fromIndex] = null;
				toClone.state[target.to.index] = fromCardId;

				fragment.stateMap[fromCardId] = {
					...duel.stateMap[fromCardId],
					owner: target.to.owner,
				};
			}

			fragment[fromClone.key] = fromClone.state;
			fragment[toClone.key] = toClone.state;
		}
	} else if (toGround) {
		/* <- Construction/Summon, from non-Ground to Ground */
		const groundClone = cloneState(duel, target.to.owner, DuelPlace.Ground);

		if (fromAir) {
			const targetIndex = target.to.index;
			groundClone.state[targetIndex] = injectCardState(fragment, duel.cardMap, {
				id: target.from.id,
				owner: target.to.owner,
				place: target.to.place,
			}).id;

			fragment[groundClone.key] = groundClone.state;
		} else {
			const fromClone = cloneState(duel, target.from.owner, target.from.place);
			const fromIndex = fromClone.state.findIndex(fromCardFilter);
			const targetedCardId = fromClone.state[fromIndex];
			const isGroundSlotEmpty = !groundClone.state[target.to.index];

			if (targetedCardId && isGroundSlotEmpty) {
				fromClone.state.splice(fromIndex, 1); /* <- fromClone is non-Ground */
				groundClone.state[target.to.index] = targetedCardId;

				fragment.stateMap[targetedCardId] = {
					...duel.stateMap[targetedCardId],
					owner: target.to.owner,
					place: target.to.place,
				};
				fragment[fromClone.key] = fromClone.state;
				fragment[groundClone.key] = groundClone.state;
			}
		}
	} else if (fromGround) {
		/* <- Destruction, from Ground to non-Ground */
		const toClone = cloneState(duel, target.to.owner, target.to.place);
		const groundClone = cloneState(duel, target.from.owner, target.from.place);
		const fromIndex = groundClone.state.findIndex(fromCardFilter);
		const targetedCardId = groundClone.state[fromIndex];

		if (targetedCardId) {
			toClone.state.push(targetedCardId);
			groundClone.state[fromIndex] = null;

			fragment.stateMap[targetedCardId] = {
				...duel.stateMap[targetedCardId],
				owner: target.to.owner,
				place: target.to.place,
			};
			fragment[toClone.key] = toClone.state;
			fragment[groundClone.key] = groundClone.state;
		}
	} else {
		/* <-- Generic move, both from and to is non-Ground */
		const toClone = cloneState(duel, target.to.owner, target.to.place);

		if (fromAir) {
			toClone.state.push(
				injectCardState(fragment, duel.cardMap, {
					id: target.from.id,
					owner: target.to.owner,
					place: target.to.place,
				}).id,
			);

			fragment[toClone.key] = toClone.state;
		} else {
			const fromClone = cloneState(duel, target.from.owner, target.from.place);
			const fromIndex = fromClone.state.findIndex(fromCardFilter);
			const targetedCardId = fromClone.state[fromIndex];

			fromClone.state.splice(fromIndex, 1);
			toClone.state.push(targetedCardId);

			fragment.stateMap[targetedCardId] = {
				...duel.stateMap[targetedCardId],
				owner: target.to.owner,
				place: target.to.place,
			};
			fragment[fromClone.key] = fromClone.state;
			fragment[toClone.key] = toClone.state;
		}
	}

	return fragment;
};

export const cardMove = {
	create,
	run,
};

export default cardMove;
