class ElectricPlant extends Stage {
	constructor() {
		super('electric', 'electric');

		this.player = new Player(vec2(center.x, 16));
		this.rival = new Rival(
			center.multiply(vec2(1, 1.65)),
			this.player,
			'green_shroomy',
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
