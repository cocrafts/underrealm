import { useEffect } from 'react';
import type { BuddyState } from 'utils/state/buddies';
import { buddyActions, buddyState } from 'utils/state/buddies';
import { useSnapshot } from 'valtio';

export const useBuddies = (deps = []): BuddyState => {
	const snapshot = useSnapshot<BuddyState>(buddyState);

	useEffect(() => {
		if (snapshot.list.length === 0) {
			buddyActions.fetchBuddies();
		}
	}, deps);

	return snapshot as BuddyState;
};
