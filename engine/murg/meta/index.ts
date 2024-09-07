import type { Card, CardMeta, ElementalType } from '../utils/type';
import { CardType } from '../utils/type';

import ver00001 from './db/00001';

const metaHash: Record<string, Card[]> = { ver00001 };

export const makeMeta = (version = '00001'): CardMeta => {
	const cards = metaHash[`ver${version}`] || ver00001;
	const entities = [];
	const map = {};

	for (const card of cards) {
		if (card.kind === CardType.Hero) {
			for (let rarityId = 0; rarityId < 1; rarityId += 1) {
				for (let elementalId = 1; elementalId < 8; elementalId += 1) {
					const padRarityId = String(rarityId).padStart(2, '0');
					const padElementalId = String(elementalId).padStart(2, '0');
					const sku = `${card.id}${padRarityId}${padElementalId}`;
					const generatedCard: Card = {
						...card,
						id: sku,
						rarity: rarityId,
						elemental: padElementalId as ElementalType,
					};

					entities.push(sku);
					map[sku] = generatedCard;
				}
			}
		} else if (card.kind === CardType.Troop) {
			entities.push(card.id);
			map[card.id] = card;
		}
	}

	return { version, entities, map };
};

const galleryTypes = [CardType.Hero, CardType.Spell];

export const getCardList = (version = '00001'): Card[] => {
	const originalCards = metaHash[`ver${version}`] || ver00001;
	const generatedCards: Card[] = [];

	for (const card of originalCards) {
		if (galleryTypes.indexOf(card.kind) >= 0) {
			for (let elementalId = 1; elementalId < 8; elementalId += 1) {
				const padElementalId = String(elementalId).padStart(2, '0');
				const sku = `${card.id}00${padElementalId}`;
				const generatedCard: Card = {
					...card,
					id: sku,
					rarity: 0,
					elemental: padElementalId as ElementalType,
				};

				generatedCards.push(generatedCard);
			}
		}
	}

	return generatedCards;
};
