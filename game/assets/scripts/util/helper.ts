import Engine, {
	DuelConfig,
	DuelState,
	TemplateFragment,
} from '@metacraft/murg-engine';
import { Color, Node, Vec2, Vec3 } from 'cc';

import { CardManager } from '../CardManager';

import { system } from './system';
import { PlayerIds } from './types';

const { ElementalType, ClassType, selectHand, selectGround } = Engine;

export const extractPlayerIds = (duel: DuelConfig, myId: string): PlayerIds => {
	if (myId === duel.firstPlayer.id) {
		return {
			me: duel.firstPlayer.id,
			enemy: duel.secondPlayer.id,
		};
	} else {
		return {
			me: duel.secondPlayer.id,
			enemy: duel.firstPlayer.id,
		};
	}
};

export const cardIdFromNode = (node: Node): string => {
	return node.getComponent(CardManager)?.cardId;
};

export const delay = (milliSeconds = 0): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, milliSeconds);
	});
};

export const getVisualUri = (cardId: string): string => {
	return `graphic/visuals/${cardId.substring(0, 5)}/spriteFrame`;
};

export const getFoilUri = (cardId: string, suffix = ''): string => {
	const elemental = cardId.substring(7, 9);

	switch (elemental) {
		case ElementalType.Metal:
			return `graphic/cards/foil-metal${suffix}/spriteFrame`;
		case ElementalType.Wood:
			return `graphic/cards/foil-wood${suffix}/spriteFrame`;
		case ElementalType.Water:
			return `graphic/cards/foil-water${suffix}/spriteFrame`;
		case ElementalType.Fire:
			return `graphic/cards/foil-fire${suffix}/spriteFrame`;
		case ElementalType.Earth:
			return `graphic/cards/foil-earth${suffix}/spriteFrame`;
		case ElementalType.Dark:
			return `graphic/cards/foil-dark${suffix}/spriteFrame`;
		case ElementalType.Light:
			return `graphic/cards/foil-light${suffix}/spriteFrame`;
		default:
			return `graphic/cards/foil-metal${suffix}/spriteFrame`;
	}
};

export const getClassUri = (classId: string): string => {
	switch (classId) {
		case ClassType.Knight:
			return `graphic/cards/class-tank/spriteFrame`;
		case ClassType.Wizard:
			return `graphic/cards/class-wizard/spriteFrame`;
		case ClassType.Assassin:
			return `graphic/cards/class-assassin/spriteFrame`;
		case ClassType.Summoner:
			return `graphic/cards/class-summoner/spriteFrame`;
		default:
			return `graphic/cards/class-tank/spriteFrame`;
	}
};

type SkillColors = 'black' | 'green' | 'blue' | 'red' | 'magenta';

const colorMap: Record<SkillColors, string> = {
	black: '#000000',
	green: '#066922',
	blue: '#1055BC',
	red: '#AA1D21',
	magenta: '#6e13a4',
};

export const getSkillDesc = (fragments: TemplateFragment[]): string => {
	const inner = fragments
		.map((fragment) => {
			if (fragment.style) {
				const color = colorMap[fragment.style.color] || '#111111';
				return `<color=${color}>${fragment.text}</color>`;
			}

			return fragment.text;
		})
		.join('');

	return `<color=#222222>${inner}</color>`;
};

export const setCursor = (cursor: string): void => {
	const canvas = document?.getElementById?.('GameCanvas');
	if (!canvas) return;
	canvas.style.cursor = cursor;
};

export const designScreenSize = new Vec2(1280, 720);

export const extractMouseLocation = ({ x, y }: Vec2): Vec3 => {
	return new Vec3(x - designScreenSize.x / 2, y - designScreenSize.y / 2, 0);
};

export const getGroundSize = (): number => {
	return system.duel.setting?.groundSize;
};

export const selectDeckNode = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerDeck
		: system.globalNodes.enemyDeck;
};

export const selectGroundNode = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerGround
		: system.globalNodes.enemyGround;
};

export const selectGroundGuide = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerGroundGuide
		: system.globalNodes.enemyGroundGuide;
};

export const selectHandNode = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerHand
		: system.globalNodes.enemyHand;
};

export const selectHandGuide = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerHandGuide
		: system.globalNodes.enemyHandGuide;
};

export const getHandSize = (owner: string): number => {
	return selectHand(system.duel, owner)?.length;
};

export const getMyHandSize = (): number => {
	return getHandSize(system.playerIds.me);
};

export const getMyGround = (): string[] => {
	return selectGround(system.duel, system.playerIds.me);
};

const positiveColor = Color.fromHEX(new Color(), '#1aab1a');
const negativeColor = Color.fromHEX(new Color(), '#FF0000');

export const getPositiveColor = (value: number, origin = 0): Color => {
	if (value > origin) {
		return positiveColor;
	} else if (value < origin) {
		return negativeColor;
	}

	return Color.fromHEX(new Color(), '#FFFFFF');
};

export const getInjectedCardId = (duel: DuelState, id: string): string => {
	if (id.indexOf('#') >= 0) return id;

	return `${id}#${duel.uniqueCardCount}`;
};
