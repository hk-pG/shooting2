"use strict";

//キーボードが押された時
document.onkeydown = (e) => {
	key[e.keyCode] = true;
	if (gameOver && e.keyCode == 82) {
		document.location.reload();
	}
	if (e.keyCode != 17 && e.keyCode != 82) {
		e.preventDefault();
	}
};

//キーボードが離された時
document.onkeyup = (e) => {
	key[e.keyCode] = false;
};

//ランダムな値を返す
const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//スプライトを描画する
const drawSprite = (snum, x, y) => {
	let sx = sprite[snum].x;
	let sy = sprite[snum].y;
	let sw = sprite[snum].w;
	let sh = sprite[snum].h;

	let px = (x >> 8) - sw / 2;
	let py = (y >> 8) - sh / 2;
	if (
		px + sw < camera_x ||
		px >= camera_x + screen_w ||
		py + sh < camera_y ||
		py >= camera_y + screen_h
	)
		return;

	vctx.drawImage(spriteImage, sx, sy, sw, sh, px, py, sw, sh);
};

//オブジェクトをアップデート
const updateObject = (object) => {
	for (let i = object.length - 1; i >= 0; i--) {
		object[i].update();
		if (object[i].kill) {
			object.splice(i, 1);
		}
	}
};

//オブジェクトを描画
const drawObject = (object) => {
	for (let i = 0; i < object.length; i++) {
		object[i].draw();
	}
};

const checkHit = (px, py, pr, ex, ey, er) => {
	//円同士の当たり判定

	//底辺
	let a = (px - ex) >> 8;
	//高さ
	let b = (py - ey) >> 8;
	//半径足す半径
	let r = pr + er;

	if (r * r >= a * a + b * b) {
		return true;
	}

	/*
	矩形同士の当たり判定
	let pLeft = px >> 8;
	let pRight = pLeft + pw;
	let pTop = py >> 8;
	let pBottom = pTop + ph;

	let eLeft = ex >> 8;
	let eRight = eLeft + ew;
	let eTop = ey >> 8;
	let eBottom = eTop + eh;

	if (
		pLeft <= eRight &&
		pRight >= eLeft &&
		pTop <= eBottom &&
		pBottom >= eTop
	) {
		return true;
	} else {
		return false;
	}
	*/
};

//派手な爆発
const moreExplosion = (x, y, vx, vy) => {
	explosion.push(new Explosion(0, x, y, vx, vy));
	for (let i = 0; i < 10; i++) {
		let evx = vx + (rand(-10, 10) >> 8);
		let evy = vy + (rand(-10, 10) >> 8);
		explosion.push(new Explosion(i, x, y, evx, evy));
	}
};

const isAttacked = (object) => {
	player.hp -= 1;
	if (player.hp < 0) {
		gameOver = true;
	} else {
		object.kill = true;
		player.damage = 10;
		player.stun = 60;
	}
};

//******************************** 移動の処理 ********************************
const updateAll = () => {
	updateObject(star);
	updateObject(bullet);
	updateObject(enemyShot);
	updateObject(enemy);
	updateObject(explosion);

	//自機の移動
	player.update();
};

//******************************** 描画の処理 ********************************
const drawAll = () => {
	//呼び出す度にフィールドを黒く塗りつぶす = フィールドをクリアする
	vctx.fillStyle = player.damage ? "red" : "black";
	vctx.fillRect(camera_x, camera_y, field_w, field_h);

	drawObject(star);
	drawObject(bullet);
	drawObject(enemyShot);
	drawObject(enemy);
	drawObject(explosion);
	if (!gameOver) {
		player.draw();
	}

	//　自機の範囲  0 ~ field_w
	//カメラの範囲  0 ~ (field_w - screen_w)
	camera_x = ((player.x >> 8) / field_w) * (field_w - screen_w);
	camera_y = ((player.y >> 8) / field_h) * (field_h - screen_h);

	//仮想画面から実際の画面にコピー
	ctx.drawImage(
		vcanvas,
		camera_x,
		camera_y,
		screen_w,
		screen_h,
		0,
		0,
		screen_w,
		screen_h
	);
};

//当たり判定

//##############################	デバッグ情報	##############################
const debugging = () => {
	ctx.font = "15px Impact";
	ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
	if (gameOver) {
		ctx.font = "30px Verdana";
		let message = "GAME OVER";
		let x = canvas_w / 8;
		let y = canvas_h / 4;
		ctx.fillText(message, x, y);
	}

	if (info && !gameOver) {
		drawCount++;
		if (lastTime + 1000 <= Date.now()) {
			fps = drawCount;
			drawCount = 0;
			lastTime = Date.now();
		}

		ctx.fillText(`HP : ${player.hp}`, 10, screen_h - 20);
		ctx.fillText(`enemys : ${enemy.length}`, 10, screen_h - 40);
	}
};
// #############################################################################
