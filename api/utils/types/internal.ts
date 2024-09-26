export interface DynamoRecord {
	type?: string;
	ledger?: { iv: string; content: string };
	archived?: boolean;
	pk?: string;
	sk?: string;
	gsi?: string;
	gsr?: string;
	gti?: string;
	gtr?: string;
	gfi?: string;
	gfr?: string;
	gui?: string;
	gur?: string;
	g6i?: string;
	g6r?: string;
	g7i?: string;
	g7r?: string;
	g8i?: string;
	g8r?: string;
	g9i?: string;
	g9r?: string;
	ttl?: number;
}

export type SubscriptionRecord = DynamoRecord & {
	domainName: string;
	subscriptionId: string;
};
