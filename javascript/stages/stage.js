// all stages have scrolling background farBackgroundObj
class Stage extends EngineObject {
	constructor(backgroundName, blockName) {
		super(vec2(0), vec2(1), undefined, 0, undefined, -1);

		this.name = backgroundName;
		console.log('loading stage ' + this.name);

		let farBackground = Textures().tile('backgrounds', backgroundName);
		let farBackgroundObj = [];

		let nearBackground = Textures().tile('backgrounds', backgroundName + '2');
		let nearBackgroundObj = [];

		let blockSize = vec2(255, 36);
		let groundObj = [];

		for (let i = 0; i <= 3; i++) {
			groundObj.push(
				new EngineObject(
					vec2(blockSize.x * i, 0),
					blockSize,
					Textures().tile('foregrounds', blockName),
					0,
					rgb(1, 1, 1),
					0,
				),
			);
		}

		for (let i = 0; i < 4; i++) {
			farBackgroundObj.push(
				new EngineObject(
					vec2(width * i, height * 0.6),
					vec2(width + 2, height),
					farBackground,
					0,
					rgb(1, 1, 1),
					-1,
				),
			);
			nearBackgroundObj.push(
				new EngineObject(
					vec2(width * i, height * 0.6),
					vec2(width + 2, height),
					nearBackground,
					0,
					rgb(1, 1, 1),
					-randInt(1, 3), // sometimes hide the nearBackgroundObj behind the farBackgroundObj
				),
			);
		}

		this.background = [farBackgroundObj, nearBackgroundObj, groundObj];

		FPO.map({
			arr: FPO.flatten({ v: this.background }),
			fn: ({ v }) => {
				v.mass = 0;
				v.setCollision(false, false);
				v.gravityScale = 0;
			},
		});
	}
	start() {
		console.log('starting stage ' + this.name);

		// far background
		for (let obj of this.background[0])
			obj.velocity = vec2(settings.backgroundScroll * 0.01, 0);

		// near background
		for (let obj of this.background[1])
			obj.velocity = vec2(settings.backgroundScroll * 0.01 * 1.5, 0);

		// ground
		for (let obj of this.background[2])
			obj.velocity = vec2(settings.backgroundScroll * 0.01 * 2, 0);

		this.rivalAttackTimer = new Timer(2);
	}
	stop() {
		FPO.map({
			arr: FPO.flatten({ v: this.background }),
			fn: ({ v }) => v.destroy(),
		});
		this.player.healthbar.style.display = 'none';
		this.player.destroy();
		this.rival.destroy();
		this.destroy();
	}
	update() {
		// wrap the background object around to the other side if it went off the screen
		FPO.map({
			arr: FPO.flatten({ v: this.background }),
			fn: ({ v }) => {
				if (v.pos.x < 0 - v.size.x * 2) {
					v.pos.x = width + v.size.x;
				}
			},
		});

		super.update();
	}
	render() {
		drawRect(center, vec2(10000), GRAY);
	}
}

function loadStage(name) {
	switch (name) {
		case 'backstreets':
			return new Backstreets();
		case 'scrapyard':
			return new Scrapyard();
		case 'greenhouse':
			return new Greenhouse();
		case 'nightcity':
			return new NightCity();
		case 'electricplant':
			return new ElectricPlant();
		case 'mossyshrine':
			return new MossyShrine();
		case 'dawnforest':
			return new DawnForest();
	}
}
