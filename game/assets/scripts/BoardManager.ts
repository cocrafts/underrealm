import Engine, { PlayerState } from '@metacraft/murg-engine';
import { _decorator, Animation, Component, Label } from 'cc';

import { getPositionExpos } from './util/layout';
import { switchBackgroundSound } from './util/resources';
import { system } from './util/system';
import { sendConnect } from './network';
import { animateGlowOff, animateGlowOn, simpleMove } from './tween';

const { ccclass } = _decorator;
const {
	CardType,
	DuelPlace,
	DuelPhases,
	selectStateKey,
	selectPlayer,
	selectHand,
	getCard,
	version: engineVersion,
} = Engine;

interface Props {
	animation?: Animation;
	enemyDeckCount?: Label;
	playerDeckCount?: Label;
}

@ccclass('BoardManager')
export class BoardManager extends Component {
	unSubscribers: (() => void)[] = [];
	playerDeckCount: Label;
	enemyDeckCount: Label;

	props: Props = {};

	start(): void {
		const fog = this.node.getChildByPath('Air/fog');
		const cardTemplate = this.node.getChildByPath('Card Template');
		const unitTemplate = this.node.getChildByPath('Unit Template');
		const unitPreview = this.node.getChildByPath('Surface/Unit Preview');
		const playerDeck = this.node.getChildByPath('Surface/Player Deck/foil');
		const enemyDeck = this.node.getChildByPath('Surface/Enemy Deck/foil');
		const centerExpo = this.node.getChildByPath('Guide/centerExpo');
		const leftExpo = this.node.getChildByPath('Guide/leftExpo');
		const rightExpo = this.node.getChildByPath('Guide/rightExpo');
		const playerHand = this.node.getChildByPath('playerHand');
		const enemyHand = this.node.getChildByPath('Surface/enemyHand');
		const playerGround = this.node.getChildByPath('Surface/playerGround');
		const enemyGround = this.node.getChildByPath('Surface/enemyGround');
		const playerHandGuide = this.node.getChildByPath('Guide/playerHand');
		const playerGroundGuide = this.node.getChildByPath('Guide/playerGround');
		const enemyHandGuide = this.node.getChildByPath('Guide/enemyHand');
		const enemyGroundGuide = this.node.getChildByPath('Guide/enemyGround');
		const summonZoneGuide = this.node.getChildByPath('Guide/summonZone');
		const version = this.node.getChildByPath('Hud/version');
		const playerHealth = this.node.getChildByPath('Hud/playerHealth');
		const playerHealthPredict = this.node.getChildByPath(
			'Hud/playerHealthPredict',
		);
		const enemyHealth = this.node.getChildByPath('Hud/enemyHealth');
		const enemyHealthPredict = this.node.getChildByPath(
			'Hud/enemyHealthPredict',
		);

		this.playerDeckCount = this.node
			.getChildByPath('Surface/playerDeckCount')
			.getComponent(Label);
		this.enemyDeckCount = this.node
			.getChildByPath('Surface/enemyDeckCount')
			.getComponent(Label);

		version.getComponent(Label).string = `version ${engineVersion}`;

		system.globalNodes.board = this.node;
		system.globalNodes.fog = fog;
		system.globalNodes.cardTemplate = cardTemplate;
		system.globalNodes.unitTemplate = unitTemplate;
		system.globalNodes.unitPreview = unitPreview;
		system.globalNodes.playerDeck = playerDeck;
		system.globalNodes.enemyDeck = enemyDeck;
		system.globalNodes.centerExpo = centerExpo;
		system.globalNodes.leftExpo = leftExpo;
		system.globalNodes.rightExpo = rightExpo;
		system.globalNodes.playerHand = playerHand;
		system.globalNodes.enemyHand = enemyHand;
		system.globalNodes.playerGround = playerGround;
		system.globalNodes.enemyGround = enemyGround;
		system.globalNodes.playerHandGuide = playerHandGuide;
		system.globalNodes.playerGroundGuide = playerGroundGuide;
		system.globalNodes.enemyHandGuide = enemyHandGuide;
		system.globalNodes.enemyGroundGuide = enemyGroundGuide;
		system.globalNodes.summonZoneGuide = summonZoneGuide;
		system.globalNodes.playerHealth = playerHealth;
		system.globalNodes.playerHealthPredict = playerHealthPredict;
		system.globalNodes.enemyHealth = enemyHealth;
		system.globalNodes.enemyHealthPredict = enemyHealthPredict;

		system.globalNodes.board.on('stateReady', this.onStateReady.bind(this));
		if (system.context) this.onStateReady();

		sendConnect();
	}

	onDestroy(): void {
		this.unSubscribers.forEach((unSub) => unSub());
	}

	onStateReady(): void {
		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.me, DuelPlace.Player),
				this.onPlayerUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.me, DuelPlace.Deck),
				this.onPlayerDeckUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.enemy, DuelPlace.Deck),
				this.onEnemyDeckUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.me, DuelPlace.Hand),
				this.onPlayerHandUpdate.bind(this),
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.enemy, DuelPlace.Hand),
				this.onEnemyHandUpdate.bind(this),
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe('phase', this.onPhaseUpdate.bind(this)),
		);
	}

	onPlayerUpdate(player: PlayerState, old: PlayerState): void {
		if (player.perTurnHero !== old?.perTurnHero) {
			setTimeout(() => this.updateInteractions(), 0);
		}

		if (old?.health > peekHealthGap && player.health < peekHealthGap) {
			switchBackgroundSound('bgm-dungeon-peak', 0.2);
		}
	}

	onPlayerDeckUpdate(deck: string[]): void {
		this.playerDeckCount.string = String(deck.length);
	}

	onEnemyDeckUpdate(deck: string[]): void {
		this.enemyDeckCount.string = String(deck.length);
	}

	onPlayerHandUpdate(hand: []): void {
		this.reArrangeHand(system.playerIds.me, hand);
	}

	onEnemyHandUpdate(hand: []): void {
		this.reArrangeHand(system.playerIds.enemy, hand);
	}

	onPhaseUpdate(): void {
		setTimeout(() => this.updateInteractions(), 0);
	}

	updateInteractions(): void {
		const me = selectPlayer(system.duel, system.playerIds.me);
		const isMyPhase = system.duel.phaseOf === system.playerIds.me;
		const isSetupPhase = system.duel.phase === DuelPhases.Setup;
		const isCommandAble = isMyPhase && isSetupPhase;
		const isHeroAvailable = isCommandAble && me.perTurnHero > 0;
		const myHand = selectHand(system.duel, system.playerIds.me);

		system.isCommandAble = isCommandAble;

		myHand.forEach((id) => {
			const card = getCard(system.duel.cardMap, id);
			const node = system.cardRefs[id];
			const isHeroCard = card.kind === CardType.Hero;
			const isTroopCard = card.kind === CardType.Troop;

			if (node) {
				if (isTroopCard) {
					system.isCommandAble ? animateGlowOn(node) : animateGlowOff(node);
				} else if (isHeroCard) {
					isHeroAvailable ? animateGlowOn(node) : animateGlowOff(node);
				}
			}
		});
	}

	reArrangeHand(owner: string, hand: []): void {
		const isMyPhase = system.playerIds.me === owner;
		const handPositions = isMyPhase
			? getPositionExpos(system.globalNodes.playerHandGuide, hand.length, 80)
			: getPositionExpos(system.globalNodes.enemyHandGuide, hand.length, 60);

		for (let i = 0; i < hand.length; i += 1) {
			const cardNode = system.cardRefs[hand[i]];

			if (cardNode) {
				simpleMove(cardNode, handPositions[i]);
			}
		}
	}
}

const peekHealthGap = 150;
