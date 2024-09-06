import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Hyperlink, Text } from '@metacraft/ui';
import StormgateLogo from 'components/icons/StormgateLogo';
import { iStyles } from 'utils/styles';

import { footerLinkList } from './shared';

export const FooterSection: FC = () => {
	return (
		<View style={[iStyles.wideContainer, styles.container]}>
			<Hyperlink href="https://stormgate.io/" target="_blank">
				<StormgateLogo style={styles.logo} colors={['#929292', '#000']} />
			</Hyperlink>
			<Text style={styles.grayText}>The portal to ATEM fictional world</Text>
			<View style={styles.hyperLinkContainer}>
				{footerLinkList.map((item, index) => (
					<Hyperlink
						key={index}
						style={styles.hyperLink}
						href={item.href}
						target="_blank"
						title={item.title}
						titleStyle={styles.hyperLinkTitle}
					/>
				))}
			</View>
			<Text style={[styles.grayText, styles.copyRights]}>
				&copy;2022 Metacraft Studio. All rights reserved.
			</Text>
			<Text style={[styles.grayText, styles.copyRights]}>
				All rights reserved. All trademarks referenced herein are the properties
				of their respective owners.
			</Text>
		</View>
	);
};

export default FooterSection;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1c1c1c',
		alignItems: 'center',
		paddingVertical: 40,
		paddingHorizontal: 15,
	},
	logo: {
		marginBottom: 15,
	},
	grayText: {
		color: '#929292',
	},
	hyperLinkContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		paddingVertical: 40,
	},
	hyperLink: {
		marginVertical: 5,
		marginHorizontal: 20,
	},
	hyperLinkTitle: {
		color: '#fff',
	},
	copyRights: {
		fontSize: 12,
		textAlign: 'center',
	},
});
