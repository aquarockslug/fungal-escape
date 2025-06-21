// Written by Aquarocks

function gameInit() {
	[width, height] = [150, 150];
	center = vec2(width / 2, height / 2);
	cameraOffset = vec2(0, 0);
	cameraScale = 3.5;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	grid = Grid(width, height, rgb(0, 0, 0));
	particle = (square, color) => ({ square, value: { color } });

	let textures = Textures();
	new Player(center, vec2(8), 0);

	background = initBackground(textures.tile('absolute_man', 'background'));
}
function gameStart() {
	// start scrolling the background
	for (obj of background[0]) {
		obj.velocity = vec2(settings.backgroundScroll * 0.01, 0);
	}
	for (obj of background[1]) {
		obj.velocity = vec2(settings.backgroundScroll * 0.01 * 1.5, 0);
	}

	particleTimer = new Timer(settings.particleUpdateInterval);
}
function gameUpdate() {
	if (!started) return;

	// wrap the background around to the other side if if went off the screen
	FPO.map({
		arr: FPO.flatten({ v: background }),
		fn: ({ v }) => {
			if (v.pos.x < 0 - v.size.x * 2) {
				v.pos.x = width * 2;
			}
		},
	});

	if (particleTimer.elapsed()) {
		particleUpdate();
		particleTimer = new Timer(settings.particleUpdateInterval);
	}
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

// returns squares in the same position as the given molecule
function under(molecule) {
	let center = molecule.center();
	let squares = grid.neighborsOf(center);
	squares.push(center);
	return squares;
}

// draw a trail of particles under the given molecule
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

function initBackground(bgTexture) {
	let b1 = new EngineObject(
		vec2(0, height / 2),
		vec2(width, height),
		bgTexture,
		0,
		rgb(1, 1, 1),
		-1,
	);
	let b2 = new EngineObject(
		vec2(width, height / 2),
		vec2(width, height),
		bgTexture,
		0,
		rgb(1, 1, 1),
		-1,
	);
	let b3 = new EngineObject(
		vec2(width * 2, height / 2),
		vec2(width, height),
		bgTexture,
		0,
		rgb(1, 1, 1),
		-1,
	);
	let b4 = new EngineObject(
		vec2(width * 3, height / 2),
		vec2(width, height),
		bgTexture,
		0,
		rgb(1, 1, 1),
		-1,
	);
	let blocks = [];
	let blockSize = vec2(16, 8);
	for (let i = 0; i <= 30; i++) {
		blocks.push(
			new EngineObject(
				vec2(blockSize.x * i - blockSize.x / 2, 4),
				blockSize,
				Textures().tile('absolute_man', 'block'),
				0,
				rgb(1, 1, 1),
				-1,
			),
		);
	}
	return [[b1, b2, b3, b4], blocks];
}
