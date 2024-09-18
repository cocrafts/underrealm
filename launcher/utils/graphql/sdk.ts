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
  createQuest?: Maybe<Quest>;
  createQuestAction?: Maybe<QuestAction>;
  deleteQuest?: Maybe<Scalars['Boolean']['output']>;
  inviteGame?: Maybe<GameInvitation>;
  makeReferral?: Maybe<Scalars['Boolean']['output']>;
  stopMatchFind?: Maybe<Scalars['Boolean']['output']>;
  updateQuest?: Maybe<Quest>;
};


export type MutationAcceptGameArgs = {
  invitationId: Scalars['String']['input'];
};


export type MutationCreateQuestArgs = {
  description: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateQuestActionArgs = {
  claimedPoints: Scalars['Int']['input'];
  questId: Scalars['ID']['input'];
};


export type MutationDeleteQuestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInviteGameArgs = {
  input: InviteGameInput;
};


export type MutationMakeReferralArgs = {
  referralCode: Scalars['String']['input'];
};


export type MutationUpdateQuestArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  address: Scalars['String']['output'];
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  githubId?: Maybe<Scalars['String']['output']>;
  githubUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  jwt?: Maybe<Scalars['String']['output']>;
  linkedId?: Maybe<Scalars['String']['output']>;
  mineral: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
  referralCode: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  activeQuests?: Maybe<Array<Maybe<Quest>>>;
  cardDuel?: Maybe<CardDuel>;
  cardDuelHistory?: Maybe<Array<Maybe<CardDuelHistory>>>;
  cardDuelPlaying?: Maybe<CardDuelHistory>;
  disableQuests?: Maybe<Array<Maybe<Quest>>>;
  gameInvitations?: Maybe<Array<Maybe<GameInvitation>>>;
  gameJwt?: Maybe<Scalars['String']['output']>;
  greeting?: Maybe<Scalars['String']['output']>;
  initQuests?: Maybe<Array<Maybe<Quest>>>;
  profile?: Maybe<Profile>;
  quest?: Maybe<Quest>;
  questActions?: Maybe<Array<Maybe<QuestAction>>>;
  referralHistory?: Maybe<ReferralHistory>;
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


export type QueryQuestArgs = {
  id: Scalars['ID']['input'];
};

export type Quest = {
  __typename?: 'Quest';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type QuestAction = {
  __typename?: 'QuestAction';
  claimedPoints: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  questId: Scalars['ID']['output'];
  userId: Scalars['String']['output'];
};

export type RefereeUser = {
  __typename?: 'RefereeUser';
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ReferralHistory = {
  __typename?: 'ReferralHistory';
  count: Scalars['Int']['output'];
  detail?: Maybe<Array<Maybe<ReferralHistoryDetail>>>;
  points: Scalars['Int']['output'];
};

export type ReferralHistoryDetail = {
  __typename?: 'ReferralHistoryDetail';
  claimedPoints: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  refereeId: Scalars['String']['output'];
  refereeUser?: Maybe<RefereeUser>;
};

export type Subscription = {
  __typename?: 'Subscription';
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

export type CreateQuestMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
  points: Scalars['Int']['input'];
}>;


export type CreateQuestMutation = { __typename?: 'Mutation', createQuest?: { __typename?: 'Quest', id: string, title: string, description: string, type: string, url: string, status: string, points: number } | null };

export type UpdateQuestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateQuestMutation = { __typename?: 'Mutation', updateQuest?: { __typename?: 'Quest', id: string, title: string, description: string, type: string, url: string, status: string, points: number } | null };

export type DeleteQuestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteQuestMutation = { __typename?: 'Mutation', deleteQuest?: boolean | null };

export type CreateQuestActionMutationVariables = Exact<{
  questId: Scalars['ID']['input'];
  claimedPoints: Scalars['Int']['input'];
}>;


export type CreateQuestActionMutation = { __typename?: 'Mutation', createQuestAction?: { __typename?: 'QuestAction', id: string, userId: string, questId: string, claimedPoints: number } | null };

export type GameInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GameInvitationsQuery = { __typename?: 'Query', gameInvitations?: Array<{ __typename?: 'GameInvitation', id: string, game: string, owner: { __typename?: 'Profile', id: string, address: string, name?: string | null, avatarUrl?: string | null } } | null> | null };

export type GreetingQueryVariables = Exact<{ [key: string]: never; }>;


export type GreetingQuery = { __typename?: 'Query', greeting?: string | null };

export type ActiveQuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveQuestsQuery = { __typename?: 'Query', activeQuests?: Array<{ __typename?: 'Quest', id: string, title: string, description: string, type: string, url: string, status: string, points: number } | null> | null };

export type InitQuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type InitQuestsQuery = { __typename?: 'Query', initQuests?: Array<{ __typename?: 'Quest', id: string, title: string, description: string, type: string, url: string, status: string, points: number } | null> | null };

export type DisableQuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type DisableQuestsQuery = { __typename?: 'Query', disableQuests?: Array<{ __typename?: 'Quest', id: string, title: string, description: string, type: string, url: string, status: string, points: number } | null> | null };

export type QuestByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type QuestByIdQuery = { __typename?: 'Query', quest?: { __typename?: 'Quest', id: string, title: string, description: string, type: string, url: string, status: string, points: number } | null };

export type QuestActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestActionsQuery = { __typename?: 'Query', questActions?: Array<{ __typename?: 'QuestAction', id: string, userId: string, questId: string, claimedPoints: number } | null> | null };


export const CreateQuestDocument = gql`
    mutation CreateQuest($title: String!, $description: String!, $type: String!, $url: String!, $points: Int!) {
  createQuest(
    title: $title
    description: $description
    type: $type
    url: $url
    points: $points
  ) {
    id
    title
    description
    type
    url
    status
    points
  }
}
    `;
export type CreateQuestMutationFn = Apollo.MutationFunction<CreateQuestMutation, CreateQuestMutationVariables>;

/**
 * __useCreateQuestMutation__
 *
 * To run a mutation, you first call `useCreateQuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestMutation, { data, loading, error }] = useCreateQuestMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      url: // value for 'url'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useCreateQuestMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestMutation, CreateQuestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestMutation, CreateQuestMutationVariables>(CreateQuestDocument, options);
      }
export type CreateQuestMutationHookResult = ReturnType<typeof useCreateQuestMutation>;
export type CreateQuestMutationResult = Apollo.MutationResult<CreateQuestMutation>;
export type CreateQuestMutationOptions = Apollo.BaseMutationOptions<CreateQuestMutation, CreateQuestMutationVariables>;
export const UpdateQuestDocument = gql`
    mutation UpdateQuest($id: ID!, $status: String!) {
  updateQuest(id: $id, status: $status) {
    id
    title
    description
    type
    url
    status
    points
  }
}
    `;
export type UpdateQuestMutationFn = Apollo.MutationFunction<UpdateQuestMutation, UpdateQuestMutationVariables>;

/**
 * __useUpdateQuestMutation__
 *
 * To run a mutation, you first call `useUpdateQuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestMutation, { data, loading, error }] = useUpdateQuestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateQuestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestMutation, UpdateQuestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestMutation, UpdateQuestMutationVariables>(UpdateQuestDocument, options);
      }
export type UpdateQuestMutationHookResult = ReturnType<typeof useUpdateQuestMutation>;
export type UpdateQuestMutationResult = Apollo.MutationResult<UpdateQuestMutation>;
export type UpdateQuestMutationOptions = Apollo.BaseMutationOptions<UpdateQuestMutation, UpdateQuestMutationVariables>;
export const DeleteQuestDocument = gql`
    mutation DeleteQuest($id: ID!) {
  deleteQuest(id: $id)
}
    `;
export type DeleteQuestMutationFn = Apollo.MutationFunction<DeleteQuestMutation, DeleteQuestMutationVariables>;

/**
 * __useDeleteQuestMutation__
 *
 * To run a mutation, you first call `useDeleteQuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestMutation, { data, loading, error }] = useDeleteQuestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestMutation, DeleteQuestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestMutation, DeleteQuestMutationVariables>(DeleteQuestDocument, options);
      }
export type DeleteQuestMutationHookResult = ReturnType<typeof useDeleteQuestMutation>;
export type DeleteQuestMutationResult = Apollo.MutationResult<DeleteQuestMutation>;
export type DeleteQuestMutationOptions = Apollo.BaseMutationOptions<DeleteQuestMutation, DeleteQuestMutationVariables>;
export const CreateQuestActionDocument = gql`
    mutation CreateQuestAction($questId: ID!, $claimedPoints: Int!) {
  createQuestAction(questId: $questId, claimedPoints: $claimedPoints) {
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
 *      claimedPoints: // value for 'claimedPoints'
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
export const GameInvitationsDocument = gql`
    query GameInvitations {
  gameInvitations {
    id
    game
    owner {
      id
      address
      name
      avatarUrl
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
export const ActiveQuestsDocument = gql`
    query ActiveQuests {
  activeQuests {
    id
    title
    description
    type
    url
    status
    points
  }
}
    `;

/**
 * __useActiveQuestsQuery__
 *
 * To run a query within a React component, call `useActiveQuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveQuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveQuestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveQuestsQuery(baseOptions?: Apollo.QueryHookOptions<ActiveQuestsQuery, ActiveQuestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveQuestsQuery, ActiveQuestsQueryVariables>(ActiveQuestsDocument, options);
      }
export function useActiveQuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveQuestsQuery, ActiveQuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveQuestsQuery, ActiveQuestsQueryVariables>(ActiveQuestsDocument, options);
        }
export function useActiveQuestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActiveQuestsQuery, ActiveQuestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActiveQuestsQuery, ActiveQuestsQueryVariables>(ActiveQuestsDocument, options);
        }
export type ActiveQuestsQueryHookResult = ReturnType<typeof useActiveQuestsQuery>;
export type ActiveQuestsLazyQueryHookResult = ReturnType<typeof useActiveQuestsLazyQuery>;
export type ActiveQuestsSuspenseQueryHookResult = ReturnType<typeof useActiveQuestsSuspenseQuery>;
export type ActiveQuestsQueryResult = Apollo.QueryResult<ActiveQuestsQuery, ActiveQuestsQueryVariables>;
export const InitQuestsDocument = gql`
    query InitQuests {
  initQuests {
    id
    title
    description
    type
    url
    status
    points
  }
}
    `;

/**
 * __useInitQuestsQuery__
 *
 * To run a query within a React component, call `useInitQuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitQuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitQuestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInitQuestsQuery(baseOptions?: Apollo.QueryHookOptions<InitQuestsQuery, InitQuestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitQuestsQuery, InitQuestsQueryVariables>(InitQuestsDocument, options);
      }
export function useInitQuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitQuestsQuery, InitQuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitQuestsQuery, InitQuestsQueryVariables>(InitQuestsDocument, options);
        }
export function useInitQuestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InitQuestsQuery, InitQuestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InitQuestsQuery, InitQuestsQueryVariables>(InitQuestsDocument, options);
        }
export type InitQuestsQueryHookResult = ReturnType<typeof useInitQuestsQuery>;
export type InitQuestsLazyQueryHookResult = ReturnType<typeof useInitQuestsLazyQuery>;
export type InitQuestsSuspenseQueryHookResult = ReturnType<typeof useInitQuestsSuspenseQuery>;
export type InitQuestsQueryResult = Apollo.QueryResult<InitQuestsQuery, InitQuestsQueryVariables>;
export const DisableQuestsDocument = gql`
    query DisableQuests {
  disableQuests {
    id
    title
    description
    type
    url
    status
    points
  }
}
    `;

/**
 * __useDisableQuestsQuery__
 *
 * To run a query within a React component, call `useDisableQuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDisableQuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDisableQuestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDisableQuestsQuery(baseOptions?: Apollo.QueryHookOptions<DisableQuestsQuery, DisableQuestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DisableQuestsQuery, DisableQuestsQueryVariables>(DisableQuestsDocument, options);
      }
export function useDisableQuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DisableQuestsQuery, DisableQuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DisableQuestsQuery, DisableQuestsQueryVariables>(DisableQuestsDocument, options);
        }
export function useDisableQuestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DisableQuestsQuery, DisableQuestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DisableQuestsQuery, DisableQuestsQueryVariables>(DisableQuestsDocument, options);
        }
export type DisableQuestsQueryHookResult = ReturnType<typeof useDisableQuestsQuery>;
export type DisableQuestsLazyQueryHookResult = ReturnType<typeof useDisableQuestsLazyQuery>;
export type DisableQuestsSuspenseQueryHookResult = ReturnType<typeof useDisableQuestsSuspenseQuery>;
export type DisableQuestsQueryResult = Apollo.QueryResult<DisableQuestsQuery, DisableQuestsQueryVariables>;
export const QuestByIdDocument = gql`
    query QuestById($id: ID!) {
  quest(id: $id) {
    id
    title
    description
    type
    url
    status
    points
  }
}
    `;

/**
 * __useQuestByIdQuery__
 *
 * To run a query within a React component, call `useQuestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuestByIdQuery(baseOptions: Apollo.QueryHookOptions<QuestByIdQuery, QuestByIdQueryVariables> & ({ variables: QuestByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestByIdQuery, QuestByIdQueryVariables>(QuestByIdDocument, options);
      }
export function useQuestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestByIdQuery, QuestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestByIdQuery, QuestByIdQueryVariables>(QuestByIdDocument, options);
        }
export function useQuestByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QuestByIdQuery, QuestByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuestByIdQuery, QuestByIdQueryVariables>(QuestByIdDocument, options);
        }
export type QuestByIdQueryHookResult = ReturnType<typeof useQuestByIdQuery>;
export type QuestByIdLazyQueryHookResult = ReturnType<typeof useQuestByIdLazyQuery>;
export type QuestByIdSuspenseQueryHookResult = ReturnType<typeof useQuestByIdSuspenseQuery>;
export type QuestByIdQueryResult = Apollo.QueryResult<QuestByIdQuery, QuestByIdQueryVariables>;
export const QuestActionsDocument = gql`
    query QuestActions {
  questActions {
    id
    userId
    questId
    claimedPoints
  }
}
    `;

/**
 * __useQuestActionsQuery__
 *
 * To run a query within a React component, call `useQuestActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestActionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestActionsQuery, QuestActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestActionsQuery, QuestActionsQueryVariables>(QuestActionsDocument, options);
      }
export function useQuestActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestActionsQuery, QuestActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestActionsQuery, QuestActionsQueryVariables>(QuestActionsDocument, options);
        }
export function useQuestActionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QuestActionsQuery, QuestActionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuestActionsQuery, QuestActionsQueryVariables>(QuestActionsDocument, options);
        }
export type QuestActionsQueryHookResult = ReturnType<typeof useQuestActionsQuery>;
export type QuestActionsLazyQueryHookResult = ReturnType<typeof useQuestActionsLazyQuery>;
export type QuestActionsSuspenseQueryHookResult = ReturnType<typeof useQuestActionsSuspenseQuery>;
export type QuestActionsQueryResult = Apollo.QueryResult<QuestActionsQuery, QuestActionsQueryVariables>;