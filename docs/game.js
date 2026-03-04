class Game {
    constructor(imgFile1, imgFile2) {
        this.ball = new Ball(200, 350, 5);
        this.paddle = new Paddle();
        this.bricks = new Bricks();
        this.manage = new GameManage();
        // this.score = 0;
        this.brickImg = imgFile1;
        this.ballImg = imgFile2;
    }


    display() {
        this.drawInitPage();
        this.bricks.display();

        if (this.manage.state === 'PLAYING') {
            this.paddle.update();
            this.ball.update(this.paddle, this.bricks.items);

            if (this.ball.pos.y > height) {
                this.manage.handleBallLost(this.ball, this.paddle);
            }
            this.manage.checkWinCondition(this.bricks.items);
        }

        this.displayHeartEmojis(this.manage.getLifeString(), 120, 665);

        this.paddle.display();
        this.ball.display();
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
        // this.displayHeartEmojis(120, 665);

        image(this.brickImg, 400, 635, 50, 50);
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
        text('BASIC', 0, 0);
        pop();
    }
}
