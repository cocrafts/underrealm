import { openLottery, purchaseLottery } from './mutation';
import { inventory } from './query';

export const AssetMutationResolvers = { purchaseLottery, openLottery };
export const AssetQueryResolvers = { inventory };
