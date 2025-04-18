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
		let findRow = (col) => {
			for (let row = 0; row < height; row++)
				if (Math.round(grid.positions()[row].y) === Math.round(this.pos.y))
					return row;
		};

		for (let col = 0; col < width * height; col += height)
			if (Math.round(grid.positions()[col].x) === Math.round(this.pos.x))
				return col + findRow(col);
	}
}
