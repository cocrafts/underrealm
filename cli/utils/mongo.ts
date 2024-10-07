import type { SchemaDefinition, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import { MONGO_URI } from './loadEnv';

export const connectToMongoDB = async () => {
	if (!MONGO_URI) {
		const msg = 'MONGO_URI is not set';
		console.error(msg);
		throw Error(msg);
	}

	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connect to MongoDB successfully');
	} catch (err) {
		console.error('failed to connect MongoDB');
		throw Error(err);
	}
};

export const disconnectToMongoDB = async () => {
	try {
		await mongoose.disconnect();
		console.log('Disconnect to MongoDB successfully');
	} catch (err) {
		throw Error(err);
	}
};

/**
 * a wrapper for `new Schema()` with:
 * - virtual `id` from default `_id objectId` for GraphQL field compatibility
 * - auto `timestamps` on creating or updating
 */
export const createSchema = <Definition extends SchemaDefinition, Options>(
	definition: Definition,
	options?: Options,
) => {
	const schema = new Schema(definition, {
		id: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
		...options,
	});

	schema.virtual('id').get(function () {
		return (this._id as Types.ObjectId).toHexString();
	});

	return schema;
};
