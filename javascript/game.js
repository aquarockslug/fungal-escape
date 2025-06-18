// Written by Aquarocks
// game where you look through and electron microscope

function gameInit() {
	[width, height] = [150, 200];
	cameraOffset = vec2(20, 0);
	cameraScale = 3.5;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	particle = (square, color) => ({ square, value: { color } });
	grid = Grid(width, height, rgb(0, 0, 0));

	let textures = Textures();
	blockTile = textures.tile('encrypt_man', 'block');
	wiresTile = textures.tile('encrypt_man', 'bg_wires');

	molecule = new Molecule(
		vec2(width / 2, height / 2),
		vec2(16),
		blockTile,
		randInt(0, 360),
		'hot',
	);
	molecule2 = new Molecule(
		vec2(width / 2, height / 2),
		vec2(16),
		blockTile,
		randInt(0, 360),
		'hot',
	);
	particleTimer = new Timer(0.1);

	background = [];
	background.push(
		new EngineObject(
			vec2(width / 2, height / 2),
			vec2(32),
			wiresTile,
			0,
			rgb(1, 1, 1),
			-1,
		),
		new EngineObject(
			vec2(width / 2 + 32, height / 2),
			vec2(32),
			wiresTile,
			0,
			rgb(1, 1, 1),
			-1,
		),
		new EngineObject(
			vec2(width / 2 + 64, height / 2),
			vec2(32),
			wiresTile,
			0,
			rgb(1, 1, 1),
			-1,
		),
	);
	for (obj of background) {
		obj.velocity = vec2(0, -0.25);
	}
	tempDisplay = document.getElementById('tempDisplay');
}
function gameStart() {}
function gameUpdate() {
	if (keyWasPressed('Space') || mouseWasPressed(0)) {
		let v = mousePos.subtract(vec2(width / 2, 10)).angle();
		new Molecule(vec2(width / 2, 10), vec2(5), blockTile, v, 'cold');
	}

	// move background objects which scrolled off the bottom back to the top
	FPO.map({
		arr: background,
		fn: ({ v }) => {
			if (v.pos.y < 0 - v.size.y / 2) {
				v.pos.y = height + v.size.y / 2;
			}
		},
	});

	if (!particleTimer.elapsed()) return;

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

	tempDisplay.textContent = checkTemp();

	particleTimer = new Timer(settings.particleUpdateInterval);
}
function gameUpdatePost() {}
function gameRender() {}
function gameRenderPost() {
	for (let i = 0; i < width * height; i++) {
		let pixelColor = grid.values()[i].color;
		// dont render black squares
		if (pixelColor.r >= 0.25 || pixelColor.g >= 0.25 || pixelColor.b >= 0.25)
			drawRect(grid.positions()[i], vec2(1), pixelColor);
	}
}

function under(molecule) {
	let center = molecule.center();
	let squares = grid.neighborsOf(center);
	squares.push(center);
	return squares;
}

function thinTrail(molecule) {
	return particle(molecule.center(), molecule.color);
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
// TODO subtract cold particles?
function checkTemp(threshold = 0.1) {
	return FPO.reduce({
		arr: grid.values(),
		fn: ({ acc, v }) =>
			v?.color.r > threshold && v?.color.b < threshold ? ++acc : acc,
		v: 0,
	});
}

// find all particles which match the given state
function findParticles(state) {
	// find the state of the squares from the color values
	// TODO create a function that determines the state of the particle
	if (state === 'hot')
		state = ({ i, v }) => (v?.color.r > 0.5 && v?.color.b <= 0 ? i : -1);
	else if (state === 'warm')
		state = ({ i, v }) => (v?.color.r <= 0.5 && v?.color.b <= 0 ? i : -1);
	else if (state === 'cold') state = ({ i, v }) => (v?.color.b > 0.5 ? i : -1);
	else if (state === 'cool') state = ({ i, v }) => (v?.color.b <= 0.5 ? i : -1);
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
