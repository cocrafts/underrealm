import type { CommandModule } from 'yargs';

export type StrictCommandModule<T = unknown, U = unknown> = CommandModule<
	T,
	U
> & {
	describe: string;
};

export type RootOptions = {
	env?: string;
	verbose?: string;
	limit?: number;
};
