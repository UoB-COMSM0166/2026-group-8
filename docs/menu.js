class Menu {
    constructor() {
        this.gridSize = 20;
        this.btnSize = 24;
        this.center = width / 2;
    }

    display() {
        background(220);

        this.drawBorder();
        this.drawDecor();
        this.drawTitle();

        this.drawButton('Start', 350);
        this.drawButton('Twist version 1', 400);
        this.drawButton('Twist version 2', 450);
    }

    drawBorder() {
        randomSeed(300);
        // top and bottom
        for (let x = 0; x < width; x += this.gridSize) {
            this.drawGrid(x, 0, this.gridSize);
            this.drawGrid(x, height - this.gridSize, this.gridSize);
        }
        // left and right
        for (let y = this.gridSize; y < height - this.gridSize; y += this.gridSize) {
            this.drawGrid(0, y, this.gridSize);
            this.drawGrid(width - this.gridSize, y, this.gridSize);
        }
    }

    drawGrid(x, y) {
        if (((x + y) / this.gridSize) % 2 === 0) {
            fill('gray');
        } else {
            fill('white');
        }
        noStroke();
        rect(x, y, this.gridSize, this.gridSize);
    }

    drawTitle() {
        push();
        // add shadow effect
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'black';
        textSize(50);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER, CENTER);
        text('- BLOCK -', width / 2, 250);
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
        fill(255);
        rect(75, 125, 350, 450);
        circle(30, 30, 12);
        circle(width - 30, 30, 12);
        circle(30, height - 30, 12);
        circle(width - 30, height - 30, 12);
    }

    checkStartClicked() {
        let tw = textWidth('Start');
        if (this.btnRange(this.center, 350, tw, this.btnSize)) {
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
