import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import InternalNavigation from 'components/Navigation/Internal';
import StormNavigation from 'components/Navigation/Storm';

interface Props {
	children?: ReactNode;
	style?: ViewStyle;
	contentContainerStyle?: ViewStyle;
}

export const CompactLayout: FC<Props> = ({
	children,
	style,
	contentContainerStyle,
}) => {
	return (
		<View style={[style, styles.container]}>
			<View style={styles.navigationContainer}>
				<StormNavigation />
				<InternalNavigation />
			</View>
			<View style={[styles.innerContainer, contentContainerStyle]}>
				{children}
			</View>
		</View>
	);
};

export default CompactLayout;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navigationContainer: {},
	innerContainer: {
		flex: 1,
	},
});
