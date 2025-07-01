class Rival extends EngineObject {
	constructor(pos) {
		let idleTI = Textures().tile('blue_shroomy', 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile('blue_shroomy', 'walk');

		this.gravityScale = 0;
		this.mass = 0;

		let mouseDirection = mousePos.subtract(this.pos).normalize();
		this.angle = mouseDirection.angle();
	}
	update() {
		super.update();
	}
	render() {
		let frame = ((time * 8) % 3) | 0;
		drawTile(this.pos, this.size, this.idleTI.frame(frame));
	}
}
