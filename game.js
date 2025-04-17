// Written by Aquarocks

function gameInit() {
	[width, height] = [300, 300];
	cameraOffset = vec2(0, 0);
	cameraScale = 2;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	squareUpdate = (square, color) => ({ square, value: { color } });

	grid = Grid(width, height, rgb(0, 0, 0));

	molecule = EngineObject((pos = (0, 0)), (size = (5, 5)), tileInfo, (angle = 0), color, (renderOrder = 0));
}
function gameStart() {}
function gameUpdate() {
	let squareUpdates = [];

	grid.apply(squareUpdates);
}
function gameUpdatePost() {}
function gameRender() {
	drawRect(cameraPos, vec2(width * 2, height * 2), rgb(0.2, 0.2, 0.2));
	for (let i = 0; i < width * height; i++)
		drawRect(grid.positions()[i], vec2(1), grid.values()[i].color);
}
function gameRenderPost() {}
