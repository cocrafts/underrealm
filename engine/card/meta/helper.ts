/* naming convention <--
 * 1. cardId/4: 0001 -> 9999
 * 2. rarities/1: common/1, magic/2, rare/3, unique/4, mystic/5, legendary/6
 * 3. elemental/1: metal/1, tree/2, water/3, fire/4, earth/5, dark/6, light/7
 * [cardId/4][rarity/1][elemental/1] */

import type { Card, CardConfig, GameMeta } from '../types';
import { CardType } from '../types';

export const metaFromConfig = (
	cardConfigs: CardConfig[],
	version: string,
): GameMeta => {
	const entities = [];
	const map = {};

	for (const cardConfig of cardConfigs) {
		if (cardConfig.type === CardType.Hero) {
			for (let i = 0; i < 1; i += 1) {
				const rarity = String(i).padStart(2, '0');
				const elemental = String(cardConfig.elemental || 0).padStart(2, '0');
				const cardId = `${cardConfig.id}${rarity}${elemental}`;

				entities.push(cardId);
				map[cardId] = {
					...cardConfig,
					id: cardId,
					attack: cardConfig.attack?.[0] || 0,
					defense: cardConfig.defense?.[0] || 0,
					health: cardConfig.health?.[0] || 0,
					cooldown: cardConfig.cooldown?.[0],
				} as Card;
			}
		} else {
			const cardId = `${cardConfig.id}0000`;

			entities.push(cardId);
			map[cardId] = {
				...cardConfig,
				id: cardId,
				attack: cardConfig.attack?.[0] || 0,
				defense: cardConfig.defense?.[0] || 0,
				health: cardConfig.health?.[0] || 0,
			};
		}
	}

	return {
		version,
		entities,
		map,
	};
};
