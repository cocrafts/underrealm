import type {
	Attribute,
	AttributeStackEffect,
	BoardTarget,
	CleaverAttackEffect,
	CommandSource,
	DuelCommand,
	DuelCommandBundle,
	DuelCommandPayload,
	DuelCommandTarget,
	DuelConfig,
	DuelSetting,
	Effect,
	ExplodeTimerEffect,
	IgnoreDefenseEffect,
	PlayerConfig,
	RebornEffect,
	RepeatAttackEffect,
	TargetOptions,
} from '@underrealm/murg';
import {
	BundleGroup,
	CleaverType,
	CommandSourceType,
	DuelCommandType,
	DuelPhases,
	DuelPlace,
	EffectIds,
} from '@underrealm/murg';
import { model, Schema } from 'mongoose';

import { createSchema } from './utils';

type IGameMatch = {
	config: DuelConfig;
	commandBundles: DuelCommandBundle[];
};

const PlayerConfigSchema = new Schema<PlayerConfig>({
	id: String,
	deck: [String],
});

const CommandSourceSchema = new Schema<CommandSource>({
	id: String,
	index: Number,
	owner: String,
	place: { type: String, enum: DuelPlace },
	type: { type: String, enum: CommandSourceType },
});

const BoardTargetSchema = new Schema<BoardTarget>({
	id: String,
	index: Number,
	owner: String,
	place: { type: String, enum: DuelPlace },
});

const TargetOptions = new Schema<TargetOptions>({
	attack: Number,
	health: Number,
	defense: Number,
	charge: Number,
});

const DuelCommandTargetSchema = new Schema<DuelCommandTarget>({
	source: CommandSourceSchema,
	from: BoardTargetSchema,
	to: BoardTargetSchema,
	options: TargetOptions,
});

const AttributeSchema = new Schema<Attribute>({
	attack: Number,
	health: Number,
	defense: Number,
	charge: Number,
});

const EffectSchema = new Schema<Effect>({
	id: { type: String, enum: EffectIds },
	life: Number,
	reborn: new Schema<RebornEffect>({ count: Number }),
	attributeStack: new Schema<AttributeStackEffect>({
		targetId: { type: String, enum: EffectIds, required: true },
		attribute: {
			type: AttributeSchema,
			required: true,
		},
	}),
	cleaverAttack: new Schema<CleaverAttackEffect>({
		type: { type: String, enum: CleaverType, required: true },
		radius: { type: Number, required: true },
		damage: Number,
		damageFactor: Number,
	}),
	repeatAttack: new Schema<RepeatAttackEffect>({
		count: { type: Number, required: true },
	}),
	ignoreDefense: new Schema<IgnoreDefenseEffect>({
		defense: { type: Number, required: true },
		defenseFactor: Number,
	}),
	explodeTimer: new Schema<ExplodeTimerEffect>({
		radius: { type: Number, required: true },
		damage: { type: Number, required: true },
	}),
	attribute: AttributeSchema,
});

const DuelCommandPayload = new Schema<DuelCommandPayload>({
	effectMap: { type: Map, of: EffectSchema },
	gameOver: Boolean,
	turn: Number,
	phase: { type: String, enum: DuelPhases },
	phaseOf: String,
	perTurnDraw: Number,
	perTurnHero: Number,
	perTurnSpell: Number,
	perTurnTroop: Number,
});

const DuelCommandSchema = new Schema<DuelCommand>({
	type: { type: String, enum: DuelCommandType },
	owner: String,
	target: DuelCommandTargetSchema,
	payload: new Schema({}),
	amount: Number,
});

const DuelCommandBundleSchema = new Schema<DuelCommandBundle>({
	turn: { type: Number, required: true },
	group: { type: String, enum: BundleGroup },
	phaseOf: String,
	phase: { type: String, enum: DuelPhases },
	commands: [DuelCommandSchema],
});

const GameMatchSchema = createSchema({
	config: new Schema({
		version: String,
		firstMove: String,
		firstPlayer: PlayerConfigSchema,
		secondPlayer: PlayerConfigSchema,
		setting: new Schema<DuelSetting>({
			initialCardCount: Number,
			initialPlayerHealth: Number,
			elementalFactor: Number,
			handSize: Number,
			groundSize: Number,
			maxAttachment: Number,
			spellIncreaseCycle: Number,
			perTurnDraw: Number,
			perTurnHero: Number,
			perTurnSpell: Number,
			perTurnTroop: Number,
		}),
	}),
	commandBundles: [DuelCommandBundleSchema],
});

export const GameMatch = model<IGameMatch>('GameMatch', GameMatchSchema);

type IMatchFinding = {
	userId: string;
	pubsubTopic: string;
};

const matchFindingSchema = createSchema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	pubsubTopic: {
		type: String,
		required: true,
		unique: true,
	},
});

export const MatchFinding = model<IMatchFinding>(
	'MatchFinding',
	matchFindingSchema,
);
