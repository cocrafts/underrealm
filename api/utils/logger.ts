import chalk from 'chalk';
import winston, { format } from 'winston';

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	const localServerLogFormat = format.printf(
		({ level, message, timestamp }) => {
			const date = new Date(timestamp);
			const msg = `${date.toLocaleTimeString()} [${level}]: ${message}`;
			if (level === 'error') {
				return chalk.red(msg);
			} else if (level === 'warn') {
				return chalk.yellow(msg);
			} else {
				return chalk.green(msg);
			}
		},
	);

	logger.add(
		new winston.transports.Console({
			format: format.combine(format.timestamp(), localServerLogFormat),
		}),
	);
} else {
	// only log warn/level in deployment runtime
	// as Lambda logs is pushed to CloudWatch
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
			level: 'warn',
		}),
	);
}
