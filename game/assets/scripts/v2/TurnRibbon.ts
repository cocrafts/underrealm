import { _decorator, Component, Label, Node, tween, UIOpacity, Vec3 } from 'cc';

import { playEffectSound } from '../util/resources';
const { ccclass, property } = _decorator;

@ccclass('TurnRibbon')
export class TurnRibbon extends Component {
	@property({ type: Node, editorOnly: true })
	private messageNode: Node;

	show(message: string) {
		const uiOpacity = this.node.getComponent(UIOpacity);
		this.messageNode.getComponent(Label).string = message;

		return new Promise<void>((resolve) => {
			tween(this.node)
				.set({
					scale: new Vec3(0, 0, 1),
					position: new Vec3(0, 25, 0),
				})
				.call(() => playEffectSound('your-turn4', 0.2))
				.to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
				.delay(1)
				.call(() => playEffectSound('your-turn3', 0.2))
				.call(() => {
					tween(uiOpacity)
						.to(0.25, { opacity: 0 })
						.call(() => {
							this.node.setPosition(new Vec3(9999, 0, 0));
							uiOpacity.opacity = 255;
							resolve();
						})
						.start();
				})
				.to(0.25, { scale: new Vec3(0, 0, 1) }, { easing: 'backIn' })
				.start();
		});
	}
}
