import Engine, {
	DuelCommandBundle,
	DuelConfig,
	DuelState,
	PlayerState,
} from '@metacraft/murg-engine';
import { AudioSource, Node } from 'cc';
import lodash from 'lodash';

import { JwtPayload, PlayerIds, ServerState } from '../util/types';

const { defaultSetting, DuelPhases, nanoId } = Engine;

type ProxyListener = (value: any, lastValue?: any) => void;

type DuelProxy = DuelState & {
	subscribe?: (
		key: string,
		listener: ProxyListener,
		initialEmmit?: boolean,
	) => () => void;
	getSubscriptionCount?: () => number;
};

export const makeDuelProxy = (duel: DuelProxy): DuelProxy => {
	const listenerMap: Record<string, Record<string, ProxyListener>> = {};

	duel.getSubscriptionCount = () => {
		return Object.keys(listenerMap).reduce((acc, key) => {
			return acc + Object.keys(listenerMap[key]).length;
		}, 0);
	};

	duel.subscribe = (key, listener, initialEmmit) => {
		const subscriptionId = nanoId();

		if (listenerMap[key]) {
			listenerMap[key][subscriptionId] = listener;
		} else {
			listenerMap[key] = {
				[subscriptionId]: listener,
			};
		}

		if (initialEmmit) {
			if (key.startsWith('state#')) {
				listener(duel.stateMap[key.substring(6)]);
			} else {
				listener(duel[key]);
			}
		}

		return () => {
			delete listenerMap[key][subscriptionId];
		};
	};

	duel.stateMap = new Proxy(duel.stateMap, {
		set: (target, key, value) => {
			if (lodash.isEqual(target[key as string], value)) return true;
			const registeredGroup = listenerMap[`state#${key as string}`];

			if (registeredGroup) {
				Object.keys(registeredGroup).forEach((subscriptionId) => {
					registeredGroup[subscriptionId]?.(value, target[key as string]);
				});
			}

			target[key as string] = value;

			return true;
		},
	});

	return new Proxy(duel, {
		set: (target, key, value) => {
			if (lodash.isEqual(target[key as string], value)) return true;
			const registeredGroup = listenerMap[key as string];

			if (registeredGroup) {
				Object.keys(registeredGroup).forEach((subscriptionId) => {
					registeredGroup[subscriptionId]?.(value, target[key as string]);
				});
			}

			target[key as string] = value;

			return true;
		},
	});
};

export interface System {
	jwt?: string;
	isSocketReady: boolean;
	winner?: string;
	playerIds: PlayerIds;
	serverState?: ServerState;
	duel?: DuelProxy;
	predict?: DuelState;
	context?: JwtPayload;
	config?: DuelConfig;
	history?: DuelCommandBundle[];
	historyLevel: number;
	globalNodes: {
		duel?: Node;
		board?: Node;
		fog?: Node;
		turnRibbon?: Node;
		duelRibbon?: Node;
		cardTemplate?: Node;
		cardPreview?: Node;
		unitPreview?: Node;
		unitTemplate?: Node;
		playerDeck?: Node;
		enemyDeck?: Node;
		centerExpo?: Node /* <- reference position for Exposing cards */;
		leftExpo?: Node;
		rightExpo?: Node;
		playerHand?: Node;
		enemyHand?: Node;
		playerGround?: Node;
		enemyGround?: Node;
		playerHandGuide?: Node;
		playerGroundGuide?: Node;
		enemyHandGuide?: Node;
		enemyGroundGuide?: Node;
		summonZoneGuide?: Node;
		playerHealth?: Node;
		playerHealthPredict?: Node;
		enemyHealth?: Node;
		enemyHealthPredict?: Node;
	};
	audioSource?: AudioSource;
	cardRefs: Record<string, Node>;
	isCommandAble: boolean;
	previewing: boolean;
	dragging: boolean;
	activeCard?: Node;
}

const defaultPlayer: PlayerState = {
	id: 'default',
	health: defaultSetting.initialPlayerHealth,
	attack: 0,
	defense: 0,
	perTurnHero: defaultSetting.perTurnHero,
	perTurnTroop: defaultSetting.perTurnTroop,
	perTurnDraw: defaultSetting.perTurnDraw,
	perTurnSpell: defaultSetting.perTurnSpell,
};

const defaultDuel = {
	cardMap: {},
	stateMap: {},
	turn: 0,
	phase: DuelPhases.Draw,
	phaseOf: '',
	uniqueCardCount: 0,
	setting: defaultSetting,
	firstMover: '',
	firstPlayer: defaultPlayer,
	secondPlayer: defaultPlayer,
	firstDeck: [],
	secondDeck: [],
	firstHand: [],
	secondHand: [],
	firstGround: [],
	secondGround: [],
	firstGrave: [],
	secondGrave: [],
};

export const system: System = {
	playerIds: {
		me: '',
		enemy: '',
	},
	duel: makeDuelProxy(defaultDuel),
	predict: defaultDuel,
	isSocketReady: false,
	serverState: {},
	isCommandAble: false,
	cardRefs: {},
	globalNodes: {},
	history: [],
	historyLevel: 0,
	previewing: false,
	dragging: false,
};

globalThis.system = system;
