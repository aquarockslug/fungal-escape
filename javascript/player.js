// the player runs at the bottom of the screen and moves or jumps over obstacles
class Player extends EngineObject {
	constructor(pos, sheetName = 'red_shroomy') {
		let idleTI = Textures().tile(sheetName, 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile(sheetName, 'walk');
		this.mass = 1;
	}
	update() {
		if (!started) return;

		if (keyIsDown('ArrowRight')) {
			this.applyAcceleration(vec2(1, 0));
			if (this.isGrounded()) this.velocity.x += 1;
		}
		if (keyIsDown('ArrowLeft')) {
			this.applyAcceleration(vec2(-2, 0));
			this.velocity.x -= 1;
		}

		if (this.isGrounded() && keyWasPressed('ArrowUp')) {
			this.applyAcceleration(vec2(0, 500));
		}

		if (this.isGrounded()) this.pos.y = 27;
		this.velocity.x *= 0.3;

		this.pos.x = clamp(this.pos.x, this.size.x / 2, center.x * 1.5);

		super.update();
	}
	render() {
		if (started) {
			if (this.isGrounded()) {
				// walk
				let frame = ((time * 8) % 6) | 0;
				drawTile(this.pos, this.size, this.walkTI.frame(frame));
			} else {
				// jump
				drawTile(this.pos, this.size, this.walkTI.frame(0));
			}
		} else {
			// idle
			let frame = ((time * 4) % 3) | 0;
			drawTile(this.pos, this.size, this.idleTI.frame(frame));
		}
	}
	isGrounded() {
		return this.pos.y < 27;
	}
}
