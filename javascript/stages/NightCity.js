class NightCity extends Stage {
	constructor() {
		super('night', 'night');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(1, 1.8)),
			this.player,
			'blue_shroomy',
		);
	}
	start() {
		this.rivalAttackTimer = new Timer(2);
		super.start();
	}
	update() {
		if (!started) return;
		if (this.rivalAttackTimer.elapsed()) {
			this.rival.attack(this.player, 'hot');
			this.rivalAttackTimer = new Timer(2);
		}

		super.update();
	}
}
