"use strict";

class Enemy extends Character {
	constructor(eNum, x, y, vx, vy) {
		super(15, x, y, vx, vy);
		this.flag = false;
		this.r = 5;
		this.eNum = eNum;
	}

	update() {
		super.update();

		//個別のアップデート
		enemyFunctions[this.eNum](this);

		//当たり判定
		if (
			!player.stun &&
			checkHit(this.x, this.y, this.r, player.x, player.y, player.r)
		) {
			isAttacked(this);
		}
	}
}

const enemyBullet = (object, speed) => {
	let angle, vx, vy;

	//敵キャラからプレイヤーへの角度
	angle = Math.atan2(player.y - object.y, player.x - object.x);

	angle += (rand(-10, 10) * Math.PI) / 180;

	vx = Math.cos(angle) * speed;
	vy = Math.sin(angle) * speed;

	enemyShot.push(new EnemyShot(15, object.x, object.y, vx, vy));
};

//ピンクのヒヨコの行動パターン
const enemyMovePink = (object) => {
	if (!object.flag) {
		if (player.x > object.x && object.vx < 120) {
			object.vx += 4;
		} else if (object.vx > -120) {
			object.vx -= 4;
		}
	} else {
		if (player.x < object.x && object.vx < 400) {
			object.vy -= 30;
		} else if (object.vx > -400) {
			object.vx -= 30;
		}
	}

	if (Math.abs(player.y - object.y) < 100 << 8 && !object.flag) {
		object.flag = true;
		enemyBullet(object, 1000);
	}

	if (object.flag && object.vy > -500) {
		object.vy -= 30;
	}

	const ptn = [39, 40, 39, 41];
	object.snum = ptn[(object.count >> 3) & 3];
};

//黄色のヒヨコの行動パターン
const enemyMoveYellow = (object) => {
	if (!object.flag) {
		if (player.x > object.x && object.vx < 300) {
			object.vx += 30;
		} else if (object.vx > -600) {
			object.vx -= 30;
		}
	} else {
		if (player.x < object.x && object.vx < 300) {
			object.vy += 30;
		} else if (object.vx > -600) {
			object.vx += 50;
		}
	}

	if (!object.flag) {
		//連射率を操作
		if (rand(0, 4) == 1) {
			object.flag = true;
		}
		enemyBullet(object, 1000);
	}

	const ptn = [33, 34, 33, 35];
	object.snum = ptn[(object.count >> 3) & 3];
};

let enemyFunctions = [enemyMovePink, enemyMoveYellow, enemyMoveYellow];
