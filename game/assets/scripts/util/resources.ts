import {
	Asset,
	AudioClip,
	instantiate,
	Node,
	Prefab,
	resources,
	sys,
} from 'cc';

import { delay } from './helper';
import { system } from './system';

export interface AudioSource {
	clip: AudioClip;
	buffer?: AudioBuffer;
}

const backgroundSounds = ['bgm-dungeon-crawl', 'bgm-dungeon-peak'] as const;
const effectSounds = [
	'attack',
	'ground-hit',
	'fire',
	'light-fire',
	'death',
	'hand-slide',
	'card-flip',
	'card-raise',
	'end-turn',
	'your-turn3',
	'your-turn4',
	'victory',
	'defeat',
] as const;

export type GameSounds =
	| typeof backgroundSounds[number]
	| typeof effectSounds[number];

const audioCache: Partial<Record<GameSounds, AudioSource>> = {};

const useAudioContext = sys.isBrowser;
let audioContext: AudioContext;
let backgroundSource: AudioBufferSourceNode;
let backgroundGain: GainNode;

if (useAudioContext) {
	audioContext = new AudioContext();
	backgroundGain = audioContext.createGain();
	backgroundGain.connect(audioContext.destination);

	document.addEventListener('click', () => {
		if (audioContext.state !== 'running') {
			audioContext.resume();
		}
	});
}

const dimBackgroundVolume = async (): Promise<void> => {
	const currentVolume = useAudioContext
		? backgroundGain.gain.value
		: system.audioSource.volume;

	for (let i = currentVolume; i > 0; i -= 0.01) {
		if (useAudioContext) {
			backgroundGain.gain.value = i;
		} else {
			system.audioSource.volume = i;
		}

		await delay(100);
	}
};

const raiseBackgroundVolume = async (volume = 1) => {
	for (let i = 0; i < volume; i += 0.01) {
		if (useAudioContext) {
			backgroundGain.gain.value = i;
		} else {
			system.audioSource.volume = i;
		}

		await delay(50);
	}
};

export const playBackgroundSound = async (
	name: GameSounds,
	volume = 1,
	loop = true,
): Promise<void> => {
	const { clip, buffer } = await getAudioSource(name);

	if (useAudioContext) {
		if (backgroundSource) {
			backgroundSource.stop();
			backgroundSource.buffer = null;
			backgroundSource.disconnect();
		}

		backgroundSource = audioContext.createBufferSource();
		backgroundSource.buffer = buffer;
		backgroundSource.connect(backgroundGain);
		backgroundSource.loop = loop;
		backgroundSource.start(0);
	} else {
		system.audioSource.stop();
		system.audioSource.clip = clip;
		system.audioSource.play();
	}

	await raiseBackgroundVolume(volume);
};

export const switchBackgroundSound = async (
	name: GameSounds,
	volume = 1,
): Promise<void> => {
	await dimBackgroundVolume();
	playBackgroundSound(name, volume);
};

export const playEffectSound = async (
	name: GameSounds,
	volume = 1,
): Promise<void> => {
	const { clip } = await getAudioSource(name);
	system.audioSource.playOneShot(clip, volume);
};

export const instantiatePrefab = (uri: string): Promise<Node> => {
	return new Promise((resolve, reject) => {
		resources.load(uri, (err, prefab: Prefab) => {
			if (err) {
				reject(err);
			} else {
				resolve(instantiate(prefab));
			}
		});
	});
};

export const bufferFromAsset = async (asset: Asset): Promise<ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open('GET', asset.nativeUrl, true);
		request.responseType = 'arraybuffer';
		request.onload = () => resolve(request.response);
		request.onerror = () => reject();
		request.send();
	});
};

export const extractAudioBuffer = async (
	buffer: ArrayBuffer,
): Promise<AudioBuffer> => {
	return new Promise((resolve, reject) => {
		audioContext.decodeAudioData(
			buffer,
			(audio) => resolve(audio),
			(err) => reject(err),
		);
	});
};

export const getAudioSource = async (
	name: GameSounds,
): Promise<AudioSource> => {
	return new Promise((resolve, reject) => {
		const cache = audioCache[name];

		if (cache) {
			resolve(cache);
		} else {
			resources.load(`sound/${name}`, async (err, clip: AudioClip) => {
				if (err) {
					reject(err);
				} else {
					audioCache[name] = { clip };

					if (useAudioContext) {
						const buffer = await bufferFromAsset(clip);
						audioCache[name].buffer = await extractAudioBuffer(buffer);
					}

					resolve(audioCache[name]);
				}
			});
		}
	});
};
