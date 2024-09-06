import { StyleSheet } from 'react-native';
import type { ScaledSizes } from '@metacraft/ui';

interface MarketplaceSizes {
	responsiveHeadings: ScaledSizes;
}

export const marketplaceSizes: MarketplaceSizes = {
	responsiveHeadings: [45, 45, 38, 30],
};

export const marketplaceStyle = StyleSheet.create({
	heading: {
		fontWeight: '600',
		color: '#fff',
		textAlign: 'center',
	},
	background: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});
