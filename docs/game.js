class Game extends BaseScene {
    constructor(mode) {
        super();
        this.mode = mode;
        this.ball = new Ball(200, 350, 5);
        this.paddle = new Paddle();
        this.bricks = new Bricks();
        this.manage = new GameManage();

        this.extraBalls = [];
        this.ball.isAttached = true;
        this.paddle.isBallAttached = true;

        // screen mask for "DARK" mode
        this.maskLayer = createGraphics(450, 600);
        // timer for DARK mode
        this.darkTimer = 0;
    }

    display() {
        this.drawInitPage();
        this.bricks.update();
        this.bricks.display();
        this.manage.updateTimer();

        if (this.manage.state === 'PLAYING') {
            this.darkTimer += deltaTime;

            this.paddle.update();
            this.paddle.checkCatch(this.bricks);
            this.ball.update(this.paddle, this.bricks);

            for (let i = this.extraBalls.length - 1; i >= 0; i--) {
                let b = this.extraBalls[i];
                b.update(this.paddle, this.bricks);
                b.display();
                if (b.pos.y > 625) this.extraBalls.splice(i, 1);
            }

            if (this.ball.pos.y > 625) {
                this.manage.handleBallLost(this.ball, this.paddle);
            }
            this.manage.checkWinCondition(this.bricks.items);
        }

        // DARK mode screen filter
        if (
            this.mode === 'DARK' &&
            this.darkTimer > 1000 &&
            this.bricks.lightTimer <= 0
        ) {
            this.drawDarkEffect();
        }

        this.paddle.display();
        this.ball.display();

        // status of the game
        if (this.manage.state === 'PAUSED') {
            this.drawPauseScreen();
        } else if (this.manage.state === 'INSTRUCTION') {
            this.drawInstructionScreen();
        } else if (this.manage.state === 'GAMEOVER') {
            this.drawGameOverScreen();
        } else if (this.manage.state === 'WON') {
            this.drawWinScreen();
        }
    }

    drawGameOverContent() {
        textAlign(CENTER, CENTER);

        if (this.mode === 'CLASSIC') {
            fill(119, 221, 119);
            textSize(50);
            textStyle(BOLD);
            text('GOOD GAME!', 250, 280); 

            fill(255);
            textSize(25);
            textStyle(NORMAL);
            text(`FINAL SCORE: ${this.manage.score}`, 250, 350);

            fill(255, 215, 0);
            textSize(20);
            text(`${this.manage.getRankTitle()}`, 250, 390);
        } else if (this.mode === 'DARK') {
            fill(255, 50, 50); 
            textSize(50);
            textStyle(BOLD);
            text('YOU LOSE', 250, 300);
        }
    }

    drawDarkEffect() {
        this.maskLayer.push();
        this.maskLayer.clear();
        this.maskLayer.fill(0, 0, 0, 250);
        this.maskLayer.noStroke();
        this.maskLayer.rect(0, 0, 450, 600);

        this.maskLayer.erase();
        this.maskLayer.circle(this.ball.pos.x - 25, this.ball.pos.y - 25, 150);
        this.maskLayer.noErase();
        this.maskLayer.pop();

        image(this.maskLayer, 25, 25);
    }

    getRules() {
        if (this.mode === 'DARK') {
            return [
                "• Break the KING to win",
                "• Light follows the ball - keep it steady!",
                "• Click to launch the ball",
                "• Move the mouse to control the paddle",
                "• Total ives: 3 (Game over at 0)",
                "• Press 'P' to pause / resume"
            ];
        } else if (this.mode === 'CLASSIC') {
            return [
                "• Get the highest score as possible!",
                "• Click to launch the ball",
                "• Move the mouse to control the paddle",
                "• Total lives: 3 (Game over at 0)",
                "• Press 'P' to pause / resume"
            ];
        }
    }
}
