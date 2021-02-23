"use strict";

class Bullet extends Character {
	constructor(x, y, vx, vy) {
		super(5, x, y, vx, vy);
	}

	update() {
		super.update();
	}

	draw() {
		super.draw();
	}

	allow() {
		console.log(`x : ${this.x}, y : ${this.y}`);
	}
}
