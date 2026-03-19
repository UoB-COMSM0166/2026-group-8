class Paddle {
    constructor(x, y, w, h, ctrl) {
        this.DEFAULT_W = w ?? 100;
        this.WIDE_W = 200;
        this.w = this.DEFAULT_W;
        this.h = h ?? 15;
        this.x = x ?? (width - this.w) / 2;
        this.y = y ?? 600;
        this.ctrl  = ctrl ?? 'mouse';
        this.speed = 6;
        this.reversed = false;
        this.isBallAttached = true;
    

//Timer 
        this._widerTimer = 0;
        this._reverseTimer = 0;
}
    
update(keys = {}) {
        if (this.ctrl === 'mouse') {
            let tx = this.reversed
                ? (width - mouseX) - this.w / 2
                : mouseX - this.w / 2;
            this.x = constrain(tx, 35, 465 - this.w);
 
        } else if (this.ctrl === 'kbd_p1') {
            if (keys['KeyA']) this.x -= this.speed;
            if (keys['KeyD']) this.x += this.speed;
            this.x = constrain(this.x, 0, width - this.w);
 
        } else if (this.ctrl === 'kbd_p2') {
            if (keys['ArrowLeft'])  this.x -= this.speed;
            if (keys['ArrowRight']) this.x += this.speed;
            this.x = constrain(this.x, 0, width - this.w);
        }
    
    //Wide timer
    if (this._widerTimer > 0){
        this._widerTimer--;
        if(this._widerTimer <= 0) this.deactivateWide();
    }

    //Reserve timer
    if (this._reverseTimer > 0){
        this._reverseTimer--;
        if (this._reverseTimer <= 0) this.reversed = false;
    }
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

// DARK mode WIDE powerup
    activateWide() {
        this.w = this.WIDE_W;
    }
 
    deactivateWide() {
        this.w = this.DEFAULT_W;
    }

//checks whether any falling drop overlaps the paddle
    checkCatch (bricksObj){
        for (let i = bricksObj.drops.length -1; i >= 0; i --) {
            let d = bricksObj.drops[i];

            if(
                d.x - d.w /2 < this.x + this.w &&
                d.x + d.w /2 > this.x &&
                d.y - d.h /2 < this.y + this.h &&
                d.y + d.h /2 > this.y
            ){
                if (d.type === 'buff'){
                    this.activateWide();
                    this._widerTimer = 360;
                    
                }else if (d.type === 'debuff'){
                    
                    //only classic have reverse
                    if (typeof gamePage !== 'undefined' && gamePage.mode === 'CLASSIC') {
                        this.reversed = true;
                        this._reverseTimer =360;
                    }
                }
                bricksObj.drops.splice(i, 1);
            }
        }
    }

 //reset paddle width and position to the initial values.
    reset(){
        this.w = this.DEFAULT_W;
        this.x = (width - this.w) / 2;
        this.reversed = false;
        this._widerTimer = 0;
        this._reverseTimer = 0;
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

//One player
display() {
        push();
        fill('#4A90D9');
        noStroke();
        rect(this.x, this.y, this.w, this.h, 6);
        fill(255, 255, 255, 80);
        rect(this.x + 4, this.y + 2, this.w - 8, 4, 3);
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
}
