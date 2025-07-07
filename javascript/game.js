// Written by Aquarocks

function gameInit() {
	// TODO create more settings variables
	[width, height] = [210, 140];
	center = vec2(width / 2, height / 2);
	cameraOffset = vec2(0, 0);
	cameraScale = 3;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	gravity = -0.25;
	objectMaxSpeed = 5;

	grid = Grid(width, height, vec2(0, 10), rgb(0, 0, 0));
}
function gameStart() {
	particleTimer = new Timer(settings.particleUpdateInterval);
	// let selectedStage = FPO.filter({
	// 	arr: document.getElementsByName('stages'),
	// 	fn: ({ v }) => v.checked,
	// })[0].value;
	let selectedStage = 1;
	stage = loadStage(selectedStage);
	stage.start();
	started = true;
	sfx.chime.play();
}
function gameCharacterSelect() {
	state = 'character_select';
}
function gameUpdate() {
	if (!started) return;

	if (particleTimer.elapsed()) {
		particleUpdate();
		particleTimer = new Timer(settings.particleUpdateInterval);
	}
}
function gameUpdatePost() {}
function gameRender() {}
function gameRenderPost() {
	if (!started) {
		drawTile(
			cameraPos,
			settings.screenResolution.divide(vec2(3)),
			Textures().tile('menus2', 'run_away_red'),
		);
		// if (state == 'main_menu')
		// 	drawTile(
		// 		cameraPos.add(vec2(0, -11)),
		// 		settings.screenResolution.divide(vec2(3)),
		// 		Textures().tile('menus', 'title'),
		// 	);
		return;
	}
	for (let i = 0; i < width * height; i++) {
		let pixelColor = grid.values()[i].color;
		// dont render black squares
		if (pixelColor.r >= 0.25 || pixelColor.g >= 0.25 || pixelColor.b >= 0.25)
			drawRect(grid.positions()[i], vec2(1), pixelColor);
	}
}
