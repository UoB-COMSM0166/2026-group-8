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

    update() {
        if (this.ctrl === 'mouse') {
            let tx = this.reversed
                ? (width - mouseX) - this.w / 2
                : mouseX - this.w / 2;
            this.x = constrain(tx, 35, 465 - this.w);

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


    display() {
        push();
        fill('#4A90D9');
        noStroke();
        rect(this.x, this.y, this.w, this.h, 6);
        fill(255, 255, 255, 80);
        rect(this.x + 4, this.y + 2, this.w - 8, 4, 3);
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
