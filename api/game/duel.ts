import type { CardMeta, DuelConfig, PlayerConfig } from '@underrealm/murg';
import {
	CardType,
	defaultSetting,
	getInitialState,
	makeMeta,
	move,
} from '@underrealm/murg';

export const makeDuel = (
	version = '00001',
	firstPlayerId: string,
	secondPlayerId: string,
) => {
	const meta = makeMeta(version);
	const player1: PlayerConfig = {
		id: firstPlayerId,
		deck: generateRandomDeck(meta),
	};
	const player2: PlayerConfig = {
		id: secondPlayerId,
		deck: generateRandomDeck(meta),
	};
	const firstMover = Math.random() > 0.5 ? firstPlayerId : secondPlayerId;
	const keepOrder = firstMover === firstPlayerId;
	const firstPlayer = keepOrder ? player1 : player2;
	const secondPlayer = keepOrder ? player2 : player1;
	const config: DuelConfig = {
		version,
		setting: defaultSetting,
		firstMover,
		firstPlayer,
		secondPlayer,
	};

	const state = getInitialState(config);

	const { duel, commandBundles } = move.distributeInitialCards(state);
	commandBundles.push(...move.distributeTurnCards(duel).commandBundles);

	return {
		config,
		history: commandBundles,
	};
};

export const generateRandomDeck = (meta: CardMeta, size = 30) => {
	const sources = pickSkillReadyCards(meta);
	const maxSize = Math.floor(sources.length / 7);
	const safeSize = Math.min(size, maxSize);
	const results: string[] = [];
	let count = 0;

	while (count < safeSize) {
		const randomIndex = Math.floor(Math.random() * sources.length);
		const randomId = sources[randomIndex];
		const sku = randomId.substring(0, 5);
		const existedCard = results.find((id) => id.startsWith(sku));

		if (!existedCard) {
			results.push(randomId);
			count++;
		}

		sources.splice(randomIndex, 1);
	}

	return results;
};

const pickSkillReadyCards = ({ map, entities }: CardMeta) => {
	const result = [];

	for (let i = 0; i < entities.length; i += 1) {
		const cardId = entities[i];
		const card = map[cardId];
		const isTroopCard = card.kind === CardType.Troop;
		const isSkillValid =
			card.skill.activation === undefined ||
			(card.skill.attribute && !card.skill.charge) ||
			card.skill.passiveAttribute;

		if (!isTroopCard && isSkillValid) {
			result.push(cardId);
		}
	}

	return result;
};
