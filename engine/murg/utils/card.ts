import Mustache from 'mustache';

import { combineAttribute, extractPassivePair } from './fight';
import { getFacingIdentifier } from './ground';
import type {
	Attribute,
	Card,
	CardIdentifier,
	CardState,
	DuelState,
	TemplateFragment,
	TemplateStyle,
} from './type';
import { ActivationType, FragmentType, InspireSource } from './type';

const colors: Record<string, string> = {
	black: 'black',
	green: 'green',
	blue: 'blue',
	red: 'red',
	magenta: 'magenta',
};

const keywordStyles: Record<string, TemplateStyle> = {
	Hero: {
		color: colors.blue,
		weight: '600',
	},
	Troop: {
		color: colors.blue,
		weight: '600',
	},
	Troops: {
		color: colors.blue,
		weight: '600',
	},
	Snake: {
		color: colors.blue,
		weight: '600',
	},
	Snakes: {
		color: colors.blue,
		weight: '600',
	},
	Wolf: {
		color: colors.blue,
		weight: '600',
	},
	Wolves: {
		color: colors.blue,
		weight: '600',
	},
	Charge: {
		color: colors.blue,
		weight: '600',
	},
	Shield: {
		color: colors.blue,
		weight: '600',
	},
	Illusion: {
		color: colors.blue,
		weight: '600',
	},
	Trap: {
		color: colors.blue,
		weight: '600',
	},
	Steal: {
		color: colors.magenta,
		weight: '600',
	},
	Lifesteal: {
		color: colors.magenta,
		weight: '600',
	},
	Froze: {
		color: colors.blue,
		weight: '600',
	},
	Seal: {
		color: colors.blue,
		weight: '600',
	},
};

const templateStyles: Record<string, TemplateStyle> = {
	Strong: {
		weight: '600',
	},
	Special: {
		color: colors.magenta,
		weight: '600',
	},
	Type: {
		color: colors.blue,
		weight: '600',
	},
	Buff: {
		color: colors.green,
		weight: '600',
	},
	Danger: {
		color: colors.red,
		weight: '600',
	},
};

const ActivationDisplays: Record<ActivationType, string> = {
	[ActivationType.Summon]: 'Summon',
	[ActivationType.Death]: 'Death',
	[ActivationType.Passive]: 'Passive',
	[ActivationType.Attack]: 'Attack',
	[ActivationType.Defense]: 'Defense',
	[ActivationType.Glory]: 'Glory',
	[ActivationType.PreFight]: 'Pre Fight',
	[ActivationType.PostFight]: 'Post Fight',
	[ActivationType.Charge]: 'Charge',
	[ActivationType.Inspire]: 'Inspire',
	[ActivationType.Banner]: 'Banner',
};

const InspireSourceDisplays: Record<InspireSource, string> = {
	[InspireSource.Metal]: 'Metal',
	[InspireSource.Wood]: 'Wood',
	[InspireSource.Water]: 'Water',
	[InspireSource.Fire]: 'Fire',
	[InspireSource.Earth]: 'Earth',
	[InspireSource.Dark]: 'Dark',
	[InspireSource.Light]: 'Light',
	[InspireSource.Summon]: 'Summon',
	[InspireSource.Death]: 'Death',
	[InspireSource.Spell]: 'Spell',
	[InspireSource.Skill]: 'Skill',
};

export const interpolateTemplate = (text: string) => {
	const template: TemplateFragment[] = [];
	let start = 0;
	let end = 0;

	while (end < text.length) {
		const bracketIndex = text.indexOf('[', end);

		if (bracketIndex >= 0) {
			end = text.indexOf(']', bracketIndex);
			const fragment = text.slice(bracketIndex + 1, end);
			const [key, format] = fragment.split(':');
			const keywordStyle = keywordStyles[key];
			const templateStyle = templateStyles[format];
			const style = keywordStyle || templateStyle || templateStyles.Strong;

			if (start < end) {
				template.push({
					text: text.slice(start, bracketIndex),
					type: FragmentType.TEXT,
				});
			}

			template.push({
				text: key,
				type: keywordStyle ? FragmentType.KEYWORD : FragmentType.TEXT,
				style,
			});

			start = end + 1;
			end = start;
		} else {
			end++;
		}
	}

	if (start < end) {
		template.push({
			text: text.substring(start, end),
			type: FragmentType.TEXT,
		});
	}

	return template;
};

export const interpolate = (card: Card): Card => {
	if (!card.skill) return card;

	const { charge, activation, template, attribute, passiveAttribute, inspire } =
		card.skill;
	const scope = attribute || passiveAttribute || {};
	const interpolated = Mustache.render(template as string, scope);
	const isInspire = activation === ActivationType.Inspire;
	const suffix = isInspire
		? ` ${InspireSourceDisplays[inspire]}`
		: charge
			? ` (${charge})`
			: '';
	const triggerFragment: TemplateFragment = {
		text:
			activation !== undefined
				? `${ActivationDisplays[activation]}${suffix}: `
				: '',
		type: FragmentType.TEXT,
	};

	card.skill.template = [triggerFragment, ...interpolateTemplate(interpolated)];

	return card;
};

export const troopId = '999990000';

export const getCard = (cardMap: Record<string, Card>, id: string) => {
	return cardMap[id?.substring(0, 9)];
};

export const getCardState = (
	stateMap: Record<string, CardState>,
	id: string,
) => {
	return stateMap[id];
};

export const getComputedAttribute = (
	duel: DuelState,
	id: string,
): Attribute => {
	const state = getCardState(duel.stateMap, id);
	const facing = getFacingIdentifier(duel, state?.owner, state?.id);
	const [passive] = extractPassivePair(duel, id, facing?.id);

	return combineAttribute(state, passive);
};

/* Impure that will mutate params, be careful! */
export const injectCardState = (
	partial: Partial<DuelState>,
	cardMap: Record<string, Card>,
	context: CardIdentifier,
): CardState => {
	const nextUniqueCount = partial.uniqueCardCount + 1;
	const { id, attribute, skill } = getCard(cardMap, context.id);
	const cardState: CardState = {
		id: `${id}#${nextUniqueCount}`,
		effectMap: {},
		owner: context.owner,
		place: context.place,
		attack: attribute.attack,
		health: attribute.health,
		defense: attribute.defense,
	};

	if (skill?.charge) cardState.charge = skill.charge;
	if (!partial.stateMap) partial.stateMap = {};

	partial.uniqueCardCount = nextUniqueCount;
	partial.stateMap[cardState.id] = cardState;

	return cardState;
};
