import type { FC } from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import { useSnapshot } from 'valtio';

const HeadingSection: FC = () => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);
	const logoSize = useMemo(() => {
		if (isMobile) return (360 * windowSize.width) / 430;

		return (785 * windowSize.width) / 1440;
	}, [windowSize.width, isMobile]);

	const subtitleStyle = useMemo(() => {
		if (isMobile)
			return {
				fontSize: 14,
			};

		return {
			maxWidth: (windowSize.width * 580) / 1440,
			marginTop: (-22 * windowSize.height) / 1024,
		};
	}, [windowSize, isMobile]);

	return (
		<View style={styles.container}>
			<UnderRealmLogo size={logoSize} />
			<Text style={[styles.subtitle, subtitleStyle]}>
				Embark on a thrilling adventure in UnderRealm, where strategic card play
				meets cooperative quests!
			</Text>
		</View>
	);
};

export default HeadingSection;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	subtitle: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 18,
		textAlign: 'center',
		maxWidth: 280,
		marginTop: 20,
	},
});
