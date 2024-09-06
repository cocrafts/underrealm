import type { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { PackStats } from 'screens/Mint/shared';
import { packList } from 'screens/Mint/shared';
import { navigate } from 'stacks/Browser/shared';
import { iStyles } from 'utils/styles';

import PackBundle from './PackBundle';

export const PackListSection: FC = () => {
	const onPackPress = (pack: PackStats) => {
		navigate('Mint', { screen: 'DetailPack', params: { id: pack.route } });
	};

	return (
		<View style={iStyles.contentContainer}>
			<ScrollView contentContainerStyle={styles.packListing} horizontal>
				{packList.map((item) => (
					<PackBundle key={item.route} item={item} onPress={onPackPress} />
				))}
			</ScrollView>
		</View>
	);
};

export default PackListSection;

const styles = StyleSheet.create({
	packListing: {
		marginHorizontal: 'auto',
		paddingTop: 18,
		paddingBottom: 100,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
