import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { iStyles } from 'launcher/utils/styles';

import FaqItem from './FaqItem';
import { faqList } from './internal';

const FaqSection: FC = () => {
	return (
		<View style={[styles.container, iStyles.contentContainer]}>
			<Text responsiveSizes={[35, 35, 30, 25]} style={styles.title}>
				FAQ
			</Text>
			<View style={styles.contentContainer}>
				{faqList.map((item, index) => (
					<FaqItem key={index} title={item.title} content={item.content} />
				))}
			</View>
		</View>
	);
};

export default FaqSection;

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		marginBottom: 200,
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		marginBottom: 50,
	},
	contentContainer: {
		marginHorizontal: 15,
		width: '100%',
		maxWidth: 1000,
	},
});
