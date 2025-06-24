// a file for managing textures

function Textures() {
	// tilesheets is a list so that each tilesheet has an index that can be used by littlejs
	tilesheets = [
		{
			name: 'absolute_man',
			path: 'assets/textures/absolute_man.png',
			tiles: {
				background: {
					pos: vec2(160, 0),
					size: vec2(240),
				},
				snow: {
					pos: vec2(18, 36),
					size: vec2(32, 16),
				},
				block: {
					pos: vec2(37, 161),
					size: vec2(32, 32),
				},
				snowman: {
					pos: vec2(40, 197),
					size: vec2(20, 32),
				},
			},
		},
	];

	// automatically label the tilesheets with their index in the tilesheets list
	FPO.map({ arr: tilesheets, fn: ({ i, v }) => (v.index = i) }); // TODO use FPO setProp?

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
