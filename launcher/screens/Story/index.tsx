import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import Banner from 'screens/Story/Banner';
import Header from 'screens/Story/Header';
import { sharedStyle } from 'screens/Story/shared';
import { useSnapshot } from 'utils/hooks';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const backgroundRatio = 1728 / 3516;
const Story: FC = () => {
	const { responsiveLevel, windowSize } =
		useSnapshot<DimensionState>(dimensionState);

	const width = Math.max(1728, windowSize.width);

	const viewWidth = ['60%', '100%', '100%', '100%'][responsiveLevel];

	return (
		<View style={[styles.container, iStyles.wideContainer]}>
			<ScrollLayout>
				<View style={styles.scrollContent}>
					<Image
						source={resources.story.mainBackground}
						style={[styles.imageBackground, { width }]}
						resizeMode="contain"
					/>
					<Header />
					<View
						style={[styles.contentContainer, { width: viewWidth as never }]}
					>
						<View style={styles.mapContainer}>
							<Image
								source={resources.story.atemWorldMap}
								style={styles.worldMap}
								resizeMode="contain"
							/>
						</View>

						<Text style={[styles.mapDescription, sharedStyle.subContent]}>
							There are many variations of passages of Lorem Ipsum available,
							but the majority have suffered alteration in some form, by
							injected humour, or randomised words which don&apos;t look even
							slightly believable. If you are going to use a passage of Lorem
							Ipsum, you need to be sure there isn&apos;t anything embarrassing
							hidden in the middle of text. All the Lorem Ipsum generators on
							the Internet tend to repeat predefined chunks as necessary, making
							this the first true generator on the Internet. It uses a
							dictionary of over 200 Latin words, combined with a handful of
							model sentence structures, to generate Lorem Ipsum which looks
							reasonable. The generated Lorem Ipsum is therefore always free
							from repetition, injected humour, or non-characteristic words etc.
						</Text>
						<Banner />
					</View>
				</View>
			</ScrollLayout>
		</View>
	);
};

export default Story;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	scrollContent: {
		overflow: 'hidden',
	},
	contentContainer: {
		alignSelf: 'center',
		marginBottom: 80,
	},
	imageBackground: {
		position: 'absolute',
		top: 0,
		aspectRatio: backgroundRatio,
	},
	mapContainer: {
		paddingHorizontal: 15,
	},
	worldMap: {
		aspectRatio: 897 / 673,
		alignSelf: 'center',
		width: '100%',
		marginBottom: 60,
		marginTop: 20,
		marginHorizontal: 15,
	},
	mapDescription: {
		marginBottom: 60,
		paddingHorizontal: 15,
	},
});
