import { handleGameEvent } from 'game/playing';
import type { Server } from 'http';
import { logger } from 'utils/logger';
import { WebSocketServer } from 'ws';

export let wss: WebSocketServer;

export const createWebsocketServer = (server: Server, path: string) => {
	wss = new WebSocketServer({ server, path });

	wss.on('connection', (ws) => {
		ws.on('message', async (message) => {
			const data = JSON.parse(message.toString());
			if (data.type) logger.debug('Websocket on message:', { type: data.type });

			if (data.routeKey === 'game') await handleGameEvent(data);
		});
	});

	return wss;
};

const WS_OPEN = 1;

export function broadcastMessage(message) {
	wss.clients.forEach((client) => {
		if (client.readyState === WS_OPEN) {
			client.send(JSON.stringify(message));
		}
	});
}
