// all stages have scrolling background images
class Stage extends EngineObject {
	constructor(backgroundName, blockName) {
		super(vec2(0), vec2(1), undefined, 0, undefined, -1);

		let bgTexture = Textures().tile('backgrounds', backgroundName);
		let blockSize = vec2(255, 36);
		let blocks = [];
		for (let i = 0; i <= 3; i++) {
			blocks.push(
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

		let images = [];
		for (let i = 0; i < 4; i++) {
			images.push(
				new EngineObject(
					vec2(width * i + 1, height * 0.6),
					vec2(width, height),
					bgTexture,
					0,
					rgb(1, 1, 1),
					-1,
				),
			);
		}

		this.background = [images, blocks];

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
		// far background
		for (let obj of this.background[0])
			obj.velocity = vec2(settings.backgroundScroll * 0.01, 0);

		// close background
		for (let obj of this.background[1])
			obj.velocity = vec2(settings.backgroundScroll * 0.01 * 2, 0);

		this.rivalAttackTimer = new Timer(2);
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
	// TODO search the engineObject list and unload any already loaded stage
	switch (name) {
		case 'toxic':
			return new Toxic();
			break;
		case 'greenhouse':
			return new Greenhouse();
			break;
		case 3:
			return new Stage3();
			break;
		case 4:
			return new Stage4();
			break;
		case 5:
			return new Stage5();
			break;
		case 6:
			return new Stage6();
			break;
	}
}
