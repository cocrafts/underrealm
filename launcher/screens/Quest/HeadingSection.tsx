import type { FC } from 'react';
import { useMemo } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState } from '@metacraft/ui';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

const HeadingSection: FC = () => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);
	const logoSize = useMemo(() => {
		const ratio = isMobile ? 248 / 375 : 31 / 72;
		return windowSize.width * ratio;
	}, [windowSize.width, isMobile]);

	return (
		<View style={styles.container}>
			<Image
				source={resources.quest.imageTitle}
				style={{
					position: 'absolute',
					margin: 'auto',
					zIndex: -1,
					width: (windowSize.width * 700) / 1440,
					height: (windowSize.width * 414) / 1440,
				}}
			/>
			<UnderRealmLogo
				style={{ marginTop: (windowSize.width * 167) / 1440 }}
				size={logoSize}
			/>

			<ImageBackground
				source={resources.quest.pointsBoard}
				style={{ width: 392, height: 68, flexDirection: 'row' }}
			>
				<View style={styles.pointInfoContainer}></View>
				<View style={styles.pointInfoContainer}></View>
			</ImageBackground>
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
	pointInfoContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
		justifyContent: 'center',
	},
});
