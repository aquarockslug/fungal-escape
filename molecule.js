class Molecule extends EngineObject {
	constructor(pos, size, tileInfo, angle) {
		super(pos, size, tileInfo, angle);
	}

	update() {
		this.velocity = vec2(1);
		super.update();
	}

	render() {
		super.render();
	}
}
