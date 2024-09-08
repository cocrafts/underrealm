import { configs } from '../utils/config';

const isJest = configs.STAGE === 'jest';

const selectSuffix = (stage: string) => {
	if (stage === 'prod') {
		return '';
	} else if (isJest) {
		return '-jest';
	}

	return '-dev';
};

const resourceSuffix = selectSuffix(configs.STAGE);

export const regionConfig = { region: configs.REGION };
export const defaultTable = `metacraft-api${resourceSuffix}`;
export const userTable = `metacraft-user${resourceSuffix}`;

export const getInvokeFunctionName = (name: string) => {
	return `${configs.SERVICE_NAME}-${configs.STAGE}-${name}`;
};
