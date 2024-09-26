// import { gql } from '@apollo/client';

// TODO: Fix error "Unexpected <EOF> while using graphql"

// export const cardDuelPlaying = gql`
// 	query CardDuelPlaying {
// 		cardDuelPlaying {
// 			id
// 			opponent {
// 				id
// 				name
// 				avatarUrl
// 			}
// 			timestamp
// 		}
// 	}
// `;

// export const cardDuel = gql`
// 	query CardDuel($id: String!) {
// 		cardDuel(id: $id) {
// 			id
// 			setup {
// 				version
// 				setting {
// 					perTurnTroop
// 					perTurnHero
// 					groundSize
// 					handSize
// 					maxAttachment
// 				}
// 				firstMover
// 				player
// 				deck
// 			}
// 			history {
// 				type
// 				owner
// 				side
// 				from {
// 					id
// 					owner
// 					place
// 					position
// 				}
// 				target {
// 					id
// 					owner
// 					place
// 					position
// 				}
// 				payload {
// 					attack
// 					defense
// 					health
// 					cooldown
// 					turn
// 					perTurnHero
// 					perTurnTroop
// 				}
// 			}
// 		}
// 	}
// `;
