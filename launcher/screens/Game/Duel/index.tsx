import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import packageJSON from 'package.json';

const initialLayout: LayoutRectangle = {
	x: 0,
	y: 0,

	width: 0,
	height: 0,
};

const iFrameSrc = `/murg/index.html?v=${packageJSON.version}`;

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
	};

	useEffect(() => {
		console.log('Game Id:', params.id);
		console.log('Iframe source:', iFrameSrc);
	}, []);

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
