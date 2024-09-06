export enum MessageType {
	Bare = 'bare',
	PushContext = 'pushContext',
	NotifyReady = 'notifyReady',
}

export type MessagePayload = Record<string, string | number | boolean>;
export type MessageData = MessagePayload & {
	source?: string;
	type: MessageType;
};

export const parseData = (data: string): MessageData => {
	try {
		return JSON.parse(data);
	} catch {
		return { type: MessageType.Bare, text: data };
	}
};
