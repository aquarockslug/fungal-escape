// a file for managing textures

function Textures() {
	// tilesheets is a list so that each tilesheet has an index that can be used by littlejs
	tilesheets = [
		{
			name: 'red_shroomy',
			path: 'assets/characters/deimos.png',
			tiles: {
				idle: {
					pos: vec2(0, 46),
					size: vec2(35, 24),
				},
				walk: {
					pos: vec2(0, 81),
					size: vec2(35, 24),
				},
				bullet: {
					pos: vec2(21, 0),
					size: vec2(12),
				},
			},
		},
		{
			name: 'blue_shroomy',
			path: 'assets/characters/phobos.png',
			tiles: {
				idle: {
					pos: vec2(0, 54),
					size: vec2(35, 34),
				},
				walk: {
					pos: vec2(0, 90),
					size: vec2(34, 34),
				},
				bullet: {
					pos: vec2(24, 0),
					size: vec2(12),
				},
			},
		},
		{
			name: 'green_shroomy',
			path: 'assets/characters/io.png',
			tiles: {
				idle: {
					pos: vec2(0, 52),
					size: vec2(35, 34),
				},
				walk: {
					pos: vec2(0, 85),
					size: vec2(34, 34),
				},
				bullet: {
					pos: vec2(45, 0),
					size: vec2(12),
				},
			},
		},
		{
			name: 'purple_shroomy',
			path: 'assets/characters/europa.png',
			tiles: {
				idle: {
					pos: vec2(0, 56),
					size: vec2(35, 34),
				},
				walk: {
					pos: vec2(0, 90),
					size: vec2(34, 34),
				},
				bullet: {
					pos: vec2(8, 5),
					size: vec2(12),
				},
			},
		},
		{
			name: 'yellow_shroomy',
			path: 'assets/characters/oberon.png',
			tiles: {
				idle: {
					pos: vec2(0, 56),
					size: vec2(35, 34),
				},
				walk: {
					pos: vec2(0, 90),
					size: vec2(34, 34),
				},
				bullet: {
					pos: vec2(8, 5),
					size: vec2(12),
				},
			},
		},
		{
			name: 'security',
			path: 'assets/characters/security-system.png',
			tiles: {
				idle: {
					pos: vec2(0),
					size: vec2(84, 106),
				},
				walk: {
					pos: vec2(0),
					size: vec2(84, 106),
				},
				bullet: {
					pos: vec2(70, 104),
					size: vec2(16, 12),
				},
			},
		},
		{
			name: 'backgrounds',
			path: 'assets/stages/backgrounds.png',
			tiles: {
				backstreets: {
					pos: vec2(0, 336),
					size: vec2(254, 240),
				},
				greenhouse: {
					pos: vec2(263, 336),
					size: vec2(256, 240),
				},
				scrapyard: {
					pos: vec2(526, 336),
					size: vec2(254, 240),
				},
				night: {
					pos: vec2(788, 336),
					size: vec2(254, 240),
				},
				electric: {
					pos: vec2(1050, 336),
					size: vec2(254, 240),
				},
				mossy: {
					pos: vec2(1313, 336),
					size: vec2(254, 240),
				},
				dawn: {
					pos: vec2(1578, 336),
					size: vec2(254, 240),
				},
			},
		},
		{
			name: 'foregrounds',
			path: 'assets/stages/foregrounds.png',
			tiles: {
				backstreets: {
					pos: vec2(0, 4),
					size: vec2(254, 47),
				},
				greenhouse: {
					pos: vec2(264, 4),
					size: vec2(255, 47),
				},
				scrapyard: {
					pos: vec2(527, 4),
					size: vec2(255, 47),
				},
				night: {
					pos: vec2(791, 4),
					size: vec2(255, 47),
				},
				electric: {
					pos: vec2(1050, 4),
					size: vec2(255, 47),
				},
				mossy: {
					pos: vec2(1313, 4),
					size: vec2(255, 47),
				},
				dawn: {
					pos: vec2(1578, 4),
					size: vec2(255, 47),
				},
			},
		},
		{
			name: 'art',
			path: 'assets/fungal-escape-titleart.png',
			tiles: {
				characters: {
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
	render();
	{
		drawRect(center, vec2(1000), BLACK);
	}
}
