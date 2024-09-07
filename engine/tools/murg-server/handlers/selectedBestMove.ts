import type {
	DuelCommand,
	DuelCommandBundle,
	DuelState,
	MoveResult,
} from '@metacraft/murg-engine';
import { DuelPlace, mergeFragmentToState, move } from '@metacraft/murg-engine';
import clone from 'lodash/cloneDeep';

function addMove(curDuel: DuelState, card1, card2, pos1, pos2) {
	const currentState = clone(curDuel);
	const allCurMoveBundle: DuelCommandBundle[] = [];
	const runMove = (move: MoveResult) => {
		const { duel: fragment, commandBundles } = move;
		if (fragment) mergeFragmentToState(currentState, fragment);
		return commandBundles;
	};

	const curMove = runMove(
		move.summonCard(currentState, {
			from: {
				owner: currentState.secondPlayer.id,
				place: DuelPlace.Hand,
				id: card1,
			},
			to: {
				owner: currentState.secondPlayer.id,
				place: DuelPlace.Ground,
				index: pos1,
			},
		}),
	);
	allCurMoveBundle.push(...curMove);

	const nextMove = runMove(
		move.summonCard(currentState, {
			from: {
				owner: currentState.secondPlayer.id,
				place: DuelPlace.Hand,
				id: card2,
			},
			to: {
				owner: currentState.secondPlayer.id,
				place: DuelPlace.Ground,
				index: pos2,
			},
		}),
	);
	allCurMoveBundle.push(...nextMove);

	return { state: currentState, moveBundle: allCurMoveBundle };
}

function getNullIndex(arr) {
	const res: number[] = [];
	if (arr[5] === null) {
		res.push(5);
		return res;
	} else {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === null && arr[i + 1] != null) res.push(i);
			else if (arr[i] === null && arr[i - 1] != null) res.push(i);
		}
		return res;
	}
}

function isSubarrayExist(array, subarray) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].length !== subarray.length) {
			continue;
		}

		let isEqual = true;
		for (let j = 0; j < array[i].length; j++) {
			if (array[i][j] !== subarray[j]) {
				isEqual = false;
				break;
			}
		}

		if (isEqual) {
			return true;
		}
	}
	return false;
}

function generateStates(duel: DuelState) {
	const allStates: DuelState[] = [];
	const allMoveBundle: DuelCommandBundle[][] = [];
	const botHand = clone(duel.secondHand);
	const allPosIndex = getNullIndex(duel.secondGround);
	const allIndexArr: number[][] = [];
	for (let i = 0; i < botHand.length; i++) {
		for (let j = 0; j < botHand.length; j++) {
			const firstCard = botHand[i].slice(0, 4);
			const secondCard = botHand[j].slice(0, 4);
			if (
				(firstCard !== '9999' && secondCard === '9999') ||
				(firstCard === '9999' && secondCard !== '9999')
			) {
				if (botHand[i] === botHand[j]) {
					continue;
				} else {
					let posArr: number[] = [];
					if (allPosIndex.length === 1) {
						posArr = [allPosIndex[0] - 1, allPosIndex[0], allPosIndex[0] + 1];
					} else {
						posArr = [
							allPosIndex[0] - 1,
							allPosIndex[0],
							allPosIndex[1],
							allPosIndex[1] + 1,
						];
					}

					for (let k = 1; k < posArr.length - 1; k++) {
						const stateTemp = clone(duel);
						for (let m = 0; m < posArr.length; m++) {
							if (posArr[m] != null) {
								if (posArr[k] === posArr[m]) {
									continue;
								} else {
									const subarray = [-1, -1, -1, -1];
									const { state, moveBundle } = addMove(
										stateTemp,
										botHand[i],
										botHand[j],
										posArr[k],
										posArr[m],
									);
									subarray[k] = i;
									subarray[m] = j;
									if (isSubarrayExist(allIndexArr, subarray)) {
										break;
									} else {
										allIndexArr.push(subarray);
										allStates.push(state);
										allMoveBundle.push(moveBundle);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return { allStates, allMoveBundle };
}

const evaluateDuelState = (duelState: DuelState): number => {
	let score = 0;
	for (let i = 0; i < duelState.secondGround.length; i++) {
		if (
			duelState.firstGround[i] !== null &&
			duelState.secondGround[i] !== null
		) {
			score += 1000;
		}
		if (duelState.secondGround[i]) {
			const card = duelState.stateMap[duelState.secondGround[i]];
			score += card.attack + card.defense + card.health;
		}
	}
	score += duelState.firstPlayer.health + duelState.secondPlayer.health;
	return score;
};

const minimax = (
	node: DuelState,
	depth: number,
	alpha: number,
	beta: number,
	maxState: boolean,
): number => {
	if (depth === 0) {
		return evaluateDuelState(node);
	}

	const { allStates } = generateStates(clone(node));
	if (maxState) {
		let maxEva = -Infinity;
		for (let i = 0; i < allStates.length; i++) {
			const childState = allStates[i];
			const eva = minimax(childState, depth - 1, alpha, beta, false);
			maxEva = Math.max(maxEva, eva);
			alpha = Math.max(alpha, maxEva);
			if (beta <= alpha) {
				break;
			}
		}
		return maxEva;
	} else {
		let minEva = +Infinity;
		for (let i = 0; i < node.firstHand.length; i++) {
			const childState = clone(node);
			const eva = minimax(childState, depth - 1, alpha, beta, true);
			minEva = Math.min(minEva, eva);
			beta = Math.min(beta, minEva);
			if (beta <= alpha) {
				break;
			}
		}
		return minEva;
	}
};

type Result = {
	bestMove: DuelState;
	currentMoveBundle: DuelCommand;
};

export const selectBestMove = (duel: DuelState, depth: number): Result => {
	let bestScore = -Infinity;
	let bestMove;
	let currentMoveBundle;
	const childState = clone(duel);
	const { allStates, allMoveBundle } = generateStates(childState);

	for (let j = 0; j < allStates.length; j++) {
		const score = minimax(allStates[j], depth - 1, -Infinity, Infinity, false);
		if (score > bestScore) {
			bestScore = score;
			currentMoveBundle = allMoveBundle[j];
			bestMove = allStates[j];
		}
	}
	return { bestMove, currentMoveBundle };
};
