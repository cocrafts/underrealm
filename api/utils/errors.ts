import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { StatusCodes } from 'http-status-codes';

export class SystemError extends GraphQLError {
	constructor(message: string) {
		super(message, {
			extensions: {
				http: { status: StatusCodes.SERVICE_UNAVAILABLE },
				code: ApolloServerErrorCode.BAD_REQUEST,
			},
		});
	}
}

export class ForbiddenError extends GraphQLError {
	constructor(message: string) {
		super(message, {
			extensions: {
				http: { status: StatusCodes.FORBIDDEN },
				code: ApolloServerErrorCode.BAD_REQUEST,
			},
		});
	}
}

export class UnauthorizedError extends GraphQLError {
	constructor(message: string) {
		super(message, {
			extensions: {
				http: { status: StatusCodes.UNAUTHORIZED },
				code: ApolloServerErrorCode.BAD_REQUEST,
			},
		});
	}
}

export class ClientError extends GraphQLError {
	constructor(message: string) {
		super(message, {
			extensions: {
				http: { status: StatusCodes.BAD_REQUEST },
				code: ApolloServerErrorCode.BAD_REQUEST,
			},
		});
	}
}
