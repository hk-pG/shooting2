'use strict';

//ランダムな値を返す
const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//スプライトを描画する
const drawSprite = (snum, x, y) => {
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;

    let px = (x >> 8) - sw / 2;
    let py = (y >> 8) - sh / 2;
    if (px + sw / 2 < camera_x || px - sw >= camera_x + screen_w 
        || py + sh / 2 < camera_y || py - sh >= camera_y + screen_h) return;

    vctx.drawImage(spriteImage, sx, sy, sw, sh,
        px, py, sw, sh);
}