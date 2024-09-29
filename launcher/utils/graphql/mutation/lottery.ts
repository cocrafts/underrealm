import { gql } from '@apollo/client';

export const purchaseLottery = gql`
	mutation purchaseLottery() {
		purchaseLottery {
			id
			type
			userId
			amount
			purchaseAt
		}
	}
`;

export const openLottery = gql`
	mutation openLottery {
		openLottery {
			id
			userId
			items {
				itemId
				amount
			}
			openAt
		}
	}
`;
