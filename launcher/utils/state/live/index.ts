import {
	acceptGameInvitation,
	matchFind,
	resumePlayingGame,
	sendGameInvitation,
	stopMatchFind,
} from './game';

export const liveActions = {
	sendGameInvitation,
	acceptGameInvitation,
	resumePlayingGame,
	matchFind,
	stopMatchFind,
};

export * from './internal';
