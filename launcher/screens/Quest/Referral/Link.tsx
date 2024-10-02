import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import AncientPaper from 'components/icons/underRealm/AncientPaper';
// import UnderRealmButton from 'components/Marketplace/Button';
import { useProfile } from 'utils/hooks';
import resources from 'utils/resources';

export const ReferralLink = () => {
	const [isCopied, setIsCopied] = useState(false);
	const { styles } = useStyles(stylesheet);
	const { profile } = useProfile();
	const referralTitle = `${window.location.hostname}/quest?ref=${profile.referralCode}`;
	const referralLink = `${window.location.origin}/quest?ref=${profile.referralCode}`;

	const onCopy = () => {
		navigator.clipboard.writeText(referralLink);
		setIsCopied(true);
	};

	useEffect(() => {
		if (!isCopied) {
			return;
		}

		const copiedTimeout = setTimeout(() => setIsCopied(false), 3000);
		return () => {
			clearTimeout(copiedTimeout);
		};
	}, [isCopied]);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Your Referral Link:</Text>
			<View style={styles.linkBox}>
				<Text style={styles.link}>
					{profile.referralCode
						? referralTitle
						: 'Please sign-in to get your referral link'}
				</Text>
				<View style={styles.buttonGroup}>
					<TouchableOpacity onPress={onCopy} disabled={!profile.referralCode}>
						<View>
							<AncientPaper width={100} height={45} />
							<View style={styles.svgButton}>
								<Text>{isCopied ? 'Copied' : 'Copy Link'}</Text>
							</View>
						</View>
					</TouchableOpacity>
					{/* <UnderRealmButton
						title="Share"
						style={{ width: 140 }}
						isSubButton={!profile}
						disabled={!profile}
					/> */}
				</View>
			</View>
			<View style={styles.description}>
				<Text style={styles.descriptionText}>Get </Text>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						source={resources.quest.referral.uCoin}
						style={styles.coinImg}
					/>
					<Text style={styles.shadowText}> 80</Text>
				</View>
				<Text style={styles.descriptionText}> for each invited user</Text>
			</View>
		</View>
	);
};

const stylesheet = createStyleSheet({
	container: {
		marginTop: { xs: 18, md: 40 },
	},
	label: {
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 28,
		color: '#929292',
	},
	linkBox: {
		marginTop: { xs: 8, lg: 12 },
		flexDirection: 'row',
		alignItems: 'center',
		gap: { xs: 8, lg: 24 },
		borderColor: '#5A5A5A',
		borderWidth: 1,
		paddingVertical: 20,
		paddingHorizontal: 16,
		flexWrap: 'wrap',
	},
	link: {
		flex: 1,
	},
	buttonGroup: {
		flexDirection: 'row',
		gap: { xs: 8, lg: 24 },
	},
	svgButton: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	coinImg: {
		width: 24,
		height: 24,
	},
	description: {
		marginTop: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	descriptionText: {
		fontWeight: '500',
		lineHeight: 28,
	},
	shadowText: {
		fontFamily: 'Vollkorn',
		fontWeight: '500',
		fontSize: 18,
		lineHeight: 25,
		textShadowColor: '#FFF9A0',
		textShadowRadius: 5,
		textShadowOffset: {
			width: 0,
			height: 0,
		},
	},
});
