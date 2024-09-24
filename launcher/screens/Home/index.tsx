import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import { useSnapshot } from 'utils/hooks';
import { extractReferralFromUrl } from 'utils/referral';

import BattlefieldSetupSection from './sections/BattlefieldSetup';
import CardExplainSection from './sections/CardExplain';
import CardTypeSection from './sections/CardTypes';
import ClassesSection from './sections/Classes';
import ElementalInteractionSection from './sections/ElementalInteraction';
import GameIntroSection from './sections/GameIntro';
import HeadingSection from './sections/Heading';
import SocialNetworkSection from './sections/SocialNetwork';

export const HomeScreen: FC = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);

	useEffect(() => {
		extractReferralFromUrl();
	}, []);

	return (
		<ScrollLayout contentContainerStyle={styles.container}>
			<HeadingSection />
			<GameIntroSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<BattlefieldSetupSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<CardTypeSection responsiveLevel={responsiveLevel} />
			<CardExplainSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<ElementalInteractionSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<ClassesSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<SocialNetworkSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			{/* <FooterSection /> */}
		</ScrollLayout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
	},
});
