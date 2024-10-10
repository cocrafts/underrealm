import { _decorator, Component, Label } from 'cc';
const { ccclass } = _decorator;
import packageJson from '../../../package.json';

@ccclass('Version')
export class Version extends Component {
	start() {
		const version = packageJson.version;
		this.node.parent.getComponent(Label).string = `v${version}`;
	}
}
