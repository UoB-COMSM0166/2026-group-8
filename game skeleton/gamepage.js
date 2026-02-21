class Menu {
    constructor() {
        this.gridSize = 20;
        this.btnSize = 20;
        this.center = width / 2;
    }

    display() {
        background(220);

        this.drawBorder();
        this.drawDecor();
        this.drawTitle();

        this.drawButton('Start', 220);
        this.drawButton('Twist version 1', 260);
        this.drawButton('Twist version 2', 300);
    }

    drawBorder() {
        randomSeed(123);
        for (let x = 0; x < width; x += this.gridSize) {
            this.drawGrid(x, 0, this.gridSize);
            this.drawGrid(x, height - this.gridSize, this.gridSize);
        }
        for (let y = this.gridSize; y < height - this.gridSize; y += this.gridSize) {
            this.drawGrid(0, y, this.gridSize);
            this.drawGrid(width - this.gridSize, y, this.gridSize);
        }
    }

    drawGrid(x, y) {
        if (((x + y) / this.gridSize) % 2 === 0) {
            fill('grey');
        } else {
            fill('white');
        }

        noStroke();
        rect(x, y, this.gridSize, this.gridSize);
    }

    drawTitle() {
        push();
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'black';
        textSize(50);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER, CENTER);
        text('- BLOCK -', width / 2, 130);
        pop();
    }

    drawButton(str, pos) {
        let x = this.center;
        let y = pos;

        textSize(this.btnSize);

        let tw = textWidth(str);
        let th = this.btnSize;

        if (this.btnRange(x, y, tw, th)) {
            fill('red');
            cursor(HAND);
        } else {

            fill('yellow');
        }

        textAlign(CENTER, CENTER);
        stroke(0);
        strokeWeight(2);
        text(str, x, y);
    }

    drawDecor() {
        noStroke();
        rect(140, 70, 320, 270);
        circle(30, 30, 10);
        circle(570, 30, 10);
        circle(30, 370, 10);
        circle(570, 370, 10);
    }

    checkStartClicked() {
        let tw = textWidth('Start');
        if (this.btnRange(this.center, 220, tw, this.btnSize)) {
            return true;
        }
        return false;
    }

    btnRange(x, y, tw, th) {
        if (mouseX > x - tw / 2 && mouseX < x + tw / 2 &&
            mouseY > y - th / 2 && mouseY < y + th / 2) {
            return true;
        }
        return false;
    }
}

class Game {
    constructor(imgFile1, imgFile2) {
        // this.ball = new Ball();
        // this.paddle = new Paddle();
        // this.bricks = new Bricks();
        // this.currentState = new State();
        this.score = 0;
        this.life = 3;
        this.brickImg = imgFile1;
        this.ballImg = imgFile2;
    }

    display() {
        // this.bricks.display();
        // this.paddle.display();
        // this.ball.display();
        this.drawSideBar();
    }

    drawSideBar() {
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
        fill('white');
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
