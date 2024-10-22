import { Button, Color, Label, Node, Sprite, tween, UIOpacity, Vec3 } from 'cc';
import { _decorator, Component } from 'cc';

import { setCursor } from '../util/helper';
import { playBackgroundSound } from '../util/resources';
const { ccclass, property } = _decorator;

const { MOUSE_ENTER, MOUSE_LEAVE } = Node.EventType;
const { CLICK } = Button.EventType;

@ccclass('DuelRibbon')
export class DuelRibbon extends Component {
	public isVictor: boolean;

	@property({ type: Node, editorOnly: true })
	fogNode: Node;

	@property({ type: Node, editorOnly: true })
	ribbonNode: Node;

	@property({ type: Node, editorOnly: true })
	avatarImageNode: Node;

	@property({ type: Node, editorOnly: true })
	messageNode: Node;

	@property({ type: Node, editorOnly: true })
	coinNode: Node;

	@property({ type: Node, editorOnly: true })
	lobbyButtonNode: Node;

	@property({ type: Node, editorOnly: true })
	shareButtonNode: Node;

	start(): void {
		this.lobbyButtonNode.on(MOUSE_ENTER, () => this.onMouseEnter());
		this.shareButtonNode.on(MOUSE_ENTER, () => this.onMouseEnter());
		this.lobbyButtonNode.on(MOUSE_LEAVE, () => this.onMouseLeave());
		this.lobbyButtonNode.on(CLICK, () => this.onLobbyClick());
		this.shareButtonNode.on(CLICK, () => this.onShareToXClick());
	}

	onMouseEnter(): void {
		setCursor('pointer');
	}

	onMouseLeave(): void {
		setCursor('auto');
	}

	onLobbyClick(): void {
		if (location) location.href = `${location.origin}/game`;
	}

	onShareToXClick(): void {
		if (window) {
			const text =
				'Just earned my glory in battle from this high-stake Solana Trading Card Game, Under Realm  @playunderrealm. Join the Alliance to compete for top rank and earn $U';

			const refTweetId = this.isVictor
				? '1840673998012858631'
				: '1840674001942950110';
			const url = `https://x.com/PlayUnderRealm/status/${refTweetId}/photo/1`;

			const encodedText = encodeURIComponent(text);
			const encodedUrl = encodeURIComponent(url);
			const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

			window.open(twitterShareUrl, '_blank');
		}
	}

	show(isVictor: boolean, claimedPoints: number) {
		this.isVictor = isVictor;

		return new Promise((resolve) => {
			const sound = this.isVictor ? 'victory' : 'defeat';

			this.ribbonNode.getComponent(Sprite).grayscale = !isVictor;
			this.avatarImageNode.getComponent(Sprite).grayscale = !isVictor;
			this.messageNode.getComponent(Label).string = isVictor
				? 'Victory!'
				: 'Defeat!';

			const coinLabelNode = this.coinNode
				.getChildByPath('Label')
				.getComponent(Label);

			if (!claimedPoints) {
				coinLabelNode.fontSize = 24;
				coinLabelNode.lineHeight = 32;
				coinLabelNode.color = new Color('F2E0C3');
				coinLabelNode.string = `You have taken all the gold today.\n Return once the sun rises again.`;
			} else {
				coinLabelNode.string = claimedPoints.toString();
			}

			tween(this.fogNode.getComponent(UIOpacity))
				.to(2, { opacity: 255 })
				.start();

			tween(this.node)
				.set({
					scale: new Vec3(0, 0, 1),
					position: new Vec3(0, -34, 0),
				})
				.call(() => {
					playBackgroundSound(sound, 0.5, false);
				})
				.to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
				.call(resolve)
				.start();
		});
	}
}
