import { gql } from '@apollo/client';

export const inventory = gql`
	query Inventory {
		inventory {
			id
      userId
			items {
        itemId
        amount
		}
	}
`;
