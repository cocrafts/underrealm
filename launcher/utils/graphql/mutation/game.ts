import { gql } from '@apollo/client';

export const inviteGame = gql`
	mutation InviteGame($input: InviteGameInput!) {
		inviteGame(input: $input) {
			game
		}
	}
`;

export const acceptGame = gql`
	mutation AcceptGame($invitationId: String!) {
		acceptGame(invitationId: $invitationId)
	}
`;

export const subscribeGame = gql`
	# mutation SubscribeGame($input: SubscribeGameInput!) {
	# 	subscribeGame(input: $input) {
	# 		game
	# 		email
	# 		timestamp
	# 	}
	# }
`;

export const stopMatchFind = gql`
	mutation StopMatchFind {
		stopMatchFind
	}
`;
