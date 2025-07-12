class Rival extends EngineObject {
	constructor(pos, player, sheetName = 'blue_shroomy') {
		let idleTI = Textures().tile(sheetName, 'idle');
		super(pos, idleTI.size.divide(vec2(2)), idleTI, PI * 2);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile(sheetName, 'walk');
		this.bulletTI = Textures().tile(sheetName, 'bullet');
		this.sheetName = sheetName;

		this.player = player;

		this.gravityScale = 0;
		this.mass = 0;
		this.setCollision();
		if (this.sheetName !== 'security')
			this.emitter = new ParticleEmitter(this.pos, 0, ...vfx.jetpack);
	}
	update() {
		if (this.sheetName !== 'security') this.emitter.emitParticle(); // TODO fix particle emitter's broken texture
		super.update();
	}
	render() {
		let frame = ((time * 4) % 2) | 0;
		drawTile(
			this.pos,
			this.size,
			this.idleTI.frame(frame),
			undefined,
			this.angle,
			true,
		);
	}
	lookAt(target) {
		this.angle = target.pos.subtract(this.pos).angle();
	}
	attack(target, moleculeType) {
		new Molecule(
			this.pos.add(vec2(0, 8)),
			vec2(12),
			this.bulletTI,
			abs(randVector().angle()) - PI / 2, // randomly shoot upwards
			moleculeType,
		);
	}
}
