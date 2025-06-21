// Written by Aquarocks

function Grid(width, height, pos, initColor) {
	let values = [];
	for (let i = 0; i < width * height; i++) values.push({ color: initColor });

	let positions = [];
	for (let x = 0.5; x < width; x++)
		for (let y = 0.5; y < height; y++) positions.push(vec2(x, y).add(pos));

	return {
		// return the values after applying the given updates
		apply: (squareUpdates) =>
			squareUpdates.map((update) => {
				values[update.square] = update.value;
			}),
		// get grid information
		values: () => values,
		positions: () => positions,
		neighborsOf: (square) => getValidNeighbors(square),
	};
}

// the index of the squares all around the given square index
function calcNeighbors(width, height) {
	return (homeIndex) =>
		!homeIndex
			? Object.keys(neighbors(width * height * 0.5)) // return direction names if no homeIndex was given
			: {
					up: homeIndex + 1,
					down: homeIndex - 1,
					right: homeIndex + height,
					left: homeIndex - height,
					upperRight: homeIndex + height + 1,
					lowerRight: homeIndex + height - 1,
					upperLeft: homeIndex - height + 1,
					lowerLeft: homeIndex - height - 1,
				};
}

// returns true if the edge of the grid is in the given direction
function isBorder(square, direction, moves) {
	let [onBottomEdge, onTopEdge] = [
		(square) => !(square % height),
		(square) => !((square + 1) % height),
	];

	if (
		(onTopEdge(square) &&
			(direction === 'up' ||
				direction === 'upperLeft' ||
				direction === 'upperRight')) ||
		(onBottomEdge(square) &&
			(direction === 'down' ||
				direction === 'lowerLeft' ||
				direction === 'lowerRight'))
	)
		return true;

	// check if its index is valid
	let neighborIndex = calcNeighbors(width, height)(square)[direction];
	return neighborIndex < 0 || neighborIndex > width * height;
}

// gets the neighbors of the square while checking for the edge of the board
function getValidNeighbors(square) {
	let out = [];
	// only return valid neighbors
	neighbors = calcNeighbors(width, height);
	for (direction of neighbors())
		if (!isBorder(neighbors, square, direction))
			out.push(neighbors(square)[direction]);
	return out;
}
