import type {
	DuelCommandBundle,
	DuelState,
	PlayerState,
} from '@metacraft/murg-engine';
import {
	CardType,
	makeDuel,
	makeMeta,
	mergeFragmentToState,
	runCommand,
} from '@metacraft/murg-engine';

export const generateRandomDeck = (version = '00001', size = 36): string[] => {
	let count = 0;
	const results: string[] = [];
	const { map, entities } = makeMeta(version);

	while (count < size) {
		const randomIndex = Math.floor(Math.random() * entities.length);
		const randomId = entities[randomIndex];
		const sku = randomId.substring(0, 5);
		const existedCard = results.find((id) => id.startsWith(sku));
		const card = map[randomId];

		if (!existedCard && card.kind !== CardType.Troop) {
			results.push(randomId);
			count++;
		}

		entities.splice(randomIndex, 1);
	}

	return results;
};

export const generateDuel = () => {
	return makeDuel([
		{
			id: 'A',
			deck: generateRandomDeck(),
		},
		{
			id: 'B',
			deck: generateRandomDeck(),
		},
	]);
};

export const selectColor = (
	players: [PlayerState, PlayerState],
	colors: [string, string],
	owner: string,
) => {
	return colors[players[0].id === owner ? 0 : 1];
};

export interface AppConfig {
	debug: boolean;
}

interface MeasureCache {
	time: number;
	explains?: string;
	callback?: MeasureCallback;
}

interface MeasureMetrics {
	explains?: string;
	startTime: number;
	currentTime: number;
	elapsedTime: number;
}

type MeasureCallback = (metrics: MeasureMetrics) => void;

const measureExecutionCache: Record<string, MeasureCache> = {};

export const measureExecutionTime = (
	key: string,
	explains?: string,
	callback?: (metrics: MeasureMetrics) => void,
) => {
	if (explains !== undefined || callback !== undefined) {
		measureExecutionCache[key] = {
			time: new Date().getTime(),
			explains,
			callback,
		};
		return;
	}

	const cachedMeasure = measureExecutionCache[key];
	if (!cachedMeasure) return;

	const startTime = cachedMeasure.time;
	const currentTime = new Date().getTime();
	const elapsedTime = currentTime - startTime;
	const explainText = ` to ${cachedMeasure.explains || key}`;

	if (explains) {
		console.log(`[${key}] take ${elapsedTime}ms${explainText}`);
	}

	if (cachedMeasure.callback) {
		cachedMeasure.callback({
			startTime,
			currentTime,
			elapsedTime,
			explains: cachedMeasure.explains,
		});
	}

	delete measureExecutionCache[key];
	return elapsedTime;
};

export const runBundles = (duel: DuelState, bundles: DuelCommandBundle[]) => {
	bundles.forEach((bundle) => {
		bundle.commands.forEach((command) => {
			mergeFragmentToState(duel, runCommand({ duel, command }));
		});
	});
};
