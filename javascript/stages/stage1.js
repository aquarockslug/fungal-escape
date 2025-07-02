class Stage1 extends Stage {
	constructor() {
		super('absolute', ['snow', 'block']);

		this.player = new Player(vec2(center.x / 2, 16));
		this.rival = new Rival(vec2(center.x * 1.75, center.y * 1.75), this.player);
	}
	start() {
		this.rivalAttackTimer = new Timer(2);
		super.start();
	}
	update() {
		if (!started) return;
		if (this.rivalAttackTimer.elapsed()) {
			this.rival.attack(this.player, 'cold');
			this.rivalAttackTimer = new Timer(2);
		}

		super.update();
	}
}
