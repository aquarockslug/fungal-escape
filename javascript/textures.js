// a file for managing textures

function Textures() {
	// tilesheets is a list so that each tilesheet has an index that can be used by littlejs
	tilesheets = [
		{
			name: 'absolute_man',
			path: 'assets/textures/absolute_man.png',
			tiles: {
				background: {
					pos: vec2(200, 0),
					size: vec2(200),
				},
			},
		},
		{
			name: 'encrypt_man',
			path: 'assets/textures/encrypt_man.png', // path to the tile sheet
			tiles: {
				block: {
					pos: vec2(20, 0), // the coordinates for the upper left pixel of the tile on the tilesheet
					size: vec2(32, 32), // the size of the tile on the texture map in pixels
				},
				bg_wires: {
					pos: vec2(41, 35),
					size: vec2(64, 64),
				},
			},
		},
	];

	// automatically label the tilesheets with their index in the tilesheets list
	FPO.map({ arr: tilesheets, fn: ({ i, v }) => (v.index = i) });

	// return the sheet with the given name
	let sheet = (name) => tilesheets.find((entry) => entry.name === name); // textures.tile('encrypt_man', 'bg_wires') => info for TileInfo,

	return {
		// returns a list of all the tilesheet paths
		paths: tilesheets.map((sheet) => sheet.path),
		// returns TileInfo for the given tile from the given sheet
		tile: (sheetName, tileName) => {
			let s = sheet(sheetName);
			let t = s.tiles[tileName];
			if (!t) console.log(`tile "${tileName}" was not found!`);
			return new TileInfo(t.pos, t.size, s.index);
		},
		sheet,
	};
}
