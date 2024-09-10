const randomCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

export const generateReferralCode = (length: number) => {
	let code = '';
	for (let i = 0; i <= length; i++) {
		const randomChar =
			randomCharset[Math.floor(Math.random() * randomCharset.length)];
		code += randomChar;
	}
	return code;
};
