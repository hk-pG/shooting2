"use strict";

class EnemyShot extends Character {
	constructor(snum, x, y, vx, vy) {
		super(snum, x, y, vx, vy);
		this.r = 4;
	}
	update() {
		super.update();
		if (
			!player.stun &&
			checkHit(this.x, this.y, this.r, player.x, player.y, player.r)
		) {
			isAttacked(this);
		}

		this.snum = 14 + ((this.count >> 3) & 1);
	}
}
