class Enemy extends EngineObject {
	constructor(pos) {
		let idleTI = Textures().tile('player', 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile('player', 'walk');
	}
	update() {
		super.update();
	}
	render() {
		if (started) {
			let frame = ((time * 8) % 5) | 0;
			drawTile(this.pos, this.size, this.walkTI.frame(frame));
		} else {
			let frame = ((time * 8) % 3) | 0;
			drawTile(this.pos, this.size, this.idleTI.frame(frame));
		}
	}
}
