// Written by Aquarocks
// game where you look through and electron microscope
// and manage the reactions between molecules

function gameInit() {
	[width, height] = [100, 100];
	cameraOffset = vec2(0, 0);
	cameraScale = 3;
	cameraPos = vec2(width, height).scale(0.5).add(cameraOffset);

	squareUpdate = (square, color) => ({ square, value: { color } });

	grid = Grid(width, height, rgb(0.5, 0.5, 0.5));

	t = new TileInfo(vec2(5, 5), vec2(32, 32), 0);
	molecule = new Molecule(vec2(20, 20), vec2(10, 10), t, 0);
}
function gameStart() {}
function gameUpdate() {
	let example = FPO.map({
		arr: [1, 2, 3, 4, 5],
		fn: ({ v }) => squareUpdate(v, rgb(1, 0, 0)),
	});

	let trail = squareUpdate(molecule.center(), rgb(0, 1, 0));

	// combine all squareUpdates into one list and apply them to the grid
	grid.apply(FPO.flatten({ v: [example, trail] }));
}
function gameUpdatePost() {}
function gameRender() {
	drawRect(cameraPos, vec2(width * 2, height * 2), rgb(0.9, 0.9, 0.9));
	for (let i = 0; i < width * height; i++)
		drawRect(grid.positions()[i], vec2(1), grid.values()[i].color);
}
function gameRenderPost() {}
