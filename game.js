// Written by Aquarocks
// game where you look through and electron microscope
// and manage the reactions between molecules

function gameInit() {
	[width, height] = [150, 150];
	cameraOffset = vec2(0, 0);
	cameraScale = 4;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	gridUpdate = (square, color) => ({ square, value: { color } });
	grid = Grid(width, height, rgb(0.5, 0.5, 0.5));

	t = new TileInfo(vec2(5, 5), vec2(32, 32), 0);
	molecule = new Molecule(vec2(10, 10), vec2(5), t, 0);
	particleTimer = new Timer(0.1);
}
function findColor(color) {
	return FPO.filter({
		arr: FPO.map({
			arr: grid.values(),
			fn: ({ i, v }) =>
				v?.color.r === color.r &&
				v?.color.g === color.g &&
				v?.color.b === color.b
					? i
					: -1,
		}),
		fn: ({ v }) => v >= 0,
	});
}
// randomly move particles of the given color
function driftParticles(color) {
	let particles = findColor(color);
	let particlesOld = FPO.map({
		arr: particles,
		fn: ({ v }) => gridUpdate(v, rgb(0.5, 0.5, 0.5)),
	});
	let particlesNew = FPO.map({
		arr: particles,
		fn: ({ v }) => gridUpdate(grid.neighborsOf(v)[randInt(0, 7)], color),
	});
	return FPO.flatten({ v: [particlesOld, particlesNew] });
}
function gameStart() {}
function gameUpdate() {
	let particleUpdates = [];
	if (particleTimer.elapsed()) {
		particleUpdates = driftParticles(molecule.color);
		particleTimer = new Timer(0.5);
	}

	let t = trail(molecule, 10);

	// combine all gridUpdates into one list and apply them to the grid
	grid.apply(FPO.flatten({ v: [t, particleUpdates] }));
}
function gameUpdatePost() {}
function gameRender() {
	drawRect(cameraPos, vec2(width * 2, height * 2), rgb(0.9, 0.9, 0.9));
	for (let i = 0; i < width * height; i++)
		drawRect(grid.positions()[i], vec2(1), grid.values()[i].color);
}
function gameRenderPost() {}

function under(molecule) {
	let center = molecule.center();
	let squares = grid.neighborsOf(center);
	squares.push(center);
	return squares;
}

function trail(molecule, thickness = 5) {
	return FPO.map({
		arr: FPO.filter({
			arr: under(molecule),
			fn: ({ v }) => randInt(0, 100) < thickness,
		}),
		fn: ({ v }) => gridUpdate(v, molecule.color),
	});
}

function checkTemp() {
	return FPO.reduce({
		arr: grid.values(),
		fn: ({ acc, v }) => (v?.color.r > 0.8 ? ++acc : acc),
		v: 0,
	});
}
