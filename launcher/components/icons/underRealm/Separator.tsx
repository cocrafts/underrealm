import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const Separator: FC<Props> = ({ style, size, color }) => {
	const height = (size as number) * 0.08256;

	return (
		<Svg
			style={style}
			width={size}
			height={height}
			fill="none"
			viewBox="0 0 751 62"
		>
			<Path
				fill={color}
				d="M9.25362 38.569H36.1273H55.9761C55.9761 38.569 67.7397 37.569 70.5597 38.569C73.3798 39.569 88.2808 39.6265 89.8604 39.6265C91.4471 39.6265 101.04 39.6265 101.04 39.6265H120.795C120.795 39.6265 132.111 39.9431 136.035 39.6265C139.958 39.31 170.467 39.6265 170.467 39.6265L208.282 39.7704L234.247 38.1229L256.26 39.5977L286.877 31.5258L312.214 27.9934L326.235 25.3315L352.373 17.274C352.373 17.274 361.252 12.9431 363.509 8.43945C364.072 10.1301 366.084 21.9502 369.878 26.4538C368.132 27.7488 380.444 38.4323 381.007 39.7632C381.007 39.9718 392.857 45.0366 392.857 45.0366H383.827L375.359 41.6553L365.197 32.0869L361.216 21.9502L313.267 33.7704L307.62 34.3315L301.972 35.461L294.637 37.1517L287.302 37.7128L277.71 40.5258L257.955 45.0294H248.924H242.152H233.122H222.96H193.439H149.017H129.262H105.555H83.5422H67.1699L55.9761 47.8423L44.025 43.8999L31.0425 42.7704H9.25362L0 38.2884L9.25362 38.569Z"
			/>
			<Path
				fill={color}
				d="M741.753 38.5676H714.879H695.031C695.031 38.5676 683.267 37.5676 680.447 38.5676C677.627 39.5676 662.726 39.6252 661.146 39.6252C659.56 39.6252 649.967 39.6252 649.967 39.6252H630.212C630.212 39.6252 618.896 39.9417 614.972 39.6252C611.048 39.3086 580.54 39.6252 580.54 39.6252L542.724 39.7691L516.76 38.1216L494.747 39.5964L464.123 31.5316L438.785 27.9993L424.764 25.3374L398.626 17.2798C398.626 17.2798 389.748 12.9489 387.49 8.44531C386.928 10.136 384.915 21.9561 381.122 26.4597C382.867 27.7547 370.555 38.4381 369.993 39.7691C369.993 39.9777 358.143 45.0424 358.143 45.0424H367.173L375.64 41.6611L385.802 32.0928L389.784 21.9561L437.732 33.7762L443.38 34.3374L449.027 35.4669L456.362 37.1575L463.697 37.7187L473.29 40.5316L493.045 45.0352H502.075H508.847H517.878H528.04H557.561H601.982H621.737H645.445H667.457H683.83L695.023 47.8482L706.974 43.9057L719.957 42.7762H741.753L751.007 38.2727L741.753 38.5676Z"
			/>
			<Path
				fill={color}
				d="M350.526 43.3525H335.286L330.771 39.9784L320.327 41.9424L297.327 28.1511L286.039 22.3813L274.463 25.4748L253.864 11.5396L246.104 0L251.744 14.6403L273.194 29.6978L285.448 27.7194L310.59 39.2734L316.223 44.0935L325.693 43.9137L333.591 47.8561L350.526 43.3525Z"
			/>
			<Path
				fill={color}
				d="M401.533 43.3525H416.773L421.295 39.9784L431.732 41.9424L454.733 28.1511L466.027 22.3813L477.596 25.4748L498.202 11.5396L505.963 0L500.315 14.6403L478.865 29.6978L466.611 27.7194L441.469 39.2734L435.843 44.0935L426.373 43.9137L418.468 47.8561L401.533 43.3525Z"
			/>
			<Path
				fill={color}
				d="M475.743 35.4671L479.876 37.3016L486.656 33.9203H500.576L514.878 37.3016L535.571 41.8052L519.018 33.9203L509.981 32.4239L500.951 29.6973L494.928 31.2944L485.898 32.4239L470.096 35.4671H475.743Z"
			/>
			<Path
				fill={color}
				d="M273.195 35.4671L269.055 37.3016L262.282 33.9203H248.362L234.06 37.3016L213.367 41.8052L229.92 33.9203L238.95 32.4239L247.987 29.6973L254.002 31.2944L263.04 32.4239L278.842 35.4671H273.195Z"
			/>
			<Path
				fill={color}
				d="M118.991 57.6326L114.599 53.3016L104.321 54.3304L86.5565 47.6038L69.9606 36.3736L41.666 17.9707L59.0409 40.4959L73.8265 44.9635L80.6062 55.4743L94.9879 57.7837L106.802 60.3664L130.509 61.9995L118.991 57.6326Z"
			/>
			<Path
				fill={color}
				d="M624.038 57.6326L628.431 53.3016L638.716 54.3304L656.473 47.6038L673.076 36.3736L701.364 17.9707L683.996 40.4959L669.21 44.9635L662.423 55.4743L648.049 57.7837L636.235 60.3664L612.527 61.9995L624.038 57.6326Z"
			/>
			<Path
				fill={color}
				d="M323.553 34.9136L338.858 30.5898C338.858 30.5898 346.575 29.8848 347.325 29.6977C348.075 29.5107 359.37 27.0215 359.37 27.0215L362.19 32.6546L368.587 38.4747L358.137 41.8057L348.97 38.2877L337.913 40.9136L323.553 34.9136Z"
			/>
			<Path
				fill={color}
				d="M427.404 34.9136L412.099 30.5898C412.099 30.5898 404.382 29.8848 403.632 29.6977C402.881 29.5107 391.587 27.0215 391.587 27.0215L388.767 32.6546L382.369 38.4747L392.82 41.8057L400.436 38.4244L413.044 40.9136L427.404 34.9136Z"
			/>
		</Svg>
	);
};

Separator.defaultProps = {
	size: 751,
	color: '#fff',
};

export default Separator;