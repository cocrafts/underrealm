import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';
import lodash from 'lodash';

import { replay } from '../replay';
import { system } from '../util/system';
import type { CommandPayload } from '../util/types';
import { DuelCommands } from '../util/types';

import { connectionInstance } from './util';

const { getCardState, selectHand, move, DuelPlace } = Engine;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendCommand = (command: DuelCommands, payload?: any): void => {
	const data: CommandPayload = {
		jwt: system.jwt,
		client: 'cardGame',
		command,
	};

	if (data) data.payload = payload;
	connectionInstance.send(JSON.stringify(data));
};

export const sendConnect = (): void => {
	const searchParams = new URLSearchParams(location.search);
	const searchJwt = searchParams.get('jwt') as string;
	const localStorageJwt = localStorage?.getItem('murgJwt');

	system.jwt = searchJwt || localStorageJwt;
	sendCommand(DuelCommands.ConnectMatch);
};

export const sendBundles = (bundles: DuelCommandBundle[]): void => {
	sendCommand(DuelCommands.SendBundle, bundles);

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

	sendCommand(DuelCommands.CardHover, { index, isMouseIn });
};

export const sendCardHover = lodash.throttle(internalSendCardHover, 200);
