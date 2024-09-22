import type { SchemaDefinition } from 'mongoose';
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

	return schema;
};
