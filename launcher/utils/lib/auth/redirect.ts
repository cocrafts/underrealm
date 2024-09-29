const pendingRedirectKey = 'PENDING_REDIRECT';

export const setPendingRedirect = () => {
	const redirectPath = window.location.pathname;
	console.log('Set pending redirect', redirectPath);
	localStorage.setItem(pendingRedirectKey, window.location.pathname);
};

export const getPendingRedirect = () => {
	const redirectPath = localStorage.getItem(pendingRedirectKey);
	localStorage.removeItem(pendingRedirectKey);

	return redirectPath;
};
