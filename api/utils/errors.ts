import { GraphQLError } from 'graphql';
import { StatusCodes } from 'http-status-codes';

export class ForbiddenError extends GraphQLError {
	constructor(message: string) {
		super(message, { extensions: { http: { status: StatusCodes.FORBIDDEN } } });
	}
}
