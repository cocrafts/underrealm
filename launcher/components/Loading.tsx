import type { FC } from 'react';
import type { ActivityIndicatorProps } from 'react-native';
import { ActivityIndicator } from 'react-native';

export const Loading: FC<ActivityIndicatorProps> = (props) => {
	return <ActivityIndicator color={'#FFF9A0'} {...props} />;
};

export default Loading;
