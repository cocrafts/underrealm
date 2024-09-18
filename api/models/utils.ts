import type { SchemaDefinition, SchemaDefinitionType, Types } from 'mongoose';
import { Schema } from 'mongoose';

type SchemaParams = ConstructorParameters<typeof Schema>;

type Definition<RawDocType> = SchemaDefinition<
	SchemaDefinitionType<RawDocType>,
	RawDocType
>;

type Options = SchemaParams[1];

/**
 * a wrapper for `new Schema()` with:
 * - virtual `id` from default `_id objectId` for GraphQL field compatibility
 * - auto `timestamps` on creating or updating
 */
export const createSchema = <RawDocType>(
	definition: Definition<RawDocType> | RawDocType,
	options?: Options,
) => {
	const defaultOptions: Options = {
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	};

	const mergedOption = { ...defaultOptions, ...options };

	const schema = new Schema(definition, mergedOption);

	schema.virtual('id').get(function () {
		return (this._id as Types.ObjectId).toHexString();
	});

	return schema;
};
