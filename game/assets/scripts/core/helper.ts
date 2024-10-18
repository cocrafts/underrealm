import type { ComponentMap } from './components';
import { ActivationType, CardPlace, ComponentType } from './components';
import type { ECS, Entity } from './ecs';

export const selectDeck = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Deck })
		.and(ComponentType.CardOwnership, { owner: playerId })
		.exec();
};

export const selectHand = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Hand })
		.and(ComponentType.CardOwnership, { owner: playerId })
		.exec();
};

export const cloneEntity = (
	ecs: ECS<ComponentMap>,
	entity: Entity<ComponentMap>,
) => {
	const newCard = ecs.createEntity();
	Object.keys(entity).forEach((key: keyof ComponentMap) => {
		newCard.addComponent(key, entity.getComponent(key));
	});
	return newCard;
};

export const selectFacingCard = (
	ecs: ECS<ComponentMap>,
	card: Entity<ComponentMap>,
) => {
	if (card.getComponent(ComponentType.CardPlace).place !== CardPlace.Ground)
		return;

	const cards = ecs
		.query(ComponentType.CardPlace, {
			place: CardPlace.Ground,
			index: card.getComponent(ComponentType.CardPlace).index,
		})
		.exec();
	const [facingCard] = cards.filter(
		(c) =>
			c.getComponent(ComponentType.CardOwnership).owner !=
			card.getComponent(ComponentType.CardOwnership).owner,
	);

	return facingCard;
};

export const handleCardFightPlayer = (
	ecs: ECS<ComponentMap>,
	card: Entity<ComponentMap>,
) => {
	const { attack } = sumAttribute(card);
	const cardOwner = card.getComponent(ComponentType.CardOwnership).owner;

	const players = ecs.query(ComponentType.PlayerAttribute).exec();
	const [playerEnemy] = players.filter(
		(player) =>
			player.getComponent(ComponentType.PlayerAttribute).id !== cardOwner,
	);
	playerEnemy.getComponent(ComponentType.PlayerAttribute).health -= attack;

	const checkGlory = Object.keys(card.components).indexOf(
		ComponentType.GloryActivation,
	);
	if (checkGlory === -1) return;

	card.addComponent(ComponentType.SkillActivating, {
		activationType: ActivationType.Glory,
	});
};

export const handleCardFight = ([attackCard, defenseCard]: Array<
	Entity<ComponentMap>
>) => {
	const { attack: snapshotAttack } = sumAttribute(attackCard);

	const { defense: snapshotDefense, health: snapshotHealth } =
		sumAttribute(defenseCard);

	const defenseFightAttribute = defenseCard.getComponent(
		ComponentType.CardFightAttribute,
	);

	defenseFightAttribute.health =
		snapshotHealth - (snapshotAttack - snapshotDefense);
};

export const sumAttribute = (card: Entity<ComponentMap>) => {
	return [
		ComponentType.CardFightAttribute,
		ComponentType.CardBuffAttribute,
		ComponentType.CardDebuffAttribute,
	].reduce(
		(
			attribute,
			key:
				| ComponentType.CardFightAttribute
				| ComponentType.CardBuffAttribute
				| ComponentType.CardDebuffAttribute,
		) => {
			attribute.attack += card.getComponent<
				| ComponentType.CardFightAttribute
				| ComponentType.CardBuffAttribute
				| ComponentType.CardDebuffAttribute
			>(key).attack;

			attribute.defense += card.getComponent<
				| ComponentType.CardFightAttribute
				| ComponentType.CardBuffAttribute
				| ComponentType.CardDebuffAttribute
			>(key).defense;

			attribute.health += card.getComponent<
				| ComponentType.CardFightAttribute
				| ComponentType.CardBuffAttribute
				| ComponentType.CardDebuffAttribute
			>(key).health;

			return attribute;
		},
		{ attack: 0, defense: 0, health: 0 },
	);
};
