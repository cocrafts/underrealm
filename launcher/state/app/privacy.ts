import AsyncStorage from '@react-native-async-storage/async-storage';

import { appState } from './internal';

export const setPrivacy = async (flag: boolean): Promise<void> => {
	appState.privacy = flag;

	await AsyncStorage.setItem('privacy', flag ? 'true' : 'false');
};

AsyncStorage.getItem('privacy').then((storedPrivacy) => {
	if (storedPrivacy === 'true') {
		appState.privacy = true;
	}
});
