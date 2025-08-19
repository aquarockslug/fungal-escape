class Greenhouse extends Stage {
	constructor() {
		super('greenhouse', 'greenhouse');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(1, 1.8)),
			this.player,
			'security',
		);
	}
	start() {
		this.rivalAttackTimerFast = new Timer(2);
		this.rivalAttackTimerHot = new Timer(3);
		super.start();
	}
	update() {
		if (!started) return;
		if (this.rival && this.rivalAttackTimerFast.elapsed()) {
			this.rivalAttackTimerFast = new Timer(2);
			for (let i = 0; i <= 5; i++)
				new Promise(() =>
					setTimeout(() => {
						this.rival.attack(
							vec2(randInt(0, settings.screenResolution.x / cameraScale), 25),
							'fast',
						);
					}, i * 150),
				);
		}
		if (this.rival && this.rivalAttackTimerHot.elapsed()) {
			this.rival.attack(this.player.pos, 'hot');
			this.rivalAttackTimerHot = new Timer(3);
		}

		super.update();
	}
}
