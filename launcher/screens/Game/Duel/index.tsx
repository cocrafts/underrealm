import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const initialLayout: LayoutRectangle = {
	x: 0,
	y: 0,

	width: 0,
	height: 0,
};

const iFrameSrc = '/murg/index.html';

export const GameDuel: FC = () => {
	const route = useRoute();
	const params = route.params as { id: string };
	const iFrameRef = useRef<HTMLIFrameElement>(null);
	const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);
	const frameStyle = {
		border: 'none',
		width: layout.width,
		height: layout.height,
	};

	const onContainerLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
		console.log('Game Id:', params.id);
	};

	return (
		<View style={styles.container} onLayout={onContainerLayout}>
			{layout.width > 0 && (
				<iframe ref={iFrameRef} style={frameStyle} src={iFrameSrc}></iframe>
			)}
		</View>
	);
};

export default GameDuel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#060404',
	},
});
