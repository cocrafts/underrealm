import type React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import type { Card as ICard, TemplateFragment } from '@metacraft/murg-engine';
import { ClassType, ElementalType } from '@metacraft/murg-engine';
import { Text } from '@metacraft/ui';
import { navigate } from 'stacks/Browser/shared';
import resources from 'utils/resources';

function getElementalByValue(value?: string): string {
	const indexOfS = Object.values(ElementalType).indexOf(
		value as unknown as ElementalType,
	);

	return Object.keys(ElementalType)[indexOfS];
}
function getClassByValue(value?: string): string {
	const indexOfS = Object.values(ClassType).indexOf(
		value as unknown as ClassType,
	);

	return Object.keys(ClassType)[indexOfS];
}

interface Props {
	data: ICard;
	width?: number;
}

export const CARD_WIDTH = 180;

const Card: React.FC<Props> = ({ data, width = CARD_WIDTH }) => {
	const ratio = width / CARD_WIDTH;
	const { attribute, rarity, name, id, skill, elemental } = data;
	const visualUri = `https://raw.githubusercontent.com/cocrafts/card/master/game/assets/resources/graphic/visuals/${id.slice(
		0,
		5,
	)}.png`;

	const sourceFoil = elemental
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			resources.card.foil[getElementalByValue(elemental).toLowerCase()]
		: resources.card.foil.dark;

	const sourceClass =
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		resources.card.class[getClassByValue(data.class).toLowerCase()];

	const onPress = () => {
		navigate('CardLibrary', { screen: 'DetailCard', params: { id } });
	};

	const renderRarity = () => {
		const rarityArr = Array.from({ length: rarity / 3 }, (_, i) => i);
		return (
			<View
				style={[styles.rarityContainer, { top: 6 * ratio, width: 50 * ratio }]}
			>
				{rarityArr.map((rarity) => {
					return (
						<Image
							key={rarity}
							source={resources.card.gem}
							style={[
								styles.gem,
								{ width: 8 * ratio, marginHorizontal: ratio },
							]}
						/>
					);
				})}
			</View>
		);
	};

	const renderSkill = () => {
		const fragments = skill?.template as TemplateFragment[];

		return (
			<Text
				style={[
					styles.skill,
					{
						top: 195 * ratio,
						paddingHorizontal: 25 * ratio,
					},
				]}
			>
				{fragments.map((fragment, i) => {
					return (
						<Text
							key={i}
							style={{
								...fragment.style,
								color: fragment.style?.color || 'gray',
							}}
							responsiveSizes={[6 * ratio]}
						>
							{fragment.text}
						</Text>
					);
				})}
			</Text>
		);
	};

	return (
		<TouchableOpacity style={[styles.container, { width }]} onPress={onPress}>
			<View style={[styles.visualContainer, { padding: 15 * ratio }]}>
				<Image
					source={{
						uri: visualUri,
					}}
					style={styles.foil}
					resizeMode="contain"
				/>
			</View>

			<ImageBackground source={sourceFoil} style={styles.foil}>
				{renderRarity()}
				<Text
					responsiveSizes={[11 * ratio]}
					style={[styles.name, { marginTop: 16 * ratio }]}
				>
					{name}
				</Text>
				<View
					style={[
						styles.attributeContainer,
						{ bottom: 70.5 * ratio, paddingHorizontal: 20.5 * ratio },
					]}
				>
					<Text
						responsiveSizes={[9 * ratio]}
						style={[styles.attributeLabel, { width: 14 * ratio }]}
					>
						{attribute?.attack}
					</Text>
					<Text
						responsiveSizes={[9 * ratio]}
						style={[styles.attributeLabel, { width: 14 * ratio }]}
					>
						{attribute?.defense}
					</Text>
					<Text
						responsiveSizes={[9 * ratio]}
						style={[styles.attributeLabel, { width: 14 * ratio }]}
					>
						{attribute?.health}
					</Text>
				</View>
				{renderSkill()}
				<Image
					source={sourceClass}
					style={[styles.classIcon, { width: 10 * ratio, bottom: 10 * ratio }]}
				/>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		aspectRatio: 400 / 562,
	},
	name: {
		fontFamily: 'Volkhov',
		textAlign: 'center',
		color: '#000',
		marginTop: 16,
	},
	classIcon: {
		aspectRatio: 1,
		width: 10,
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
	},
	foil: {
		flex: 1,
	},
	visualContainer: {
		width: '100%',
		height: '100%',
		alignSelf: 'center',
		position: 'absolute',
		padding: 15,
	},
	attributeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 70,
		width: '100%',
		paddingHorizontal: 20,
	},
	attributeLabel: {
		fontWeight: '600',
		// width: 14,
		textAlign: 'center',
	},
	rarityContainer: {
		flexDirection: 'row',
		top: 6,
		position: 'absolute',
		alignSelf: 'center',
		width: 50,
	},
	gem: {
		width: 8,
		aspectRatio: 1,
		marginHorizontal: 1,
	},
	skill: {
		position: 'absolute',
		top: 190,
		paddingHorizontal: 25,
		flexDirection: 'row',
	},
});
