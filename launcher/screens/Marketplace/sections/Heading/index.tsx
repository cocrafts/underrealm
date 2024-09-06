import type { FC } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';

import { UnderRealmIcon } from '../../../../components/icons/underRealm/MarkLogo';
import resources from '../../../../utils/resources';
import { marketplaceSizes, marketplaceStyle } from '../../shared';

interface Props {
	onLayout: (event: LayoutChangeEvent) => void;
}

export const HeadingSection: FC<Props> = ({ onLayout }) => {
	return (
		<View style={styles.container} onLayout={(event) => onLayout(event)}>
			<Image
				style={marketplaceStyle.background}
				source={resources.marketplace.headingBackground}
			/>
			<View style={styles.contentContainer}>
				<UnderRealmIcon style={styles.icon} size={150} />
				<View style={styles.titleContainer}>
					<Text
						style={marketplaceStyle.heading}
						responsiveSizes={marketplaceSizes.responsiveHeadings}
					>
						Marketplace
					</Text>
				</View>
			</View>
		</View>
	);
};

export default HeadingSection;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 80,
		paddingBottom: 30,
		marginBottom: 10,
	},
	contentContainer: {
		position: 'relative',
		alignItems: 'center',
	},
	icon: {
		opacity: 0.3,
	},
	titleContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
	},
});
