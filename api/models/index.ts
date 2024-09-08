import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
	console.log('MongoDB connected');
});

mongoose.connection.on('disconnected', () =>
	console.log('MongoDB disconnected'),
);

mongoose.connection.on('reconnected', () => {
	console.log('MongoDB reconnected');
});

mongoose.connection.on('disconnecting', () => {
	console.log('MongoDB disconnecting');
});

mongoose.connection.on('close', () => {
	console.log('MongoDB close');
});
