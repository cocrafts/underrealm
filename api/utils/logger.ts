import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

const isProd = process.env.NODE_ENV === 'production';

export const logger = createLogger({
	level: isProd ? 'info' : 'debug',
	transports: [
		new transports.Console({
			format: isProd
				? format.combine(format.timestamp(), format.json())
				: format.combine(format.timestamp(), localLogFormat()),
		}),
	],
});

function localLogFormat() {
	return format.printf(({ level, message, timestamp }) => {
		const date = new Date(timestamp);
		const msg = `${date.toLocaleTimeString()} [${level}]: ${message}`;
		if (level === 'error') {
			return chalk.red(msg);
		} else if (level === 'warn') {
			return chalk.yellow(msg);
		} else if (level === 'info') {
			return chalk.blue(msg);
		} else {
			return msg;
		}
	});
}
