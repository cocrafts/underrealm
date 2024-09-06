import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const Elemental: FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);

	const renderNarrowContent = () => {
		return (
			<View style={styles.narrowContainer}>
				<Image
					source={resources.guide.elementalInteractionVisual}
					style={styles.narrowImage}
				/>
				<View style={styles.narrowContent}>
					<Text style={styles.interactionTitle}>
						{'Overcoming Interactions\n\n'}
					</Text>
					<Text style={styles.interactionContent}>
						{'Fire melts Metal\n\n' +
							'Metal penetrates Wood\n\n' +
							'Wood separates Earth\n\n' +
							'Earth absorbs Water\n\n' +
							'Water quenches Fire\n\n'}
					</Text>
					<Text style={[styles.interactionContent, styles.interactionNote]}>
						*Light & Dark: Not available in Alpha yet.
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={sharedStyle.sectionContainer}>
			<Text style={sharedStyle.heading} responsiveSizes={headingSize}>
				Elemental
			</Text>
			<Text style={sharedStyle.subHeading}>
				{'In ATEM, there are 5  Natural Elements (Iron/ Wood/ Water/ Fire/ Earth) and 2 Ancient Elements (Lightning/ Darkness). \n' +
					'\n' +
					'Each card will have an element and the element will interact uniquely on the battlefield as the Generating and Overcoming processes. Knowing this will give you an extra chance to win a battle by combining the action of cards accordingly.'}
			</Text>
			{responsiveLevel > 1 ? (
				renderNarrowContent()
			) : (
				<View style={styles.visualContainer}>
					<Image
						source={resources.guide.elementalInteractionVisual}
						style={styles.visualImg}
						resizeMode="contain"
					/>
					<View style={styles.visualContent}>
						<Text style={styles.interactionTitle}>
							{'Overcoming Interactions\n\n'}
						</Text>
						<Text style={styles.interactionContent}>
							{'Fire melts Metal\n\n' +
								'Metal penetrates Wood\n\n' +
								'Wood separates Earth\n\n' +
								'Earth absorbs Water\n\n' +
								'Water quenches Fire\n\n'}
						</Text>
						<Text style={[styles.interactionContent, styles.interactionNote]}>
							*Light & Dark: Not available in Alpha yet.
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default Elemental;

const styles = StyleSheet.create({
	visualContainer: {
		flexDirection: 'row',
		marginTop: 40,
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
	},
	visualImg: {
		width: '40%',
		aspectRatio: 701 / 703,
	},
	visualContent: {
		justifyContent: 'center',
		paddingTop: 60,
		paddingHorizontal: 80,
	},
	interactionTitle: {
		fontFamily: 'Volkhov',
		fontWeight: 'bold',
		fontSize: 18,
	},
	interactionContent: {
		fontFamily: 'Poppins',
		fontSize: 12,
	},
	interactionNote: {
		fontStyle: 'italic',
		opacity: 0.7,
	},
	narrowContainer: {
		marginTop: 40,
		width: '100%',
	},
	narrowImage: {
		width: '80%',
		aspectRatio: 701 / 703,
		alignSelf: 'center',
	},
	narrowContent: {
		justifyContent: 'center',
		paddingTop: 40,
		alignSelf: 'center',
	},
});
