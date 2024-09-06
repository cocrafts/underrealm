import type { FC } from 'react';
import type { ScaledSize, ViewStyle } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import PlayEverywhere from './PlayEverywhere';
import StayConnected from './StayConnected';

interface Props {
	dimension: ScaledSize;
	responsiveLevel: number;
}

const SocialNetworkSection: FC<Props> = ({ dimension, responsiveLevel }) => {
	const width = Math.min(dimension.width, iStyles.wideContainer.maxWidth);
	const middleBackgroundWidth = [750, 600, 500, 300][responsiveLevel];

	const backgroundContainer = {
		width,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
	} as ViewStyle;

	return (
		<ImageBackground
			source={resources.home.socialNetworkBackground}
			style={[iStyles.wideContainer, backgroundContainer]}
		>
			<PlayEverywhere />
			<Image
				source={resources.home.socialNetworkMiddleBackground}
				style={{
					width: middleBackgroundWidth,
					height: (middleBackgroundWidth * 458) / 768,
				}}
			/>
			<StayConnected />
		</ImageBackground>
	);
};

export default SocialNetworkSection;
