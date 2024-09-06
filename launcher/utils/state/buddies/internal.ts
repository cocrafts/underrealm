import type { Profile } from 'utils/types/graphql';
import { proxy } from 'valtio';

export interface BuddyState {
	list: Profile[];
	loading: boolean;
}

export const buddyState = proxy<BuddyState>({
	list: [],
	loading: true,
});
