import { customAlphabet } from 'nanoid';

const dictionary =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const nanoId = customAlphabet(dictionary, 9);
export const microId = customAlphabet(dictionary, 16);
export const nanoToken = customAlphabet(dictionary, 16);
