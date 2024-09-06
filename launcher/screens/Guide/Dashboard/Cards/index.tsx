import type { FC } from 'react';
import { Fragment } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Markdown, Text } from '@metacraft/ui';
import { card } from 'screens/Guide/content';
import Concept from 'screens/Guide/Dashboard/Concept';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const Cards: FC<Record<string, unknown>> = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const imageWidth = responsiveLevel > 1 ? 1060 * (1 / responsiveLevel) : 803;
	const imageStyle = {
		width: imageWidth,
		height: (imageWidth * 756) / 1060,
		marginVertical: 40,
	};

	const renderDescription = (
		des: string,
		additional?: { title: string; text: string }[],
	) => {
		return (
			<>
				<Text>{des}</Text>
				{additional?.map((item) => {
					return (
						<Fragment key={item.title}>
							<Text style={styles.propertyTitle}>{item.title}</Text>
							<Markdown content={item.text} />
						</Fragment>
					);
				})}
			</>
		);
	};
	return (
		<View style={[sharedStyle.sectionContainer, styles.container]}>
			<Text responsiveSizes={headingSize} style={sharedStyle.heading}>
				Cards
			</Text>
			<Text style={styles.subHeading}>Getting to know your Card</Text>
			<Text style={styles.content}>{card.intro}</Text>
			<Image source={resources.guide.cardExplain} style={imageStyle} />
			<Concept content={card} renderDescription={renderDescription} />
		</View>
	);
};

export default Cards;

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
	},
	subHeading: {
		fontSize: 30,
		textAlign: 'center',
		marginTop: 15,
		marginBottom: 8,
	},
	content: {
		textAlign: 'center',
	},
	propertyTitle: {
		fontFamily: 'Poppins',
		fontSize: 30,
		marginTop: 40,
		marginBottom: 8,
		color: '#67564C',
		alignSelf: 'flex-start',
	},
});
