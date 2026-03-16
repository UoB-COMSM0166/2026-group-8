class Paddle {
    constructor() {
        this.DEFAULT_W = 100;
        this.w = this.DEFAULT_W;
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
        const maxAngle = radians(60);
        const angle = hitOffset * maxAngle;

        return {
            vx: sin(angle),
            vy: -cos(angle),
        };
    }

//checks whether any falling drop overlaps the paddle
    checkCatch (bricks0bj){
        for (let i = bricks0bj.drops.length -1; i > = 0; i --) {
            let d = bricks0bj.drops[1];

            if(
                d.x - d.w /2 < this.x + this.w &&
                d.x + d.w /2 > this.x &&
                d.y - d.h /2 < this.y + this.h &&
                d.y + d.h /2 > this.y
            ){
                if (d.type === 'buff'){
                    this.w += 20;
                }else if (d.type === 'debuff'){
                    this.w = max (40, this.w -20);
                }
                bricks0bj.drops.splice(i, 1);
            }
        }
    }

 //reset paddle width and position to the initial values.
    reset(){
        this.w = this.DEFAULT_W;
        this.x = (width - this.w) / 2;
        this.isBallAttached = true;
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


