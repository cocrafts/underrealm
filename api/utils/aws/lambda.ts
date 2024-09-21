/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InvocationType } from '@aws-sdk/client-lambda';
import { Lambda } from '@aws-sdk/client-lambda';
import { fromUtf8 } from '@aws-sdk/util-utf8-node';

import { getInvokeFunctionName, regionConfig } from './utils';

export const client = new Lambda(regionConfig);

type RemoteFunctionNames = 'publisher';

export const internalInvoke = (
	name: RemoteFunctionNames,
	payload?: any,
	invocationType: InvocationType = 'Event',
) => {
	return client.invoke({
		FunctionName: getInvokeFunctionName(name),
		InvocationType: invocationType,
		Payload: payload ? fromUtf8(JSON.stringify(payload)) : undefined,
	});
};
