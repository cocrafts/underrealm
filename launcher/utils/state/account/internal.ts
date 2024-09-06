import type { Profile } from 'utils/types/graphql';
import { proxy } from 'valtio';

export interface AccountState {
	profile: Profile;
	loading: boolean;
	forceConnect: boolean;
}

export const accountState = proxy<AccountState>({
	profile: {} as never,
	loading: true,
	forceConnect: false,
});
