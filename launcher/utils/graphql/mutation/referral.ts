import { gql } from '@apollo/client';

export const makeReferral = gql`
	mutation MakeReferral($referralCode: String!) {
		makeReferral(referralCode: $referralCode)
	}
`;
