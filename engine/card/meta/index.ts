import type { GameMeta } from '../types';

import { metaFromConfig } from './helper';
import { initialCardConfigs } from './initial';

export const fetchGameMeta = (version: string): GameMeta => {
	return metaFromConfig(initialCardConfigs, version);
};
