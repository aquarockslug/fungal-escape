class Player extends EngineObject {
	constructor(pos, speed = 0.5) {
		let idleTI = Textures().tile('player', 'idle');
		super(pos, vec2(16, 12), idleTI, 0);
		this.idleTI = idleTI;
		this.walkTI = Textures().tile('player', 'walk');
		this.speed = speed;
		this.weapon = 'hot';
	}
	update() {
		let direction = mousePos.subtract(this.pos).normalize();
		let angle = direction.angle();
		this.angle = angle + Math.PI / 2;

		// player runs on the bottom of the screen and jumps over obstacles
		if (mouseWasPressed(0)) {
			new Molecule(
				this.pos.add(direction.scale(10)), // launch the molecule from in front of the player
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
			// TODO add jumping
		}
		this.velocity = this.velocity.scale(0.9); // TODO use this.damping instead
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

		if (this.weapon === 'hot')
			drawRect(vec2(0, height), vec2(16, 8), rgb(1, 0, 0));
		else if (this.weapon === 'cold')
			drawRect(vec2(0, height), vec2(16, 8), rgb(0, 0, 1));
	}
}
