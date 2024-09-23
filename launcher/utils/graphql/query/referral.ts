import { gql } from '@apollo/client';

export const referralHistory = gql`
	query ReferralHistory {
		referralHistory {
			id
			referrerId
			refereeId
			refereeUser {
				id
				address
				email
			}
			claimedPoints
			createdAt
		}
	}
`;
