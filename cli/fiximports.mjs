import { replaceInFile } from 'replace-in-file';

replaceInFile({
	files: 'dist/**/*.js',
	processor: (input, file) => {
		if (file.startsWith('dist/cli')) {
			const distRelativeDepth = file.split('/').length - 2;
			const newPath = new Array(distRelativeDepth).fill('..').join('/');

			return input.replace(/@underrealm\/api/g, `${newPath}/api/lib`);
		}

		return input;
	},
})
	.then((results) => {
		const count = results.reduce((acc, r) => (r.hasChanged ? acc + 1 : acc), 0);
		console.log('Modified internal package importing in files:', count);
	})
	.catch((error) => {
		console.error('Error occurred:', error);
	});
