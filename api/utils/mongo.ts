import type { RootFilterQuery } from 'mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

export const getOrCreate = async <T>(
	collection: Model<T>,
	filter: RootFilterQuery<T>,
	_default: Partial<T>,
): Promise<T> => {
	let item = await collection.findOne(filter);
	if (!item) {
		item = await collection.create({ ..._default });
	}
	return item;
};

export const toHex = (str: string): Types.ObjectId => {
	return Types.ObjectId.createFromHexString(str);
};

export const isObjectId = (id): id is Types.ObjectId => {
	return Types.ObjectId.isValid(id) && !(id instanceof Model);
};
