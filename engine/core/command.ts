import type { ECS } from './ecs';

export interface Command {
	execute(ecs: ECS): void;
}

export class CommandHandler {
	private commands: Command[] = [];

	enqueue(command: Command): void {
		this.commands.push(command);
	}

	executeCommands(ecs: ECS): void {
		for (const command of this.commands) command.execute(ecs);
		this.commands = [];
	}
}
