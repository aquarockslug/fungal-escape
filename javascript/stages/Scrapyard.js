class Scrapyard extends Stage {
	constructor() {
		super('scrapyard', 'scrapyard');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(0.25, 1.6)),
			this.player,
			'red_shroomy',
		);
	}
	start() {
		this.rivalAttackTimer = new Timer(0.2);
		super.start();
	}
	update() {
		if (!started) return;
		if (this.rivalAttackTimer.elapsed()) {
			this.rival.attack(this.player.pos, 'burst');
			this.rivalAttackTimer = new Timer(0.2);
		}

		super.update();
	}
}
