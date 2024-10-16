import { useEffect } from 'react';

import packageJSON from '../../package.json';

import { useRemoteConfig } from './remoteConfig';

export const useLatestVersion = () => {
	const { latestVersion } = useRemoteConfig();

	useEffect(() => {
		if (latestVersion === '0.0.1') return;
		console.log('Remote latest version', latestVersion);
		const version = packageJSON.version;
		if (!isLatestVersion(version, latestVersion)) {
			console.log('Reload to latest with resetting cache', latestVersion);
			window.location.href = window.location.pathname + `?v=${latestVersion}`;
		}
	}, [latestVersion]);
};

function isLatestVersion(current: string, latest: string) {
	const currentParts = current.split('.').map(Number);
	const latestParts = latest.split('.').map(Number);

	const length = Math.max(currentParts.length, latestParts.length);

	for (let i = 0; i < length; i++) {
		const currentPart = currentParts[i] || 0;
		const latestPart = latestParts[i] || 0;

		if (currentPart > latestPart) {
			return true;
		}
		if (currentPart < latestPart) {
			return false;
		}
	}

	return true;
}
