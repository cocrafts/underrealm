const localStorageKey = 'REFERRAL_CODE';

export const extractReferralFromUrl = () => {
	const params = new URL(window.location.toString()).searchParams;
	const referralCode = params.get('ref');
	if (!referralCode || referralCode === 'null') return;
	window.localStorage.setItem(localStorageKey, referralCode);
};

export const getReferralCode = () => {
	const referralCode = window.localStorage.getItem(localStorageKey);
	if (referralCode === 'null') return;
	return referralCode;
};

export const removeReferralCode = () => {
	window.localStorage.removeItem(localStorageKey);
};
