const crypto = require('crypto');

const keypair = crypto.generateKeyPairSync('rsa', {
	modulusLength: 2048,
	publicKeyEncoding: {
		type: 'spki',
		format: 'pem',
	},
	privateKeyEncoding: {
		type: 'pkcs8',
		format: 'pem',
	},
});

console.log('Public Key:');
console.log(keypair.publicKey.split('\n').join('\\n'));
console.log('Private Key:');
console.log(keypair.privateKey.split('\n').join('\\n'));
