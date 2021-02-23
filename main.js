//デバッグ用のフラグ
const debug = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();
//画面サイズ
const screen_w = 180;
const screen_h = 320;

//キャンバスのサイズ
const canvas_w = screen_w * 2;
const canvas_h = screen_h * 2;

//フィールドのサイズ
const field_w = screen_w * 2;
const field_h = screen_h * 2;

//キャンバス
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas_w;
canvas.height = canvas_h;

//フィールド（仮想画面）
const vcanvas = document.createElement("canvas");
const vctx = vcanvas.getContext("2d");
vcanvas.width = canvas_w;
vcanvas.height = canvas_h;

//カメラの座標
let camera_x = 0;
let camera_y = 0;

//星の数
const star_max = 300;

//ファイルの読み込み
let spriteImage = new Image();
spriteImage.src = "sprites/sprite.png";

//スプライト
let sprite = [
	new Sprite(0, 0, 22, 42), //0　自機　左２
	new Sprite(23, 0, 33, 42), //1　自機　左１
	new Sprite(57, 0, 43, 42), //2　自機　正面
	new Sprite(101, 0, 33, 42), //3　自機　右１
	new Sprite(135, 0, 21, 42), //4　自機　右２
	new Sprite(0, 50, 3, 7), //5　銃弾　１
	new Sprite(4, 50, 5, 5), //6　銃弾　２

	new Sprite(3, 42, 16, 5), // 7,噴射 左2
	new Sprite(29, 42, 21, 5), // 8,噴射 左1
	new Sprite(69, 42, 19, 5), // 9,噴射 正面
	new Sprite(108, 42, 21, 5), //10,噴射 右1
	new Sprite(138, 42, 16, 5), //11,噴射 右2

	new Sprite(11, 50, 7, 7), //12,敵弾1-1
	new Sprite(19, 50, 7, 7), //13,敵弾1-2
	new Sprite(32, 49, 8, 8), //14,敵弾2-1
	new Sprite(42, 47, 12, 12), //15,敵弾2-2

	new Sprite(5, 351, 9, 9), //16  ,爆発1
	new Sprite(21, 346, 20, 20), //17  ,爆発2
	new Sprite(46, 343, 29, 27), //18  ,爆発3
	new Sprite(80, 343, 33, 30), //19  ,爆発4
	new Sprite(117, 340, 36, 33), //20  ,爆発5
	new Sprite(153, 340, 37, 33), //21  ,爆発6
	new Sprite(191, 341, 25, 31), //22  ,爆発7
	new Sprite(216, 349, 19, 16), //23  ,爆発8
	new Sprite(241, 350, 15, 14), //24  ,爆発9
	new Sprite(259, 350, 14, 13), //25  ,爆発10
	new Sprite(276, 351, 13, 12), //26  ,爆発11

	new Sprite(6, 373, 9, 9), //27  ,ヒット1
	new Sprite(19, 371, 16, 15), //28  ,ヒット2
	new Sprite(38, 373, 11, 12), //29  ,ヒット3
	new Sprite(54, 372, 17, 17), //30  ,ヒット4
	new Sprite(75, 374, 13, 14), //31  ,ヒット5

	new Sprite(4, 62, 24, 27), //32  ,黄色1
	new Sprite(36, 62, 24, 27), //33  ,黄色2
	new Sprite(68, 62, 24, 27), //34  ,黄色3
	new Sprite(100, 62, 24, 27), //35  ,黄色4
	new Sprite(133, 62, 24, 27), //36  ,黄色5
	new Sprite(161, 62, 30, 27), //37  ,黄色6

	new Sprite(4, 95, 24, 26), //38  ,ピンク1
	new Sprite(36, 95, 24, 26), //39  ,ピンク2
	new Sprite(68, 95, 24, 26), //40  ,ピンク3
	new Sprite(100, 95, 24, 26), //41  ,ピンク4
	new Sprite(133, 92, 24, 29), //42  ,ピンク5
	new Sprite(161, 95, 30, 26), //43  ,ピンク6

	new Sprite(4, 125, 24, 29), //44  ,青グラサン1
	new Sprite(36, 125, 24, 29), //45  ,青グラサン2
	new Sprite(68, 125, 24, 29), //46  ,青グラサン3
	new Sprite(100, 125, 24, 29), //47  ,青グラサン4
	new Sprite(133, 124, 24, 30), //48  ,青グラサン5
	new Sprite(161, 125, 30, 29), //49  ,青グラサン6

	new Sprite(4, 160, 25, 27), //50  ,ロボ1
	new Sprite(34, 160, 26, 27), //51  ,ロボ2
	new Sprite(66, 160, 26, 27), //52  ,ロボ3
	new Sprite(98, 160, 26, 27), //53  ,ロボ4
	new Sprite(132, 160, 26, 27), //54  ,ロボ5
	new Sprite(161, 158, 30, 29), //55  ,ロボ6

	new Sprite(4, 194, 24, 28), //56  ,にわとり1
	new Sprite(36, 194, 24, 28), //57  ,にわとり2
	new Sprite(68, 194, 24, 28), //58  ,にわとり3
	new Sprite(100, 194, 24, 28), //59  ,にわとり4
	new Sprite(133, 194, 24, 30), //60  ,にわとり5
	new Sprite(161, 194, 30, 28), //61  ,にわとり6

	new Sprite(4, 230, 22, 26), //62  ,たまご1
	new Sprite(41, 230, 22, 26), //63  ,たまご2
	new Sprite(73, 230, 22, 26), //64  ,たまご3
	new Sprite(105, 230, 22, 26), //65  ,たまご4
	new Sprite(137, 230, 22, 26), //66  ,たまご5

	new Sprite(6, 261, 24, 28), //67  ,殻帽ヒヨコ1
	new Sprite(38, 261, 24, 28), //68  ,殻帽ヒヨコ2
	new Sprite(70, 261, 24, 28), //69  ,殻帽ヒヨコ3
	new Sprite(102, 261, 24, 28), //70  ,殻帽ヒヨコ4
	new Sprite(135, 261, 24, 28), //71  ,殻帽ヒヨコ5

	new Sprite(206, 58, 69, 73), //72  ,黄色(中)
	new Sprite(204, 134, 69, 73), //73  ,ピンク(中)
	new Sprite(205, 212, 69, 78), //74  ,青グラサン(中)

	new Sprite(337, 0, 139, 147), //75  ,黄色(大)
	new Sprite(336, 151, 139, 147), //76  ,ピンク(大)
	new Sprite(336, 301, 139, 155), //77  ,青グラサン()
];

//星の実体
let star = [];

//キーボードの状態
let key = [];

//銃弾
let bullet = [];

//敵キャラ
let enemy = [new Enemy(39, 200 << 8, 200 << 8, 0, 0)];

//キーボードが押された時
document.onkeydown = (e) => {
	key[e.keyCode] = true;
	if (e.keyCode != 17 && e.keyCode != 82) {
		e.preventDefault();
	}
};

//キーボードが離された時
document.onkeyup = (e) => {
	key[e.keyCode] = false;
};

//自機の情報
let player = new Player();

//ゲームスピード
const gameSpeed = 1000 / 60;

//ゲームの初期化
const gameInit = () => {
	//Starクラスのインスタンスを作成
	for (let i = 0; i < star_max; i++) {
		star[i] = new Star();
		star[i].draw();
	}

	//ゲームループ
	const gameLoop = () => {
		//******************************** 移動の処理 ********************************
		for (let i = 0; i < star_max; i++) {
			star[i].update();
		}

		for (let i = bullet.length - 1; i >= 0; i--) {
			bullet[i].update();
			if (bullet[i].kill) {
				bullet.splice(i, 1);
			}
		}

		for (let i = enemy.length - 1; i >= 0; i--) {
			enemy[i].update();
			if (enemy[i].kill) {
				enemy.splice(i, 1);
			}
		}

		//自機の移動
		player.update();

		//******************************** 描画の処理 ********************************

		//呼び出す度にフィールドを黒く塗りつぶす = フィールドをクリアする
		vctx.fillStyle = "black";
		vctx.fillRect(camera_x, camera_y, field_w, field_h);

		for (let i = 0; i < star_max; i++) {
			star[i].draw();
		}

		for (let i = 0; i < bullet.length; i++) {
			bullet[i].draw();
		}

		for (let i = 0; i < enemy.length; i++) {
			enemy[i].draw();
		}

		//自機の描画
		player.draw();

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

		//********************************デバッグ情報 ********************************
		if (debug) {
			drawCount++;
			if (lastTime + 1000 <= Date.now()) {
				fps = drawCount;
				drawCount = 0;
				lastTime = Date.now();
			}

			ctx.font = "15px Impact";
			ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
			ctx.fillText(`fps : ${fps}`, 10, screen_h - 25);
			ctx.fillText(`bullets : ${bullet.length}`, 10, screen_h - 10);
			ctx.fillText(`enemys : ${enemy.length}`, 10, screen_h - 40);
		}
	};
	setInterval(gameLoop, gameSpeed);
};

//オンロード時にゲームを開始
window.onload = function () {
	gameInit();
};
