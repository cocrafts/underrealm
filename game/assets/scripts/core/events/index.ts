export enum EventType {
	EndTurn = 'EndTurn',
	SummonCard = 'SummonCard',
}

export type EventMap = {
	[EventType.EndTurn]: EndTurnEvent;
	[EventType.SummonCard]: SummonCardEvent;
};

export type Event = EndTurnEvent | SummonCardEvent;

export type EndTurnEvent = {
	type: EventType.EndTurn;
	playerEntityId: number;
};

export type SummonCardEvent = {
	type: EventType.SummonCard;
	playerEntityId: number;
	cardEntityId: number;
	groundIndex: number;
};
