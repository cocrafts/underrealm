import { _decorator, Button, Component, Node, sys } from 'cc';

import { setCursor } from './util/helper';

const { ccclass } = _decorator;

const NodeEvents = Node.EventType;
const ButtonEvents = Button.EventType;

@ccclass('DuelRibbonController')
export class DuelRibbonController extends Component {
	lobbyButton: Node;

	start(): void {
		this.lobbyButton = this.node.getChildByPath('Button');

		this.lobbyButton.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.lobbyButton.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.lobbyButton.on(ButtonEvents.CLICK, this.onLobbyClick.bind(this));
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
}
