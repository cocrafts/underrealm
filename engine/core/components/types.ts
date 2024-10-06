export enum ComponentType {
	/**
	 * Card components
	 */
	Metadata = 'Metadata',
	Classification = 'Classification',
	Attribute = 'Attribute',
	Ownership = 'Ownership',
	Chargeable = 'Chargeable',
	Place = 'Place',
	SummonActivation = 'SummonActivation',
	PassiveActivation = 'PassiveActivation',
	FightActivation = 'FightActivation',
	PreFightActivation = 'PreFightActivation',
	ChargeActivation = 'ChargeActivation',
	InspireActivation = 'InspireActivation',
	GloryActivation = 'GloryActivation',
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
	 * Player components
	 */

	/**
	 * Board components
	 */

	/**
	 * Config components
	 */
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
