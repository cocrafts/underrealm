import { Types } from 'mongoose';

export * from './mongo';

export const mockId = () => {
	const id = new Types.ObjectId();
	return id.toHexString();
};
