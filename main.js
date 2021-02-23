//デバッグ用のフラグ
const info = true;

//スムージング
const SMOOOTHING = false;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();
//画面サイズ
const screen_w = 320;
const screen_h = 450;

//キャンバスのサイズ
const canvas_w = screen_w * 2;
const canvas_h = screen_h * 2;

//フィールドのサイズ
const field_w = screen_w + 120;
const field_h = screen_h + 120;

//キャンバス
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas_w;
canvas.height = canvas_h;

//画像の引き伸ばし（ぼやけ）を回避
ctx.mozimageSmoothingEnabled = SMOOOTHING;
ctx.webkitSmoothingEnabled = SMOOOTHING;
ctx.msimageSmoothingEnabled = SMOOOTHING;
ctx.msimageSmoothingEnabled = SMOOOTHING;

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

//星の実体
let star = [];

//キーボードの状態
let key = [];

//銃弾
let bullet = [];

//敵キャラ
let enemy = [];

//敵の攻撃
let enemyShot = [];

//自機の情報
let player = new Player();

//爆発の情報
let explosion = [];

//ゲームスピード
const gameSpeed = 1000 / 60;

//ゲームオーバーフラグ
let gameOver = false;

//スコア
let score = 0;

//ゲームの初期化
const gameInit = () => {
	//Starクラスのインスタンスを作成
	for (let i = 0; i < star_max; i++) {
		star[i] = new Star();
		star[i].draw();
	}

	//ゲームループ
	const gameLoop = () => {
		if (rand(0, 30) === 1) {
			enemy.push(
				new Enemy(rand(0, 1), rand(0, field_w) << 8, 0, 0, rand(300, 1200))
			);
		}
		updateAll();
		drawAll();
		debugging();
	};

	setInterval(gameLoop, gameSpeed);
};

//オンロード時にゲームを開始
window.onload = function () {
	gameInit();
};
