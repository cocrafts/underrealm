import type { LayoutRectangle } from 'react-native';
import type { Amount } from '@metaplex-foundation/js';
import { WalletAdapterNetwork as Network } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import BN from 'bn.js';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import numeral from 'numeral';

export const resourceUri = (url: string): string => `/${url}`;
export const clusterUrl = (network: Network): string => {
	if (network === Network.Mainnet) {
		return 'https://solana-mainnet.g.alchemy.com/v2/bR8GpIKSKAKyUqb9hNV0HRRNgyjh9eIg';
	} else return clusterApiUrl(network);
};

export const shortenAddress = (address: string, length = 11): string => {
	const innerLength = length - 3;
	const headIndex = innerLength / 2;
	const tailIndex = address.length - innerLength / 2;

	return `${address.substring(0, headIndex)}...${address.substring(tailIndex)}`;
};

export const memiToUSD = (amount = 0, exchangeRate = 0.03): number => {
	return amount * exchangeRate;
};

export const formatNumber = (
	amount = 0,
	prefix = '',
	format = '0,0',
): string => {
	return `${prefix}${numeral(amount).format(format)}`;
};

export const parseAmount = (value?: Amount, forceDecimals?: number): number => {
	if (!value) return 0;
	const power = new BN(10).pow(
		new BN(forceDecimals || value.currency.decimals),
	);

	return value.basisPoints.div(power).toNumber();
};

export const idleLayout: LayoutRectangle = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

dayjs.extend(relativeTime);
export const day = dayjs;
export type DayJs = Dayjs;
