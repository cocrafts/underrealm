/* eslint-disable @typescript-eslint/no-explicit-any */
import { error } from 'cc';

import type { ComponentMap } from '../../game';
import { core, GCT } from '../../game';

type Guard<T> = (
	entityId: number,
	callback: (arg: T) => any,
) => Promise<void> | void;

export const safe = <Guards extends Guard<any>[]>(
	...guards: Guards
): {
	exec: (
		entityId: number,
		callback: (
			...args: {
				[K in keyof Guards]: Guards[K] extends Guard<infer U> ? U : never;
			}
		) => any,
	) => Promise<void>;
} => {
	return {
		exec: async (entityId, callback) => {
			const args = [];
			for (let i = 0; i < guards.length; i++) {
				const guard = guards[i];
				let isCallbackCalled = false;
				await guard(entityId, (arg) => {
					args.push(arg);
					isCallbackCalled = true;
				});

				if (!isCallbackCalled) return;
			}

			await callback(...(args as never));
		},
	};
};

export const safeCardUIState = async (
	entityId: number,
	callback: (UIState: ComponentMap[GCT.CardUIState]) => any,
) => {
	const UIState = core.queryById(entityId).getComponent(GCT.CardUIState);
	if (!UIState) {
		error('Card UI state not found to handle', entityId);
		return;
	}

	await callback(UIState);
};

export const safeCardInHandPosition = async (
	entityId: number,
	callback: (inHandPosition: ComponentMap[GCT.CardInHandPosition]) => any,
) => {
	const inHandPosition = core
		.queryById(entityId)
		.getComponent(GCT.CardInHandPosition);
	if (!inHandPosition) {
		error('in-hand position not found to draw expo', entityId);
		return;
	}

	await callback(inHandPosition);
};
