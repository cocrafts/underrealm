import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import {
	Image,
	ImageBackground,
	Modal,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import { idleLayout } from 'utils/helper';
import resources from 'utils/resources';

import DropdownItem from './DropdownItem';

interface Props {
	data: (string | number)[];
	onSelect: (index: number) => void;
	selectedIndex: number;
	placeholder: string;
	containerStyle?: StyleProp<ViewStyle>;
}

const Dropdown: FC<Props> = ({
	data,
	onSelect,
	selectedIndex,
	placeholder,
	containerStyle,
}) => {
	const [layout, setLayout] = useState(idleLayout);
	const [dropdownPosition, setDropdownPosition] = useState<{
		top: number;
		left: number;
	}>({ top: 0, left: 0 });
	const [visible, setVisible] = useState<boolean>(false);
	const [dropdownHeight, setDropdownHeight] = useState<number>(0);
	const ref = useRef<View>(null);

	const leftSide = {
		width: 3,
		top: -3,
		height: dropdownHeight,
		position: 'absolute',
		left: -3,
		transform: [{ rotateY: '180deg' }],
	} as ImageStyle;

	const rightSide = {
		width: 4,
		top: -3,
		height: dropdownHeight,
		position: 'absolute',
		right: -3,
	} as ImageStyle;

	const showDropdown = () => {
		ref?.current?.measure((_fx, _fy, w, h, px, py) => {
			setDropdownPosition({
				top: py + h + 8,
				left: px + 2,
			});
			setVisible(true);
		});
	};

	const toggleDropdown = (): void => {
		visible ? setVisible(false) : showDropdown();
	};

	const renderDropDown = () => {
		return (
			<Modal visible={visible} transparent>
				<TouchableOpacity
					style={{ width: '100%', height: '100%' }}
					onPress={() => setVisible(false)}
				>
					<View
						style={{
							...styles.dropdownContainer,
							...dropdownPosition,
							width: layout.width - 2,
						}}
						onLayout={(e) => setDropdownHeight(e.nativeEvent.layout.height)}
					>
						<Image
							source={resources.cardLibrary.dropdownSide}
							style={leftSide}
							resizeMode="stretch"
						/>
						<Image
							source={resources.cardLibrary.dropdownSide}
							style={rightSide}
							resizeMode="stretch"
						/>
						{data.map((value, index) => {
							const onPressItem = () => {
								onSelect(index);
								setVisible(false);
							};

							return (
								<DropdownItem
									key={index}
									onPress={onPressItem}
									label={value.toString()}
								/>
							);
						})}
					</View>
				</TouchableOpacity>
			</Modal>
		);
	};

	return (
		<View
			style={containerStyle}
			onLayout={(e) => setLayout(e.nativeEvent.layout)}
			ref={ref}
		>
			<TouchableOpacity onPress={toggleDropdown}>
				<ImageBackground
					source={
						selectedIndex > 0
							? resources.cardLibrary.dropdownButtonActive
							: resources.cardLibrary.dropdownButtonNormal
					}
					style={styles.container}
				>
					<Image source={resources.cardLibrary.arrow} style={styles.arrow} />
					<Text style={styles.labelButton} responsiveSizes={[12]}>
						{selectedIndex > -1 ? data[selectedIndex] : placeholder}
					</Text>
				</ImageBackground>
			</TouchableOpacity>
			{renderDropDown()}
		</View>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingHorizontal: 10,
		justifyContent: 'center',
		width: 163,
		height: 46,
	},
	labelButton: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: '600',
	},
	arrow: {
		width: 10,
		height: 6,
		position: 'absolute',
		right: 20,
	},
	dropdownContainer: {
		position: 'absolute',
		backgroundColor: '#0c0907',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderColor: '#644d3d',
		borderWidth: 3,
	},
});
