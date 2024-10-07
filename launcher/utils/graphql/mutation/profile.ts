import { gql } from '@apollo/client';

export const updateProfile = gql`
	mutation UpdateProfile($props: MutateProfileProps) {
		updateProfile(profileProps: $props) {
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
