import { useEffect } from 'react';
import { fetchAndActivate, getString } from 'firebase/remote-config';
import { remoteConfig } from 'utils/firebase';
import { proxy, useSnapshot } from 'valtio';

type RemoteConfig = {
	latestVersion: string;
};

const defaultConfig: RemoteConfig = {
	latestVersion: '0.0.1',
};

remoteConfig.defaultConfig = defaultConfig;
remoteConfig.settings.minimumFetchIntervalMillis = __DEV__ ? 100000 : 3600000;

const remoteConfigState = proxy<RemoteConfig>(defaultConfig);

export const useRemoteConfig = () => {
	const config = useSnapshot(remoteConfigState);

	useEffect(() => {
		syncRemoteConfig();
	}, []);

	return config;
};

const syncRemoteConfig = async () => {
	try {
		await fetchAndActivate(remoteConfig);
		remoteConfigState.latestVersion = getString(remoteConfig, 'latestVersion');
	} catch (error) {
		console.error('Remote Config fetch failed:', error);
	}
};
