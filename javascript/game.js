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

	clearParticles();
	setCanvasFixedSize(settings.screenResolution);
}
function gameStart() {
	particleTimer = new Timer(settings.particleUpdateInterval);
	selectedCharacter = characterSelect();
	selectedStages = stageSequences(selectedCharacter);
	stage = loadStage(selectedStages[0]);
	stage.start();
	stageTimer = new Timer(settings.stageTimerLength);
	stageTimerDisplay.style.display = 'inline';
	started = true;
}
function gameUpdate() {
	if (!started) return;

	stageTimerDisplay.innerHTML = formatTime(abs(stageTimer.get()));

	if (particleTimer.elapsed()) {
		particleUpdate();
		particleTimer = new Timer(settings.particleUpdateInterval);
	}

	if (stageTimer.elapsed()) nextStage();
}
function gameUpdatePost() {}
function gameRender() {}
function gameRenderPost() {
	if (!started && stageIndex === 0) return characterSelect();
	if (!started && stageIndex >= 1) return showCharacterArt();
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
	this.messageDisplay.style.display = 'none';
}
function stageSequences(characterName) {
	return {
		red: [
			'greenhouse',
			'backstreets',
			'nightcity',
			'electricplant',
			'mossyshrine',
			'dawnforest',
		],
		blue: [
			'greenhouse',
			'scrapyard',
			'backstreets',
			'electricplant',
			'mossyshrine',
			'dawnforest',
		],
		green: [
			'greenhouse',
			'scrapyard',
			'nightcity',
			'backstreets',
			'mossyshrine',
			'dawnforest',
		],
		purple: [
			'greenhouse',
			'scrapyard',
			'nightcity',
			'electricplant',
			'backstreets',
			'dawnforest',
		],
	}[characterName];
}
function showCharacterArt() {
	let selectedCharacterFrame = Number(
		FPO.filter({
			arr: document.getElementsByName('player-select'),
			fn: ({ v }) => v.checked,
		})[0].value,
	);
	// TODO play button sound when the char changes
	// if (characterSelect())
	drawTile(
		cameraPos,
		settings.screenResolution.divide(vec2(3)),
		Textures().tile('art', 'characters').frame(selectedCharacterFrame),
	);
	return selectedCharacterFrame;
}
function characterSelect() {
	switch (showCharacterArt()) {
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
// load the next stage in the stage sequence after showing the transition screen for the given amount of seconds
function nextStage(transitionLength = 3) {
	console.log('stage end');
	clearParticles();
	this.stageTimerDisplay.style.display = 'none';
	this.messageDisplay.style.display = 'flex';
	started = false;
	stage.stop();
	stageIndex++;
	if (!selectedStages[stageIndex]) {
		gameOver();
		return;
	}
	after(
		transitionLength * 1000,
		(stageName) => {
			stage = loadStage(stageName);
			started = true;
			stageTimer = new Timer(5);
			stage.start();
			this.messageDisplay.style.display = 'none';
			this.stageTimerDisplay.style.display = 'flex';
		},
		selectedStages[stageIndex],
	);
}
function clearParticles() {
	grid = Grid(width, height, vec2(0, 10), rgb(0, 0, 0));
}
async function after(ms, fn, ...args) {
	await new Promise((resolve) => setTimeout(resolve, ms));
	return fn(...args);
}
