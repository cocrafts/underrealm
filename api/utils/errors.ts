import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { StatusCodes } from 'http-status-codes';

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

class NoErrorThrownError extends Error {}

// ref: https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md
export const getError = async <TError = Error>(
	call: () => unknown,
): Promise<TError> => {
	try {
		await call();
		throw new NoErrorThrownError();
	} catch (error: unknown) {
		return error as TError;
	}
};
