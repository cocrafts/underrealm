import { _decorator, Component, director, ProgressBar } from 'cc';

import { waitForSocket } from './network';

const { ccclass, property } = _decorator;

@ccclass('LoadingManager')
export class LoadingManager extends Component {
	@property(ProgressBar)
	progressBar: ProgressBar;

	start(): void {
		director.preloadScene(
			'Duel',
			(completedCount: number, totalCount: number) => {
				this.progressBar.progress = completedCount / (totalCount + 2);
			},
			async () => {
				await waitForSocket();
				director.loadScene('Duel');
			},
		);
	}
}
