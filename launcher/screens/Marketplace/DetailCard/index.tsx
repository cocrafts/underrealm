import type { FC } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { useNavigation } from '@react-navigation/native';
import UnderRealmButton from 'components/Marketplace/Button';
import Card from 'components/Marketplace/Card';

import { styles } from './internal';

export const DetailCard: FC = () => {
	const navigation = useNavigation();
	const handleClose = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.navigate('Dashboard' as never);
		}
	};

	return (
		<View style={styles.overlay}>
			<TouchableOpacity
				style={styles.closeButtonPosition}
				onPress={handleClose}
			>
				<Text style={styles.closeButton}>&#215;</Text>
			</TouchableOpacity>
			<View style={styles.container}>
				<View style={styles.cardImageContainer}>
					<Card animationFlipDisable={true} />
				</View>
				<View style={styles.cardInfoContainer}>
					<Text style={styles.cardTitle} responsiveSizes={[32]}>
						Treasure Box 1
					</Text>
					<Text responsiveSizes={[14]}>Metacraft</Text>
					<Text style={styles.sectionTitle}>Product Details</Text>
					<Text style={styles.text}>You will receive randomly card...</Text>
					<Text style={styles.sectionTitle}>Skill</Text>
					<Text style={styles.text}>_</Text>
					<Text style={styles.sectionTitle}>Keyword</Text>
					<Text style={styles.text}>_</Text>
					<Text style={styles.sectionTitle}>Properties</Text>
					<View
						style={{
							flexDirection: 'row',
							flex: 1,
							justifyContent: 'space-between',
						}}
					>
						<View>
							<Text style={styles.sectionTitle}>Type</Text>
							<Text style={styles.text}>_</Text>
							<Text style={styles.sectionTitle}>Elemental</Text>
							<Text style={styles.text}>_</Text>
						</View>
						<View>
							<Text style={styles.sectionTitle}>Class</Text>
							<Text style={styles.text}>_</Text>
							<Text style={styles.sectionTitle}>Rarity</Text>
							<Text style={styles.text}>_</Text>
						</View>
						<View style={{ justifyContent: 'flex-end' }}>
							<Text style={styles.sectionTitle}>Turn</Text>
							<Text style={styles.text}>_</Text>
						</View>
					</View>
					<Text style={styles.sectionTitle}>Attribute</Text>
					<View style={{ flexDirection: 'row', marginTop: 15 }}>
						<View style={{ marginRight: 50 }}>
							<Text style={styles.text}>Attack</Text>
							<Text style={styles.text}>Defense</Text>
							<Text style={styles.text}>HP</Text>
						</View>
						<View>
							<Text style={styles.text}>_</Text>
							<Text style={styles.text}>_</Text>
							<Text style={styles.text}>_</Text>
						</View>
					</View>
				</View>
				<View style={styles.blockchainInfoContainer}>
					<View style={styles.buyNftContainer}>
						<View style={styles.priceContainer}>
							<Text style={styles.cryptoPrice} responsiveSizes={[20]}>
								<Image
									source={{
										uri: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Tether-USDT-icon.png',
									}}
									style={{ width: 20, height: 20 }}
								/>{' '}
								15 USDC
							</Text>
							<Text style={styles.fiatPrice}>&asymp; 15 USD </Text>
						</View>
						<Text style={styles.blackText} responsiveSizes={[10]}>
							2% Trading frees included
						</Text>
						<View style={styles.buttonContainer}>
							<View style={styles.quantityContainer}>
								<View style={styles.quantityLeftContainer}>
									<TouchableOpacity style={{ flex: 1 }}>
										<Text style={{ textAlign: 'right', color: '#000' }}>-</Text>
									</TouchableOpacity>
									<TextInput
										value="100"
										style={{
											flex: 2,
											width: 25,
											textAlign: 'center',
											fontFamily: 'Poppins',
										}}
									/>
									<TouchableOpacity style={{ flex: 1 }}>
										<Text style={{ textAlign: 'left', color: '#000' }}>+</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.quantityRightContainer}>
									<Text style={styles.blackText}>of 100</Text>
								</View>
							</View>
							<UnderRealmButton
								title="BUY NOW"
								style={{ width: 160 }}
								texStyle={{ fontWeight: '600' }}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Text style={styles.blackText}>Your balance: 0 USDC</Text>
						</View>
					</View>
					<View style={{ marginTop: 30 }}>
						<Text
							style={[styles.sectionTitle, { width: '100%', marginBottom: 10 }]}
						>
							Series Content
						</Text>
						<View
							style={{
								borderWidth: 1,
								borderColor: '#fff',
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10,
								flexDirection: 'row',
							}}
						>
							<Text
								style={{
									paddingVertical: 10,
									paddingLeft: 10,
									flex: 1,
									borderRightWidth: 1,
									borderRightColor: '#fff',
									fontWeight: '600',
								}}
							>
								Rarity
							</Text>
							<Text
								style={{
									paddingVertical: 10,
									paddingLeft: 10,
									flex: 1,
									fontWeight: '600',
								}}
							>
								Probability
							</Text>
						</View>
						<View style={styles.tableRow}>
							<Text style={styles.leftCell}>Legendary</Text>
							<Text style={styles.rightCell}>0.01%</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default DetailCard;
