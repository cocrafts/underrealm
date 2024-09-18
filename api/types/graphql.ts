import { GraphQLResolveInfo } from 'graphql';
import { ApiContext } from '../utils/runtime';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CardBoardTarget: ResolverTypeWrapper<CardBoardTarget>;
  CardCommandTarget: ResolverTypeWrapper<CardCommandTarget>;
  CardDuel: ResolverTypeWrapper<CardDuel>;
  CardDuelAttributes: ResolverTypeWrapper<CardDuelAttributes>;
  CardDuelCommand: ResolverTypeWrapper<CardDuelCommand>;
  CardDuelCommandBundle: ResolverTypeWrapper<CardDuelCommandBundle>;
  CardDuelConfig: ResolverTypeWrapper<CardDuelConfig>;
  CardDuelHistory: ResolverTypeWrapper<CardDuelHistory>;
  CardDuelSetting: ResolverTypeWrapper<CardDuelSetting>;
  CardPlayerConfig: ResolverTypeWrapper<CardPlayerConfig>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GameInvitation: ResolverTypeWrapper<GameInvitation>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InviteGameInput: InviteGameInput;
  MetacraftGames: MetacraftGames;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Quest: ResolverTypeWrapper<Quest>;
  QuestAction: ResolverTypeWrapper<QuestAction>;
  RefereeUser: ResolverTypeWrapper<RefereeUser>;
  ReferralHistory: ResolverTypeWrapper<ReferralHistory>;
  ReferralHistoryDetail: ResolverTypeWrapper<ReferralHistoryDetail>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CardBoardTarget: CardBoardTarget;
  CardCommandTarget: CardCommandTarget;
  CardDuel: CardDuel;
  CardDuelAttributes: CardDuelAttributes;
  CardDuelCommand: CardDuelCommand;
  CardDuelCommandBundle: CardDuelCommandBundle;
  CardDuelConfig: CardDuelConfig;
  CardDuelHistory: CardDuelHistory;
  CardDuelSetting: CardDuelSetting;
  CardPlayerConfig: CardPlayerConfig;
  Float: Scalars['Float']['output'];
  GameInvitation: GameInvitation;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  InviteGameInput: InviteGameInput;
  Mutation: {};
  Profile: Profile;
  Query: {};
  Quest: Quest;
  QuestAction: QuestAction;
  RefereeUser: RefereeUser;
  ReferralHistory: ReferralHistory;
  ReferralHistoryDetail: ReferralHistoryDetail;
  String: Scalars['String']['output'];
  Subscription: {};
}>;

export type CardBoardTargetResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardBoardTarget'] = ResolversParentTypes['CardBoardTarget']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardCommandTargetResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardCommandTarget'] = ResolversParentTypes['CardCommandTarget']> = ResolversObject<{
  from?: Resolver<Maybe<ResolversTypes['CardBoardTarget']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['CardBoardTarget']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuel'] = ResolversParentTypes['CardDuel']> = ResolversObject<{
  config?: Resolver<Maybe<ResolversTypes['CardDuelConfig']>, ParentType, ContextType>;
  history?: Resolver<Maybe<Array<Maybe<ResolversTypes['CardDuelCommandBundle']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelAttributesResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuelAttributes'] = ResolversParentTypes['CardDuelAttributes']> = ResolversObject<{
  attack?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  charge?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defense?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gameOver?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  health?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perTurnHero?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perTurnTroop?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  turn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelCommandResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuelCommand'] = ResolversParentTypes['CardDuelCommand']> = ResolversObject<{
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['CardDuelAttributes']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['CardCommandTarget']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelCommandBundleResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuelCommandBundle'] = ResolversParentTypes['CardDuelCommandBundle']> = ResolversObject<{
  commands?: Resolver<Maybe<Array<Maybe<ResolversTypes['CardDuelCommand']>>>, ParentType, ContextType>;
  group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phase?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phaseOf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  turn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelConfigResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuelConfig'] = ResolversParentTypes['CardDuelConfig']> = ResolversObject<{
  firstMover?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstPlayer?: Resolver<ResolversTypes['CardPlayerConfig'], ParentType, ContextType>;
  secondPlayer?: Resolver<ResolversTypes['CardPlayerConfig'], ParentType, ContextType>;
  setting?: Resolver<ResolversTypes['CardDuelSetting'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelHistoryResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuelHistory'] = ResolversParentTypes['CardDuelHistory']> = ResolversObject<{
  duel?: Resolver<ResolversTypes['CardDuel'], ParentType, ContextType>;
  enemy?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  victory?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardDuelSettingResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardDuelSetting'] = ResolversParentTypes['CardDuelSetting']> = ResolversObject<{
  groundSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  handSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxAttachment?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perTurnHero?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perTurnTroop?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  playerHealth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardPlayerConfigResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['CardPlayerConfig'] = ResolversParentTypes['CardPlayerConfig']> = ResolversObject<{
  deck?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameInvitationResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['GameInvitation'] = ResolversParentTypes['GameInvitation']> = ResolversObject<{
  enemy?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptGame?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAcceptGameArgs, 'invitationId'>>;
  createQuest?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType, RequireFields<MutationCreateQuestArgs, 'description' | 'points' | 'title' | 'type'>>;
  createQuestAction?: Resolver<Maybe<ResolversTypes['QuestAction']>, ParentType, ContextType, RequireFields<MutationCreateQuestActionArgs, 'claimedPoints' | 'questId'>>;
  deleteQuest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteQuestArgs, 'id'>>;
  inviteGame?: Resolver<Maybe<ResolversTypes['GameInvitation']>, ParentType, ContextType, RequireFields<MutationInviteGameArgs, 'input'>>;
  makeReferral?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMakeReferralArgs, 'referralCode'>>;
  stopMatchFind?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updateQuest?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType, RequireFields<MutationUpdateQuestArgs, 'id' | 'status'>>;
}>;

export type ProfileResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  githubId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  githubUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isOnline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  jwt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mineral?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referralCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  activeQuests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quest']>>>, ParentType, ContextType>;
  cardDuel?: Resolver<Maybe<ResolversTypes['CardDuel']>, ParentType, ContextType, RequireFields<QueryCardDuelArgs, 'id'>>;
  cardDuelHistory?: Resolver<Maybe<Array<Maybe<ResolversTypes['CardDuelHistory']>>>, ParentType, ContextType, Partial<QueryCardDuelHistoryArgs>>;
  cardDuelPlaying?: Resolver<Maybe<ResolversTypes['CardDuelHistory']>, ParentType, ContextType>;
  disableQuests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quest']>>>, ParentType, ContextType>;
  gameInvitations?: Resolver<Maybe<Array<Maybe<ResolversTypes['GameInvitation']>>>, ParentType, ContextType>;
  gameJwt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryGameJwtArgs>>;
  greeting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  initQuests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quest']>>>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, Partial<QueryProfileArgs>>;
  quest?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType, RequireFields<QueryQuestArgs, 'id'>>;
  questActions?: Resolver<Maybe<Array<Maybe<ResolversTypes['QuestAction']>>>, ParentType, ContextType>;
  referralHistory?: Resolver<Maybe<ResolversTypes['ReferralHistory']>, ParentType, ContextType>;
}>;

export type QuestResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Quest'] = ResolversParentTypes['Quest']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QuestActionResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['QuestAction'] = ResolversParentTypes['QuestAction']> = ResolversObject<{
  claimedPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  questId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RefereeUserResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['RefereeUser'] = ResolversParentTypes['RefereeUser']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReferralHistoryResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['ReferralHistory'] = ResolversParentTypes['ReferralHistory']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  detail?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReferralHistoryDetail']>>>, ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReferralHistoryDetailResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['ReferralHistoryDetail'] = ResolversParentTypes['ReferralHistoryDetail']> = ResolversObject<{
  claimedPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  refereeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refereeUser?: Resolver<Maybe<ResolversTypes['RefereeUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  gameInvitation?: SubscriptionResolver<Maybe<ResolversTypes['GameInvitation']>, "gameInvitation", ParentType, ContextType, RequireFields<SubscriptionGameInvitationArgs, 'opponent'>>;
  matchFind?: SubscriptionResolver<Maybe<ResolversTypes['CardDuel']>, "matchFind", ParentType, ContextType, RequireFields<SubscriptionMatchFindArgs, 'game'>>;
  matchFound?: SubscriptionResolver<Maybe<ResolversTypes['CardDuel']>, "matchFound", ParentType, ContextType, RequireFields<SubscriptionMatchFoundArgs, 'game'>>;
}>;

export type Resolvers<ContextType = ApiContext> = ResolversObject<{
  CardBoardTarget?: CardBoardTargetResolvers<ContextType>;
  CardCommandTarget?: CardCommandTargetResolvers<ContextType>;
  CardDuel?: CardDuelResolvers<ContextType>;
  CardDuelAttributes?: CardDuelAttributesResolvers<ContextType>;
  CardDuelCommand?: CardDuelCommandResolvers<ContextType>;
  CardDuelCommandBundle?: CardDuelCommandBundleResolvers<ContextType>;
  CardDuelConfig?: CardDuelConfigResolvers<ContextType>;
  CardDuelHistory?: CardDuelHistoryResolvers<ContextType>;
  CardDuelSetting?: CardDuelSettingResolvers<ContextType>;
  CardPlayerConfig?: CardPlayerConfigResolvers<ContextType>;
  GameInvitation?: GameInvitationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quest?: QuestResolvers<ContextType>;
  QuestAction?: QuestActionResolvers<ContextType>;
  RefereeUser?: RefereeUserResolvers<ContextType>;
  ReferralHistory?: ReferralHistoryResolvers<ContextType>;
  ReferralHistoryDetail?: ReferralHistoryDetailResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
}>;

