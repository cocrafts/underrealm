import { gql } from '@apollo/client';

export const referralHistory = gql`
	query ReferralHistory {
		referralHistory {
			id
			referrerId
			refereeId
			refereeUser {
				id
				name
				address
				email
			}
			claimedPoints
			createdAt
		}
	}
`;
