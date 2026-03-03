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
        rect(25, 25, 450, 600);
        this.drawWatermark();

        textSize(20);
        textAlign(LEFT);
        fill('white');
        stroke(0);
        strokeWeight(3);
        text('LIVES: ', 40, 660);
        this.displayHeartEmojis(120, 665);

        image(this.brickImg, 400, 635, 50, 50);
    }

    displayHeartEmojis(x, y) {
        let hearts = "";
        for (let i = 0; i < this.lives; i++) {
            hearts += "❤️";
        }
        push();
        textSize(22);
        noStroke();
        textAlign(LEFT, CENTER);
        text(hearts, x, y - 2);
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
