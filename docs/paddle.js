class Paddle {
    constructor() {
        this.w = 100;
        this.h = 15;
        this.x = (width - this.w) / 2;
        this.y = 600;
        this.isBallAttached = true;
    }


    update() {
        this.x = mouseX - this.w / 2;
        this.x = constrain(this.x, 35, 465 - this.w);
    }


    launchBall(ball) {
        if (this.isBallAttached) {
            this.isBallAttached = false;
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
}


