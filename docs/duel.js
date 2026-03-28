class Duel extends BaseScene {
    constructor() {
        super();
        this.mode = 'DUEL';
        this.ball = new Ball(250, 315, 5);

        this.paddle1 = new Paddle(0, 200, 100, 15, 'kbd_p1');
        this.paddle1.isBallAttached = false;

        this.paddle2 = new Paddle(0, 430, 100, 15, 'kbd_p2');
        this.paddle2.isBallAttached = true;

        this.ball.reset(this.paddle2);

        this.bricks1 = new Bricks();
        this.bricks2 = new Bricks();

        this.manage = new GameManage();
    }

    display() {
        this.bricks1.update();
        this.bricks2.update();

        this.drawInitPage();
        this.drawDuelLayout();

        this.bricks1.display();
        this.bricks2.display();

        if (this.manage.state === 'PLAYING') {
            if (this.bricks1.hasKing && this.bricks2.hasKing) {
                let keys = {
                    'KeyA': keyIsDown(65),
                    'KeyD': keyIsDown(68),
                    'ArrowLeft': keyIsDown(LEFT_ARROW),
                    'ArrowRight': keyIsDown(RIGHT_ARROW)
                };

                this.paddle1.update(keys);
                this.paddle2.update(keys);

                if (this.ball.isAttached) {
                    this.ball.pos.x = this.paddle2.x + this.paddle2.w / 2;
                    this.ball.pos.y = this.paddle2.y - this.ball.r;
                } else {
                    this.ball.pos.add(this.ball.vel);
                    if (this.ball.pos.x - this.ball.r < 35 || this.ball.pos.x + this.ball.r > 465) {
                        this.ball.vel.x *= -1;
                    }
                    if (this.ball.pos.y - this.ball.r < 35 || this.ball.pos.y + this.ball.r > 615) {
                        this.ball.vel.y *= -1;
                    }

                    this.ball.checkBrickCollisionDuel(this.bricks1.items);
                    this.ball.checkBrickCollisionDuel(this.bricks2.items);
                    this.ball.checkPaddleCollisionP1(this.paddle1);
                    this.ball.checkPaddleCollisionP2(this.paddle2);
                }
            } else {
                cursor(ARROW);
            }
        }

        this.paddle1.displayP1();
        this.paddle2.displayP2();
        this.ball.display();

        if (this.manage.state === 'INSTRUCTION') {
            this.drawInstructionScreen();
        } else if (this.manage.state === 'PAUSED') {
            this.drawPauseScreen();
        } else if (this.manage.state === 'GAMEOVER') {
            this.drawGameOverScreen();
        } else if (this.manage.state === 'WON') {
            this.drawWinScreen();
        }
    }

    drawDuelLayout() {
        noStroke();
        // player 1 control instruction
        fill(255, 0, 0, 50);
        rect(25, 25, 450, 30);
        fill(255);
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

        fill(255);
        text("P2: Use ←/→ to move paddle, Click ↑ to set King", 250, 610);
    }

    getRules() {
        return [
            "• P1: Keyboard (Left/Right Keys)",
            "• P2: Keyboard (A/D Keys)",
            "",
            "• Each player choose a brick to be 'KING'",
            "• Break your opponent's KING to win!",
            "",
            "• Press 'P' to pause / resume"
        ];
    }
}
