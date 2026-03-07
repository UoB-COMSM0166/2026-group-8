class Game {
    constructor(imgFile, mode) {
        this.mode = mode;
        this.ball = new Ball(200, 350, 5);
        this.paddle = new Paddle();
        this.bricks = new Bricks();
        this.manage = new GameManage();

        this.brickImg = imgFile;
        // screen mask for "DARK" mode
        this.maskLayer = createGraphics(450, 600);
    }


    display() {
        this.drawInitPage();
        this.bricks.display();

        if (this.manage.state === 'PLAYING') {
            this.paddle.update();
            this.ball.update(this.paddle, this.bricks.items);

            if (this.ball.pos.y > 625) {
                this.manage.handleBallLost(this.ball, this.paddle);
            }
            this.manage.checkWinCondition(this.bricks.items);
        }

        // mode
        if (this.mode === 'DARK') {
            this.drawDarkEffect();
        }

        this.displayHeartEmojis(this.manage.getLifeString(), 120, 665);

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


    drawInitPage() {
        background('grey');
        fill('white');
        noStroke();
        rect(25, 25, 450, 600);
        this.drawWatermark();

        textSize(20);
        textAlign(LEFT);
        fill('white');
        stroke(0);
        strokeWeight(3);
        text('LIVES: ', 40, 660);

        image(this.brickImg, 400, 635, 50, 50);
    }


    drawPauseScreen() {
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(25, 25, 450, 600);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(40);
        textStyle(BOLD);
        text('PAUSE', 250, 325);

        textSize(15);
        textStyle(NORMAL);
        text('Press "P" again to Resume', 250, 370);

        this.drawHomeButton();
        pop();
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


    drawInstructionScreen() {
        push();
        fill(0, 0, 0, 180);
        noStroke();
        rect(25, 25, 450, 600);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(30);
        textStyle(BOLD);
        text('HOW TO PLAY', 250, 150);

        textSize(16);
        textStyle(NORMAL);
        let rules = [
            "• Move the mouse to control the paddle",
            "• Click to launch the ball",
            "• Lives: 3 (Game over at 0)",
            "• Press 'P' to pause / resume"
        ];

        for (let i = 0; i < rules.length; i++) {
            text(rules[i], 250, 220 + (i * 40));
        }

        fill(255, 255, 0);
        textSize(20);
        textStyle(BOLD);
        text('CLICK ANYWHERE TO START', 250, 480);

        this.drawHomeButton();
        pop();
    }


    displayHeartEmojis(heartString, x, y) {
        push();
        textSize(22);
        noStroke();
        textAlign(LEFT, CENTER);
        text(heartString, x, y - 2);
        pop();
    }


    drawWatermark() {
        push();
        translate(250, 325);
        textAlign(CENTER, CENTER);
        textSize(80);
        textStyle(BOLD);
        fill(150, 150, 150, 30);
        noStroke();

        if (this.mode == "CLASSIC") { text('CLASSIC', 0, 0); }
        else if (this.mode == "DARK") { text('DARK', 0, 0); }
        else { text('DUEL', 0, 0); }

        pop();
    }


    drawHomeButton() {
        push();
        let btnX = 250, btnY = 560;
        let btnW = 160, btnH = 40;

        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        textSize(18);
        textStyle(BOLD);

        if (
            mouseX > btnX - btnW / 2 && mouseX < btnX + btnW / 2 &&
            mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2
        ) {
            fill(255, 100, 100);
            cursor(HAND);
        } else {
            fill(135, 206, 235);
        }
        stroke(255);
        strokeWeight(2);
        rect(btnX, btnY, btnW, btnH, 10);

        noStroke();
        fill(255);
        text('BACK TO MENU', btnX, btnY);
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
}

