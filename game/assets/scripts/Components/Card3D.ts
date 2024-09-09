import { _decorator, Component, Node, MeshRenderer, Mesh, utils, Prefab, Camera, RenderTexture, Vec3, instantiate, Material, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card3D')
export class Card3D extends Component {
	@property(Camera)
	private uiCamera: Camera = null;

	@property(Node)
	private nameText: Node = null;

	@property(Node)
	private skillText: Node = null;

	private renderTexture: RenderTexture = null;
	private textMaterial: Material = null;

	onLoad() {
		this.initRenderTexture();	
		this.setupCardMaterial();
		this.updateCardText("name of the card", "skill of the card");
	}

	private initRenderTexture() {
		this.renderTexture = new RenderTexture();
		this.renderTexture.reset({ width: 512, height: 256 });
	}

	private setupCardMaterial() {
		const meshRenderer = this.node.getComponentInChildren(MeshRenderer);
		if (meshRenderer) {
			this.textMaterial = new Material();
			this.textMaterial.initialize({ effectName: 'builtin-standard' });
			this.textMaterial.setProperty('albedoMap', this.renderTexture);
			meshRenderer.setMaterialInstance(this.textMaterial, 0);
		}
	}

	private updateCardText(name: string, skill: string) {
		const nameRichText = this.nameText.getComponent(RichText);
		const skillRichText = this.skillText.getComponent(RichText);

		nameRichText.string = name;
		skillRichText.string = skill;
		this.renderRichTextToTexture();
	}

	private renderRichTextToTexture() {
		if (!this.uiCamera || !this.renderTexture) return;

		this.uiCamera.node.active = true;
		this.uiCamera.targetTexture = this.renderTexture;

		this.nameText.active = true;
		this.nameText.setPosition(0,0, 0);
		this.skillText.active = true;
		this.skillText.setPosition(0,0, 10);
		this.uiCamera.node.setPosition(0, 0, 0);

		// Wait for the next frame to ensure rendering happens
		this.scheduleOnce(() => {
			this.uiCamera.node.active = false;
			this.nameText.active = false;
			this.skillText.active = false;
		});
	}
}

