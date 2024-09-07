import type { MoveResult } from '@metacraft/murg-engine';
import {
	DuelPlace,
	getInitialState,
	mergeFragmentToState,
	move,
	runCommand,
} from '@metacraft/murg-engine';
// import clone from 'lodash/cloneDeep';
// import { selectBestMove } from '../../botTemp/botTest';

const { config, history } = require('./duel.json');

const slicedHistory = history.slice(0, 162);
const duel = getInitialState(config);

const runMove = (move: MoveResult) => {
	const { duel: fragment, commandBundles } = move;

	if (fragment) mergeFragmentToState(duel, fragment);
	commandBundles.forEach((bundle) => slicedHistory.push(bundle));
};

for (let i = 0; i < slicedHistory.length; i += 1) {
	const bundle = slicedHistory[i];

	bundle.commands.forEach((command) => {
		mergeFragmentToState(duel, runCommand({ duel, command }));
	});
}

runMove(
	move.summonCard(duel, {
		from: {
			owner: 'A',
			place: DuelPlace.Hand,
			id: '000070007#26',
		},
		to: {
			owner: 'A',
			place: DuelPlace.Ground,
			index: 5,
		},
	}),
);

runMove(
	move.summonCard(duel, {
		from: {
			owner: 'A',
			place: DuelPlace.Hand,
			id: '999990000#59',
		},
		to: {
			owner: 'A',
			place: DuelPlace.Ground,
			index: 6,
		},
	}),
);

runMove(move.endTurn(duel));
runMove(move.distributeTurnCards(duel));
// let curCommand = selectBestMove(duel, 1)
// mergeFragmentToState(duel, curCommand)
// console.log(duel.secondGround)
// const tmp = clone(duel);
// const { bestMove, currentMoveBundle } = selectBestMove(tmp, 1);

// mergeFragmentToState(duel, bestMove);
// currentMoveBundle.forEach((moves) => {
// 	//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", move)
// 	moves.forEach((move) => {
// 		slicedHistory.push(move);
// 	});
// });
console.log('First ground', duel.secondGround);
// slicedHistory.push(currentMove.commands)

//console.log("Duel ground is here", duel.firstGround, duel.secondGround)
runMove(move.endTurn(duel));

//Fight
runMove(move.preFight(duel));
runMove(move.fight(duel));
runMove(move.postFight(duel));
runMove(move.reinforce(duel));
runMove(move.turnCleanUp(duel));
runMove(move.turnCleanUp(duel));
runMove(move.turnCleanUp(duel));

// runMove(
// 	move.activateChargeSkill(duel, {
// 		from: {
// 			owner: 'A',
// 			place: DuelPlace.Ground,
// 			id: '000070007#26',
// 		},
// 	}),
// );
// console.log(duel.stateMap['000070007#26']);

runMove(move.distributeTurnCards(duel));
runMove(
	move.summonCard(duel, {
		from: {
			owner: 'A',
			place: DuelPlace.Hand,
			id: duel.firstHand[0],
		},
		to: {
			owner: duel.firstPlayer.id,
			place: DuelPlace.Ground,
			index: 4,
		},
	}),
);
runMove(move.endTurn(duel));

runMove(move.distributeTurnCards(duel));
// tmp = clone(duel);
// const { bestMove: a, currentMoveBundle: b } = selectBestMove(tmp, 1);

// mergeFragmentToState(duel, a);
// b.forEach((moves) => {
// 	//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", move)
// 	moves.forEach((move) => {
// 		slicedHistory.push(move);
// 	});
// });
console.log('First ground', duel.secondGround);

// //runMove(move.reinforce(duel));

export default {
	config: config,
	history: slicedHistory,
};
