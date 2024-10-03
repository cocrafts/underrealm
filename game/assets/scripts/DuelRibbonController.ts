import { _decorator, Button, Component, Node, sys } from 'cc';

import { setCursor } from './util/helper';
import { system } from './util/system';

const { ccclass } = _decorator;

const NodeEvents = Node.EventType;
const ButtonEvents = Button.EventType;

@ccclass('DuelRibbonController')
export class DuelRibbonController extends Component {
	lobbyButton: Node;
	shareButton: Node;

	start(): void {
		this.lobbyButton = this.node.getChildByPath('Button');
		this.shareButton = this.node.getChildByPath('ButtonShare');

		this.lobbyButton.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.lobbyButton.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.lobbyButton.on(ButtonEvents.CLICK, this.onLobbyClick.bind(this));

		this.shareButton.on(ButtonEvents.CLICK, this.onShareToX.bind(this, true));
	}

	onMouseEnter(): void {
		setCursor('pointer');
	}

	onMouseLeave(): void {
		setCursor('auto');
	}

	onLobbyClick(): void {
		if (sys.isBrowser) {
			location.href = `${location.origin}/game`;
		}
	}

	onShareToX(): void {
		if (sys.isBrowser) {
			const isWin = system.winner === system.playerIds.me;

			const text = encodeURIComponent(
				'Just earned my glory in battle from this high-stake Solana Trading Card Game, Under Realm  @playunderrealm. Join the Alliance to compete for top rank and earn $U',
			);

			const url = encodeURIComponent(
				`https://x.com/PlayUnderRealm/status/${isWin ? '1840673998012858631' : '1840674001942950110'}/photo/1`,
			);

			const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

			window.open(twitterShareUrl, '_blank');
		}
	}
}
