import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';

import { replay } from '../replay';
import { raiseHandCard, showEndGameRibbon } from '../tween';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import type { GameDuel } from '../util/types';

import { mergeRemoteHistory } from './util';

const { selectHand, getInitialState, mergeFragmentToState } = Engine;

interface ConnectPayload {
	duel: GameDuel;
}

export const connect = (
	{ duel }: ConnectPayload,
	isMyCommand: boolean,
): void => {
	if (system.winner || !isMyCommand) return;

	const { config, history } = duel;
	const state = getInitialState(config);

	mergeFragmentToState(system.duel, state);
	system.playerIds = extractPlayerIds(config, system.userId);
	system.globalNodes.board?.emit('stateReady');

	mergeRemoteHistory(history, 0);
	setTimeout(() => replay(), 200);
};

export interface IncomingBundles {
	level: number;
	bundles: DuelCommandBundle[];
}

export const incomingBundles = ({ level, bundles }: IncomingBundles): void => {
	if (system.winner) return;

	mergeRemoteHistory(bundles, level);
	replay();
};

interface GameOver {
	winner: string;
	winnerPoints: number;
	loserPoints: number;
}

export const gameOver = ({
	winner,
	winnerPoints,
	loserPoints,
}: GameOver): void => {
	if (system.winner) return;
	system.winner = winner;

	const isVictory = system.playerIds.me === winner;
	const claimedPoints = isVictory ? winnerPoints : loserPoints;

	showEndGameRibbon(isVictory, claimedPoints);
};

interface CardHover {
	index: number;
	isMouseIn: boolean;
}

export const cardHover = ({ index, isMouseIn }: CardHover): void => {
	const hand = selectHand(system.duel, system.playerIds.enemy);

	for (let i = 0; i < hand.length; i += 1) {
		const cardNode = system.cardRefs[hand[i]];

		if (cardNode) {
			const dest = i === index && isMouseIn ? 60 : 0;
			raiseHandCard(cardNode, dest, 0.1, 'back');
		}
	}
};
