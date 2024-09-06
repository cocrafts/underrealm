import { gql } from '@apollo/client';

export * from './card';
export * from './game';
export * from './profile';

export const greeting = gql`
	query Greeting {
		greeting
	}
`;
