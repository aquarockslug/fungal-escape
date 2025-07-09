// Written by Aquarocks
function gameInit() {
	[width, height] = [210, 140];
	center = vec2(width / 2, height / 2);
	cameraOffset = vec2(0, 0);
	cameraScale = 3;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	gravity = -0.25;
	objectMaxSpeed = 5;

	grid = Grid(width, height, vec2(0, 10), rgb(0, 0, 0));
	setCanvasFixedSize(settings.screenResolution);
}
function gameStart() {
	particleTimer = new Timer(settings.particleUpdateInterval);
	selectedCharacter = FPO.filter({
		arr: document.getElementsByName('player-select'),
		fn: ({ v }) => v.checked,
	})[0].value;
	let selectedStages = stageSequences(selectedCharacter);
	stage = loadStage(selectedStages[0]);
	stage.start();
	started = true;
	sfx.chime.play();
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
			Textures().tile('menus', 'run_away_red'),
		);
		return;
	}
	for (let i = 0; i < width * height; i++) {
		let pixelColor = grid.values()[i].color;
		// dont render black squares
		if (pixelColor.r >= 0.25 || pixelColor.g >= 0.25 || pixelColor.b >= 0.25)
			drawRect(grid.positions()[i], vec2(1), pixelColor);
	}
}
function stageSequences(characterName) {
	if (characterName === 'red') return ['toxic'];
	if (characterName === 'blue') return ['toxic'];
	if (characterName === 'green') return ['toxic'];
	if (characterName === 'purple') return ['toxic'];
}
