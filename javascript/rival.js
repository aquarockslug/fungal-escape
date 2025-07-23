class Rival extends EngineObject {
	constructor(pos, player, sheetName = 'blue_shroomy') {
		let isSecurity = sheetName.includes('security');
		let idleTI = isSecurity
			? Textures().tile(sheetName, 'idle')
			: Textures().tile('rival_flyer', sheetName);
		super(pos, idleTI.size.divide(vec2(2)), idleTI, PI * 2);
		this.bulletTI = Textures().tile('rival_flyer', sheetName + '_bullet');
		this.idleTI = idleTI;
		this.sheetName = sheetName;
		this.isSecurity = isSecurity;

		this.player = player;

		this.gravityScale = 0;
		this.mass = 0;
		this.setCollision();
	}
	update() {
		// float up and down with a sin wave
		if (!this.isSecurity) this.pos.y = this.pos.y + Math.sin(time * 2) / 4;

		// TODO add engine particles
		super.update();
	}
	render() {
		drawTile(
			this.pos,
			this.size,
			this.isSecurity
				? this.idleTI.frame(((time * 3) % 2) | 0)
				: this.idleTI.offset(
						vec2(0, this.size.y * 2 * Math.floor((time * 3) % 2)),
					),
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
