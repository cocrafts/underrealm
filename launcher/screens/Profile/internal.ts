export const profileImages = [
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar1.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar2.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar3.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar4.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar5.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar6.png',
];

export enum Tabs {
	INFORMATION = 'Personal Information',
	ACCOUNT_LINKING = 'Account Linking',
	INVENTORY = 'Inventory',
}

export interface MenuProps {
	tab: Tabs;
	onSelectTab: (tab: Tabs) => void;
}
