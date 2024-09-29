import type { Model, RootFilterQuery } from 'mongoose';

export const GetSert = async <T>(
	collection: Model<T>,
	filter: RootFilterQuery<T>,
	_default: Partial<T>,
): Promise<T> => {
	let item = await collection.findOne(filter);
	if (item == undefined) {
		item = await collection.create({ ..._default });
	}
	return item;
};
