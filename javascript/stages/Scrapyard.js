class Scrapyard extends Stage {
	constructor() {
		super('scrapyard', 'scrapyard');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(1.0, 1.6)),
			this.player,
			'red_shroomy',
		);
	}
	start() {
		this.rivalAttackTimer = new Timer(2);
		super.start();
	}
	update() {
		if (!started) return;
		if (this.rivalAttackTimer.elapsed()) {
			this.rivalAttackTimer = new Timer(2);
			for (let i = 0; i <= 5; i++)
				new Promise(() =>
					setTimeout(() => {
						this.rival.attack(this.player.pos, 'fast');
					}, i * 100),
				);
		}

		super.update();
	}
}
