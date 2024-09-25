import type { DuelCommandBundle, DuelConfig } from '@underrealm/murg';
import { model } from 'mongoose';

import { createSchema } from './utils';

type IGameMatch = {
	config: DuelConfig;
	commandBundles: DuelCommandBundle[];
};

const gameMatchSchema = createSchema({});

export const GameMatch = model<IGameMatch>('GameMatch', gameMatchSchema);

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
