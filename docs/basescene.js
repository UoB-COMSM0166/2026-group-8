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

        image(img, 425, 635, 50, 50);
        drawingContext.shadowBlur = 0;

        this.drawWatermark();
        pop();
    }

    drawInstructionScreen() {
        push();
        this.drawRectangleOverlay(color(10, 15, 30, 230), color(255));

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(255);

        fill(255, 255, 0);
        noStroke();
        textSize(20);
        textStyle(BOLD);
        text('CLICK ANYWHERE TO START', 250, 490);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(30);
        textStyle(BOLD);
        text('HOW TO PLAY', 250, 100);

        textSize(16);
        textStyle(NORMAL);
        let rules = this.getRules();
        for (let i = 0; i < rules.length; i++) {
            text(rules[i], 250, 160 + (i * 30));
        }

        if (this.mode === 'CLASSIC') {
            this.drawItemContext(250, 320);
        } else if (this.mode === 'DARK') {
            this.drawDarkItemContext(250, 380);
        }

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

        if (this.mode == "CLASSIC") {
            text('CLASSIC', 0, 0);
        }
        else if (this.mode == "DARK") {
            text('DARK', 0, 0);
        }
        else {
            text('DUEL', 0, 0);
        }
        pop();
    }

    drawPauseScreen() {
        push();
        this.drawRectangleOverlay(color(0, 0, 0, 150), color(255));

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
        push();

        this.drawRectangleOverlay(color(255, 215, 0, 200), color(255));

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
        push();

        this.drawRectangleOverlay(color(0, 0, 0, 220), color(255, 50, 50));

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
        if (strokeColor === "NO_STROKE") {
            noStroke();
        } else {
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

    drawItemContext(centerX, startY) {
        const color_green = [119, 221, 119];
        const color_red = [255, 105, 97];

        const items = [
            { label: 'B+', desc: 'Ball Large', color: color_green },
            { label: 'S-', desc: 'Ball Slow', color: color_green },
            { label: 'P+', desc: 'Paddle Wide', color: color_green },
            { label: 'x3', desc: 'Triple Balls', color: color_green },
            { label: 'B-', desc: 'Ball Small', color: color_red },
            { label: 'S+', desc: 'Ball Fast', color: color_red },
            { label: 'P-', desc: 'Paddle Short', color: color_red },
            { label: 'Rev', desc: 'Reverse Key', color: color_red }
        ];

        let colLeft = centerX - 110;
        let colRight = centerX + 20;
        let rowH = 35;

        textSize(16);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);

        fill(200, 240, 255);
        textAlign(CENTER);
        text('--- POWER UP ITEMS ---', centerX, startY - 30);
        textAlign(LEFT);

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let x = (i < 4) ? colLeft : colRight;
            let y = startY + (i % 4) * rowH;

            push();
            fill(item.color);
            stroke(255);
            strokeWeight(1);
            rectMode(CENTER);
            rect(x, y, 35, 22, 4);

            noStroke();
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(12);
            text(item.label, x, y);
            pop();

            fill(255);
            textSize(13);
            textStyle(NORMAL);
            text(item.desc, x + 25, y);
        }
    }

    drawDarkItemContext(centerX, startY) {
        fill(200, 240, 255);
        textAlign(CENTER);
        textSize(18);
        textStyle(BOLD);
        text('--- SPECIAL ITEM ---', centerX, startY - 30);

        push();
        fill(119, 221, 119);
        stroke(255);
        strokeWeight(1);
        rectMode(CENTER);
        rect(centerX - 115, startY, 35, 22, 4);
        noStroke();
        fill(255);
        textSize(14);
        text('💡', centerX - 115, startY + 1);
        pop();

        fill(255);
        textAlign(LEFT, CENTER);
        textSize(15);
        textStyle(NORMAL);
        text('Temporary Light Support: 3 secs', centerX - 80, startY);
    }
}
