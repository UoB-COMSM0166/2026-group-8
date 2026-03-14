class BaseScene {
    static brickImg;

    constructor() {
        this.manage = new GameManage();
    }

    drawInitPage() {
        background('grey');
        fill('white');
        noStroke();
        rect(25, 25, 450, 600);
        this.drawWatermark();

        image(BaseScene.brickImg, 400, 635, 50, 50);
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
        let rules = this.getRules();
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
        fill(150, 150, 150, 30);
        noStroke();

        if (this.mode == "CLASSIC") { text('CLASSIC', 0, 0); }
        else if (this.mode == "DARK") { text('DARK', 0, 0); }
        else { text('DUEL', 0, 0); }

        pop();
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

    requestTogglePause() {
        this.manage.togglePause();
    }

    getRules() {
        return [];
    }
}