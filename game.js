// Written by Aquarocks
// game where you look through and electron microscope
// goal: find a combo of molecules that are stable

function gameInit() {
	[width, height] = [200, 200];
	cameraOffset = vec2(0, 0);
	cameraScale = 3;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	particle = (square, color) => ({ square, value: { color } });
	grid = Grid(width, height, rgb(0, 0, 0));

	t = new TileInfo(vec2(5, 5), vec2(32, 32), 0);
	molecule = new Molecule(vec2(10, 10), vec2(5), t, 0);
	molecule2 = new Molecule(vec2(width - 10, 10), vec2(5), t, 0);
	particleTimer = new Timer(0.1);

	tempDisplay = document.getElementById('tempDisplay');
}
function gameStart() {}
function gameUpdate() {
	let warmParticles = [];
	let hotParticles = [];
	if (particleTimer.elapsed()) {
		warmParticles = FPO.std.pipe([
			grid.values,
			findParticles('warm'),
			fadeParticles(0.005),
		])();
		hotParticles = FPO.std.pipe([
			grid.values,
			findParticles('hot'),
			moveParticles,
			fadeParticles(0.01),
		])();
		particleTimer = new Timer(0.05);
	}

	let trails = FPO.map({
		arr: FPO.filter({ arr: engineObjects, fn: ({ v }) => v.hasTrail }),
		fn: ({ v }) => trail(v, 5),
	});

	// player aims and shoot blue? from outside?
	let blueParticles = [];

	// combine all particles into one list and apply them to the grid
	// if two updates change the same square, updates at the end of the list have priority
	grid.apply(
		FPO.flatten({ v: [trails, warmParticles, hotParticles, blueParticles] }),
	);
	tempDisplay.textContent = checkTemp();
}
function gameUpdatePost() {}
function gameRender() {
	drawRect(
		cameraPos,
		vec2(width * cameraScale, height * cameraScale),
		rgb(0.9, 0.9, 0.9),
	);
	for (let i = 0; i < width * height; i++)
		drawRect(grid.positions()[i], vec2(1), grid.values()[i].color);
}
function gameRenderPost() {}

// PARTICLE FUNCTIONS

function under(molecule) {
	let center = molecule.center();
	let squares = grid.neighborsOf(center);
	squares.push(center);
	return squares;
}

// draw a trail of hot particles under the given molecule
function trail(molecule) {
	return FPO.map({
		arr: FPO.filter({
			arr: under(molecule),
			fn: ({ v }) => randInt(0, 100) < molecule.trailThickness,
		}),
		fn: ({ v }) => particle(v, molecule.color),
	});
}

// count the hot particles, the particles are hot if color.r is greater than the threshold
function checkTemp(threshold = 0.1) {
	return FPO.reduce({
		arr: grid.values(),
		fn: ({ acc, v }) => (v?.color.r > threshold ? ++acc : acc),
		v: 0,
	});
}
// a particle is red if its red value is above 0.1
function findParticles(state) {
	if (state === 'hot') checkColor = ({ i, v }) => (v?.color.r > 0.5 ? i : -1);
	else if (state === 'warm')
		checkColor = ({ i, v }) => (v?.color.r > 0 && v?.color.r <= 0.5 ? i : -1);
	else checkColor = ({ i, v }) => -1;

	return (values) => {
		// a list of the squares that passed the checkColor
		targetSquares = FPO.filter({
			arr: FPO.map({
				arr: values,
				fn: checkColor,
			}),
			fn: ({ v }) => v >= 0 && v < width * height, // v is the particles "square" value
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
function fadeParticles(amount) {
	return (particles) =>
		FPO.map({
			arr: particles,
			fn: ({ v }) =>
				particle(
					v.square,
					new Color(v.value.color.r - amount, v.value.color.g, v.value.color.b),
				),
		});
}
