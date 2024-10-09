import { _decorator, Component, Enum } from 'cc';

import { Owner } from '../util/v2/manager';
const { ccclass, property } = _decorator;

@ccclass('DeckCounter')
export class DeckCounter extends Component {
	@property({ type: Enum(Owner), editorOnly: true })
	private owner: number;

	start() {}
}
