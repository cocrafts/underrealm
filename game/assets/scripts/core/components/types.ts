export enum ComponentType {
	/**
	 * Player components
	 */
	PlayerAttribute = 'PlayerAttribute',

	/**
	 * Card components
	 */
	CardMetadata = 'CardMetadata',
	CardClass = 'CardClass',
	CardAttribute = 'CardAttribute',
	CardOwnership = 'CardOwnership',
	CardChargeable = 'CardChargeable',
	CardPlace = 'CardPlace',

	SummonActivation = 'SummonActivation',
	PassiveActivation = 'PassiveActivation',
	FightActivation = 'FightActivation',
	PreFightActivation = 'PreFightActivation',
	ChargeActivation = 'ChargeActivation',
	InspireActivation = 'InspireActivation',
	GloryActivation = 'GloryActivation',

	/**
	 * This component will be added to entity if the entity's activation matches,
	 * and must be reset at the last system update.
	 */
	SkillActivating = 'SkillActivating',

	DestroyFacingMinHealth = 'DestroyFacingMinHealth',
	GainAttackByEnemyDefense = 'GainAttackByEnemyDefense',
	GainAttackByEnemyMissingHealth = 'GainAttackByEnemyMissingHealth',
	GainAttackByRemainingHealth = 'GainAttackByRemainingHealth',
	MutateEnemy = 'MutateEnemy',
	MutateRandomEnemy = 'MutateRandomEnemy',
	MutatePlayer = 'MutatePlayer',
	IgnoreEnemyDefense = 'IgnoreEnemyDefense',
	SelfBuff = 'SelfBuff',
	BuffAgainstSameEnemy = 'BuffAgainstSameEnemy',
	BuffNextTurn = 'BuffNextTurn',
	FixedCleaver = 'FixedCleaver',
	FactorCleaver = 'FactorCleaver',
	MultiplyDamageAgainst = 'MultiplyDamageAgainst',
	DoubleAttack = 'DoubleAttack',
	Transform = 'Transform',

	/**
	 * Board components
	 */

	/**
	 * Config components
	 */
}

export enum ClassType {
	Assassin = 'Assassin',
	Knight = 'Knight',
	Tanker = 'Tanker',
	Wizard = 'Wizard',
	Summoner = 'Summoner',
	Beast = 'Beast',
}

export enum CardType {
	Hero = 'Hero',
	Troop = 'Troop',
	Spell = 'Spell',
}

export enum CardPlace {
	Ground = 'Ground',
	Hand = 'Hand',
	Deck = 'Deck',
}

export enum InspireSource {
	Metal = 'Metal',
	Wood = 'Wood',
	Water = 'Water',
	Fire = 'Fire',
	Earth = 'Earth',
	Light = 'Light',
	Dark = 'Dark',
	Summon = 'Summon',
	Death = 'Death',
	Spell = 'Spell',
	Skill = 'Skill',
}
