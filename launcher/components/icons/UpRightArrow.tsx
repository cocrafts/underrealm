import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ClipPath, Defs, G, Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const UpRightArrow: FC<Props> = ({ size, color }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 13 12" fill="none">
			<G clipPath="url(#clip0_850_8028)">
				<Path
					d="M12.0674 0H2.99944C2.57288 0 2.226 0.346875 2.226 0.773437C2.226 1.2 2.57288 1.54687 2.99944 1.54687H10.1971L1.06819 10.6781C0.765845 10.9805 0.765845 11.4703 1.06819 11.7727C1.37053 12.075 1.86038 12.075 2.16272 11.7727L11.2916 2.64141V9.83906C11.2916 10.2656 11.6385 10.6125 12.0651 10.6125C12.4916 10.6125 12.8385 10.2656 12.8385 9.83906V0.773437C12.8408 0.346875 12.494 0 12.0674 0Z"
					fill={color}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_850_8028">
					<rect
						width="12"
						height="12"
						fill={color}
						transform="translate(0.840576)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

UpRightArrow.defaultProps = {
	size: 24,
	color: '#ffffff',
};

export default UpRightArrow;
