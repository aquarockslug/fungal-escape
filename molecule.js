class Molecule extends EngineObject {
	update() {
		this.velocity = vec2(1);
		super.update();
	}

	render() {
		super.render();
	}

	// returns the index of the square directly below this molecule
	center() {
		for (let col = 0; col < width * height; col += height) {
			// find the correct column
			if (Math.round(grid.positions()[col].x) === Math.round(this.pos.x)) {
				for (let row = 0; row < height; row++) {
					// find the correct row
					if (Math.round(grid.positions()[row].y) === Math.round(this.pos.y)) {
						return col + row;
					}
				}
			}
		}
	}
}
