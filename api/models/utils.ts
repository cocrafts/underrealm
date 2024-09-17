import type { SchemaDefinition, SchemaDefinitionType, Types } from 'mongoose';
import { Schema } from 'mongoose';

type SchemaParams = ConstructorParameters<typeof Schema>;

type Definition<RawDocType> = SchemaDefinition<
	SchemaDefinitionType<RawDocType>,
	RawDocType
>;

export const createSchema = <RawDocType>(
	definition: Definition<RawDocType> | RawDocType,
	options?: SchemaParams[1],
) => {
	const defaultOptions = {
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	};

	const mergedOption = { ...options, ...defaultOptions };

	const schema = new Schema(definition, mergedOption);

	schema.virtual('id').get(function () {
		return (this._id as Types.ObjectId).toHexString();
	});

	return schema;
};
