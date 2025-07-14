function particle(square, color) {
	return { square, value: { color } };
}
function particleUpdate() {
	grid.apply(
		FPO.map({
			arr: FPO.filter({ arr: engineObjects, fn: ({ v }) => v.hasTrail }),
			fn: ({ v }) => particle(v.center(), v.color),
		}),
	);

	grid.apply(
		FPO.std.pipe([
			grid.values,
			findParticles('warm'),
			fadeParticles(0.005, 0, 0),
		])(),
	);

	grid.apply(
		FPO.std.pipe([
			grid.values,
			findParticles('hot'),
			moveParticles,
			fadeParticles(rand(0.005, 0.025), 0, 0),
		])(),
	);

	grid.apply(
		FPO.std.pipe([
			grid.values,
			findParticles('cool'),
			fadeParticles(0, 0, 0.005),
		])(),
	);

	grid.apply(
		FPO.std.pipe([grid.values, findParticles('cold'), spreadParticles])(),
	);

	grid.apply(
		FPO.std.pipe([
			grid.values,
			findParticles('cold'),
			fadeParticles(0, 0, rand(0.01, 0.25)),
		])(),
	);
}
// set all particles to black
function clearParticles() {
	grid.apply(FPO.std.pipe([grid.values, (v) => particle(v, rgb(0, 0, 0))])());
}
// find all particles which match the given state
function findParticles(stateName) {
	// find the state of the squares from the color values
	// TODO create a function that determines the state of the particle
	if (stateName === 'hot')
		state = ({ i, v }) => (v?.color.r > 0.5 && v?.color.b <= 0 ? i : -1);
	else if (stateName === 'warm')
		state = ({ i, v }) => (v?.color.r <= 0.5 && v?.color.b <= 0 ? i : -1);
	else if (stateName === 'cold')
		state = ({ i, v }) => (v?.color.b > 0.5 ? i : -1);
	else if (stateName === 'cool')
		state = ({ i, v }) => (v?.color.b <= 0.5 ? i : -1);
	else state = ({ i, v }) => -1;

	return (values) => {
		targetSquares = FPO.filter({
			arr: FPO.map({
				arr: values,
				fn: state,
			}),
			fn: ({ v }) => v >= 0 && v < width * height, // filter out invalid "square" values
		});

		// create particles from the target squares
		return FPO.map({
			arr: targetSquares,
			fn: ({ v }) => particle(v, values[v].color),
		});
	};
}
// randomly move particles of the given color
function moveParticles(particles) {
	let particlesOldPos = FPO.map({
		arr: particles,
		fn: ({ v }) => particle(v.square, rgb(0, 0, 0)),
	});
	return FPO.flatten({ v: [particlesOldPos, spreadParticles(particles)] });
}
// copy particles onto a neighbor
// TODO parameter for how many squares moved
function spreadParticles(particles) {
	return FPO.map({
		arr: particles,
		fn: ({ v }) =>
			particle(
				grid.neighborsOf(v.square)[randInt(0, 7)],
				grid.values()[v.square].color,
			),
	});
}
function fadeParticles(r, g, b) {
	return (particles) =>
		FPO.map({
			arr: particles,
			fn: ({ v }) => {
				c = new Color(
					v.value.color.r - r,
					v.value.color.g - g,
					v.value.color.b - b,
				);
				return particle(v.square, c ? c : rgb(0, 0, 0));
			},
		});
}
