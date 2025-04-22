class Molecule extends EngineObject {
	constructor(pos, size, tileInfo, angle) {
		super(pos, size, tileInfo, angle);
		this.pulse = new Timer(1);
		this.color = rgb(1, 0, 0);
		this.velocity = vec2(1, 0.25);
		this.hasTrail = true;
	}

	update() {
		// bounce off the sides of the grid
		if (
			this.pos.x < grid.positions()[0].x ||
			this.pos.x > grid.positions()[width * height - 1].x
		)
			this.velocity = this.velocity.multiply(vec2(-1, 1));
		if (
			this.pos.y < grid.positions()[0].y ||
			this.pos.y > grid.positions()[height - 1].y
		)
			this.velocity = this.velocity.multiply(vec2(1, -1));

		if (this.pulse.elapsed()) {
			this.pulse = new Timer(1);
		}
		super.update();
	}

	render() {
		super.render();
	}

	// returns the index of the square directly below this molecule
	center() {
		let findRow = (col) => {
			for (let row = 0; row < height; row++)
				if (Math.round(grid.positions()[row].y) === Math.round(this.pos.y))
					return row;
		};

		// only check the columns and then the rows to avoid checking every square
		for (let col = 0; col < width * height; col += height)
			if (Math.round(grid.positions()[col].x) === Math.round(this.pos.x))
				return col + findRow(col);
	}
}
