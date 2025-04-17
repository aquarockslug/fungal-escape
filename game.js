// Written by Aquarocks
// game where you look through and electron microscope
// and manage the reactions between molecules

function gameInit() {
	[width, height] = [100, 100];
	cameraOffset = vec2(0, 0);
	cameraScale = 2;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	squareUpdate = (square, color) => ({ square, value: { color } });

	grid = Grid(width, height, rgb(0.5, 0.5, 0.5));

	t = new TileInfo(vec2(0, 0), vec2(32, 32), 0);
	molecule = new Molecule(vec2(0, 0), vec2(10, 10), t, 0);
}
function gameStart() {}
function gameUpdate() {
	let squareUpdates = [];

	// squareUpdates.push(squareUpdate(
	// 	grid.findNearestSquare(molecule.position), rgb(1, 0, 0))

	grid.apply(squareUpdates);
}
function gameUpdatePost() {}
function gameRender() {
	drawRect(cameraPos, vec2(width * 2, height * 2), rgb(0.9, 0.9, 0.9));
	for (let i = 0; i < width * height; i++)
		drawRect(grid.positions()[i], vec2(1), grid.values()[i].color);
}
function gameRenderPost() {}
