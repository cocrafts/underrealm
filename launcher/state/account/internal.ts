import { proxy } from 'valtio';

export interface AccountState {
	forceConnect: boolean;
}

export const accountState = proxy<AccountState>({
	forceConnect: false,
});
