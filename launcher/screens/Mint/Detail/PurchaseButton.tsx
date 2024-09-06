import type { FC } from 'react';
import { Fragment } from 'react';
import {
	ActivityIndicator,
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import type { Amount } from '@metaplex-foundation/js';
import { parseAmount } from 'utils/helper';
import resources from 'utils/resources';

interface Props {
	amount: number;
	unitPrice?: Amount;
	disabled?: boolean;
	title: string;
	isLoading?: boolean;
	onPress?: () => void;
}

export const PurchaseButton: FC<Props> = ({
	disabled,
	amount,
	unitPrice,
	title,
	isLoading,
	onPress,
}) => {
	const buttonContent = isLoading ? (
		<View style={{ alignItems: 'center', width: '100%' }}>
			<ActivityIndicator />
		</View>
	) : (
		<Fragment>
			<Text>{title}</Text>
			<Image
				source={resources.marketplace.buyButtonDash}
				style={{ width: 32, height: 2, marginLeft: 10 }}
			/>
			<View style={styles.priceContainer}>
				<Image source={resources.marketplace.coinUsd} style={styles.coinIcon} />
				<Text>USDC {parseAmount(unitPrice, 6) * amount}</Text>
			</View>
		</Fragment>
	);

	return (
		<TouchableOpacity
			disabled={disabled}
			style={styles.container}
			onPress={onPress}
		>
			<ImageBackground
				source={resources.marketplace.buyButtonBackground}
				style={styles.buttonBackground}
			>
				{buttonContent}
			</ImageBackground>
			{disabled && <View style={styles.disabledMask} pointerEvents="none" />}
		</TouchableOpacity>
	);
};

export default PurchaseButton;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		width: '100%',
	},
	buttonBackground: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 30,
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	coinIcon: {
		width: 15,
		height: 15,
		marginRight: 10,
	},
	disabledMask: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});
