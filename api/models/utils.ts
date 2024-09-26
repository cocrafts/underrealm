import type { SchemaDefinition, Types } from 'mongoose';
import { Schema } from 'mongoose';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const virtualId = (obj: any) => {
	if (!obj) return null;
	return { id: obj._id, ...obj };
};
