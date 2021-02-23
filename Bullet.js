"use strict";

class Bullet extends Character {
	constructor(x, y, vx, vy) {
		super(6, x, y, vx, vy);
		this.r = 4;
	}

	update() {
		super.update();

		for (let i = 0; i < enemy.length; i++) {
			if (!enemy[i].kill) {
				if (
					checkHit(this.x, this.y, this.r, enemy[i].x, enemy[i].y, enemy[i].r)
				) {
					enemy[i].kill = true;
					this.kill = true;

					//爆発エフェクト
					moreExplosion(
						enemy[i].x,
						enemy[i].y,
						enemy[i].vx >> 3,
						enemy[i].vy >> 3
					);

					break;
				}
			}
		}
	}

	draw() {
		super.draw();
	}
}
