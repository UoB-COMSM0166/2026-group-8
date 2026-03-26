class Paddle {
    constructor(x, y = 600, w = 100, h = 15, ctrl = 'mouse') {
        this.DEFAULT_W = w;
        this.WIDE_W = 200;

        this.w = this.DEFAULT_W;
        this.h = h;
        this.x = (width - this.w) / 2;
        this.y = y;
        this.ctrl = ctrl;
        this.speed = 6;
        this.reversed = false;
        this.isBallAttached = true;

        // powerup Timer 
        this._widerTimer = 0;
        this._reverseTimer = 0;
    }

    update(keys = {}) {
        if (this.ctrl === 'mouse') {
            let tx = this.reversed
                ? (width - mouseX) - this.w / 2
                : mouseX - this.w / 2;
            this.x = constrain(tx, 40, 460 - this.w);
        } else if (this.ctrl === 'kbd_p1') {
            if (keys['KeyA']) this.x -= this.speed;
            if (keys['KeyD']) this.x += this.speed;
            this.x = constrain(this.x, 40, 460 - this.w);
        } else if (this.ctrl === 'kbd_p2') {
            if (keys['ArrowLeft']) this.x -= this.speed;
            if (keys['ArrowRight']) this.x += this.speed;
            this.x = constrain(this.x, 40, 460 - this.w);
        }

        //Wide timer
        if (this._widerTimer > 0) {
            this._widerTimer--;
            if (this._widerTimer <= 0) this.deactivateWide();
        }

        //Reserve timer
        if (this._reverseTimer > 0) {
            this._reverseTimer--;
            if (this._reverseTimer <= 0) this.reversed = false;
        }
    }

    launchBall(ball) {
        if (this.isBallAttached) {
            this.isBallAttached = false;
            ball.isAttached = false;
            ball.vel.set(4, -4);
        }
    }

    calculateBounce(ballX) {
        const hitOffset = (ballX - (this.x + this.w / 2)) / (this.w / 2);
        const maxAngle = radians(75);
        const angle = hitOffset * maxAngle;

        return {
            vx: sin(angle),
            vy: -cos(angle),
        };
    }

    // One Player
    display() {
        push();
        noStroke();
        let cornerR = 6;

        drawingContext.shadowBlur = 25;
        drawingContext.shadowColor = color(0, 255, 100);
        fill(0, 255, 100);
        rect(this.x, this.y, this.w, this.h, cornerR);

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(255);
        fill(255);
        rect(this.x, this.y, this.w, this.h, cornerR);

        drawingContext.shadowBlur = 0;
        fill(0, 100, 0);
        rect(this.x, this.y, this.w, this.h, cornerR);
        pop();
    }

    //Two player
    displayP1() {
        push();
        noStroke();
        fill(0, 200, 140);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    displayP2() {
        push();
        noStroke();
        fill(220, 60, 60);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    //reset paddle width and position to the initial values.
    reset(ball) {
        this.w = this.DEFAULT_W;
        this.x = (width - this.w) / 2;
        this.reversed = false;
        this.isBallAttached = true;
        if (ball) ball.isAttached = true;
    }

    // CLASSIC mode 'wide' powerup
    activateWide() {
        this.w = this.WIDE_W;
    }

    deactivateWide() {
        this.w = this.DEFAULT_W;
    }

    //checks whether any falling drop overlaps the paddle
    checkCatch(bricksObj) {
        for (let i = bricksObj.drops.length - 1; i >= 0; i--) {
            let d = bricksObj.drops[i];

            if (
                d.x - d.w / 2 < this.x + this.w &&
                d.x + d.w / 2 > this.x &&
                d.y - d.h / 2 < this.y + this.h &&
                d.y + d.h / 2 > this.y
            ) {
                if (d.effect === 'paddle_long') {
                    this.activateWide();
                    this._widerTimer = 360;
                    bricksObj.drops.splice(i, 1);
                } else if (d.effect === 'paddle_short') {
                    this.w = 50;
                    this._widerTimer = 360;
                    bricksObj.drops.splice(i, 1);
                } else if (d.effect === 'paddle_reverse') {
                    if (typeof gamePage !== 'undefined' && gamePage.mode === 'CLASSIC') {
                        this.reversed = true;
                        this._reverseTimer = 360;
                    }
                    bricksObj.drops.splice(i, 1);
                }
            }
        }
    }
}
