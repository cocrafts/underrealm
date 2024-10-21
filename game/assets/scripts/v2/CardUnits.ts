import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardUnits')
export class CardUnits extends Component {
	@property(CCInteger)
	public entityId: number;

	@property({ type: Node, editorOnly: true })
	private visualNode: Node;

	@property({ type: Node, editorOnly: true })
	private foilNode: Node;

	@property({ type: Node, editorOnly: true })
	private nameNode: Node;

	@property({ type: Node, editorOnly: true })
	private skillNode: Node;

	@property({ type: Node, editorOnly: true })
	private classNode: Node;

	@property({ type: Node, editorOnly: true })
	private rarity: Node;

	@property({ type: Node, editorOnly: true })
	private healthNode: Node;

	@property({ type: Node, editorOnly: true })
	private defenseNode: Node;

	@property({ type: Node, editorOnly: true })
	private attackNode: Node;

	public updateUnits() {}
}
