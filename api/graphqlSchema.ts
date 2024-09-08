import gql from 'graphql-tag';

export const typeDefs = gql`
	type Query {
		greeting: String
		profile(address: String): Profile
		gameJwt(duelId: String): String
		gameInvitations: [GameInvitation]
		cardDuelHistory(limit: Int): [CardDuelHistory]
		cardDuelPlaying: CardDuelHistory
		cardDuel(id: String!): CardDuel
	}

	type Mutation {
		inviteGame(input: InviteGameInput!): GameInvitation
		acceptGame(invitationId: String!): Boolean
		stopMatchFind: Boolean
	}

	type Subscription {
		gameInvitation(opponent: String!): GameInvitation
		matchFind(game: MetacraftGames!, userId: String): CardDuel
		matchFound(game: MetacraftGames!, userId: String): CardDuel
	}

	input InviteGameInput {
		game: MetacraftGames!
		opponent: String!
	}

	type Profile {
		id: String!
		linkedId: String
		address: String!
		jwt: String
		name: String
		email: String
		githubId: String
		githubUrl: String
		avatarUrl: String
		mineral: Float!
		isOnline: Boolean
	}

	type CardDuelSetting {
		playerHealth: Int
		handSize: Int
		groundSize: Int
		maxAttachment: Int
		perTurnHero: Int
		perTurnTroop: Int
	}

	type CardPlayerConfig {
		id: String
		deck: [String]
	}

	type CardDuelConfig {
		version: String!
		setting: CardDuelSetting!
		firstMover: String!
		firstPlayer: CardPlayerConfig!
		secondPlayer: CardPlayerConfig!
	}

	type CardBoardTarget {
		place: String
		owner: String
		id: String
		index: Int
	}

	type CardCommandTarget {
		from: CardBoardTarget
		to: CardBoardTarget
	}

	type CardDuelAttributes {
		attack: Int
		defense: Int
		health: Int
		charge: Int
		perTurnHero: Int
		perTurnTroop: Int
		gameOver: Boolean
		turn: Int
	}

	type CardDuelCommand {
		type: String!
		owner: String
		target: CardCommandTarget
		payload: CardDuelAttributes
	}

	type CardDuelCommandBundle {
		turn: Int
		group: String
		phase: String
		phaseOf: String
		commands: [CardDuelCommand]
	}

	type CardDuel {
		id: String
		config: CardDuelConfig
		history: [CardDuelCommandBundle]
	}

	type GameInvitation {
		id: String!
		game: String!
		owner: Profile!
		enemy: Profile!
		timestamp: String!
	}

	type CardDuelHistory {
		id: String
		duel: CardDuel!
		enemy: Profile
		victory: Boolean
		timestamp: String!
	}

	enum MetacraftGames {
		MURG
	}
`;

export default typeDefs;
