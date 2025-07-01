class IceStage extends EngineObject {
	constructor() {
		let bgTexture = Textures().tile('absolute_man', 'background');
		super(vec2(0), vec2(1));
		let blockSize = vec2(16, 8); // TODO use blockSize = vec2(16) instead of vec2(16, 8)
		// TODO create these background images with a loop
		let b1 = new EngineObject(
			vec2(0, height / 2 + blockSize.y * 1.5),
			vec2(width, height),
			bgTexture,
			0,
			rgb(1, 1, 1),
			-1,
		);
		let b2 = new EngineObject(
			vec2(width, height / 2 + blockSize.y * 1.5),
			vec2(width, height),
			bgTexture,
			0,
			rgb(1, 1, 1),
			-1,
		);
		let b3 = new EngineObject(
			vec2(width * 2, height / 2 + blockSize.y * 1.5),
			vec2(width, height),
			bgTexture,
			0,
			rgb(1, 1, 1),
			-1,
		);
		let b4 = new EngineObject(
			vec2(width * 3, height / 2 + blockSize.y * 1.5),
			vec2(width, height),
			bgTexture,
			0,
			rgb(1, 1, 1),
			-1,
		);
		let blocks = [];
		for (let i = 0; i <= 32; i++) {
			blocks.push(
				new EngineObject(
					vec2(blockSize.x * i - blockSize.x / 2, blockSize.y),
					blockSize,
					Textures().tile('absolute_man', 'snow'),
					0,
					rgb(1, 1, 1),
					-1,
				),
				new EngineObject(
					vec2(blockSize.x * i - blockSize.x / 2, -blockSize.y / 2),
					vec2(16, 16),
					Textures().tile('absolute_man', 'block'),
					0,
					rgb(1, 1, 1),
					-1,
				),
			);
		}
		let images = [b1, b2, b3, b4];
		this.background = [images, blocks];

		this.setup();
		this.mass = 0;
		this.setCollision(false, false);
	}
	startScroll() {
		// far background
		for (let obj of this.background[0])
			obj.velocity = vec2(settings.backgroundScroll * 0.01, 0);

		// close background
		for (let obj of this.background[1])
			obj.velocity = vec2(settings.backgroundScroll * 0.01 * 2, 0);
	}
	update() {
		// wrap the background object around to the other side if it went off the screen
		FPO.map({
			arr: FPO.flatten({ v: this.background }),
			fn: ({ v }) => {
				if (v.pos.x < 0 - v.size.x * 2) {
					v.pos.x = width * 2;
				}
			},
		});
		super.update();
	}
	setup() {
		FPO.map({
			arr: FPO.flatten({ v: this.background }),
			fn: ({ v }) => {
				v.mass = 0;
				v.setCollision(false, false);
				v.gravityScale = 0;
			},
		});
	}
}
