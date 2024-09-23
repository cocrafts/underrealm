import { useMemo } from 'react';
import { useReferralHistoryQuery } from 'utils/graphql';

export const useReferral = () => {
	const { data, loading, error } = useReferralHistoryQuery();
	const { count, points } = useMemo(() => {
		const result = { count: 0, points: 0 };
		if (!loading && !error) {
			data.referralHistory.reduce((result, ref) => {
				result.count += 1;
				result.points += ref.claimedPoints;
				return result;
			}, result);
		}
		return result;
	}, [data?.referralHistory, loading, error]);

	return { data, loading, error, count, points };
};
