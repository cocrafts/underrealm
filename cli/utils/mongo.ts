import mongoose from 'mongoose';

import { MONGO_URI } from './loadEnv';

export const connectToMongoDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connect to MongoDB successfully');
	} catch (err) {
		throw Error(err);
	}
};

export const disconnectToMongoDB = async () => {
	try {
		await mongoose.disconnect();
		console.log('Disconnect to MongoDB successfully');
	} catch (err) {
		throw Error(err);
	}
};
