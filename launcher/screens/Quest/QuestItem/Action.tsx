import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import Refresh from 'components/icons/Refresh';
import UnderRealmButton from 'components/Marketplace/Button';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

interface Props {
	points: number;
	onGo?: () => void;
	onVerify?: () => void;
}

const Action: FC<Props> = ({ points, onGo, onVerify }) => {
	const { isMobile, windowSize } = useSnapshot<DimensionState>(dimensionState);
	const [isRefreshHovered, setIsRefreshHovered] = useState(false);
	const buttonStyle = useMemo(() => {
		return {
			gap: (40 * windowSize.width) / 1440,
		};
	}, [windowSize.width]);

	return (
		<View style={isMobile ? styles.containerOnMobile : styles.contentPart}>
			<View
				style={[styles.buttonsContainer, buttonStyle, isMobile && { gap: 0 }]}
			>
				<View style={styles.refreshButtonContainer}>
					<Pressable
						onPress={onVerify}
						onHoverIn={() => {
							setIsRefreshHovered(true);
						}}
						onHoverOut={() => {
							setIsRefreshHovered(false);
						}}
						style={[
							styles.refreshButton,
							isMobile && styles.refreshButtonOnMobile,
							isRefreshHovered ? styles.hovered : {},
						]}
					>
						<ImageBackground
							source={resources.quest.refreshButton}
							style={
								isMobile
									? styles.refreshButtonImageOnMobile
									: styles.refreshButtonImage
							}
						>
							<Refresh size={isMobile ? 16 : 20} />
						</ImageBackground>
					</Pressable>

					{!isMobile && <Text style={styles.buttonText}>Verify</Text>}
				</View>

				{!isMobile && (
					<UnderRealmButton onPress={onGo} style={styles.goButton}>
						<Text style={styles.buttonText}>Go</Text>
					</UnderRealmButton>
				)}
			</View>

			<View style={styles.pointContainer}>
				<Text style={isMobile ? styles.pointTextOnMobile : styles.pointText}>
					+{points} pts
				</Text>
				{isMobile && (
					<UnderRealmButton onPress={onGo} style={styles.goButtonOnMobile}>
						<Text style={[styles.buttonText, styles.buttonTextOnMobile]}>
							Go
						</Text>
					</UnderRealmButton>
				)}
			</View>
		</View>
	);
};

export default Action;

const styles = StyleSheet.create({
	refreshButton: {
		width: 36,
		height: 36,
		borderRadius: 20,
		overflow: 'visible',
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonOnMobile: {
		width: 20,
		height: 20,
	},
	refreshButtonImage: {
		width: 39,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonImageOnMobile: {
		width: 24,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: 40,
	},
	contentPart: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
	containerOnMobile: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
	},
	goButton: {
		width: 135,
		alignItems: 'center',
	},
	goButtonOnMobile: {
		width: 64,
		alignItems: 'center',
		height: 24,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	pointText: {
		color: '#F2E0C3',
		fontFamily: 'Volkhov',
		fontWeight: '600',
		fontSize: 16,
	},
	pointTextOnMobile: {
		color: '#F2E0C3',
		fontFamily: 'Volkhov',
		fontWeight: '500',
		fontSize: 12,
		marginBottom: 4,
	},
	hovered: {
		shadowColor: '#FFF9A0',
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 12,
	},
	buttonTextOnMobile: {
		fontSize: 12,
	},
	pointContainer: {
		alignItems: 'center',
	},
});
