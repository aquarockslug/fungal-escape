// Written by Aquarocks
function gameInit() {
	[width, height] = [210, 140];
	center = vec2(width / 2, height / 2);
	cameraOffset = vec2(0, 0);
	cameraScale = 3;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	gravity = -0.25;
	objectMaxSpeed = 5;

	stageTimerDisplay = document.getElementById('timer');
	stageIndex = 0;

	messageDisplay = document.getElementById('message');

	grid = Grid(width, height, vec2(0, 10), rgb(0, 0, 0));
	setCanvasFixedSize(settings.screenResolution);
}
function gameStart() {
	particleTimer = new Timer(settings.particleUpdateInterval);
	selectedCharacter = characterSelect();
	selectedStages = stageSequences(selectedCharacter);
	stage = loadStage(selectedStages[0]);
	stage.start();
	stageTimer = new Timer(10);
	stageTimerDisplay.style.display = 'inline';
	started = true;
	sfx.chime.play();
}
function gameUpdate() {
	if (!started) return;

	stageTimerDisplay.innerHTML = formatTime(abs(stageTimer.get()));

	if (particleTimer.elapsed()) {
		particleUpdate();
		particleTimer = new Timer(settings.particleUpdateInterval);
	}

	if (stageTimer.elapsed()) stageTransition();
}
function gameUpdatePost() {}
function gameRender() {}
function gameRenderPost() {
	if (!started && stageIndex == 0) {
		characterSelect();
		return;
	}
	if (!started && stageIndex >= 1) {
		showCharacterArt();
		return;
	}
	for (let i = 0; i < width * height; i++) {
		let pixelColor = grid.values()[i].color;
		// dont render black squares
		if (pixelColor.r >= 0.25 || pixelColor.g >= 0.25 || pixelColor.b >= 0.25)
			drawRect(grid.positions()[i], vec2(1), pixelColor);
	}
}
function gameOver() {
	// TODO create ending screen
	console.log('game over');
}
function stageSequences(characterName) {
	if (characterName === 'red')
		return ['greenhouse', 'backstreets', 'greenhouse'];
	if (characterName === 'blue')
		return ['greenhouse', 'backstreets', 'greenhouse'];
	if (characterName === 'green')
		return ['greenhouse', 'backstreets', 'greenhouse'];
	if (characterName === 'purple')
		return ['greenhouse', 'backstreets', 'greenhouse'];
}
function showCharacterArt() {
	selectedCharacterFrame = FPO.filter({
		arr: document.getElementsByName('player-select'),
		fn: ({ v }) => v.checked,
	})[0].value;
	drawTile(
		cameraPos,
		settings.screenResolution.divide(vec2(3)),
		Textures().tile('art', 'characters').frame(Number(selectedCharacterFrame)),
	);
}
function characterSelect() {
	showCharacterArt();
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
function stageTransition() {
	console.log('stage end');
	this.stageTimerDisplay.style.display = 'none';
	this.messageDisplay.style.display = 'flex';
	started = false;
	stage.stop();
	stageIndex++;
	if (!selectedStages[stageIndex]) gameOver();
	after(
		3000,
		(stageName) => {
			stage = loadStage(stageName);
			stage.start();
			stageTimer = new Timer(10);
			started = true;
			this.messageDisplay.style.display = 'none';
			this.stageTimerDisplay.style.display = 'flex';
		},
		selectedStages[stageIndex],
	);
}
async function after(ms, fn, ...args) {
	await new Promise((resolve) => setTimeout(resolve, ms));
	return fn(...args);
}
