import { gql } from '@apollo/client';

export const profileFields = gql`
	fragment ProfileFields on Profile {
		id
		address
		name
		avatarUrl
		githubUrl
		mineral
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

export const buddies = gql`
	${profileFields}
	query Buddies {
		buddies {
			...ProfileFields
		}
	}
`;
