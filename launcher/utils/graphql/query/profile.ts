import { gql } from '@apollo/client';

export const profileFields = gql`
	fragment ProfileFields on Profile {
		id
		address
		points
		referralCode
	}
`;

export const profile = gql`
	${profileFields}
	query Profile {
		profile {
			...ProfileFields
		}
	}
`;

// TODO: Fix error "Unexpected <EOF> while using graphql"

// export const buddies = gql`
// 	${profileFields}
// 	# query Buddies {
// 	# 	buddies {
// 	# 		...ProfileFields
// 	# 	}
// 	# }
// `;
