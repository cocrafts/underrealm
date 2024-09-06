export interface FaqItemConfig {
	title: string;
	content: string;
}

export const faqList: FaqItemConfig[] = [
	{
		title: 'How to buy?',
		content: `Step 1: Access [Under Realm Minting page](https://underrealm.io/mint)
Step 2: Select which Pack among 5 Packs you want to purchase
Step 3: Connect your Phantom/Solflare wallet
Step 4: Click on Buy button to complete purchasing`,
	},
	{
		title: 'When can I play?',
		content: `We are still working on Under Realm: Rise of Magic and aiming for Alpha go live by Q4, 2022.
You can subscribe to be on the Alpha waiting list [here](https://stormgate.io/alpha-sign-up) and be the first to learn about and play Under Realm before everyone else.
Limited slots available only!`,
	},
	{
		title: 'Can I sell my card?',
		content: `Yes, we are working on our own marketplace.
We will be also available on Secondary marketplace including [Magic Eden](https://magiceden.io/drops/underrealm), Opensea (to be update). `,
	},
	{
		title: 'What can I do with my NFTs?',
		content: `- Build deck and battle in Under Realm
- Craft: Create max. 3 child NFT Cards from 1 NFT
- Combine: Combine NFTs for higher rarity NFT Card
- Trade: Buy/Sell on marketplaces
- Used in future games developed by us`,
	},
	{
		title: 'Can I buy NFT after this?',
		content: `Yes, you can. There is 2 ways to do so:

- **Genesis NFTs:** However, Genesis NFT is very limited to issue in the future and this is one of the biggest minting event happening ever.
- **Normal NFTs:** Buy from other NFT owners on Marketplaces.`,
	},
];
