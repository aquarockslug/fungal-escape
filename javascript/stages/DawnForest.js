class DawnForest extends Stage {
	constructor() {
		super('dawn', 'dawn');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(1, 1.65)),
			this.player,
			'security',
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
