import type { FC } from 'react';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import { banner } from 'screens/Story/content';
import { useSnapshot } from 'utils/hook';

import { sharedStyle } from '../shared';

import ButtonBanner from './ButtonBanner';

const Banner: FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const [selectedBanner, setSelectedBanner] = useState<number>(0);
	const bannerWidth = [503, 503, 350, 250][responsiveLevel];
	const bannerPadding = [60, 60, 40, 40][responsiveLevel];

	const renderButtonList = () => {
		return (
			<>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{banner.map((item, index) => {
						const onPress = () => {
							setSelectedBanner(index);
						};

						const isActive = index === selectedBanner;

						return (
							<ButtonBanner
								key={item.label}
								isActive={isActive}
								onPress={onPress}
								label={item.label}
								activeIcon={item.activeIcon}
								icon={item.icon}
							/>
						);
					})}
				</ScrollView>
			</>
		);
	};

	return (
		<View style={{ marginHorizontal: 15 }}>
			<View style={styles.indicatorLine} />
			{renderButtonList()}
			<View style={[styles.contentContainer, { padding: bannerPadding }]}>
				<Image
					source={banner[selectedBanner].image}
					style={[styles.bannerImage, { width: bannerWidth }]}
					resizeMode="contain"
				/>
				<Text
					responsiveSizes={[35]}
					style={[sharedStyle.heading, styles.bannerTitle]}
				>
					{banner[selectedBanner].title}
				</Text>
				<Text style={sharedStyle.subContent}>
					{banner[selectedBanner].description}
				</Text>
			</View>
		</View>
	);
};

export default Banner;

const styles = StyleSheet.create({
	contentContainer: {
		borderWidth: 1,
		borderColor: '#423c36',
		borderTopWidth: 0,
		marginTop: -8.5,
		alignItems: 'center',
		alignSelf: 'center',
	},
	indicatorLine: {
		width: '100%',
		backgroundColor: '#423c36',
		height: 1,
		position: 'absolute',
		top: 96.5,
	},
	bannerImage: {
		aspectRatio: 503 / 712,
		marginBottom: 60,
	},
	bannerTitle: {
		marginBottom: 20,
	},
});
