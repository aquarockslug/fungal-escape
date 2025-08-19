class Backstreets extends Stage {
	constructor() {
		super('backstreets', 'backstreets');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(1, 1.65)),
			this.player,
			'yellow_shroomy',
		);
	}
	start() {
		this.rivalAttackTimer = new Timer(2);
		super.start();
	}
	update() {
		if (!started) return;
		if (this.rivalAttackTimer.elapsed()) {
			this.rival.attack(this.player.pos, 'cold');
			this.rivalAttackTimer = new Timer(2);
		}

		super.update();
	}
}
