import { useEffect, useMemo } from 'react';
import { modalActions } from '@metacraft/ui';
import ReferralModal, { REFERRAL_MODAL_ID } from 'components/modals/Referral';
import { useProfileQuery, useReferralHistoryQuery } from 'utils/graphql';

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

export const useRequireReferral = () => {
	const { data } = useProfileQuery();
	const profile = data?.profile;

	useEffect(() => {
		if (profile?.id && !profile?.referred?.id) {
			modalActions.show({
				id: REFERRAL_MODAL_ID,
				component: ReferralModal,
				withoutMask: true,
			});
		}
	}, [profile]);
};
