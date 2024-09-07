import { injectCardState } from './utils/card';
import { selectDeck } from './utils/helper';
import type {
	CardState,
	DuelConfig,
	DuelSetting,
	DuelState,
	PlayerConfig,
	PlayerState,
} from './utils/type';
import { DuelPhases, DuelPlace } from './utils/type';
import { makeMeta } from './meta';

export const defaultSetting: DuelSetting = {
	initialCardCount: 5,
	initialPlayerHealth: 250,
	elementalFactor: 0.1,
	handSize: 9,
	groundSize: 11,
	maxAttachment: 2,
	spellIncreaseCycle: 3,
	perTurnDraw: 1,
	perTurnHero: 1,
	perTurnSpell: 2,
	perTurnTroop: 1,
};

export const makeDuel = (
	players: [PlayerConfig, PlayerConfig],
	version = '00001',
	setting = defaultSetting,
): { config: DuelConfig; state: DuelState } => {
	const config = makeDuelConfig(players, version, setting);

	return {
		config,
		state: getInitialState(config),
	};
};

export const makeDuelConfig = (
	[player1, player2]: [PlayerConfig, PlayerConfig],
	version = '00001',
	setting = defaultSetting,
): DuelConfig => {
	const firstMover = Math.random() > 0.5 ? player1.id : player2.id;
	const keepOrder = firstMover === player1.id;
	const firstPlayer = keepOrder ? player1 : player2;
	const secondPlayer = keepOrder ? player2 : player1;

	return {
		version,
		setting,
		firstMover,
		firstPlayer,
		secondPlayer,
	};
};

export const getInitialState = ({
	version,
	setting,
	firstMover,
	firstPlayer,
	secondPlayer,
}: DuelConfig): DuelState => {
	const { map: cardMap } = makeMeta(version);
	const stateMap: Record<string, CardState> = {};
	const [firstPlayerState, secondPlayerState] = [firstPlayer, secondPlayer].map(
		(player): PlayerState => {
			return {
				id: player.id,
				attack: 0,
				defense: 0,
				health: setting.initialPlayerHealth,
				perTurnDraw: setting.perTurnDraw,
				perTurnHero: setting.perTurnHero,
				perTurnSpell: setting.perTurnSpell,
				perTurnTroop: setting.perTurnTroop,
			};
		},
	);

	const duel: DuelState = {
		cardMap,
		stateMap,
		setting,
		turn: 0,
		uniqueCardCount: 0,
		phase: DuelPhases.Draw,
		phaseOf: firstMover,
		firstMover,
		firstPlayer: firstPlayerState,
		secondPlayer: secondPlayerState,
		firstDeck: [],
		secondDeck: [],
		firstHand: [],
		secondHand: [],
		firstGround: [],
		secondGround: [],
		firstGrave: [],
		secondGrave: [],
	};

	[firstPlayer, secondPlayer].forEach(({ id: playerId, deck }) => {
		const currentDeck = selectDeck(duel, playerId);

		deck.forEach((id) => {
			currentDeck.push(
				injectCardState(duel, cardMap, {
					id,
					owner: playerId,
					place: DuelPlace.Deck,
				}).id,
			);
		});
	});

	for (let i = 0; i < setting.groundSize; i += 1) {
		duel.firstGround.push(null);
		duel.secondGround.push(null);
	}

	return duel;
};
