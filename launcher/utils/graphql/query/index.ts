import { gql } from '@apollo/client';

// export * from './card';
// export * from './inventory';
export * from './profile';
export * from './quest';

export const greeting = gql`
	query Greeting {
		greeting
	}
`;
