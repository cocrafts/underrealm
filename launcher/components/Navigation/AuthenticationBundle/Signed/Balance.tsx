import type { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';
import ShardIcon from 'components/icons/DiamondMineral';
import EyeIcon from 'components/icons/Eye';
import EyeClosedIcon from 'components/icons/EyeClosed';
import { formatNumber, memiToUSD } from 'utils/helper';
import { useSnapshot } from 'utils/hook';
import { appActions, appState } from 'utils/state/app';
import type { Profile } from 'utils/types/graphql';

import { styles } from './internal';

interface Props {
	profile: Profile;
}

export const Balance: FC<Props> = ({ profile }) => {
	const { mineral } = profile;
	const { privacy } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.inlineContainer}>
					<ShardIcon style={styles.inlineIcon} size={14} />
					<Text style={styles.primaryText}>
						{privacy ? '....... ' : formatNumber(mineral)}
					</Text>
				</View>
				<Text style={styles.secondaryText}>
					{privacy ? 'SECRET' : `${formatNumber(memiToUSD(mineral))} USD`}
				</Text>
			</View>
			<TouchableOpacity
				style={styles.commandContainer}
				onPress={() => appActions.setPrivacy(!privacy)}
			>
				{privacy ? (
					<EyeClosedIcon size={20} style={{ marginTop: 10 }} />
				) : (
					<EyeIcon size={20} />
				)}
			</TouchableOpacity>
		</View>
	);
};

export default Balance;
