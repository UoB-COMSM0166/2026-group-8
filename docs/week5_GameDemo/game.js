class Game {
    constructor(imgFile1, imgFile2) {
        this.ball = new Ball(200, 350, 5);
        this.paddle = new Paddle();
        this.bricks = new Bricks();
        // this.currentState = new GameManage(this);
        this.score = 0;
        this.lives = 3;
        this.brickImg = imgFile1;
        this.ballImg = imgFile2;
    }

    display() {
        this.drawInitPage();
        this.bricks.display();

        this.paddle.update();
        this.ball.update(this.paddle, this.bricks.items);

        this.paddle.display();
        this.ball.display();
    }

    drawInitPage() {
        background('grey');
        fill('white');
        noStroke();
        rect(10, 10, 420, 380);
        rect(440, 10, 150, 380);

        textSize(30);
        stroke(0);
        strokeWeight(4);
        fill('white');
        textAlign(LEFT);
        text('BASIC', 450, 50);

        textSize(15);
        stroke(0);
        strokeWeight(4);
        textAlign(LEFT);
        fill('pink');
        text('Score: ', 450, 100);
        text(this.score, 450, 120);
        text('Life remain: ', 450, 150);
        text(this.life, 450, 170)

        image(this.brickImg, 480, 300, 80, 80);
        image(this.ballImg, 550, 20, 30, 30);
    }
}
