class Player extends EngineObject {
	constructor(pos, size, angle, speed = 0.5) {
		let ti = Textures().tile('encrypt_man', 'bg_wires');
		super(pos, size, ti, angle);
		this.speed = speed;
		this.ti = ti;
	}
	update() {
		this.angle = mousePos.subtract(this.pos).angle();
		if (keyIsDown('ArrowUp')) this.velocity.y += this.speed;
		if (keyIsDown('ArrowDown')) this.velocity.y += -this.speed;
		if (keyIsDown('ArrowRight')) this.velocity.x += this.speed;
		if (keyIsDown('ArrowLeft')) this.velocity.x += -this.speed;
		if (mouseWasPressed(0)) {
			new Molecule(this.pos, vec2(1), this.ti, this.angle, 'cold');
			sfx.shoot.play();
		}
		if (keyWasPressed('Space')) {
			new Molecule(this.pos, vec2(4), this.ti, this.angle, 'hot');
			sfx.shoot2.play();
		}
		this.velocity = this.velocity.scale(0.9); // TODO use this.damping instead
		super.update();
	}
	render() {
		super.render();
	}
}
