import { _decorator, Component, MeshRenderer, Mesh, utils } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card3D')
export class Card3D extends Component {
	start() {
		const frontMesh = utils.createMesh({
			positions: [
				-0.5, -0.5, 0,
				0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0,
			],
			uvs: [
				0, 0,
				1, 0,
				0, 1,
				1, 1,
			],
			indices: [0, 1, 2, 2, 1, 3],
		});

		console.log('rendering...');
		const meshRenderer = this.getComponent(MeshRenderer);
		if (meshRenderer) {
			meshRenderer.mesh = frontMesh;
		}
	}

	update(deltaTime: number) {

	}
}

