import type { Profile } from 'utils/graphql';
import { useProfileQuery } from 'utils/graphql';

export const useProfile = () => {
	const { data, ...values } = useProfileQuery();
	const profile = data?.profile || ({} as Profile);

	return { profile, ...values };
};
