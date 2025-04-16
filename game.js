// Written by Aquarocks

function gameInit() {
	[width, height] = [300, 300];
	cameraOffset = vec2(0, 0);
	cameraScale = 2;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	squareUpdate = (square, color) => ({ square, value: { color } });

	grid = Grid(width, height, rgb(0, 0, 0));
	greenSnake = snakePattern(rgb(0, 1, 0));
}
function gameStart() {}
function gameUpdate() {
	let squareUpdates = [];

	squareUpdates = scatterPattern(squareUpdates);
	if (keyIsDown('Space')) squareUpdates = greenSnake(squareUpdates);

	grid.apply(squareUpdates);
}
function gameUpdatePost() {}
function gameRender() {
	drawRect(cameraPos, vec2(width * 2, height * 2), rgb(0.2, 0.2, 0.2));
	for (let i = 0; i < width * height; i++)
		drawRect(grid.positions()[i], vec2(1), grid.values()[i].color);
}
function gameRenderPost() {}

function scatterPattern(updates) {
	target = randInt(0, width * height);
	updates.push(squareUpdate(target, rgb(1, 0, 0)));
	for (n of grid.neighborsOf(target)) updates.push(squareUpdate(n, rgb(1, 0, 0)));
	return updates;
}

function snakePattern(color) {
	headSquare = 0;
	return (updates) => {
		headSquare++;
		updates.push(squareUpdate(headSquare, color));
		return updates;
	};
}
