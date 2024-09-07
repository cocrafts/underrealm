import type { DuelCommand, PlayerStatePair } from '../../types';

export const getPlayerOrder = (players: PlayerStatePair, ownerId: string) => {
	return players.findIndex((i) => i.id === ownerId);
};

interface CommandResult {
	commands: DuelCommand[];
	registerCommand: (command: DuelCommand) => void;
}

export const createCommandResult = (
	defaults: DuelCommand[] = [],
): CommandResult => {
	const commands = defaults;
	const registerCommand = (i) => commands.push(i);

	return {
		commands,
		registerCommand,
	};
};
