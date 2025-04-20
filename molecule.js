class Molecule extends EngineObject {
	constructor(pos, size, tileInfo, angle) {
		super(pos, size, tileInfo, angle);
		this.direction = vec2(1, 0.2);
		this.pulse = new Timer(1);
	}

	update() {
		this.velocity = this.direction;
		if (this.pos.x > grid.positions(width * height)) this.direction = vec2(-1);
		if (this.pulse.elapsed()) {
			console.log("pulse")
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
