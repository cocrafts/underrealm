import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import type { Card as ICard } from '@metacraft/murg-engine';
import {
	CardType,
	CardType as ICardType,
	getCardList,
} from '@metacraft/murg-engine';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import Card, { CARD_WIDTH } from 'components/Card';
import ScrollLayout from 'components/layouts/Scroll';
import { navigationHeight } from 'components/Navigation/shared';
import CardTypeButton from 'screens/CardLibrary/Library/CardTypeButton';
import Dropdown from 'screens/CardLibrary/Library/Dropdown';
import FilterButton from 'screens/CardLibrary/Library/FilterButton';
import FilterTag from 'screens/CardLibrary/Library/FilterTag';
import SearchBar from 'screens/CardLibrary/Library/SearchBar';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import {
	AttackValuesList,
	CardTypeContent,
	ClassTypeList,
	ClassTypeValueList,
	DefenseValuesList,
	ElementalList,
	ElementalValueList,
	HpValuesList,
} from './content';

enum AllCardType {
	All = -1,
}

type ExtendedCardType = ICardType | AllCardType;

const Library: FC = () => {
	const [selectedType, setSelectedType] = useState<ExtendedCardType>(
		AllCardType.All,
	);
	const [search, setSearch] = useState<string>('');
	const [showSubFilter, setShowSubFilter] = useState<boolean>(false);
	const [classType, setClassType] = useState<number>(-1);
	const [elemental, setElemental] = useState<number>(-1);
	const [attack, setAttack] = useState<number>(-1);
	const [hp, setHp] = useState<number>(-1);
	const [def, setDef] = useState<number>(-1);
	const initialCardList = getCardList();
	const [cardList, setCardList] = useState<ICard[]>(initialCardList);
	const isVisibleSubFilter = showSubFilter && selectedType === CardType.Hero;
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);

	const contentWidth =
		Math.floor(
			(Math.min(windowSize.width, iStyles.contentContainer.maxWidth) - 20) /
				CARD_WIDTH,
		) * CARD_WIDTH;

	const numberOfFilters = [classType, elemental, attack, hp, def].filter(
		(value) => value > 0,
	).length;

	const onChangeCardType = (cardType: ExtendedCardType) => {
		setSelectedType(cardType);
	};

	const onSearch = (text: string) => {
		setSearch(text);
	};

	useEffect(() => {
		let filteredByType = [];
		if (selectedType === AllCardType.All) {
			filteredByType = initialCardList;
		} else {
			filteredByType = initialCardList.filter(
				(value) => value.kind == selectedType,
			);
		}
		const searched = filteredByType.filter((card) =>
			card.name
				.toLowerCase()
				.replace(/\s/g, '')
				.includes(search.toLowerCase().trim().replace(/\s/g, '')),
		);
		const filtered = searched.filter((card) => {
			return (
				(classType > 0 ? card.class == ClassTypeValueList[classType] : true) &&
				(elemental > 0
					? card.elemental == ElementalValueList[elemental]
					: true) &&
				(attack > 0
					? card?.attribute?.attack === AttackValuesList[attack]
					: true) &&
				(hp > 0 ? card?.attribute?.health === HpValuesList[hp] : true) &&
				(def > 0 ? card?.attribute?.defense === DefenseValuesList[def] : true)
			);
		});
		setCardList(filtered);
	}, [selectedType, search, classType, elemental, attack, hp, def]);

	const clearAllFilter = () => {
		setClassType(-1);
		setElemental(-1);
		setAttack(-1);
		setHp(-1);
		setDef(-1);
	};

	const renderFilterTags = () => {
		if (selectedType !== CardType.Hero) return null;
		if (classType <= 0 && elemental <= 0 && attack <= 0 && hp <= 0 && def <= 0)
			return null;
		return (
			<>
				{classType > 0 && (
					<FilterTag
						label={ClassTypeList[classType]}
						onRemove={() => setClassType(-1)}
					/>
				)}
				{elemental > 0 && (
					<FilterTag
						label={ElementalList[elemental]}
						onRemove={() => setElemental(-1)}
					/>
				)}
				{attack > 0 && (
					<FilterTag
						label={`Atk ${AttackValuesList[attack]}`}
						onRemove={() => setAttack(-1)}
					/>
				)}
				{hp > 0 && (
					<FilterTag
						label={`HP ${HpValuesList[hp]}`}
						onRemove={() => setHp(-1)}
					/>
				)}
				{def > 0 && (
					<FilterTag
						label={`Def ${DefenseValuesList[def]}`}
						onRemove={() => setDef(-1)}
					/>
				)}
				<TouchableOpacity style={styles.clearAllBtn} onPress={clearAllFilter}>
					<Text responsiveSizes={[16]} style={{ color: 'black' }}>
						Clear All
					</Text>
					<Image
						source={resources.cardLibrary.clearIcon}
						style={{ width: 14, height: 14 }}
					/>
				</TouchableOpacity>
			</>
		);
	};

	const renderSubFilter = () => {
		if (!isVisibleSubFilter) return null;
		return (
			<>
				<View
					style={{
						width: '70%',
						height: 1,
						backgroundColor: '#644d3d',
						marginTop: 10,
						marginBottom: 20,
					}}
				/>
				<View style={{ flexDirection: 'row' }}>
					<Dropdown
						data={ClassTypeList}
						onSelect={setClassType}
						selectedIndex={classType}
						placeholder="Classes"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={ElementalList}
						onSelect={setElemental}
						selectedIndex={elemental}
						placeholder="Elemental"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={AttackValuesList}
						onSelect={setAttack}
						selectedIndex={attack}
						placeholder="Attack"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={HpValuesList}
						onSelect={setHp}
						selectedIndex={hp}
						placeholder="HP"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={DefenseValuesList}
						onSelect={setDef}
						selectedIndex={def}
						placeholder="Defense"
						containerStyle={styles.dropdownContainer}
					/>
				</View>
			</>
		);
	};

	const renderCardTypeSelector = () => {
		return (
			<View style={{ flexDirection: 'row' }}>
				{CardTypeContent.map((type) => {
					const isSelected = type.value === selectedType;
					return (
						<CardTypeButton
							key={type.value}
							isSelected={isSelected}
							type={type}
							onPress={() => onChangeCardType(type.value)}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<View style={[iStyles.wideContainer, styles.container]}>
			<Image
				source={resources.cardLibrary.mainBackground}
				style={styles.imageBackground}
			/>
			<ScrollLayout>
				<View style={{ alignItems: 'center', paddingVertical: 40 }}>
					<Image
						source={resources.cardLibrary.cardsImage}
						style={styles.cardsImage}
					/>
					<Text responsiveSizes={[35]} style={styles.title}>
						Card Rarity
					</Text>
					<Text>Collect and complete your Card collection with 5 rarities</Text>
				</View>
				<ImageBackground
					source={resources.cardLibrary.expandedSearchBarBackground}
					style={[
						styles.searchBarBackground,
						{ height: isVisibleSubFilter ? 210 : 130 },
					]}
					resizeMode="stretch"
				>
					<View
						style={[
							iStyles.contentContainer,
							{
								alignItems: 'center',
							},
						]}
					>
						<View style={styles.cardTypeButtonContainer}>
							{renderCardTypeSelector()}
							<View style={{ flexDirection: 'row' }}>
								<SearchBar value={search} onChangeText={onSearch} />
								<FilterButton
									isActive={selectedType === ICardType.Hero}
									onPress={() => setShowSubFilter((value) => !value)}
									numberOfFilters={numberOfFilters}
								/>
							</View>
						</View>
						{renderSubFilter()}
					</View>
				</ImageBackground>
				<View
					style={[
						styles.content,
						iStyles.contentContainer,
						{ width: contentWidth },
					]}
				>
					<View style={styles.filterInfo}>
						<Text style={styles.numberOfCards}>{`${
							cardList.length
						} cards found for "${
							CardTypeContent[selectedType + 1].displayName
						}"`}</Text>
						{renderFilterTags()}
					</View>
					<View style={{ minHeight: 500 }}>
						<View style={styles.cardListContainer}>
							{cardList.length === 0 && selectedType === CardType.Hero ? (
								<View style={styles.noCardWrapper}>
									<Text style={styles.noCardTitle} responsiveSizes={[20]}>
										No cards found
									</Text>
									<Text responsiveSizes={[16]} style={styles.noCardDescription}>
										{'Try removing search item(s) for better results. '}
										<TouchableOpacity onPress={clearAllFilter}>
											<Text responsiveSizes={[16]} style={styles.searchAllHero}>
												Search all Hero cards
											</Text>
										</TouchableOpacity>
									</Text>
								</View>
							) : (
								cardList.map((card) => {
									return <Card data={card} key={card.id} />;
								})
							)}
						</View>
					</View>
				</View>
			</ScrollLayout>
		</View>
	);
};

export default Library;

const styles = StyleSheet.create({
	imageBackground: {
		width: '100%',
		aspectRatio: 1382 / 788,
		position: 'absolute',
		top: navigationHeight.storm + navigationHeight.local,
	},
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	title: {
		fontFamily: 'Volkhov',
		fontWeight: '600',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 8,
	},
	cardsImage: {
		aspectRatio: 496 / 288,
		width: 496,
	},
	headerButton: {
		width: 250,
		alignItems: 'center',
		marginTop: 15,
	},
	searchBarBackground: {
		width: '100%',
		height: 130,
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	filterLabel: {
		fontWeight: '500',
	},
	dropdownContainer: {
		marginRight: 8,
	},
	cardTypeButtonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '75%',
	},
	content: {
		marginTop: 25,
		alignSelf: 'center',
	},
	cardListContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	filterInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	numberOfCards: {
		fontWeight: '600',
	},
	clearAllBtn: {
		flexDirection: 'row',
		backgroundColor: 'white',
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 8,
		width: 140,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
		height: 30,
	},
	noCardWrapper: {
		width: '100%',
		marginTop: 60,
		alignItems: 'center',
	},
	noCardTitle: {
		fontFamily: 'Volkhov',
		textAlign: 'center',
		alignSelf: 'center',
		fontWeight: 'bold',
	},
	noCardDescription: {
		color: '#7e7e7e',
		marginTop: 20,
	},
	searchAllHero: {
		color: '#c1ab6a',
	},
});
