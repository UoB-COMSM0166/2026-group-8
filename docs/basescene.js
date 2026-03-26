class BaseScene {
    constructor() {
        this.manage = new GameManage();
    }

    drawInitPage() {
        // background image for each mode
        if (this.mode == 'DARK') {
            background(darkImg);
        } else if (this.mode == 'DUEL') {
            background(duelImg);
        } else {
            background(classicImg);
        }

        // draw frame
        push();
        noFill();
        stroke(200, 240, 255);
        strokeWeight(2);

        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);
        this.drawRectangleOverlay(color(0, 0), color(200, 240, 255));
        pop();

        this.drawWatermark();
        image(brickImg, 400, 635, 50, 50);
    }

    drawInstructionScreen() {
        push();
        this.drawRectangleOverlay(color(10, 15, 30, 230), color(255));

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(255);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(30);
        textStyle(BOLD);
        text('HOW TO PLAY', 250, 150);

        textSize(16);
        textStyle(NORMAL);
        let rules = this.getRules();
        for (let i = 0; i < rules.length; i++) {
            text(rules[i], 250, 220 + (i * 40));
        }

        fill(255, 255, 0);
        noStroke();
        textSize(20);
        textStyle(BOLD);
        text('CLICK ANYWHERE TO START', 250, 480);

        this.drawHomeButton();
        drawingContext.shadowBlur = 0;
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

    drawWatermark() {
        push();
        translate(250, 325);
        textAlign(CENTER, CENTER);
        textSize(80);
        textStyle(BOLD);
        fill(150, 150, 150, 100);
        noStroke();

        if (this.mode == "CLASSIC") { text('CLASSIC', 0, 0); }
        else if (this.mode == "DARK") { text('DARK', 0, 0); }
        else { text('DUEL', 0, 0); }

        pop();
    }

    drawPauseScreen() {
        this.drawRectangleOverlay(color(0, 0, 0, 150), color(255));

        push();
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(40);
        textStyle(BOLD);
        text('PAUSE', 250, 325);

        textSize(15);
        textStyle(NORMAL);
        text('Press "P" again to Resume', 250, 370);

        this.drawHomeButton();
        drawingContext.shadowBlur = 0;
        pop();
    }

    drawWinScreen() {
        this.drawRectangleOverlay(color(255, 215, 0, 200), color(255));

        push();
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(50);
        textStyle(BOLD);
        text('YOU WIN!', 250, 300);

        this.drawHomeButton();
        drawingContext.shadowBlur = 0;
        pop();
    }

    drawGameOverScreen() {
        this.drawRectangleOverlay(color(0, 0, 0, 220), color(255, 50, 50));

        push();
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);
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
        drawingContext.shadowBlur = 0;
        pop();
    }

    drawRectangleOverlay(fillColor, strokeColor) {
        let x = 25, y = 25;
        let w = 450, h = 600;

        push();
        fill(fillColor);
        if (strokeColor === "NO_STROKE") noStroke();
        else {
            stroke(strokeColor || 255);
            strokeWeight(4);
        }
        rect(x, y, w, h);
        pop();

    }

    requestTogglePause() {
        this.manage.togglePause();
    }

    getRules() {
        return [];
    }
}
