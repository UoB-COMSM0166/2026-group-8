class Duel extends BaseScene {
    constructor() {
        super();
        this.mode = 'DUEL';
        this.ball = new Ball(250, 315, 5);

        this.paddle1 = new Paddle(undefined, undefined, undefined, undefined, 'kbd_p1'); // Player 1
        this.paddle1.y = 200;
        this.paddle1.isBallAttached = false;

        this.paddle2 = new Paddle(undefined, undefined, undefined, undefined, 'kbd_p2'); // Player 2 (with ball)
        this.paddle2.y = 430;
        this.paddle2.isBallAttached = true;
        this.ball.reset(this.paddle2);

        this.bricks1 = new Bricks(); // Bricks for Player 1
        this.bricks2 = new Bricks(); // Bricks for Player 2

        this.manage = new GameManage();
    }

    display() {
        //change:enabled update() and uncommented bricks.display() for both players to let bricks be generated
        
        this.bricks1.update(); 
        this.bricks2.update();
        this.drawInitPage();
        this.drawDuelLayout();
        this.bricks1.display(); 
        this.bricks2.display();

if (this.manage.state === 'PLAYING') {
            // keyboard state
            let keys = {
                'KeyA':       keyIsDown(65),
                'KeyD':       keyIsDown(68),
                'ArrowLeft':  keyIsDown(LEFT_ARROW),
                'ArrowRight': keyIsDown(RIGHT_ARROW)
            };
 
            this.paddle1.update(keys);
            this.paddle2.update(keys);
    
            if (this.paddle2.isBallAttached) {
                this.ball.pos.x = this.paddle2.x + this.paddle2.w / 2;
                this.ball.pos.y = this.paddle2.y - this.ball.r;
            } else {
        
       this.ball.pos.add(this.ball.vel);
            this.ball.checkWallCollision();
 
            
            this.ball.checkBrickCollisionDuel(this.bricks1.items);
            this.ball.checkBrickCollisionDuel(this.bricks2.items);
 
        
            this.checkPaddleCollisionP1();
            this.ball.checkPaddleCollision(this.paddle2);
 

            if (this.ball.pos.y < 25 || this.ball.pos.y > 625) {
                this.ball.reset(this.paddle2);
                }
            }
        }

    this.paddle1.displayP1();
        this.paddle2.displayP2();
        this.ball.display();
 
        if (this.manage.state === 'INSTRUCTION') {
            this.drawInstructionScreen();
        } else if (this.manage.state === 'PAUSED') {
            this.drawPauseScreen();
        // MODIFIED: 新增 GAMEOVER 和 WON 状态处理，原来没有
        } else if (this.manage.state === 'GAMEOVER') {
            this.drawGameOverScreen();
        } else if (this.manage.state === 'WON') {
            this.drawWinScreen();
        }
    }

checkBrickCollisionDuel(bricks) {
        for (let brick of bricks) {
            if (!brick.active) continue;
 
            let closestX = constrain(this.ball.pos.x, brick.x, brick.x + brick.w);
            let closestY = constrain(this.ball.pos.y, brick.y, brick.y + brick.h);
            let dx = this.ball.pos.x - closestX;
            let dy = this.ball.pos.y - closestY;
 
            if (dx * dx + dy * dy < this.ball.r * this.ball.r) {
                brick.active = false;
                if (abs(dx) > abs(dy)) {
                    this.ball.reflect(createVector(dx > 0 ? 1 : -1, 0));
                } else {
                    this.ball.reflect(createVector(0, dy > 0 ? 1 : -1));
                }
                break;
            }
        }
    }

 checkPaddleCollisionP1() {
        let paddle = this.paddle1;
        let ball = this.ball;
        if (
            ball.pos.x > paddle.x &&
            ball.pos.x < paddle.x + paddle.w &&
            ball.pos.y - ball.r < paddle.y + paddle.h &&
            ball.pos.y + ball.r > paddle.y &&
            ball.vel.y < 0
        ) {
            let hitPos = (ball.pos.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
            let maxAngle = radians(60);
            let angle = hitPos * maxAngle;
            let speed = ball.vel.mag();
            ball.vel.x =  speed * sin(angle);
            ball.vel.y =  speed * cos(angle); 
        }
    }

    
    drawDuelLayout() {
        // player 1 control instruction
        fill(255, 0, 0, 50);
        rect(25, 25, 450, 30);
        fill(0);
        textSize(12);
        text("P1: Use 'A'/'D' to move, Click 'W' to set King", 250, 40);

        // player 1 bricks, paddle area
        noFill();
        rect(25, 55, 450, 250);

        // player 2 bricks, paddle area
        rect(25, 345, 450, 250);

        // player 2 control instruction
        noStroke();
        fill(255, 0, 0, 50);
        rect(25, 595, 450, 30);

        fill(0);
        text("P2: Use ←/→ to move paddle, Click ↑ to set King", 250, 610);
    }

    getRules() {
        return [
            "• P1: Keyboard (Left/Right Keys) / P2: Keyboard (A/D Keys)",
            "• Break your opponent's KING to win!",
            "• Press 'P' to pause / resume"
        ];
    }
}
