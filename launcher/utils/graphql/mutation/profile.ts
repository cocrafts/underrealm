import { gql } from '@apollo/client';

export const updateProfile = gql`
	mutation UpdateProfile($input: MutateProfileInput) {
		updateProfile(profileInput: $input) {
			id
			name
			address
			email
			points
			avatarUrl
			telegramId
			discordId
			twitterId
			referralCode
		}
	}
`;
