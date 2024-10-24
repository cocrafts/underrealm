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
	playerEid: number;
};

export type SummonCardEvent = {
	type: EventType.SummonCard;
	playerEid: number;
	cardEid: number;
	groundIndex: number;
};
