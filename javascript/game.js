// Written by Aquarocks

function gameInit() {
	// TODO create more settings variables
	[width, height] = [210, 140];
	center = vec2(width / 2, height / 2);
	cameraOffset = vec2(0, 0);
	cameraScale = 3;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	grid = Grid(width, height, vec2(0, 10), rgb(0, 0, 0));

	gravity = -0.25;
	objectMaxSpeed = 5;

	stage = new IceStage();

	player = new Player(vec2(center.x / 2, 16));
	rival = new Rival(vec2(center.x * 1.75, center.y / 2), 'blue_shroomy');
}
function gameStart() {
	particleTimer = new Timer(settings.particleUpdateInterval);
	stage.startScroll();
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
	for (let i = 0; i < width * height; i++) {
		let pixelColor = grid.values()[i].color;
		// dont render black squares
		if (pixelColor.r >= 0.25 || pixelColor.g >= 0.25 || pixelColor.b >= 0.25)
			drawRect(grid.positions()[i], vec2(1), pixelColor);
	}
}
