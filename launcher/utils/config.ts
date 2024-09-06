import { WalletAdapterNetwork as Network } from '@solana/wallet-adapter-base';

export interface Configs {
	solanaCluster: Network;
}

const configs: Configs = {
	solanaCluster:
		SOLANA_CLUSTER === 'mainnet' ? Network.Mainnet : Network.Devnet,
};

export default configs;
