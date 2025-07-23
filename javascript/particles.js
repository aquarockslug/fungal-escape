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
			findParticles('active'),
			moveParticles,
			fadeParticles(0.05, 0.05, 0.05),
		])(),
	);

	// grid.apply(
	// 	FPO.std.pipe([grid.values, findParticles('active'), moveParticles])(),
	// );
}
// find all particles which match the given state
function findParticles(stateName) {
	if (stateName == 'active')
		state = ({ i, v }) => {
			if (v) return v.color.r + v.color.g + v.color.b < 0.25 ? -1 : i;
			else return -1;
		};
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
				if (!c) c = new Color(0, 0, 0);
				return particle(v.square, c ? c : rgb(0, 0, 0));
			},
		});
}
