import { accountState } from './account';

export const stateActions = {
	clearAll: (): void => {
		accountState.profile = {} as never;
	},
};
