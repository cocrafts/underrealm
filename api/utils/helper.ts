import { ForbiddenError } from './errors';
import type { UserProfile } from './internal';

export const requireAuthentication = (
	user: UserProfile,
	errorMessage = 'This action for authenticated user only!',
) => {
	if (!user?.id) {
		throw new ForbiddenError(errorMessage);
	}
};

export const requireOwner = (user: UserProfile, targetId: string) => {
	const profilePk = `profile#${user.id}`;

	if (!user?.id) {
		throw new ForbiddenError('This action for authenticated user only!');
	}

	if (!targetId) {
		throw new ForbiddenError('Target not found!');
	}

	if (profilePk !== targetId) {
		throw new ForbiddenError('Not owner of the object');
	}
};

export const requireConditions = (
	conditions: [isValid: boolean, reason?: string][],
) => {
	for (let i = 0; i < conditions.length; i++) {
		const [isValid, reason] = conditions[i];

		if (!isValid) {
			throw new ForbiddenError(reason || 'Not authorized!');
		}
	}
};
