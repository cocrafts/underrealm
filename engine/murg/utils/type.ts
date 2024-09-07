export interface TemplateStyle {
	color?: string;
	size?: number;
	weight?: string;
}

export enum FragmentType {
	TEXT = 'text',
	KEYWORD = 'keyword',
}

export interface TemplateFragment {
	text: string;
	type: string;
	style?: TemplateStyle;
}

export enum ActivationType {
	Summon,
	Death,
	Passive,
	Attack,
	Defense,
	Glory,
	PreFight,
	PostFight,
	Charge,
	Inspire,
	Banner,
}

export enum InspireSource {
	Metal = '01',
	Wood = '02',
	Water = '03',
	Fire = '04',
	Earth = '05',
	Light = '06',
	Dark = '07',
	Summon = 'Summon',
	Death = 'Death',
	Spell = 'Spell',
	Skill = 'Skill',
}

export type SkillIds =
	| 'MinHealthSteal'
	| 'SelfMutate'
	| 'FrontMutate'
	| 'DestroyFacingMinHealth'
	| 'RandomEnemyMutate'
	| 'LowestHealthMutate'
	| 'PlayerMutate'
	| 'CreateIllusion'
	| 'SummonSnake'
	| 'SelfBuffAndCleaver'
	| 'AttributeStack';

export type SkillAttributes = Record<string, unknown> & {
	id: SkillIds;
};

export type SkillRunner = (payload: {
	duel: DuelState;
	cardId: string;
	sourceType?: CommandSourceType;
}) => DuelCommand[];

export type PassivePair = [Attribute, Attribute];

export type PassiveIds =
	| 'GainAttackByEnemyDefense'
	| 'IgnoreEnemyDefense'
	| 'GainAttackByEnemyMissingHealth'
	| 'GainAttackByRemainingHealth'
	| 'DamageMultiplier'
	| 'GainDefenseByMissingHealth'
	| 'MutateByClass';

export type PassiveAttributes = Record<string, unknown> & {
	id: PassiveIds;
};

export type PassiveRunner = (payload: {
	duel: DuelState;
	cardId: string;
	facingCardId?: string;
}) => PassivePair;

export interface Skill {
	template: TemplateFragment[] | string;
	charge?: number;
	activation?: ActivationType;
	inspire?: InspireSource;
	attribute?: SkillAttributes;
	passiveAttribute?: PassiveAttributes;
}

export interface Attribute {
	attack: number;
	health: number;
	defense: number;
	charge?: number;
}

export interface GenerativeValue {
	bare: number;
	enhanced: number;
	isCounter?: boolean;
	isCountered: boolean;
}

export enum CardType {
	Hero,
	Troop,
	Spell,
}

export enum ClassType {
	Assassin = '01',
	Knight = '02',
	Tanker = '03',
	Wizard = '04',
	Summoner = '05',
	Beast = '06',
}

export enum ElementalType {
	Metal = '01',
	Wood = '02',
	Water = '03',
	Fire = '04',
	Earth = '05',
	Light = '06',
	Dark = '07',
}

export interface Card {
	id: string;
	name: string;
	title?: string;
	kind: CardType;
	rarity: number;
	class: ClassType;
	elemental?: ElementalType;
	attribute?: Attribute;
	skill?: Skill;
}

export interface CardMeta {
	version: string;
	entities: string[];
	map: Record<string, Card>;
}

export enum DuelCommandType {
	CardSummon = 'CardSummon',
	CardMove = 'CardMove',
	CardMutate = 'CardMutate',
	CardDust = 'CardDust',
	PlayerMutate = 'PlayerMutate',
	DuelMutate = 'DuelMutate',
}

export enum DuelPlace {
	Deck = 'Deck',
	Hand = 'Hand',
	Ground = 'Ground',
	Grave = 'Grave',
	Ability = 'Ability',
	Player = 'Player',
}

export enum DuelPhases {
	Draw = 'Draw',
	Setup = 'Setup' /* <-- setup hero/troop/spell,  skill, */,
	PreFight = 'PreFight',
	Fight = 'Fight',
	PostFight = 'PostFight',
	CleanUp = 'CleanUp',
}

export type DuelCommandPayload = Partial<Attribute> & {
	effectMap?: EffectMap;
	gameOver?: boolean;
	turn?: number;
	phase?: DuelPhases;
	phaseOf?: string;
	perTurnDraw?: number;
	perTurnHero?: number;
	perTurnSpell?: number;
	perTurnTroop?: number;
};

export enum TargetSide {
	Left = 'left',
	Right = 'right',
}

export interface BoardTarget {
	place: DuelPlace;
	owner?: string;
	id?: string;
	index?: number;
}

export enum CommandSourceType {
	System = 'System',
	Player = 'Player',
	ChargedSkill = 'ChargedSkill',
	PreFightSkill = 'PreFightSkill',
	PostFightSkill = 'PostFightSkill',
	GlorySkill = 'GlorySkill',
	SummonSkill = 'SummonSkill',
	AttackSkill = 'AttackSkill',
	DefenseSkill = 'DefenseSkill',
	InspiredSkill = 'InspiredSkill',
	SummonMove = 'SummonMove',
	Spell = 'Spell',
	Unit = 'Unit',
}

export type CommandSource = Omit<BoardTarget, 'place'> & {
	type: CommandSourceType;
	place?: DuelPlace /* <-- override BoardTarget's, make this field optional */;
};

export type TargetOptions = Attribute;

export interface DuelCommandTarget {
	source?: CommandSource;
	from?: BoardTarget;
	to?: BoardTarget;
	options?: TargetOptions;
}

export interface DuelCommand {
	type: DuelCommandType;
	owner?: string;
	target?: DuelCommandTarget;
	payload?: DuelCommandPayload;
	amount?: number;
}

export interface DuelSetting {
	initialCardCount: number;
	initialPlayerHealth: number;
	elementalFactor: number;
	handSize: number;
	groundSize: number;
	maxAttachment: number;
	spellIncreaseCycle: number;
	perTurnDraw: number;
	perTurnHero: number;
	perTurnSpell: number;
	perTurnTroop: number;
}

export interface PlayerConfig {
	id: string;
	deck: string[];
}

export interface DuelConfig {
	version: string;
	setting: DuelSetting;
	firstMover: string;
	firstPlayer: PlayerConfig;
	secondPlayer: PlayerConfig;
}

export interface CardIdentifier {
	id: string;
	owner: string;
	place: DuelPlace;
}

export type EffectIds =
	| 'Reborn'
	| 'Illusion'
	| 'Clone'
	| 'Immune'
	| 'Shield'
	| 'Froze'
	| 'Seal'
	| 'SelfBuff'
	| 'SpellBuff'
	| 'AttributeStack'
	| 'RepeatAttack'
	| 'CleaverAttack'
	| 'IgnoreDefense'
	| 'ExplodeTimer';

export type CleaverType = 'Fixed' | 'Factor';

export interface RebornEffect {
	count?: number;
}

export interface CleaverAttackEffect {
	type: CleaverType;
	radius: number;
	damage?: number;
	damageFactor?: number;
}

export interface AttributeStackEffect {
	targetId: string;
	attribute: Attribute;
}

export interface RepeatAttackEffect {
	count: number;
}

export interface IgnoreDefenseEffect {
	defense: number;
	defenseFactor?: number;
}

export interface ExplodeTimerEffect {
	radius: number;
	damage: number;
}

export interface Effect {
	id: EffectIds;
	life?: number;
	reborn?: RebornEffect;
	attributeStack?: AttributeStackEffect;
	cleaverAttack?: CleaverAttackEffect;
	repeatAttack?: RepeatAttackEffect;
	ignoreDefense?: IgnoreDefenseEffect;
	explodeTimer?: ExplodeTimerEffect;
	attribute?: Attribute;
}

export type EffectMap = Partial<Record<EffectIds, Effect>>;

export type CardState = Attribute &
	CardIdentifier & {
		effectMap: EffectMap;
	};

export type PlayerState = Attribute & {
	id: string;
	perTurnDraw: number;
	perTurnHero: number;
	perTurnSpell: number;
	perTurnTroop: number;
};

export interface DuelState {
	setting: DuelSetting;
	cardMap: Record<string, Card>;
	stateMap: Record<string, CardState>;
	uniqueCardCount: number /* <-- important! to track unique card in a match */;
	turn: number;
	phase: DuelPhases;
	phaseOf: string;
	firstMover: string;
	firstPlayer: PlayerState;
	secondPlayer: PlayerState;
	firstDeck: string[];
	secondDeck: string[];
	firstHand: string[];
	secondHand: string[];
	firstGround: string[];
	secondGround: string[];
	firstGrave: string[];
	secondGrave: string[];
}

type CommandFields = 'owner' | 'target' | 'payload';

export type CommandCreator<K extends keyof DuelCommand = CommandFields> = (
	payload: Pick<DuelCommand, K>,
) => DuelCommand[];

export interface RunCommandPayload {
	duel: DuelState;
	command: DuelCommand;
}

export type CommandRunner<T = RunCommandPayload> = (
	payload: T,
) => Partial<DuelState>;

export enum BundleGroup {
	InitialDraw = 'InitialDraw',
	TurnDraw = 'TurnDraw',
	Summon = 'Summon',
	HookActivation = 'HookActivation',
	SkillActivation = 'SkillActivation',
	SpellActivation = 'SpellActivation',
	EndTurn = 'EndTurn',
	FightSkill = 'FightSkill',
	FightCombat = 'FightCombat',
	Reinforce = 'Reinforce',
	PlayerUpdate = 'PlayerUpdate',
	PhaseUpdate = 'PhaseUpdate',
	DuelUpdate = 'DuelUpdate',
	UnitCleanUp = 'UnitCleanUp',
	TurnCleanUp = 'TurnCleanUp',
}

export interface DuelCommandBundle {
	turn: number;
	group?: BundleGroup;
	phase: DuelPhases;
	phaseOf?: string;
	commands: DuelCommand[];
}

export interface MoveResult {
	duel?: DuelState;
	commandBundles: DuelCommandBundle[];
}

export type CommandHistory = DuelCommandBundle[];
