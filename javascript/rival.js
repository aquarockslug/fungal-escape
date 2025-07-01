class Rival extends EngineObject {
	constructor(pos, player, sheetName = 'blue_shroomy') {
		let idleTI = Textures().tile(sheetName, 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile(sheetName, 'walk');

		this.player = player;
		this.lookAt(player);

		this.gravityScale = 0;
		this.mass = 0;
	}
	update() {
		if (!started) return;
		this.lookAt(this.player);
		super.update();
	}
	render() {
		let frame = ((time * 8) % 3) | 0;
		drawTile(
			this.pos,
			this.size,
			this.idleTI.frame(frame),
			undefined,
			this.angle + PI / 2,
			true,
		);
	}
	lookAt(target) {
		this.angle = target.pos.subtract(this.pos).angle();
	}
	attack(target, moleculeType) {
		this.lookAt(target);
		new Molecule(this.pos, vec2(1), undefined, this.angle, moleculeType);
	}
}
