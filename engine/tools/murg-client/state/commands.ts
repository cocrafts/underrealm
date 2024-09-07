// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { DuelCommandBundle } from '@underrealm/murg';
export const distributeInitialCards: DuelCommandBundle[] = [
	{
		turn: 0,
		phase: 'Draw',
		phaseOf: 'A',
		commands: [
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: {
						owner: 'A',
						id: '000020005#30',
						place: 'Deck',
					},
					to: {
						owner: 'A',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: {
						owner: 'A',
						id: '000110002#12',
						place: 'Deck',
					},
					to: {
						owner: 'A',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: {
						owner: 'A',
						id: '000090007#6',
						place: 'Deck',
					},
					to: {
						owner: 'A',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: {
						owner: 'A',
						id: '000510006#17',
						place: 'Deck',
					},
					to: {
						owner: 'A',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: {
						owner: 'A',
						id: '000220002#19',
						place: 'Deck',
					},
					to: {
						owner: 'A',
						place: 'Hand',
					},
				},
			},
		],
	},
	{
		turn: 0,
		phase: 'Draw',
		phaseOf: 'B',
		commands: [
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: {
						owner: 'B',
						id: '000440007#43',
						place: 'Deck',
					},
					to: {
						owner: 'B',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: {
						owner: 'B',
						id: '000010001#72',
						place: 'Deck',
					},
					to: {
						owner: 'B',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: {
						owner: 'B',
						id: '000100001#47',
						place: 'Deck',
					},
					to: {
						owner: 'B',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: {
						owner: 'B',
						id: '000550002#55',
						place: 'Deck',
					},
					to: {
						owner: 'B',
						place: 'Hand',
					},
				},
			},
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: {
						owner: 'B',
						id: '000260007#66',
						place: 'Deck',
					},
					to: {
						owner: 'B',
						place: 'Hand',
					},
				},
			},
		],
	},
	{
		turn: 0,
		phase: 'CleanUp',
		phaseOf: 'B',
		commands: [
			{
				type: 'DuelMutate',
				payload: {
					turn: 1,
				},
			},
		],
	},
];

export const distributeA1Cards: DuelCommandBundle[] = [
	{
		turn: 1,
		phase: 'Draw',
		phaseOf: 'A',
		commands: [
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: { owner: 'A', id: '000230001#3', place: 'Deck' },
					to: { owner: 'A', place: 'Hand' },
				},
			},
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: { owner: 'A', id: '000250002#34', place: 'Deck' },
					to: { owner: 'A', place: 'Hand' },
				},
			},
			{
				owner: 'A',
				type: 'CardMove',
				target: {
					from: { owner: 'A', id: '999990000', place: 'Player' },
					to: { owner: 'A', place: 'Hand' },
				},
			},
			{ type: 'DuelMutate', payload: { phase: 'Setup' } },
		],
	},
];

export const distributeB1Cards: DuelCommandBundle[] = [
	{
		turn: 1,
		phase: 'Draw',
		phaseOf: 'B',
		commands: [
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: { owner: 'B', id: '000020003#64', place: 'Deck' },
					to: { owner: 'B', place: 'Hand' },
				},
			},
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: { owner: 'B', id: '000370001#53', place: 'Deck' },
					to: { owner: 'B', place: 'Hand' },
				},
			},
			{
				owner: 'B',
				type: 'CardMove',
				target: {
					from: { owner: 'B', id: '999990000', place: 'Player' },
					to: { owner: 'B', place: 'Hand' },
				},
			},
			{ type: 'DuelMutate', payload: { phase: 'Setup' } },
		],
	},
];
