// a file for managing textures

function Textures() {
	// tilesheets is a list so that each tilesheet has an index that can be used by littlejs
	tilesheets = [
		{
			name: 'backgrounds',
			path: 'assets/textures/backgrounds.png',
			tiles: {
				toxic: {
					pos: vec2(240 * 2, 0),
					size: vec2(240),
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
				bullet: {
					pos: vec2(96, 0),
					size: vec2(12),
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
				bullet: {
					pos: vec2(96, 0),
					size: vec2(12),
				},
			},
		},
		{
			name: 'foregrounds',
			path: 'assets/textures/foregrounds.png',
			tiles: {
				metal_top: {
					pos: vec2(0, 20),
					size: vec2(53, 17),
				},
				metal_bottom: {
					pos: vec2(0, 0),
					size: vec2(53, 17),
				},
			},
		},
		{
			name: 'menus',
			path: 'assets/textures/fungal-escape-titleart.png',
			tiles: {
				run_away_red: {
					pos: vec2(0),
					size: vec2(833, 831),
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
