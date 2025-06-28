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
		{
			name: 'red_shroomy',
			path: 'assets/textures/red_shroomy.png',
			tiles: {
				idle: {
					pos: vec2(48, 46),
					size: vec2(35, 24),
				},
				walk: {
					pos: vec2(0, 77),
					size: vec2(35, 24),
				},
			},
		},
		{
			name: 'blue_shroomy',
			path: 'assets/textures/blue_shroomy.png',
			tiles: {
				idle: {
					pos: vec2(50, 47),
					size: vec2(35, 34),
				},
				walk: {
					pos: vec2(0, 79),
					size: vec2(34, 34),
				},
			},
		},
	];

	// automatically label the tilesheets with their index in the tilesheets
	tilesheets = FPO.map({
		arr: tilesheets,
		fn: ({ i, v }) => FPO.setProp({ o: v, prop: 'index', v: i }),
	});

	// return the sheet with the given name
	let sheet = (name) => tilesheets.find((entry) => entry.name === name);

	return {
		// returns TileInfo for the given tile from the given sheet
		tile: (sheetName, tileName) => {
			let s = sheet(sheetName);
			if (!s) console.log(`sheet "${sheetName}" was not found!`);
			let t = s.tiles[tileName];
			if (!t) console.log(`tile "${tileName}" was not found!`);
			return new TileInfo(t.pos, t.size, s.index);
		},
		// returns a list of all the tilesheet paths
		paths: tilesheets.map((sheet) => sheet.path),
		sheet,
	};
}
