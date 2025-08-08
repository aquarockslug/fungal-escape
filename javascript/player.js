// the player runs at the bottom of the screen and moves or jumps over obstacles
class Player extends EngineObject {
	constructor(pos) {
		let sheetName = selectedCharacter + '_shroomy';
		let idleTI = Textures().tile(sheetName, 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile(sheetName, 'walk');
		this.mass = 1;
		this.healthbar = document.getElementById('health-bar');
		this.healthbar.style.display = 'flex';
		this.healthbar.style.width = this.health * 3 + 'px';
		this.health = 100;

		this.setCollision();
	}
	update() {
		if (!started) return;

		this.handleMovement();

		if (this.health <= 0) this.destroy();

		super.update();
	}
	render() {
		if (started) {
			if (this.isGrounded()) {
				let speedThreshold = 5.3;
				if (this.velocity.length() < speedThreshold) {
					// idle
					let frame = ((time * 4) % 3) | 0;
					drawTile(this.pos, this.size, this.idleTI.frame(frame));
				} else {
					// walk
					let frame = ((time * 8) % 6) | 0;
					drawTile(
						this.pos,
						this.size,
						this.walkTI.frame(frame),
						undefined,
						0,
						keyIsDown('ArrowLeft'),
					);
				}
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
	handleMovement() {
		// walking
		if (keyIsDown('ArrowRight')) {
			this.applyAcceleration(vec2(1, 0));
			this.velocity.x += 3;
		}
		if (keyIsDown('ArrowLeft')) {
			this.applyAcceleration(vec2(-2, 0));
			this.velocity.x -= 3;
		}

		// idle
		if (
			(this.isGrounded && !keyIsDown('ArrowLeft')) ||
			!keyIsDown('ArrowRight')
		) {
			this.velocity.x -= 1;
		}

		// jump
		if (this.isGrounded() && keyWasPressed('ArrowUp')) {
			this.applyAcceleration(vec2(0, 500));
			sfx.jump.play();
		}

		if (this.isGrounded()) this.pos.y = 27; // TODO use a settings var?
		this.velocity.x *= 0.3;

		this.pos.x = clamp(
			this.pos.x,
			this.size.x / 2,
			center.x * 2 - this.size.x / 2,
		);
	}
	collideWithObject(o) {
		if (o.damage) {
			this.health -= o.damage;
			this.healthbar.style.width = this.health * 3 + 'px';
			sfx.damage.play();
		}
	}
}
