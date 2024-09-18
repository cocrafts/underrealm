import type { FC } from 'react';
import { Mask, Path, Svg } from 'react-native-svg';

interface Props {
	width?: number;
	height?: number;
	fillColor?: string;
	strokeColor?: string;
}

export const AncientPaper: FC<Props> = ({
	width = 90,
	height,
	fillColor = '#190E0E',
	strokeColor = '#595959',
}) => {
	const innerHeight = height || (width * 40) / 90;

	return (
		<Svg width={width} height={innerHeight} viewBox="0 0 90 40" fill="none">
			<Mask id="path-1-inside-1_847_4479" fill="white">
				<Path d="M88.0351 0.211704L88.0589 0L64.8631 0.6436L64.6983 0.728542L61.9698 0.687382L61.6987 0.512268L42.2898 0.390736L42.2678 0.166618L42.2697 0.390736L38.3198 0.365906L35.8843 0.737038L35.0804 0.517494L33.8516 0.518803L33.4616 0.439739L21.7254 0.497894L11.3187 0.337154L11.3754 0.499203L10.4086 0.477638L10.1723 0.293377L0.465126 0.0842896L0 0.0731812L1.14633 11.2091L2.31647 11.296L2.28351 11.9468L1.73781 11.9912L1.28367 12.0285L0.554855 21.2761H0.556686L0.554855 21.2996L1.57484 21.3231L1.50891 21.6655L0.554855 21.8027C0.554855 21.8027 0.558517 21.8073 0.56218 21.825L0.554855 21.8263C0.554855 21.8263 0.628103 21.9406 0.628103 23.1115C0.628103 23.5062 0.618947 24.0191 0.595141 24.6849C0.564011 25.5853 0.554855 27.6089 0.554855 29.8984C0.554855 30.4649 0.554855 31.0477 0.556686 31.6338L0.554855 31.6332C0.560348 35.0956 0.587816 38.8957 0.595141 39.7837C0.595141 39.9242 0.595141 40 0.595141 40L8.93811 39.9268L9.80793 39.5054L10.6228 39.4008L10.0844 39.9033H10.1101L10.0844 39.9268L33.143 39.6341V39.6106V39.5289V39.3283L35.0602 39.2924L35.4356 39.6341L41.669 39.7661L41.8357 39.5322L43.7273 39.5106L43.9159 39.7661C43.9159 39.7661 48.0874 39.7805 60.5103 39.5903C72.9332 39.4002 87.5553 39.9268 87.5553 39.9268L87.5517 39.9033H87.5553L87.5425 39.7994L87.5242 39.6557C87.7458 39.6668 87.9436 39.6766 88.1065 39.6851L88.1047 39.6772C88.5497 39.6994 88.8097 39.7132 88.8097 39.7132L88.7841 39.4106H89.2547H89.9103C89.9103 39.4106 88.5955 30.6511 88.5955 30.4368C88.5955 30.2218 88.687 29.0516 88.687 29.0516L88.2274 28.9804V28.9778L87.8612 28.9209L87.7989 28.2172L88.6705 26.6902L89.2968 20.2914L88.5094 20.166C88.5094 20.1653 88.5094 20.164 88.5094 20.1634L88.4563 20.1549H88.5076H89.1741C89.1741 20.1549 89.2968 15.0727 89.2053 15.0727C89.176 15.0727 88.7932 15.0498 88.275 15.0191V15.0185C88.1248 15.0093 87.9655 14.9995 87.7989 14.9897C87.7897 14.8414 87.7806 14.7016 87.7733 14.5696L88.2439 14.5173C88.2439 14.5166 88.2439 14.516 88.2439 14.5153L89.2034 14.4088L89.0514 13.0628L87.7311 12.9367C87.7311 12.9361 87.7293 12.9354 87.7293 12.9348L87.2092 12.8851C87.114 12.7825 87.0261 12.6865 86.9712 12.6205L87.4198 12.5898C87.4198 12.5898 87.4198 12.5891 87.4198 12.5885L89.2053 12.4669L90 1.04283H89.9835H89.5349L89.7253 0.164661L88.0351 0.211704Z" />
			</Mask>
			<Path
				d="M88.0351 0.211704L88.0589 0L64.8631 0.6436L64.6983 0.728542L61.9698 0.687382L61.6987 0.512268L42.2898 0.390736L42.2678 0.166618L42.2697 0.390736L38.3198 0.365906L35.8843 0.737038L35.0804 0.517494L33.8516 0.518803L33.4616 0.439739L21.7254 0.497894L11.3187 0.337154L11.3754 0.499203L10.4086 0.477638L10.1723 0.293377L0.465126 0.0842896L0 0.0731812L1.14633 11.2091L2.31647 11.296L2.28351 11.9468L1.73781 11.9912L1.28367 12.0285L0.554855 21.2761H0.556686L0.554855 21.2996L1.57484 21.3231L1.50891 21.6655L0.554855 21.8027C0.554855 21.8027 0.558517 21.8073 0.56218 21.825L0.554855 21.8263C0.554855 21.8263 0.628103 21.9406 0.628103 23.1115C0.628103 23.5062 0.618947 24.0191 0.595141 24.6849C0.564011 25.5853 0.554855 27.6089 0.554855 29.8984C0.554855 30.4649 0.554855 31.0477 0.556686 31.6338L0.554855 31.6332C0.560348 35.0956 0.587816 38.8957 0.595141 39.7837C0.595141 39.9242 0.595141 40 0.595141 40L8.93811 39.9268L9.80793 39.5054L10.6228 39.4008L10.0844 39.9033H10.1101L10.0844 39.9268L33.143 39.6341V39.6106V39.5289V39.3283L35.0602 39.2924L35.4356 39.6341L41.669 39.7661L41.8357 39.5322L43.7273 39.5106L43.9159 39.7661C43.9159 39.7661 48.0874 39.7805 60.5103 39.5903C72.9332 39.4002 87.5553 39.9268 87.5553 39.9268L87.5517 39.9033H87.5553L87.5425 39.7994L87.5242 39.6557C87.7458 39.6668 87.9436 39.6766 88.1065 39.6851L88.1047 39.6772C88.5497 39.6994 88.8097 39.7132 88.8097 39.7132L88.7841 39.4106H89.2547H89.9103C89.9103 39.4106 88.5955 30.6511 88.5955 30.4368C88.5955 30.2218 88.687 29.0516 88.687 29.0516L88.2274 28.9804V28.9778L87.8612 28.9209L87.7989 28.2172L88.6705 26.6902L89.2968 20.2914L88.5094 20.166C88.5094 20.1653 88.5094 20.164 88.5094 20.1634L88.4563 20.1549H88.5076H89.1741C89.1741 20.1549 89.2968 15.0727 89.2053 15.0727C89.176 15.0727 88.7932 15.0498 88.275 15.0191V15.0185C88.1248 15.0093 87.9655 14.9995 87.7989 14.9897C87.7897 14.8414 87.7806 14.7016 87.7733 14.5696L88.2439 14.5173C88.2439 14.5166 88.2439 14.516 88.2439 14.5153L89.2034 14.4088L89.0514 13.0628L87.7311 12.9367C87.7311 12.9361 87.7293 12.9354 87.7293 12.9348L87.2092 12.8851C87.114 12.7825 87.0261 12.6865 86.9712 12.6205L87.4198 12.5898C87.4198 12.5898 87.4198 12.5891 87.4198 12.5885L89.2053 12.4669L90 1.04283H89.9835H89.5349L89.7253 0.164661L88.0351 0.211704Z"
				fill={fillColor}
				stroke={strokeColor}
				strokeWidth="1.5"
				mask="url(#path-1-inside-1_847_4479)"
			/>
		</Svg>
	);
};

export default AncientPaper;