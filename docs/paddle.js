class Paddle {
    constructor() {
        this.w = 100;
        this.h = 12;

        this.x = (width - this.w) / 2;
        this.y = height - 30;
        this.isBallAttached = true;
    }

    update() {
        this.x = mouseX - this.w / 2;
        this.x = constrain(this.x, 15, 425 - this.w);
    }

    launchBall() {
        if (this.isBallAttached) {
            this.isBallAttached = false;
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