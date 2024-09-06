import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { AppState } from '@metacraft/ui';
import { appState } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import { useSnapshot } from 'utils/hook';

import BannerSection from './sections/BannerSection';
import FaqSection from './sections/FaqSection';
import PackListSection from './sections/PackListSection';
import WhyBuyNftSection from './sections/WhyBuyNftSection';

export const MintScreen: FC = () => {
	const { windowDimensions } = useSnapshot<AppState>(appState);

	return (
		<ScrollLayout contentContainerStyle={styles.container}>
			<BannerSection />
			<PackListSection />
			<WhyBuyNftSection dimensions={windowDimensions} />
			<FaqSection />
		</ScrollLayout>
	);
};

export default MintScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0d0712',
	},
});
