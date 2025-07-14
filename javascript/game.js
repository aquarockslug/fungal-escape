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
	selectedCharacter = characterSelect();
	selectedStages = stageSequences(selectedCharacter);
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
		characterSelect();
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
	if (characterName === 'red') return ['greenhouse', 'backstreets'];
	if (characterName === 'blue') return ['greenhouse', 'scrapyard'];
	if (characterName === 'green') return ['greenhouse', 'scrapyard'];
	if (characterName === 'purple') return ['backstreets', 'scrapyard'];
}
function characterSelect() {
	selectedCharacterFrame = FPO.filter({
		arr: document.getElementsByName('player-select'),
		fn: ({ v }) => v.checked,
	})[0].value;
	drawTile(
		cameraPos,
		settings.screenResolution.divide(vec2(3)),
		Textures().tile('art', 'characters').frame(Number(selectedCharacterFrame)),
	);
	switch (Number(selectedCharacterFrame)) {
		case 0:
			return 'red';
		case 1:
			return 'yellow';
		case 2:
			return 'purple';
		case 3:
			return 'green';
		case 4:
			return 'blue';
	}
}
