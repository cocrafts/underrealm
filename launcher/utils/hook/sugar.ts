import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
	Amount,
	CandyMachineV2,
	MintCandyMachineV2Output,
} from '@metaplex-foundation/js';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { getAssociatedTokenAddress as getAta } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { parseAmount } from 'utils/helper';

export interface SugarEffect {
	isLoading: boolean;
	isActive: boolean;
	itemsRemaining: number;
	itemsAvailable: number;
	isWhitelistUser: boolean;
	isPresale: boolean;
	isValidBalance: boolean;
	price?: Amount;
	discountPrice?: Amount;
	mintNft: () => Promise<MintCandyMachineV2Output>;
	candyRef: MutableRefObject<CandyMachineV2 | undefined>;
}

export const useWalletSugar = (sugarId: string): SugarEffect => {
	const mplRef = useRef<Metaplex>();
	const candyRef = useRef<CandyMachineV2>();
	const { publicKey, signMessage, signTransaction } = useWallet();
	const { connection } = useConnection();
	const [isLoading, setIsLoading] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [itemsRemaining, setItemsRemaining] = useState<number>(0);
	const [itemsAvailable, setItemsAvailable] = useState<number>(0);
	const [isWhitelistUser, setIsWhitelistUser] = useState(false);
	const [isPresale, setIsPresale] = useState(false);
	const [isValidBalance, setIsValidBalance] = useState(false);
	const [price, setPrice] = useState<Amount>();
	const [discountPrice, setDiscountPrice] = useState<Amount>();

	const refreshSugar = useCallback(async () => {
		setIsLoading(true);

		const address = new PublicKey(sugarId);
		const adapterIdentity = walletAdapterIdentity({
			publicKey,
			signMessage,
			signTransaction,
		});
		const mpl = Metaplex.make(connection).use(adapterIdentity);
		const sugar = await mpl.candyMachinesV2().findByAddress({ address });
		const goLiveTime = sugar.goLiveDate?.toNumber?.() || 0;
		const currentTime = new Date().getTime() / 1000;
		const whitelistSettings = sugar.whitelistMintSettings;
		const presaleEnabled = !!whitelistSettings?.presale;

		let isWhitelistUser = false;
		mplRef.current = mpl;
		candyRef.current = sugar;

		setIsActive(goLiveTime < currentTime);
		setIsPresale(presaleEnabled && goLiveTime > currentTime);
		setPrice(sugar.price);
		setDiscountPrice(sugar.whitelistMintSettings?.discountPrice as never);
		setItemsRemaining(sugar.itemsRemaining.toNumber());
		setItemsAvailable(sugar.itemsAvailable.toNumber());

		if (whitelistSettings?.mint && publicKey) {
			try {
				const address = await getAta(whitelistSettings.mint, publicKey);
				const balance = await connection.getTokenAccountBalance(address);

				isWhitelistUser = parseInt(balance.value.amount) > 0;
				setIsWhitelistUser(isWhitelistUser);
			} catch (e) {
				console.log('Could not fetch Whitelist token balance');
			}
		}

		if (sugar.tokenMintAddress && publicKey) {
			try {
				const address = await getAta(sugar.tokenMintAddress, publicKey);
				const balance = await connection.getTokenAccountBalance(address);
				const purchaseAmount = isWhitelistUser
					? sugar.whitelistMintSettings?.discountPrice
					: sugar.price;
				const purchasePrice = parseAmount(purchaseAmount as never, 6);

				setIsValidBalance(parseInt(balance.value.amount) > purchasePrice);
			} catch (e) {
				console.log('Could not fetch Mint token balance');
			}
		}

		setIsLoading(false);
	}, [sugarId, connection, publicKey, signTransaction]);

	const mintNft = useCallback((): Promise<MintCandyMachineV2Output> => {
		if (mplRef.current && candyRef.current && publicKey) {
			return mplRef.current?.candyMachinesV2().mint({
				candyMachine: candyRef.current,
				newOwner: publicKey,
			});
		} else {
			return Promise.resolve({} as never);
		}
	}, [publicKey]);

	useEffect(() => {
		refreshSugar();
	}, [refreshSugar]);

	return {
		isLoading,
		isActive,
		itemsRemaining,
		itemsAvailable,
		isWhitelistUser,
		isPresale,
		isValidBalance,
		price,
		discountPrice,
		mintNft,
		candyRef,
	};
};
