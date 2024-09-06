import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#150101',
		position: 'relative',
	},
	closeButtonPosition: {
		position: 'absolute',
		top: 50,
		right: 50,
	},
	closeButton: {
		fontSize: 100,
		fontWeight: '500',
		color: '#fff',
		lineHeight: 0,
	},
	container: {
		flexDirection: 'row',
	},
	cardImageContainer: {
		justifyContent: 'flex-start',
	},
	cardInfoContainer: {
		maxWidth: 500,
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
	cardTitle: {
		marginBottom: 5,
		fontWeight: '600',
	},
	artistUsername: {},
	sectionTitle: {
		marginTop: 5,
		fontWeight: '600',
	},
	text: {
		marginBottom: 5,
	},
	blockchainInfoContainer: {
		marginVertical: 5,
		paddingHorizontal: 10,
	},
	buyNftContainer: {
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	priceContainer: {
		marginBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
	},
	cryptoPrice: {
		fontWeight: '600',
		color: '#000',
	},
	fiatPrice: {
		color: '#a9a9a9',
	},
	blackText: {
		color: '#000',
	},
	buttonContainer: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantityContainer: {
		height: '100%',
		width: 160,
		marginRight: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
	},
	quantityLeftContainer: {
		height: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
	},
	quantityRightContainer: {
		flex: 1,
		alignItems: 'center',
	},
	tableRow: {
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: '#fff',
		flexDirection: 'row',
	},
	leftCell: {
		paddingVertical: 10,
		paddingLeft: 10,
		flex: 1,
		borderRightWidth: 1,
		borderRightColor: '#fff',
	},
	rightCell: {
		paddingVertical: 10,
		paddingLeft: 10,
		flex: 1,
	},
});
