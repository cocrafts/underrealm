import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import { iStyles } from 'utils/styles';

export const CardDashboard: FC = () => {
	return (
		<ScrollLayout
			contentContainerStyle={[iStyles.contentContainer, styles.container]}
		>
			<Text>CardDashboard</Text>
		</ScrollLayout>
	);
};

export default CardDashboard;

const styles = StyleSheet.create({
	container: {},
});
