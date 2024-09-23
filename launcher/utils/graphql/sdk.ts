import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CardBoardTarget = {
  __typename?: 'CardBoardTarget';
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
};

export type CardCommandTarget = {
  __typename?: 'CardCommandTarget';
  from?: Maybe<CardBoardTarget>;
  to?: Maybe<CardBoardTarget>;
};

export type CardDuel = {
  __typename?: 'CardDuel';
  config?: Maybe<CardDuelConfig>;
  history?: Maybe<Array<Maybe<CardDuelCommandBundle>>>;
  id?: Maybe<Scalars['String']['output']>;
};

export type CardDuelAttributes = {
  __typename?: 'CardDuelAttributes';
  attack?: Maybe<Scalars['Int']['output']>;
  charge?: Maybe<Scalars['Int']['output']>;
  defense?: Maybe<Scalars['Int']['output']>;
  gameOver?: Maybe<Scalars['Boolean']['output']>;
  health?: Maybe<Scalars['Int']['output']>;
  perTurnHero?: Maybe<Scalars['Int']['output']>;
  perTurnTroop?: Maybe<Scalars['Int']['output']>;
  turn?: Maybe<Scalars['Int']['output']>;
};

export type CardDuelCommand = {
  __typename?: 'CardDuelCommand';
  owner?: Maybe<Scalars['String']['output']>;
  payload?: Maybe<CardDuelAttributes>;
  target?: Maybe<CardCommandTarget>;
  type: Scalars['String']['output'];
};

export type CardDuelCommandBundle = {
  __typename?: 'CardDuelCommandBundle';
  commands?: Maybe<Array<Maybe<CardDuelCommand>>>;
  group?: Maybe<Scalars['String']['output']>;
  phase?: Maybe<Scalars['String']['output']>;
  phaseOf?: Maybe<Scalars['String']['output']>;
  turn?: Maybe<Scalars['Int']['output']>;
};

export type CardDuelConfig = {
  __typename?: 'CardDuelConfig';
  firstMover: Scalars['String']['output'];
  firstPlayer: CardPlayerConfig;
  secondPlayer: CardPlayerConfig;
  setting: CardDuelSetting;
  version: Scalars['String']['output'];
};

export type CardDuelHistory = {
  __typename?: 'CardDuelHistory';
  duel: CardDuel;
  enemy?: Maybe<Profile>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['String']['output'];
  victory?: Maybe<Scalars['Boolean']['output']>;
};

export type CardDuelSetting = {
  __typename?: 'CardDuelSetting';
  groundSize?: Maybe<Scalars['Int']['output']>;
  handSize?: Maybe<Scalars['Int']['output']>;
  maxAttachment?: Maybe<Scalars['Int']['output']>;
  perTurnHero?: Maybe<Scalars['Int']['output']>;
  perTurnTroop?: Maybe<Scalars['Int']['output']>;
  playerHealth?: Maybe<Scalars['Int']['output']>;
};

export type CardPlayerConfig = {
  __typename?: 'CardPlayerConfig';
  deck?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['String']['output']>;
};

export type GameInvitation = {
  __typename?: 'GameInvitation';
  enemy: Profile;
  game: Scalars['String']['output'];
  id: Scalars['String']['output'];
  owner: Profile;
  timestamp: Scalars['String']['output'];
};

export type InviteGameInput = {
  game: MetacraftGames;
  opponent: Scalars['String']['input'];
};

export enum MetacraftGames {
  Murg = 'MURG'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptGame?: Maybe<Scalars['Boolean']['output']>;
  createQuestAction?: Maybe<QuestAction>;
  inviteGame?: Maybe<GameInvitation>;
  makeReferral?: Maybe<Scalars['Boolean']['output']>;
  stopMatchFind?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAcceptGameArgs = {
  invitationId: Scalars['String']['input'];
};


export type MutationCreateQuestActionArgs = {
  questId: Scalars['ID']['input'];
};


export type MutationInviteGameArgs = {
  input: InviteGameInput;
};


export type MutationMakeReferralArgs = {
  referralCode: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']['output']>;
  bindingId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jwt?: Maybe<Scalars['String']['output']>;
  points: Scalars['Int']['output'];
  referralCode: Scalars['String']['output'];
  referred?: Maybe<ReferralHistory>;
};

export type Query = {
  __typename?: 'Query';
  cardDuel?: Maybe<CardDuel>;
  cardDuelHistory?: Maybe<Array<Maybe<CardDuelHistory>>>;
  cardDuelPlaying?: Maybe<CardDuelHistory>;
  gameInvitations?: Maybe<Array<Maybe<GameInvitation>>>;
  gameJwt?: Maybe<Scalars['String']['output']>;
  greeting?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  quests?: Maybe<Array<Maybe<Quest>>>;
  referralHistory?: Maybe<Array<Maybe<ReferralHistory>>>;
};


export type QueryCardDuelArgs = {
  id: Scalars['String']['input'];
};


export type QueryCardDuelHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGameJwtArgs = {
  duelId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProfileArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuestsArgs = {
  status?: InputMaybe<QuestStatus>;
};

export type Quest = {
  __typename?: 'Quest';
  action?: Maybe<QuestAction>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  status: QuestStatus;
  title: Scalars['String']['output'];
  type: QuestType;
  url: Scalars['String']['output'];
};

export type QuestAction = {
  __typename?: 'QuestAction';
  claimedPoints: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  questId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export enum QuestStatus {
  Disable = 'DISABLE',
  Init = 'INIT',
  Live = 'LIVE'
}

export enum QuestType {
  CommentX = 'COMMENT_X',
  JoinDiscord = 'JOIN_DISCORD',
  LikeX = 'LIKE_X',
  RetweetX = 'RETWEET_X'
}

export type ReferralHistory = {
  __typename?: 'ReferralHistory';
  claimedPoints?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  refereeId?: Maybe<Scalars['String']['output']>;
  refereeUser?: Maybe<Profile>;
  referrerId?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  counterIncreased: Scalars['Int']['output'];
  gameInvitation?: Maybe<GameInvitation>;
  matchFind?: Maybe<CardDuel>;
  matchFound?: Maybe<CardDuel>;
};


export type SubscriptionGameInvitationArgs = {
  opponent: Scalars['String']['input'];
};


export type SubscriptionMatchFindArgs = {
  game: MetacraftGames;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionMatchFoundArgs = {
  game: MetacraftGames;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type InviteGameMutationVariables = Exact<{
  input: InviteGameInput;
}>;


export type InviteGameMutation = { __typename?: 'Mutation', inviteGame?: { __typename?: 'GameInvitation', game: string } | null };

export type AcceptGameMutationVariables = Exact<{
  invitationId: Scalars['String']['input'];
}>;


export type AcceptGameMutation = { __typename?: 'Mutation', acceptGame?: boolean | null };

export type StopMatchFindMutationVariables = Exact<{ [key: string]: never; }>;


export type StopMatchFindMutation = { __typename?: 'Mutation', stopMatchFind?: boolean | null };

export type CreateQuestActionMutationVariables = Exact<{
  questId: Scalars['ID']['input'];
}>;


export type CreateQuestActionMutation = { __typename?: 'Mutation', createQuestAction?: { __typename?: 'QuestAction', id: string, userId: string, questId: string, claimedPoints: number } | null };

export type MakeReferralMutationVariables = Exact<{
  referralCode: Scalars['String']['input'];
}>;


export type MakeReferralMutation = { __typename?: 'Mutation', makeReferral?: boolean | null };

export type GameInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GameInvitationsQuery = { __typename?: 'Query', gameInvitations?: Array<{ __typename?: 'GameInvitation', id: string, game: string, owner: { __typename?: 'Profile', id: string, address?: string | null } } | null> | null };

export type GreetingQueryVariables = Exact<{ [key: string]: never; }>;


export type GreetingQuery = { __typename?: 'Query', greeting?: string | null };

export type ProfileFieldsFragment = { __typename?: 'Profile', id: string, address?: string | null, points: number, referralCode: string };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', referralCode: string, id: string, address?: string | null, points: number, referred?: { __typename?: 'ReferralHistory', id: string, referrerId?: string | null, createdAt?: any | null } | null } | null };

export type QuestsQueryVariables = Exact<{
  status?: InputMaybe<QuestStatus>;
}>;


export type QuestsQuery = { __typename?: 'Query', quests?: Array<{ __typename?: 'Quest', id: string, title: string, description: string, type: QuestType, url: string, status: QuestStatus, points: number, createdAt: any, action?: { __typename?: 'QuestAction', id: string, userId: string, questId: string, claimedPoints: number, createdAt: any } | null } | null> | null };

export type ReferralHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type ReferralHistoryQuery = { __typename?: 'Query', referralHistory?: Array<{ __typename?: 'ReferralHistory', id: string, referrerId?: string | null, refereeId?: string | null, claimedPoints?: number | null, createdAt?: any | null, refereeUser?: { __typename?: 'Profile', id: string, address?: string | null, email?: string | null } | null } | null> | null };

export type CounterIncreasedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CounterIncreasedSubscription = { __typename?: 'Subscription', counterIncreased: number };

export type GameInvitationSubscriptionVariables = Exact<{
  opponent: Scalars['String']['input'];
}>;


export type GameInvitationSubscription = { __typename?: 'Subscription', gameInvitation?: { __typename?: 'GameInvitation', id: string, game: string, owner: { __typename?: 'Profile', email?: string | null, address?: string | null } } | null };

export type MatchFindSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type MatchFindSubscription = { __typename?: 'Subscription', matchFind?: { __typename?: 'CardDuel', id?: string | null } | null };

export const ProfileFieldsFragmentDoc = gql`
    fragment ProfileFields on Profile {
  id
  address
  points
  referralCode
}
    `;
export const InviteGameDocument = gql`
    mutation InviteGame($input: InviteGameInput!) {
  inviteGame(input: $input) {
    game
  }
}
    `;
export type InviteGameMutationFn = Apollo.MutationFunction<InviteGameMutation, InviteGameMutationVariables>;

/**
 * __useInviteGameMutation__
 *
 * To run a mutation, you first call `useInviteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteGameMutation, { data, loading, error }] = useInviteGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteGameMutation(baseOptions?: Apollo.MutationHookOptions<InviteGameMutation, InviteGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteGameMutation, InviteGameMutationVariables>(InviteGameDocument, options);
      }
export type InviteGameMutationHookResult = ReturnType<typeof useInviteGameMutation>;
export type InviteGameMutationResult = Apollo.MutationResult<InviteGameMutation>;
export type InviteGameMutationOptions = Apollo.BaseMutationOptions<InviteGameMutation, InviteGameMutationVariables>;
export const AcceptGameDocument = gql`
    mutation AcceptGame($invitationId: String!) {
  acceptGame(invitationId: $invitationId)
}
    `;
export type AcceptGameMutationFn = Apollo.MutationFunction<AcceptGameMutation, AcceptGameMutationVariables>;

/**
 * __useAcceptGameMutation__
 *
 * To run a mutation, you first call `useAcceptGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptGameMutation, { data, loading, error }] = useAcceptGameMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useAcceptGameMutation(baseOptions?: Apollo.MutationHookOptions<AcceptGameMutation, AcceptGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptGameMutation, AcceptGameMutationVariables>(AcceptGameDocument, options);
      }
export type AcceptGameMutationHookResult = ReturnType<typeof useAcceptGameMutation>;
export type AcceptGameMutationResult = Apollo.MutationResult<AcceptGameMutation>;
export type AcceptGameMutationOptions = Apollo.BaseMutationOptions<AcceptGameMutation, AcceptGameMutationVariables>;
export const StopMatchFindDocument = gql`
    mutation StopMatchFind {
  stopMatchFind
}
    `;
export type StopMatchFindMutationFn = Apollo.MutationFunction<StopMatchFindMutation, StopMatchFindMutationVariables>;

/**
 * __useStopMatchFindMutation__
 *
 * To run a mutation, you first call `useStopMatchFindMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopMatchFindMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopMatchFindMutation, { data, loading, error }] = useStopMatchFindMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopMatchFindMutation(baseOptions?: Apollo.MutationHookOptions<StopMatchFindMutation, StopMatchFindMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopMatchFindMutation, StopMatchFindMutationVariables>(StopMatchFindDocument, options);
      }
export type StopMatchFindMutationHookResult = ReturnType<typeof useStopMatchFindMutation>;
export type StopMatchFindMutationResult = Apollo.MutationResult<StopMatchFindMutation>;
export type StopMatchFindMutationOptions = Apollo.BaseMutationOptions<StopMatchFindMutation, StopMatchFindMutationVariables>;
export const CreateQuestActionDocument = gql`
    mutation CreateQuestAction($questId: ID!) {
  createQuestAction(questId: $questId) {
    id
    userId
    questId
    claimedPoints
  }
}
    `;
export type CreateQuestActionMutationFn = Apollo.MutationFunction<CreateQuestActionMutation, CreateQuestActionMutationVariables>;

/**
 * __useCreateQuestActionMutation__
 *
 * To run a mutation, you first call `useCreateQuestActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestActionMutation, { data, loading, error }] = useCreateQuestActionMutation({
 *   variables: {
 *      questId: // value for 'questId'
 *   },
 * });
 */
export function useCreateQuestActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestActionMutation, CreateQuestActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestActionMutation, CreateQuestActionMutationVariables>(CreateQuestActionDocument, options);
      }
export type CreateQuestActionMutationHookResult = ReturnType<typeof useCreateQuestActionMutation>;
export type CreateQuestActionMutationResult = Apollo.MutationResult<CreateQuestActionMutation>;
export type CreateQuestActionMutationOptions = Apollo.BaseMutationOptions<CreateQuestActionMutation, CreateQuestActionMutationVariables>;
export const MakeReferralDocument = gql`
    mutation MakeReferral($referralCode: String!) {
  makeReferral(referralCode: $referralCode)
}
    `;
export type MakeReferralMutationFn = Apollo.MutationFunction<MakeReferralMutation, MakeReferralMutationVariables>;

/**
 * __useMakeReferralMutation__
 *
 * To run a mutation, you first call `useMakeReferralMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeReferralMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeReferralMutation, { data, loading, error }] = useMakeReferralMutation({
 *   variables: {
 *      referralCode: // value for 'referralCode'
 *   },
 * });
 */
export function useMakeReferralMutation(baseOptions?: Apollo.MutationHookOptions<MakeReferralMutation, MakeReferralMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeReferralMutation, MakeReferralMutationVariables>(MakeReferralDocument, options);
      }
export type MakeReferralMutationHookResult = ReturnType<typeof useMakeReferralMutation>;
export type MakeReferralMutationResult = Apollo.MutationResult<MakeReferralMutation>;
export type MakeReferralMutationOptions = Apollo.BaseMutationOptions<MakeReferralMutation, MakeReferralMutationVariables>;
export const GameInvitationsDocument = gql`
    query GameInvitations {
  gameInvitations {
    id
    game
    owner {
      id
      address
    }
  }
}
    `;

/**
 * __useGameInvitationsQuery__
 *
 * To run a query within a React component, call `useGameInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameInvitationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGameInvitationsQuery(baseOptions?: Apollo.QueryHookOptions<GameInvitationsQuery, GameInvitationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameInvitationsQuery, GameInvitationsQueryVariables>(GameInvitationsDocument, options);
      }
export function useGameInvitationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameInvitationsQuery, GameInvitationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameInvitationsQuery, GameInvitationsQueryVariables>(GameInvitationsDocument, options);
        }
export function useGameInvitationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GameInvitationsQuery, GameInvitationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GameInvitationsQuery, GameInvitationsQueryVariables>(GameInvitationsDocument, options);
        }
export type GameInvitationsQueryHookResult = ReturnType<typeof useGameInvitationsQuery>;
export type GameInvitationsLazyQueryHookResult = ReturnType<typeof useGameInvitationsLazyQuery>;
export type GameInvitationsSuspenseQueryHookResult = ReturnType<typeof useGameInvitationsSuspenseQuery>;
export type GameInvitationsQueryResult = Apollo.QueryResult<GameInvitationsQuery, GameInvitationsQueryVariables>;
export const GreetingDocument = gql`
    query Greeting {
  greeting
}
    `;

/**
 * __useGreetingQuery__
 *
 * To run a query within a React component, call `useGreetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGreetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGreetingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGreetingQuery(baseOptions?: Apollo.QueryHookOptions<GreetingQuery, GreetingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GreetingQuery, GreetingQueryVariables>(GreetingDocument, options);
      }
export function useGreetingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GreetingQuery, GreetingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GreetingQuery, GreetingQueryVariables>(GreetingDocument, options);
        }
export function useGreetingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GreetingQuery, GreetingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GreetingQuery, GreetingQueryVariables>(GreetingDocument, options);
        }
export type GreetingQueryHookResult = ReturnType<typeof useGreetingQuery>;
export type GreetingLazyQueryHookResult = ReturnType<typeof useGreetingLazyQuery>;
export type GreetingSuspenseQueryHookResult = ReturnType<typeof useGreetingSuspenseQuery>;
export type GreetingQueryResult = Apollo.QueryResult<GreetingQuery, GreetingQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    ...ProfileFields
    referralCode
    referred {
      id
      referrerId
      createdAt
    }
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const QuestsDocument = gql`
    query Quests($status: QuestStatus = LIVE) {
  quests(status: $status) {
    id
    title
    description
    type
    url
    status
    points
    createdAt
    action {
      id
      userId
      questId
      claimedPoints
      createdAt
    }
  }
}
    `;

/**
 * __useQuestsQuery__
 *
 * To run a query within a React component, call `useQuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useQuestsQuery(baseOptions?: Apollo.QueryHookOptions<QuestsQuery, QuestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestsQuery, QuestsQueryVariables>(QuestsDocument, options);
      }
export function useQuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestsQuery, QuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestsQuery, QuestsQueryVariables>(QuestsDocument, options);
        }
export function useQuestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QuestsQuery, QuestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuestsQuery, QuestsQueryVariables>(QuestsDocument, options);
        }
export type QuestsQueryHookResult = ReturnType<typeof useQuestsQuery>;
export type QuestsLazyQueryHookResult = ReturnType<typeof useQuestsLazyQuery>;
export type QuestsSuspenseQueryHookResult = ReturnType<typeof useQuestsSuspenseQuery>;
export type QuestsQueryResult = Apollo.QueryResult<QuestsQuery, QuestsQueryVariables>;
export const ReferralHistoryDocument = gql`
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

/**
 * __useReferralHistoryQuery__
 *
 * To run a query within a React component, call `useReferralHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useReferralHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReferralHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useReferralHistoryQuery(baseOptions?: Apollo.QueryHookOptions<ReferralHistoryQuery, ReferralHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReferralHistoryQuery, ReferralHistoryQueryVariables>(ReferralHistoryDocument, options);
      }
export function useReferralHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReferralHistoryQuery, ReferralHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReferralHistoryQuery, ReferralHistoryQueryVariables>(ReferralHistoryDocument, options);
        }
export function useReferralHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReferralHistoryQuery, ReferralHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReferralHistoryQuery, ReferralHistoryQueryVariables>(ReferralHistoryDocument, options);
        }
export type ReferralHistoryQueryHookResult = ReturnType<typeof useReferralHistoryQuery>;
export type ReferralHistoryLazyQueryHookResult = ReturnType<typeof useReferralHistoryLazyQuery>;
export type ReferralHistorySuspenseQueryHookResult = ReturnType<typeof useReferralHistorySuspenseQuery>;
export type ReferralHistoryQueryResult = Apollo.QueryResult<ReferralHistoryQuery, ReferralHistoryQueryVariables>;
export const CounterIncreasedDocument = gql`
    subscription CounterIncreased {
  counterIncreased
}
    `;

/**
 * __useCounterIncreasedSubscription__
 *
 * To run a query within a React component, call `useCounterIncreasedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCounterIncreasedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCounterIncreasedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCounterIncreasedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CounterIncreasedSubscription, CounterIncreasedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CounterIncreasedSubscription, CounterIncreasedSubscriptionVariables>(CounterIncreasedDocument, options);
      }
export type CounterIncreasedSubscriptionHookResult = ReturnType<typeof useCounterIncreasedSubscription>;
export type CounterIncreasedSubscriptionResult = Apollo.SubscriptionResult<CounterIncreasedSubscription>;
export const GameInvitationDocument = gql`
    subscription GameInvitation($opponent: String!) {
  gameInvitation(opponent: $opponent) {
    id
    game
    owner {
      email
      address
    }
  }
}
    `;

/**
 * __useGameInvitationSubscription__
 *
 * To run a query within a React component, call `useGameInvitationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGameInvitationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameInvitationSubscription({
 *   variables: {
 *      opponent: // value for 'opponent'
 *   },
 * });
 */
export function useGameInvitationSubscription(baseOptions: Apollo.SubscriptionHookOptions<GameInvitationSubscription, GameInvitationSubscriptionVariables> & ({ variables: GameInvitationSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GameInvitationSubscription, GameInvitationSubscriptionVariables>(GameInvitationDocument, options);
      }
export type GameInvitationSubscriptionHookResult = ReturnType<typeof useGameInvitationSubscription>;
export type GameInvitationSubscriptionResult = Apollo.SubscriptionResult<GameInvitationSubscription>;
export const MatchFindDocument = gql`
    subscription MatchFind($userId: String) {
  matchFind(game: MURG, userId: $userId) {
    id
  }
}
    `;

/**
 * __useMatchFindSubscription__
 *
 * To run a query within a React component, call `useMatchFindSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMatchFindSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchFindSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMatchFindSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MatchFindSubscription, MatchFindSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MatchFindSubscription, MatchFindSubscriptionVariables>(MatchFindDocument, options);
      }
export type MatchFindSubscriptionHookResult = ReturnType<typeof useMatchFindSubscription>;
export type MatchFindSubscriptionResult = Apollo.SubscriptionResult<MatchFindSubscription>;