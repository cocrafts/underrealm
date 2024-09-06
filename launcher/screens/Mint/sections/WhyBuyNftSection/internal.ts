import type { ImageStyle } from 'react-native';
import { StyleSheet } from 'react-native';

const borderHorizontalStyle = {
	position: 'absolute',
	left: 0,
	right: 0,
} as ImageStyle;

const borderVerticalStyle = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	width: 26,
} as ImageStyle;

const edgeStyle = {
	position: 'absolute',
	width: 37,
	height: 37,
} as ImageStyle;

const width = 86;
const height = 85;

export const styles = StyleSheet.create({
	container: {
		paddingVertical: 80,
		paddingHorizontal: 50,
	},
	background: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	borderBottom: {
		...borderHorizontalStyle,
		bottom: 0,
		height: 24,
	},
	borderTop: {
		...borderHorizontalStyle,
		top: 0,
		height: 19,
	},
	borderLeft: {
		...borderVerticalStyle,
		left: 0,
	},
	borderRight: {
		...borderVerticalStyle,
		right: 0,
	},
	edgeTopLeft: {
		...edgeStyle,
		top: 0,
		left: 0,
	},
	edgeTopRight: {
		...edgeStyle,
		top: 0,
		right: 0,
	},
	edgeBottomLeft: {
		...edgeStyle,
		bottom: 0,
		left: 0,
	},
	edgeBottomRight: {
		...edgeStyle,
		bottom: 0,
		right: 0,
	},
	patternTopLeft: {
		...edgeStyle,
		top: 10,
		left: 15,
		width,
		height,
	},
	patternTopRight: {
		...edgeStyle,
		top: 10,
		right: 15,
		width,
		height,
	},
	patternBottomLeft: {
		...edgeStyle,
		bottom: 10,
		left: 15,
		width,
		height,
	},
	patternBottomRight: {
		...edgeStyle,
		bottom: 10,
		right: 15,
		width,
		height,
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		overflow: 'hidden',
	},
	title: {
		fontWeight: '500',
		marginBottom: 20,
		marginLeft: 34,
	},
	whyImageContainer: {
		flex: 1,
		marginVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 490,
	},
	whyImage: {
		// marginTop: 120,
		width: 600,
		height: 608,
	},
	infoContainer: {
		flex: 1,
		minWidth: 490,
	},
	infoInner: {
		maxWidth: 500,
	},
});

interface WhyBuyNft {
	title: string;
	detail: string;
}

export const whyBuyNft: WhyBuyNft[] = [
	{
		title: 'Limited & Unique',
		detail: `There will be limited Genesis cards to be issued in the future. This is the very first and one of the largest Genesis card minting of **2,373 Genesis NFTs** where you can get unique chance to purchase and own those NFTs.`,
	},
	{
		title: 'Higher rarity rate, powerful Craft ability',
		detail: `Not only limited and unique, Genesis minting offer **higher rarity chance** compare to Craft (the only way to generate new NFT Cards).
While using for Craft, Genesis have higher chance create powerful children.`,
	},
	{
		title: 'Badge and Historical record',
		detail: `This is the very first NFT minting event for Under Realm. By purchasing and owning one of those NFTs, your support is valuable and remarkable. Bagdes will be available on your profile as a “Early Genesis owner”.`,
	},
];
