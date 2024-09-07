import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const UnderRealmIcon: FC<Props> = ({ style, size, color }) => {
	const height = (size as number) * 1.824859;

	return (
		<Svg
			style={style}
			width={size}
			height={height}
			fill="none"
			viewBox="0 0 177 323"
		>
			<Path
				fill={color}
				d="M78.3848 16.0227L78.4448 16.0527C78.6547 16.2324 78.8346 16.4121 79.0145 16.5918L79.5542 17.0709L80.9034 17.6699L81.3532 19.1674L82.2227 20.4552L82.2527 20.545C83.0622 21.8328 83.7518 23.2105 84.3215 24.6181L84.3515 24.648L84.3815 24.7379C84.8612 25.9358 85.251 27.1338 85.5508 28.3917L85.5808 28.4516H86.2704V29.5896V31.0272V31.9855V32.0754C86.3004 32.315 86.3304 32.5546 86.3604 32.7942L86.4503 33.6926V33.8424C86.5103 34.651 86.5703 35.4297 86.5703 36.1784V36.2383V42.5875L85.8207 43.6657L85.5209 44.3844C85.4009 44.7139 85.281 45.0433 85.1311 45.3428L85.0411 45.6123L83.9917 48.3676L82.4626 48.9666L82.1627 49.2062C81.743 49.5956 81.3232 49.925 80.9034 50.1945L80.6935 50.3742L80.3937 51.2727H79.2244C78.6547 51.5722 78.2649 51.7219 78.2649 51.7219C78.2649 53.5189 78.7446 55.0163 79.4642 56.2742L80.8735 57.532L81.8629 59.0295C84.5014 61.1559 87.7396 61.9645 88.5192 62.1442C88.909 62.0543 89.9584 61.8148 91.2477 61.3056L92.417 60.497L94.0061 59.898C94.4559 59.5985 94.9056 59.2691 95.3254 58.9097L95.7152 57.532H96.7046C97.9339 56.0645 98.7735 54.1478 98.7735 51.692C98.7735 51.692 92.2671 49.1463 90.9778 42.857C90.8879 42.4377 90.8279 41.9885 90.7379 41.5093L90.2282 39.7423L90.0183 37.586L90.5281 35.9688C90.678 30.3683 92.1771 24.0191 95.7751 19.1973L96.3748 17.7298L99.4331 15.5136C99.4331 15.5136 99.4031 15.5435 99.4031 15.5735C99.673 15.3638 99.9128 15.1542 100.183 14.9745C100.183 14.8248 100.363 12.0395 98.5936 9.19434L97.3642 8.47557L96.8245 7.06797C96.7946 7.03802 96.7946 7.03802 96.7646 7.00807L95.2954 5.9299H93.9162L93.2565 4.73194C92.9867 4.61215 92.7168 4.49235 92.417 4.37255C92.387 4.37255 92.357 4.34261 92.3271 4.31266L92.0572 4.19286L91.3676 3.74363C90.9778 3.47408 90.618 3.14465 90.2882 2.78526C89.5086 1.91674 88.879 1.16801 88.5792 0C88.2793 1.16801 87.6497 1.94669 86.8701 2.78526C86.2704 3.44414 85.5508 3.98322 84.7113 4.31266C83.6619 4.73194 82.7324 5.21113 81.9528 5.72026L81.9229 6.25934L79.944 7.3974C79.914 7.42735 79.884 7.48725 79.824 7.5172L79.0145 8.50552C78.9845 8.56542 78.9545 8.59536 78.9245 8.65526L78.8046 9.88317L77.7552 10.7816C76.8857 12.9679 77.0056 14.7948 77.0056 14.9146C77.4554 15.274 77.9351 15.6334 78.3848 16.0227Z"
			/>
			<Path
				fill={color}
				d="M96.3733 287.997L95.9835 283.714V280.988L96.3733 277.185V273.052V264.307L95.8936 263.588L95.4138 261.611L96.0135 259.635L96.3733 256.49L96.1934 247.176L96.0135 245.349V241.396L96.1934 238.101V234.867L96.0135 232.651V230.075V227.949L96.3733 226.032V162.121C96.3733 159.186 96.3733 157.179 96.4333 154.783C96.7031 145.589 100.271 138.012 104.379 132.232V132.202L105.278 129.626L108.007 127.081L109.176 126.392C113.614 121.72 117.482 119.264 117.392 119.354C107.197 120.522 101.92 117.137 98.652 115.131L101.44 112.435L102.7 112.196L103.329 111.836C103.479 111.747 103.599 111.687 103.749 111.597L107.017 109.77L111.155 108.901L111.515 108.872C112.264 108.722 113.044 108.602 113.854 108.512L114.273 108.452L118.261 107.733L120.3 108.542H120.33C121.109 108.632 121.919 108.752 122.759 108.931C119.85 104.199 118.321 100.096 117.751 96.5924V96.5325C117.571 95.3346 117.482 94.2564 117.512 93.2082L117.482 92.8787L116.132 91.1118L116.942 90.3331L117.751 88.6859H118.111C119.67 83.2352 123.778 80.3301 125.787 79.4916C139.309 73.8611 145.546 86.0803 145.546 86.0803C145.546 86.0803 145.366 83.6245 143.297 79.252L142.038 77.6647L141.198 76.5865V75.3286C141.168 75.2987 141.168 75.2687 141.138 75.2388L139.759 73.0825C139.729 73.0525 139.699 73.0226 139.699 72.9627L138.26 72.0342L137.72 70.1475C137.241 69.4886 136.701 68.8297 136.161 68.1109L134.662 66.7333V66.314C134.362 65.9845 134.122 65.6551 133.822 65.2957L133.193 65.6551L131.034 63.0196L128.335 61.0729V59.5455C123.598 54.9034 125.877 49.0334 126.117 47.0867C125.997 48.3745 122.279 52.3278 116.102 51.8786L114.243 52.4176L111.395 51.7288L110.076 50.1715L110.196 50.2014C107.437 48.8837 104.439 46.7573 101.171 43.3431C101.171 43.3431 102.73 45.9786 104.319 50.441V50.4111L107.077 54.9633V61.7018L108.636 63.0495L113.104 67.3323L107.317 63.978C107.437 65.3556 107.527 66.7932 107.557 68.2906L108.067 71.9144L107.587 73.4718L107.107 77.485L106.208 80.7195L106.088 81.1687C105.848 82.1271 105.548 83.1154 105.248 84.1037L105.008 84.6128L103.809 88.7158L102.73 90.8722L102.22 91.3514C101.98 91.8305 101.74 92.2798 101.47 92.759V96.7122L97.5726 100.126L96.4033 101.594L92.3555 105.338L92.4155 105.248C91.1562 106.595 89.807 107.943 88.3678 109.291C85.9991 107.134 83.9602 104.948 82.1013 102.792L77.9336 105.338L80.722 101.594L77.0041 98.2995C77.0041 98.2995 73.9458 90.393 73.7359 89.9138C73.7059 89.8539 73.616 89.6443 73.4961 89.3747C72.9564 88.1768 72.4466 86.9788 72.0269 85.7808C71.4572 84.3732 70.9475 83.1154 70.9475 83.1154L70.5577 80.8692C70.018 78.7428 69.6582 76.6464 69.4183 74.6099L68.5188 69.6683L68.9986 59.6054L70.9175 54.9334C72.8064 47.7756 75.475 43.2832 75.475 43.2832C71.5771 47.3563 68.0091 49.6324 64.8909 50.8304V51.7887L61.3828 52.3577H57.2451L56.6754 51.5192C52.8376 50.5908 50.6188 48.0451 50.5289 47.0268C50.7088 48.704 52.4478 53.3161 49.8692 57.509H49.8992L48.1602 60.444H47.3806C47.1707 60.6536 46.9609 60.8932 46.721 61.1029L44.5322 63.4089V64.3673L43.063 66.1343L40.7243 67.7815C40.7243 67.8114 40.6944 67.8114 40.6944 67.8414L36.9165 72.9327C31.3696 81.1986 31.0098 86.1103 31.0098 86.1103C31.0098 86.1103 33.4084 81.4083 38.4756 79.1921H38.5056C39.1952 78.8926 39.9448 78.653 40.7243 78.4733L41.6838 78.1738L46.2713 77.7246L49.4795 79.0723L49.6893 79.1921C50.0491 79.3118 50.4089 79.4017 50.7687 79.5814C51.5183 79.9108 52.5677 80.5098 53.6771 81.4382L53.7371 81.4682L56.4656 83.8042L57.6049 86.4098L59.1341 88.7757V89.7641V91.1417L59.5239 94.4062L58.5344 99.0482L57.2751 102.223C57.2451 102.313 57.2151 102.373 57.1852 102.462L57.0652 102.762L55.9858 106.565L54.4867 107.943L54.4267 107.973C54.2168 108.332 54.0369 108.692 53.827 109.051C68.5188 106.026 77.9336 115.221 77.9336 115.221C77.8137 115.311 77.6637 115.4 77.5138 115.49L76.4344 116.838L74.2756 117.287H74.2456C72.4466 118.156 70.2279 118.934 67.4694 119.354L66.5399 119.773H63.6016L63.2118 119.593C61.9525 119.593 60.6332 119.533 59.194 119.384C59.1341 119.324 62.0125 121.151 65.6704 124.655L72.5966 131.363L75.385 137.383C76.1046 138.731 76.7642 140.138 77.3339 141.636L77.6038 142.205L77.6338 142.384C78.7731 145.379 79.5527 148.644 79.9125 152.148L80.0024 152.537L80.0324 153.436C80.0624 153.885 80.1224 154.334 80.1524 154.783C80.2123 156.97 80.2123 158.826 80.2123 161.342L80.5121 174.4L81.5616 177.035V177.964L80.692 181.408V189.854L81.5616 191.111V194.675L81.0518 197.82C81.0518 197.82 81.4116 208.692 81.0518 209.41C80.722 210.099 80.692 217.856 80.692 218.844V218.934L81.5616 221.719L80.692 223.456V229.865L80.3323 236.035V237.562L80.1823 238.521L80.0624 240.737L80.0924 244.96L80.3323 246.547V249.422V249.871L80.1224 251.848L80.752 253.316V254.124L80.2123 254.633V258.676L80.752 263.888L80.4822 268.799L80.692 274.37L80.752 276.496L80.5721 279.192L80.752 280.509V281.228V282.037V283.295L80.4222 285.421L80.2723 292.219L70.5577 289.584L70.8276 288.146C67.6193 286.439 64.2612 284.313 61.6227 281.677L76.4644 304.169L79.073 307.074L79.9425 309.44L84.1101 315.759H85.2195L86.9885 315.34L90.0168 312.794L87.2884 316.298L85.9091 316.778L85.4594 317.766L88.2478 322.019H88.3378L99.1318 305.637L100.451 303.63V302.522L101.051 300.276L102.22 299.796L104.649 297.281L114.963 281.617C109.026 287.457 99.5515 291.381 96.3433 292.399V287.997H96.3733Z"
			/>
			<Path
				fill={color}
				d="M169.742 159.065L167.823 158.376H166.264L164.195 160.652L161.077 160.862L154.81 166.342L160.777 159.903L163.235 159.095L164.225 157.268L163.745 155.74V153.644H163.775C160.627 149.78 158.318 144.749 158.468 138.669C158.798 129.505 162.666 123.875 166.713 120.43L165.634 117.735L168.902 118.783C172.68 116.238 176.068 115.519 176.068 115.519C176.068 115.519 176.248 112.015 174.119 108.75L173.43 108.271L170.671 105.426C170.611 105.396 170.551 105.366 170.521 105.336L166.833 104.168L163.805 103.689L161.646 103.06L160.687 101.533L160.087 100.993C159.997 100.934 159.907 100.844 159.847 100.784L159.817 100.754L159.518 100.395C159.338 100.185 159.158 100.005 159.038 99.7955L159.008 99.7656V99.7356C158.288 98.6275 157.958 97.4595 157.868 96.3214V96.2915C157.659 93.1469 159.158 90.122 159.428 89.0438C152.861 98.9869 144.196 96.9204 144.226 96.9504C133.132 95.423 133.702 83.1738 133.702 83.1738C133.702 83.2038 133.612 83.3535 133.462 83.683C133.462 83.683 133.462 83.7129 133.432 83.7429C133.372 83.8926 133.282 84.0723 133.192 84.3119C133.192 84.3418 133.162 84.3718 133.162 84.4017C132.503 86.1388 131.453 89.7926 131.723 95.423C132.173 99.6158 132.563 101.892 132.593 102.132C132.593 102.161 132.593 102.161 132.593 102.191L133.342 103.27L134.332 106.684L134.901 110.338C134.901 110.368 134.901 110.368 134.931 110.397L139.399 111.536L137.36 114.98L137.57 119.622L138.709 122.766L137.93 129.894V129.984C137.93 130.074 137.93 130.134 137.93 130.224L137.39 139.208L136.221 143.701L134.781 146.216L133.882 151.547L132.443 151.787C131.423 153.883 130.224 155.95 128.875 157.956L131.243 164.066L125.337 162.539C123.747 164.366 121.948 166.103 119.97 167.75L119.22 169.098C119.22 169.098 116.521 173.62 116.372 174.069C116.282 174.399 114.603 172.931 113.703 172.092C112.774 172.632 111.814 173.171 110.795 173.68L109.116 175.057L104.348 177.034H102.909L102.699 181.437L103.119 188.475V193.416L102.699 194.345V200.334L103.119 202.61V208.181L102.699 209.199V219.681L103.569 217.495L104.858 214.171L109.655 208.211L118.98 201.502L127.765 196.082L128.755 196.83C134.811 194.404 139.848 193.716 142.277 193.506L142.427 193.087L143.596 191.769L145.545 192.428V194.704L144.916 195.273C146.475 198.987 146.085 204.168 152.441 206.624C152.441 206.624 151.872 201.113 157.539 196.082L157.599 196.022C158.198 195.513 158.828 194.973 159.547 194.494C160.897 193.356 164.015 190.93 167.193 186.737L169.772 181.227L170.971 180.808C173.46 176.016 175.469 169.876 176.008 162.06C174.179 161.55 171.961 160.532 169.742 159.065Z"
			/>
			<Path
				fill={color}
				d="M62.2823 205.575C63.8414 206.922 65.4006 208.42 66.8997 210.067L68.4889 210.606L70.5277 213.391L69.928 214.14L69.8681 214.08C71.1874 215.997 72.4766 217.884 73.646 219.801V212.613L73.1962 210.187L73.646 204.227L73.1962 201.502V196.021L73.646 191.079V185.539L73.1962 182.574L72.7465 179.489L73.4661 176.824C72.1168 176.374 70.8575 175.865 69.6282 175.356L64.0213 173.529L59.8537 170.504L57.455 168.258L51.7882 163.946L50.319 161.789L48.3701 159.274L47.7104 158.615L44.862 159.274L46.0914 156.968L44.862 155.71V153.014C43.6327 150.678 42.6133 148.282 41.8037 145.916L40.9942 145.407L35.6272 143.461L39.9148 139.208V139.178C39.8548 138.968 39.8248 138.729 39.7949 138.519L39.495 137.021L39.465 136.902C39.4351 136.752 39.4051 136.602 39.4051 136.452L39.3451 136.033L39.2252 135.195C39.1952 134.895 39.1352 134.596 39.1052 134.296V134.206L37.1563 129.414L38.6555 125.132V125.102C38.7454 121.747 39.1052 118.813 39.615 116.536C39.8848 115.368 40.1547 114.38 40.4545 113.601C42.6133 108.42 43.8126 103.928 44.4423 100.064L44.922 95.8716C44.922 95.7518 44.952 95.632 44.952 95.5421V93.6853L44.862 90.4208C44.4123 85.629 43.0031 83.2031 43.0031 83.1133C43.0031 83.1133 43.3329 90.2112 38.5655 94.2543L38.0558 95.4523L35.7171 96.4406H34.5478C33.9481 96.6203 33.2885 96.77 32.5989 96.8599L32.7788 102.101L31.0997 97.0396C28.4012 97.1594 22.2546 96.5005 17.2774 88.9833C17.4873 89.762 18.3268 91.5889 18.6866 93.7152V93.7452C18.8366 94.6736 18.9265 95.6619 18.8066 96.6502L19.3763 97.9081L18.1469 99.6751L17.6072 99.8548C16.6778 101.202 15.1186 102.43 12.66 103.329C-0.0229228 104.587 0.576741 115.488 0.576741 115.488H3.1553L4.0548 115.758L5.04425 114.59V115.907L4.74442 115.937L5.19417 116.087L6.51343 117.016L6.93319 118.214V118.243C11.6406 121.149 17.3074 126.839 18.027 137.561L18.057 137.591V137.98C18.057 138.19 18.117 138.399 18.117 138.609C18.117 139.208 18.087 139.807 18.057 140.376V144.599L16.7077 146.815C15.5984 149.78 13.9193 152.385 11.9704 154.542L10.1414 157.986L8.07256 159.274L6.96318 158.974C4.71443 160.502 2.46569 161.52 0.576741 161.999C0.936541 167.06 1.89601 171.403 3.21527 175.147L6.66335 182.604C6.69333 182.664 6.72331 182.694 6.7533 182.754L10.0515 186.377L10.4412 188.025C13.2297 191.409 15.8382 193.445 17.0376 194.464C24.8932 199.855 24.1736 206.593 24.1736 206.593L26.4523 205.395H26.4823L27.2619 204.227L28.6111 203.329L29.9004 200.903L30.8299 197.878C31.2796 196.201 31.7294 194.613 32.7788 193.386C32.7788 193.386 35.4173 193.386 39.525 194.224H39.555L45.1019 195.123L47.3207 194.074L50.6188 193.356L54.6366 187.396L51.5183 194.613L47.2607 195.662L48.46 196.979C51.5183 198.237 54.7865 199.944 58.1146 202.25L58.1746 202.28L61.6827 203.209L62.2823 205.575Z"
			/>
		</Svg>
	);
};

UnderRealmIcon.defaultProps = {
	size: 177,
	color: '#fff',
};

export default UnderRealmIcon;