import { proxy } from 'valtio';

export interface LiveState {}

export const liveState = proxy<LiveState>({});
