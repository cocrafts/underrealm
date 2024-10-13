import type { FC } from 'react';
import { Fragment } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import BurgerIcon from 'components/icons/Burger';
import UnderRealmButton from 'components/Marketplace/Button';
import type { NavigationConfig } from 'components/Navigation/shared';
import {
	homeNav,
	localNavigations,
	navigationHeight,
} from 'components/Navigation/shared';
import { drawerHelper, navigate } from 'stacks/Browser/shared';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import AuthenticationBundle from '../AuthenticationBundle';

import NavigationItem from './Item';

interface Props {
	isHidingPlayButton?: boolean;
}

export const InternalNavigation: FC<Props> = ({ isHidingPlayButton }) => {
	const { styles, breakpoint } = useStyles(stylesheet);
	const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

	const backgroundResizeMode = isMobile ? 'cover' : 'repeat';
	const onNavigate = (item: NavigationConfig) => {
		const { route, params } = item;

		if (!route) return;

		navigate(route as never, params);
	};

	const mobileContentContainerStyle = isMobile
		? ({
				paddingLeft: 15,
				justifyContent: 'space-between',
			} as ViewStyle)
		: {};

	const mobileLogo = isMobile
		? ({
				marginRight: 0,
				marginLeft: 0,
			} as ImageStyle)
		: {};

	const rightContent = (
		<View style={styles.buttonsContainer}>
			<AuthenticationBundle />

			{!isMobile && !isHidingPlayButton && (
				<UnderRealmButton
					style={styles.button}
					onPress={() => navigate('Game')}
				>
					<Text style={styles.buttonText}>Play</Text>
				</UnderRealmButton>
			)}
		</View>
	);

	return (
		<ImageBackground
			style={styles.container}
			source={resources.navigation.bg}
			resizeMode={backgroundResizeMode}
		>
			<View
				style={[
					iStyles.contentContainer,
					styles.contentContainer,
					mobileContentContainerStyle,
				]}
			>
				{isMobile && (
					<TouchableOpacity
						style={[styles.buttonContainer, styles.burgerContainer]}
						onPress={() => {
							drawerHelper.navigation?.openDrawer();
						}}
					>
						<BurgerIcon size={26} />
					</TouchableOpacity>
				)}

				<Fragment>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => onNavigate(homeNav)}
					>
						<Image
							source={resources.navigation.logo}
							style={[styles.logo, mobileLogo]}
						/>
					</TouchableOpacity>
					{!isMobile && (
						<View style={styles.navigationContainer}>
							{localNavigations.map((item) => (
								<NavigationItem
									key={item.title}
									item={item}
									onNavigate={onNavigate}
								/>
							))}
						</View>
					)}
				</Fragment>

				<View style={styles.commandContainer}>
					<View style={styles.buttonContainer}>{rightContent}</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default InternalNavigation;

const logoHeight = 84;

const stylesheet = createStyleSheet({
	container: {
		backgroundColor: '#21150f',
		height: navigationHeight.local,
		paddingHorizontal: 15,
	},
	contentContainer: {
		flexDirection: 'row',
	},
	logo: {
		marginLeft: -24,
		marginRight: -64,
		width: (249 / 101) * logoHeight,
		height: logoHeight,
	},
	navigationContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	commandContainer: {
		flexDirection: 'row',
	},
	burgerContainer: {
		width: 38,
	},
	buttonContainer: {
		justifyContent: 'center',
		height: navigationHeight.local,
	},
	button: {
		width: 180,
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
	signInButtonText: {
		fontSize: 14,
	},
	signInButton: {
		paddingHorizontal: 20,
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
});
