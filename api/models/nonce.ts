import type { ObjectId } from 'mongoose';
import { model, Types } from 'mongoose';

import type { IUser } from './user';
import { createSchema } from './utils';

export type IRequestNonce = {
	id: string;
	userId: ObjectId;
	createdAt: Date;
};

const RequestNonceSchema = createSchema({
	userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const RequestNonce = model<IRequestNonce>('Nonce', RequestNonceSchema);

export const generateRequestNonce = async (user: IUser) => {
	const nonce = await RequestNonce.create({
		userId: user.id,
	});
	return nonce.id;
};

export const checkRequestNonce = async (
	user: IUser,
	nonce: string,
): Promise<Boolean> => {
	const result = await RequestNonce.findOneAndDelete({
		_id: new Types.ObjectId(nonce),
		userId: new Types.ObjectId(user.id),
	});
	return result != undefined;
};
