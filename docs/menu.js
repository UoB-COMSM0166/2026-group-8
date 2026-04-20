class Menu {
    constructor() {
        this.btnW = 130;
        this.btnH = 160;
        this.btnPos = 480;
        this.center = width / 2;
    }

    display() {
        background(bgImg);

        this.drawDecor();
        this.drawTitle();

        let mode1 = this.center - 150;
        let mode2 = this.center;
        let mode3 = this.center + 150;

        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);
        this.drawBoxButton('CLASSIC', mode1, this.btnPos, '🎮');
        this.drawBoxButton('DARK', mode2, this.btnPos, '💡');
        this.drawBoxButton('DUEL', mode3, this.btnPos, '⚔️');
        drawingContext.shadowBlur = 0;
    }

    drawTitle() {
        push();
        // add shadow effect
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'black';

        textSize(40);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER, CENTER);
        text('CODE_BREAKER', this.center, 250);
        pop();

        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);

        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text('_______________', this.center, 290);
        text('◇ Select game mode ◇', this.center, 320);
        text('_______________', this.center, 330);
        drawingContext.shadowBlur = 0;
    }

    btnRange(x, y, tw, th) {
        if (mouseX > x - tw / 2 && mouseX < x + tw / 2 &&
            mouseY > y - th / 2 && mouseY < y + th / 2) {
            return true;
        }
        return false;
    }

    drawBoxButton(str, x, y, icon) {
        push();
        rectMode(CENTER);
        stroke(255);
        strokeWeight(3);

        if (this.btnRange(x, y, this.btnW, this.btnH)) {
            strokeWeight(6);
            fill(200, 200, 200, 100);
            cursor(HAND);
        } else {
            fill(255, 255, 255, 110);
        }
        rect(x, y, this.btnW, this.btnH, 5);

        fill(100);
        textAlign(CENTER, CENTER);
        textSize(30);
        text(icon, x, y - 10);
        textSize(15);
        text(str, x, y + 30);
        pop();
    }

    drawDecor() {
        noStroke();
        fill(255);
        circle(30, 30, 14);
        circle(width - 30, 30, 14);
        circle(30, height - 30, 14);
        circle(width - 30, height - 30, 14);
    }

    checkModeClicked() {
        let mode1 = this.center - 150; // Classic button
        let mode2 = this.center;       // Dark button
        let mode3 = this.center + 150; // Duel button

        if (this.btnRange(mode1, this.btnPos, this.btnW, this.btnH)) return 'CLASSIC';
        if (this.btnRange(mode2, this.btnPos, this.btnW, this.btnH)) return 'DARK';
        if (this.btnRange(mode3, this.btnPos, this.btnW, this.btnH)) return 'DUEL';

        return null;
    }
}
