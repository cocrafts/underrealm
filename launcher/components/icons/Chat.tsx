import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
	withDots?: boolean;
}

export const ChatIcon: FC<Props> = ({ style, size, color, withDots }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			fill="none"
			stroke={color}
			strokeWidth={32}
			strokeLinecap="round"
			strokeLinejoin="round"
			viewBox="0 0 512 512"
		>
			<Path d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z" />
			{withDots && (
				<>
					<Circle cx="160" cy="216" r="32" />
					<Circle cx="256" cy="216" r="32" />
					<Circle cx="352" cy="216" r="32" />
				</>
			)}
		</Svg>
	);
};

ChatIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default ChatIcon;
