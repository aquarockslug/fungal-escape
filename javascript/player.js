// the player runs at the bottom of the screen and moves or jumps over obstacles
class Player extends EngineObject {
	constructor(pos, sheetName = 'red') {
		let idleTI = Textures().tile(sheetName, 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile(sheetName, 'walk');
		this.weapon = 'hot';
	}
	update() {
		let mouseDirection = mousePos.subtract(this.pos).normalize();
		this.angle = mouseDirection.angle();

		// TODO increase max speed
		if (
			keyIsDown('ArrowRight') &&
			this.pos.x < center.x * 2 - this.size.x / 2
		) {
			this.velocity = this.velocity.add(vec2(0.25, 0));
		} else if (keyIsDown('ArrowLeft') && this.pos.x > this.size.x / 2) {
			this.velocity = this.velocity.add(vec2(-0.25, 0));
		} else this.velocity = vec2(0); // TODO use dampening to slow down when no arrows are pressed

		if (mouseWasPressed(0)) {
			new Molecule(
				this.pos.add(mouseDirection.scale(10)), // launch the molecule from in front of the player
				vec2(4),
				undefined,
				this.angle,
				this.weapon,
			);
			if (this.weapon === 'cold') sfx.shoot.play();
			if (this.weapon === 'hot') sfx.shoot2.play();
		}
		if (keyWasPressed('Space')) {
			this.weapon = this.weapon === 'hot' ? 'cold' : 'hot';
			// TODO add jumping
		}
		super.update();
	}
	render() {
		if (started) {
			// idle
			let frame = ((time * 8) % 6) | 0;
			drawTile(this.pos, this.size, this.walkTI.frame(frame));
		} else {
			// walk
			let frame = ((time * 4) % 3) | 0;
			drawTile(this.pos, this.size, this.idleTI.frame(frame));
		}

		if (this.weapon === 'hot')
			drawRect(vec2(0, height), vec2(16, 8), rgb(1, 0, 0));
		else if (this.weapon === 'cold')
			drawRect(vec2(0, height), vec2(16, 8), rgb(0, 0, 1));
	}
}
