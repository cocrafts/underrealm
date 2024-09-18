import type { Types } from 'mongoose';
import { Schema } from 'mongoose';

/**
 * a wrapper for `new Schema()` with:
 * - virtual `id` from default `_id objectId` for GraphQL field compatibility
 * - auto `timestamps` on creating or updating
 */
export const createSchema = <Definition extends {}, Options>(
	definition: Definition,
	options?: Options,
) => {
	const schema = new Schema(definition, {
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
