// a file for managing textures

function Textures() {
	// tilesheets is a list so that each tilesheet has an index that can be used by littlejs
	tilesheets = [
		{
			name: 'encrypt_man',
			path: 'assets/textures/encrypt_man.png', // path to the tile sheet
			tiles: {
				bg_wires: {
					pos: vec2(0, 0), // the coordinates of the tile on the texture map
					size: vec2(50, 50), // the size of the tile on the texture map
				},
			},
		},
	];

	// automatically label the tilesheets with their index in the tilesheets list
	for (let i = 0; i < tilesheets.length; i++) tilesheets[i].index = i;

	// return the sheet with the given name
	let sheet = (name) => tilesheets.find((entry) => entry.name === name); // textures.tile('encrypt_man', 'bg_wires') => info for TileInfo,

	return {
		// returns a list of all the tilesheet paths
		paths: tilesheets.map((sheet) => sheet.path),
		// returns TileInfo for the given tile from the given sheet
		tile: (sheetName, tileName) => {
			let s = sheet(sheetName);
			let t = s.tiles[tileName];
			return new TileInfo(t.pos, t.size, s.index);
		},
	};
}
