import type { FC } from 'react';
import { useState } from 'react';
import type { LayoutRectangle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { Markdown, Text } from '@metacraft/ui';
import Accordion from 'components/Marketplace/Accordion';
import { idleLayout } from 'utils/helper';
import resources from 'utils/resources';

interface Props {
	title: string;
	content: string;
}

export const FaqItem: FC<Props> = ({ title, content }) => {
	const [layout, setLayout] = useState<LayoutRectangle>(idleLayout);
	const ratioTop = 71 / 1160;
	const ratioBottom = 33 / 1160;
	const accordionTitle = (
		<Text responsiveSizes={[18]} style={styles.title}>
			{title}
		</Text>
	);

	return (
		<View
			style={styles.container}
			onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}
		>
			<Image
				source={resources.marketplace.faq.middle}
				style={{
					// width: layout.width,
					position: 'absolute',
					top: layout.width * ratioTop,
					bottom: layout.width * ratioBottom,
					left: 0,
					right: 0,
				}}
				resizeMode="repeat"
			/>
			<Image
				source={resources.marketplace.faq.top}
				style={{
					height: layout.width * ratioTop,
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
				}}
			/>
			<Image
				source={resources.marketplace.faq.bottom}
				style={{
					height: layout.width * ratioBottom,
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
				}}
			/>

			<Accordion title={accordionTitle}>
				<Markdown content={content} />
			</Accordion>
		</View>
	);
};

export default FaqItem;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginBottom: 20,
		padding: 30,
		marginHorizontal: 15,
	},
	title: {
		paddingBottom: 10,
		color: '#beafa6',
	},
});
