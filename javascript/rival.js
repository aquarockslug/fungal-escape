class Rival extends EngineObject {
	constructor(pos, player, sheetName = 'blue_shroomy') {
		let isSecurity = sheetName.includes('security');
		let idleTI = isSecurity
			? Textures().tile(sheetName, 'idle')
			: Textures().tile('rival_flyer', sheetName);
		super(pos, idleTI.size.divide(vec2(2)), idleTI, PI * 2);
		this.idleTI = idleTI;
		this.bulletTI = Textures().tile(sheetName, 'bullet');
		this.sheetName = sheetName;
		this.isSecurity = isSecurity;

		this.player = player;

		this.gravityScale = 0;
		this.mass = 0;
		this.setCollision();
	}
	update() {
		super.update();
	}
	render() {
		let frame = ((time * 4) % 2) | 0;
		drawTile(
			this.pos,
			this.size,
			this.isSecurity ? this.idleTI.frame(frame) : this.idleTI.offset(vec2(0)),
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
