import Engine from '@metacraft/murg-engine';
import { _decorator, Button, Color, Component, Node } from 'cc';

import { setCursor } from './util/helper';
import { playEffectSound } from './util/resources';
import { system } from './util/system';
import { sendEndTurn } from './network';
import { animateFade, animateSwapLabel } from './tween';

const { ccclass } = _decorator;
const { DuelPhases } = Engine;
const NodeEvents = Node.EventType;
const ButtonEvents = Button.EventType;

@ccclass('TurnController')
export class TurnController extends Component {
	unSubscribers: (() => void)[] = [];
	playerTurnGlow: Node;
	enemyTurnGlow: Node;
	turnLabel: Node;
	orb: Node;

	start(): void {
		this.playerTurnGlow = this.node.getChildByPath('Orb/Player Glow');
		this.enemyTurnGlow = this.node.getChildByPath('Orb/Enemy Glow');
		this.turnLabel = this.node.getChildByPath('Orb/Button/Label');
		this.orb = this.node.getChildByPath('Orb');

		this.orb.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.orb.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.orb.on(ButtonEvents.CLICK, this.onButtonClick.bind(this));

		this.unSubscribers.push(
			system.duel.subscribe('phase', (phase) =>
				this.onPhaseChange(phase, system.duel.phaseOf),
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe('phaseOf', (phaseOf) =>
				this.onPhaseChange(system.duel.phase, phaseOf),
			),
		);
	}

	onDestroy(): void {
		this.unSubscribers.forEach((unSub) => unSub());
	}

	onPhaseChange(phase: string, phaseOf: string): void {
		const isSetupPhase = phase === DuelPhases.Setup;
		const isMyPhase = phaseOf === system.playerIds.me;
		const button = this.orb.getComponent(Button);
		const color = Color.fromHEX(new Color(), isMyPhase ? '#4da7ea' : '#ee5846');
		const white = Color.fromHEX(new Color(), '#ffffff');

		if (isSetupPhase) {
			button.interactable = true;
			animateFade(this.playerTurnGlow, isMyPhase ? 255 : 0);
			animateFade(this.enemyTurnGlow, isMyPhase ? 0 : 255);
		} else {
			button.interactable = false;
			animateFade(this.playerTurnGlow, 0);
			animateFade(this.enemyTurnGlow, 0);
		}

		if (phase === DuelPhases.Draw) {
			const label = system.duel.turn === 0 ? 'distribute' : 'draw';

			animateSwapLabel(this.turnLabel, label, color);
		} else if (phase === DuelPhases.Setup) {
			const label = isMyPhase ? 'end turn' : 'enemy turn';

			animateSwapLabel(this.turnLabel, label, color);
		} else if (phase === DuelPhases.PreFight) {
			animateSwapLabel(this.turnLabel, 'pre fight', white);
		} else if (phase === DuelPhases.Fight) {
			animateSwapLabel(this.turnLabel, 'fight', white);
		} else if (phase === DuelPhases.PostFight) {
			animateSwapLabel(this.turnLabel, 'post fight', white);
		}
	}

	onMouseEnter(): void {
		const isSetupPhase = system.duel.phase === DuelPhases.Setup;
		const isMyPhase = system.duel.phaseOf === system.playerIds.me;

		if (isSetupPhase && isMyPhase) {
			setCursor('pointer');
		}
	}

	onMouseLeave(): void {
		setCursor('auto');
	}

	onButtonClick(): void {
		const isSetupPhase = system.duel.phase === DuelPhases.Setup;
		const isMyPhase = system.duel.phaseOf === system.playerIds.me;

		if (!system.winner && isSetupPhase && isMyPhase) {
			playEffectSound('end-turn');
			sendEndTurn();
		}
	}
}
