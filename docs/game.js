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

        this.drawPlayerStatusBar();

        // DARK mode screen filter
        if (this.mode === 'DARK' && this.darkTimer > 1000) {
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

    drawWinScreen() {
        push();
        fill(255, 215, 0, 200);
        noStroke();
        rect(25, 25, 450, 600);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(50);
        textStyle(BOLD);
        text('YOU WIN!', 250, 300);

        this.drawHomeButton();
        pop();
    }

    drawGameOverScreen() {
        push();
        fill(0, 0, 0, 200);
        noStroke();
        rect(25, 25, 450, 600);

        fill(255, 50, 50);
        textAlign(CENTER, CENTER);
        textSize(50);
        textStyle(BOLD);
        text('GAME OVER', 250, 300);

        fill(255);
        textSize(18);
        textStyle(NORMAL);
        text('Better luck next time!', 250, 350);

        this.drawHomeButton();
        pop();
    }

    drawPlayerStatusBar() {
        push();

        textSize(15);
        textAlign(RIGHT);
        fill('white');
        stroke(0);
        strokeWeight(3);

        if (this.manage.timer < 10000) {
            fill(255, 50, 50);
        }

        text(`LIVES:`, 80, 660);
        this.displayHeartEmojis(this.manage.getLifeString(), 90, 665);
        text(`TIME: ${this.manage.getFormattedTime()}`, 260, 660);
        text(`SCORE: ${this.manage.score}`, 360, 660);
        pop();
    }

    displayHeartEmojis(heartString, x, y) {
        push();
        textSize(15);
        noStroke();
        textAlign(LEFT, CENTER);
        text(heartString, x, y - 2);
        pop();
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
                "• Move the mouse to control the paddle",
                "• Light follows the ball - keep it steady!",
                "• Lives: 3 (Game over at 0)",
                "• Press 'P' to pause / resume"
            ];
        } else if (this.mode === 'CLASSIC') {
            return [
                "• Move the mouse to control the paddle",
                "• Click to launch the ball",
                "• Lives: 3 (Game over at 0)",
                "• Press 'P' to pause / resume"
            ];
        }
    }
}
