import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';
import lodash from 'lodash';

import { replay } from '../replay';
import { system } from '../util/system';
import type { CommandPayload, JwtPayload } from '../util/types';
import { GameEventType } from '../util/types';

import { ws } from './util';

const { getCardState, selectHand, move, DuelPlace } = Engine;

export const send = (type: GameEventType, payload?: unknown): void => {
	const data: CommandPayload = {
		action: 'game',
		jwt: system.jwt,
		type,
		payload,
	};
	ws.send(JSON.stringify(data));
};

export const sendConnect = (): void => {
	const searchParams = new URLSearchParams(location.search);
	const searchJwt = searchParams.get('jwt');
	const localStorageJwt = localStorage?.getItem('GAME_JWT');

	system.jwt = searchJwt || localStorageJwt;
	if (system.jwt) {
		const { userId, matchId } = decodeJwt(system.jwt);
		system.userId = userId;
		system.matchId = matchId;
	}

	send(GameEventType.ConnectMatch);
};

export const sendBundles = (bundles: DuelCommandBundle[]): void => {
	// fix reading undefined bundle in `replay`
	bundles = bundles.filter(Boolean);
	send(GameEventType.SendBundle, bundles);

	/* optimistic simulate command success, will be overrides by server response */
	bundles.forEach((bundle) => {
		system.history.push(bundle);
	});

	replay();
};

export const sendCardSummon = (cardId: string, index: number): void => {
	const state = getCardState(system.duel.stateMap, cardId);
	const { commandBundles } = move.summonCard(lodash.cloneDeep(system.duel), {
		from: {
			owner: state.owner,
			id: state.id,
			place: DuelPlace.Hand,
		},
		to: {
			owner: state.owner,
			index,
			place: DuelPlace.Ground,
		},
	});

	sendBundles(commandBundles);
};

export const sendEndTurn = (): void => {
	sendBundles(move.endTurn(system.duel).commandBundles);
};

export const internalSendCardHover = (
	cardId: string,
	isMouseIn: boolean,
): void => {
	const state = getCardState(system.duel.stateMap, cardId);
	const hand = selectHand(system.duel, state.owner);
	const index = hand.indexOf(cardId);

	send(GameEventType.CardHover, { index, isMouseIn });
};

export const sendCardHover = lodash.throttle(internalSendCardHover, 200);

function decodeJwt(token: string): JwtPayload {
	const base64UrlPayload = token.split('.')[1];
	const base64 = base64UrlPayload.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(window.atob(base64));
	return JSON.parse(jsonPayload);
}
