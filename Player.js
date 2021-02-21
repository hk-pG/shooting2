'use strict';

class Player {
    constructor() {
        this.x = (field_w / 2) << 8;
        this.y = (field_h / 2) << 8;
        this.speed = 1024;//256で１フレームに１ピクセル動く
        this.anime = 0;
        this.reload = 0;
        this.magazine = 0;
    }

    //自機の移動
    update() {

        if (key[32] && this.reload == 0) {
            bullet.push(new Bullet(this.x, this.y, 0, -2000));

            //二発動時発射
            // bullet.push(new Bullet(this.x - (4 << 8), this.y, 0, -2000));

            //真横に発射
            // bullet.push(new Bullet(this.x, this.y, 2000, 0));
            // bullet.push(new Bullet(this.x, this.y, -2000, 0));
            this.reload = 5;//60で約１秒間に一回発射できる
            this.magazine ++;
            if (this.magazine >= 4) {
                this.reload = 20;
                this.magazine = 0;
            }
        }

        if (this.reload > 0) {
            this.reload --;
        }

        if (key[37]) {

            this.x -= this.speed;
            if (this.anime > -8) {
                this.anime --;
            }

        }else if (key[39]) {

            this.x += this.speed;

            if (this.anime < 8) {
                this.anime ++;
            }

        } else {
            if (this.anime > 0) {
                this.anime --;
            }

            if (this.anime < 0) {
                this.anime ++;
            }

            if (key[38]) {
                this.y -= this.speed;
            }

            if (key[40]) {
                this.y += this.speed;
            }
        }    
        //範囲チェック
        if (this.x <= 1) {
            this.x = 20;
        }

        if (this.x >= (field_w << 8)) {
            this.x = (field_w << 8) - 1;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y >= (field_h << 8) - 1) {
            this.y = (field_h << 8) - 1;
        }
    }

    //描画
    draw() {
        drawSprite(2 + (this.anime >> 2), this.x, this.y);
        //(this.anime >> 2)は this.anime / 4 と同じだが、小数点が出ない
    }
}