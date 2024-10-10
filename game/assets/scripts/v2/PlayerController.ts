import { _decorator, Component, Enum } from 'cc';

import { Owner } from '../util/v2/manager';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
	@property({ type: Enum(Owner), editorOnly: true })
	private owner: number;

	start() {}
}
