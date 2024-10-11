import { model, Types } from 'mongoose';

import { createSchema } from './utils';

export enum StakingPackage {
	U_10 = 'U_10',
	U_50 = 'U_50',
	U_100 = 'U_100',
}

export enum StakingStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
}

export type StakingParticipant = {
	userId: string;
	pointsStaked: number;
};

export interface IStaking {
	id: string;
	duelId: string;
	package: StakingPackage;
	participants: StakingParticipant[];
	winnerId?: string;
	status: StakingStatus;
}

const StakingParticipantSchema = createSchema({
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	pointsStaked: {
		type: Number,
		required: true,
	},
});

const StakingSchema = createSchema({
	duelId: {
		type: Types.ObjectId,
		ref: 'GameDuel',
		required: true,
		unique: true,
	},
	package: {
		type: String,
		enum: Object.values(StakingPackage),
		required: true,
	},
	participants: {
		type: [StakingParticipantSchema],
		required: true,
		validate: [
			{
				validator: (participants: StakingParticipant[]) =>
					participants.length === 2,
				message: 'Staking must have exactly two participants',
			},
		],
	},
	winnerId: {
		type: Types.ObjectId,
		ref: 'User',
	},
	status: {
		type: String,
		enum: Object.values(StakingStatus),
		default: StakingStatus.PENDING,
	},
});

export const Staking = model<IStaking>('Staking', StakingSchema);
