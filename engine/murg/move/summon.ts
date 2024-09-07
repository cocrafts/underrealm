import { createCommand } from '../command';
import { getCard } from '../utils/card';
import { selectPlayer } from '../utils/helper';
import {
	createAndMergeBundle,
	createCommandBundle,
	emptyMoveResult,
	runAndMergeHooks,
} from '../utils/state';
import type {
	DuelCommandBundle,
	DuelCommandTarget,
	DuelState,
	MoveResult,
} from '../utils/type';
import {
	BundleGroup,
	CardType,
	CommandSourceType,
	DuelPlace,
} from '../utils/type';

export const summonCard = (
	duel: DuelState,
	target: DuelCommandTarget,
): MoveResult => {
	const commandBundles: DuelCommandBundle[] = [];
	const cardId = target.from.id;
	const fromOwner = target.from.owner;
	const player = selectPlayer(duel, fromOwner);
	const card = getCard(duel.cardMap, cardId);
	const isOwnerInvalid = fromOwner !== duel.phaseOf;
	const isHeroCard = card.kind === CardType.Hero;
	const isSpellCard = card.kind === CardType.Spell; /* <-- no spell-card yet */
	const isHeroInvalid = isHeroCard && player.perTurnHero <= 0;

	if (isOwnerInvalid || isHeroInvalid || isSpellCard) {
		const errorMessage = getErrorMessage(
			isOwnerInvalid,
			isHeroInvalid,
			isSpellCard,
		);

		console.log(errorMessage);
		return emptyMoveResult;
	}

	const summonBundle = createAndMergeBundle(
		duel,
		BundleGroup.Summon,
		createCommand.cardMove({ owner: fromOwner, target }),
	);
	commandBundles.push(summonBundle);

	const hookBundle = createCommandBundle(duel, BundleGroup.SkillActivation);
	runAndMergeHooks(duel, hookBundle, summonBundle.commands);
	if (hookBundle.commands.length > 0) commandBundles.push(hookBundle);

	commandBundles.push(
		createAndMergeBundle(
			duel,
			BundleGroup.PlayerUpdate,
			createCommand.playerMutate({
				target: {
					source: {
						type: CommandSourceType.SummonMove,
						owner: fromOwner,
					},
					to: {
						owner: fromOwner,
						place: DuelPlace.Player,
					},
				},
				payload: {
					perTurnHero: player.perTurnHero - (isHeroCard ? 1 : 0),
					perTurnSpell: player.perTurnSpell - (isSpellCard ? 1 : 0),
				},
			}),
		),
	);

	return {
		duel,
		commandBundles,
	};
};

const getErrorMessage = (
	ownerInvalid: boolean,
	heroInvalid: boolean,
	spellInvalid: boolean,
) => {
	if (ownerInvalid) return 'Invalid owner';
	if (heroInvalid) return 'Out of Hero summon slot';
	if (spellInvalid) return 'Out of Spell slot';
};
