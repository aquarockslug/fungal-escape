class Molecule extends EngineObject {
	constructor(pos, size, tileInfo, angle, state) {
		super(pos, size, tileInfo, angle);
		this.pulse = new Timer(1);
		this.velocity = vec2(0)
			.setAngle(angle + randInt(PI / 4, PI / 3))
			.multiply(vec2(5));
		this.bulletTI = tileInfo;
		this.hasTrail = true;
		this.maxBounces = 2;
		this.bounces = 0;
		this.bounceOnCeiling = false;
		this.damage = 1;
		this.setCollision();

		this.color = rgb(1, 1, 1);
		this.trailThickness = 15;
		this.canBounce = true;
	}

	update() {
		if (this.pulse.elapsed()) {
			this.pulse = new Timer(1);
		}
		if (this.canBounce) this.bounce();
		super.update();
	}

	render() {
		// drawTile(this.pos, vec2(1), this.bulletTI);
		super.render();
	}

	// bounce off the sides of the grid
	bounce() {
		if (
			this.pos.x < grid.positions()[0].x ||
			this.pos.x > grid.positions()[width * height - 1].x
		) {
			this.bounces++;
			if (this.bounces > this.maxBounces) this.destroy();
			this.velocity = this.velocity.multiply(vec2(-1, 1));
		}
		if (this.bounceOnCeiling && this.pos.y > grid.positions()[height - 1].y) {
			this.bounces++;
			if (this.bounces > this.maxBounces) this.destroy();
			this.velocity = this.velocity.multiply(vec2(1, -1));
		}
		if (this.pos.y < grid.positions()[0].y) {
			this.bounces++;
			if (this.bounces > this.maxBounces) this.destroy();
			this.velocity = this.velocity.multiply(vec2(1, -1));
		}
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

	under(molecule) {
		return [molecule.center(), ...grid.neighborsOf(molecule.center())];
	}
}
