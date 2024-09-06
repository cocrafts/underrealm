import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import Separator from 'components/icons/underRealm/Separator';
import type { CardProps } from 'components/Marketplace/Card';
import Card from 'components/Marketplace/Card';
import { marketplaceSizes, marketplaceStyle } from 'screens/Marketplace/shared';
import { navigate } from 'stacks/Browser/shared';

interface Props {
	style?: ViewStyle;
}

export const BoxSellingSection: FC<Props> = ({ style }) => {
	const onNavigate = (cardId: string) => {
		navigate('Marketplace', { screen: 'DetailCard', params: { id: cardId } });
	};

	return (
		<View style={[styles.container, style]}>
			<View style={styles.titleContainer}>
				<Text
					style={marketplaceStyle.heading}
					responsiveSizes={marketplaceSizes.responsiveHeadings}
				>
					Box box box
				</Text>
				<Separator style={styles.separatorStyle} size={550} />
				<Text style={styles.subtitle} responsiveSizes={[18, 18, 16, 14]}>
					Subtitle text
				</Text>
			</View>
			<View style={styles.boxesContainer}>
				{cardBoxes(onNavigate).map((props, i) => (
					<Card key={i} {...props} />
				))}
			</View>
		</View>
	);
};

export default BoxSellingSection;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: 100,
		paddingBottom: 30,
	},
	titleContainer: {
		alignItems: 'center',
	},
	separatorStyle: {
		opacity: 0.2,
	},
	subtitle: {
		color: '#fff',
		opacity: 0.5,
	},
	boxesContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 25,
	},
});

const cardBoxes = (navigate: (id: string) => void): CardProps[] => [
	{
		animationFlipDisable: true,
		onPress: () => navigate('001'),
	},
	{
		animationHoveredDisable: true,
		onPress: () => navigate('001'),
	},
	{
		animationFlipDisable: true,
		animationHoveredDisable: true,
		onPress: () => navigate('001'),
	},
	{
		imageSource: '',
		onPress: () => navigate('001'),
	},
	{
		onPress: () => navigate('001'),
	},
];
