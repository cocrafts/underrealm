import { gql } from '@apollo/client';

export const profileFields = gql`
	fragment ProfileFields on Profile {
		id
		address
		name
		avatarUrl
		githubUrl
		mineral
		points
	}
`;

export const profile = gql`
	${profileFields}
	query Profile {
		profile {
			...ProfileFields
			referralCode
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
