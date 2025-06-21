class Player extends EngineObject {
	constructor(pos, size, angle, speed = 0.5) {
		let ti = Textures().tile('absolute_man', 'snowman');
		super(pos, size, ti, angle);
		this.speed = speed;
		this.ti = ti;
		this.weapon = 'hot';
	}
	update() {
		let direction = mousePos.subtract(this.pos).normalize();
		let angle = direction.angle();
		this.angle = angle + Math.PI / 2;
		if (keyIsDown('ArrowUp')) this.velocity.y += this.speed;
		if (keyIsDown('ArrowDown')) this.velocity.y += -this.speed;
		if (keyIsDown('ArrowRight')) this.velocity.x += this.speed;
		if (keyIsDown('ArrowLeft')) this.velocity.x += -this.speed;
		if (mouseWasPressed(0)) {
			new Molecule(
				this.pos.add(direction.scale(5)), // launch the molecule from in front of the player
				vec2(4),
				this.ti,
				angle,
				this.weapon,
			);
			if (this.weapon === 'cold') sfx.shoot.play();
			if (this.weapon === 'hot') sfx.shoot2.play();
		}
		if (keyWasPressed('Space')) {
			this.weapon = this.weapon === 'hot' ? 'cold' : 'hot';
		}
		this.velocity = this.velocity.scale(0.9); // TODO use this.damping instead
		super.update();
	}
	render() {
		if (this.weapon === 'hot')
			drawRect(vec2(0, height), vec2(16, 8), rgb(1, 0, 0));
		else if (this.weapon === 'cold')
			drawRect(vec2(0, height), vec2(16, 8), rgb(0, 0, 1));
		super.render();
	}
}
