const randomCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

export const generateRandomCode = (length: number) => {
	let code = '';
	for (let i = 0; i <= length; i++) {
		const randomChar =
			randomCharset[Math.floor(Math.random() * randomCharset.length)];
		code += randomChar;
	}
	return code;
};

export const AVATARS = [
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar1.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar2.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar3.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar4.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar5.png',
	'https://underrealm.s3.ap-south-1.amazonaws.com/avatars/avatar6.png',
];

export const getRandomAvatar = () => {
	return AVATARS[Math.floor(Math.random() * AVATARS.length)];
};
