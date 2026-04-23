class Menu {
    constructor() {
        this.center = width / 2;

        // button size
        this.btnW = 140;
        this.btnH = 130;
        this.btnY = 440;

        // button positions
        this.btn1X = this.center - 150;
        this.btn2X = this.center;
        this.btn3X = this.center + 150;

        // hover animation value for each button
        this.btnHovers = [0, 0, 0];
        this.frameCount = 0;

        // intro animation
        this.isIntroDone = false;
        this.introTimer = 0;
        this.bootLines = [
            "> INITIATING SYSTEM BOOT...",
            "> LOADING NEURAL KERNEL........ [OK]",
            "> ESTABLISHING SECURE CONNECTION... [OK]",
            "> BYPASSING EXTERNAL FIREWALL...",
            "> DECRYPTING PROTOCOL ZERO...",
            "> WARNING: UNAUTHORIZED ACCESS DETECTED!",
            "> OVERRIDING SECURITY PROTOCOLS...",
            "> ACCESS GRANTED."
        ];
    }

    display() {
        // show the intro first
        if (!this.isIntroDone) {
            this.drawBootAnimation();
            return;
        }

        // then draw the main menu
        this.drawMainMenuContent();
    }

    drawBootAnimation() {
        background(0, 4, 8);
        this.introTimer++;

        push();
        textFont('Share Tech Mono', 'monospace');
        textAlign(LEFT, TOP);
        textSize(14);

        let startX = width / 2 - 160;
        let y = height / 2 - 120;

        for (let i = 0; i < this.bootLines.length; i++) {
            let revealTime = i * 25;
            if (this.introTimer > revealTime) {
                if (i === this.bootLines.length - 1) {
                    drawingContext.shadowBlur = 10;
                    drawingContext.shadowColor = color(119, 221, 119);
                    fill(119, 221, 119);
                    textSize(18);
                    textStyle(BOLD);
                    if (this.introTimer % 15 < 10) {
                        text(this.bootLines[i], startX, y + 10);
                    }
                } else if (i === 5) {
                    drawingContext.shadowBlur = 5;
                    drawingContext.shadowColor = color(255, 51, 102);
                    fill(255, 51, 102);
                    text(this.bootLines[i], startX, y);
                } else {
                    drawingContext.shadowBlur = 0;
                    fill(0, 255, 204, 200);
                    text(this.bootLines[i], startX, y);
                }
                y += 25;
            }
        }
        pop();

        if (this.introTimer > 250) {
            this.isIntroDone = true;
        }
    }

    drawMainMenuContent() {
        // use clear() so the 3D background can still show through
        clear();

        // dark overlay to make the buttons easier to see
        push();
        fill(0, 5, 15, 150);
        noStroke();
        rectMode(CORNER);
        rect(0, 0, width, height);
        pop();

        this.frameCount++;

        this.drawTitle();
        this.drawButtons();
        this.drawFooter();
    }

    drawTitle() {
        push();
        textAlign(CENTER, CENTER);

        // main title
        textFont('Orbitron');
        textSize(42);
        textStyle(BOLD);
        drawingContext.letterSpacing = "5px";

        let glitchCycle = this.frameCount % 240;
        let isGlitch = glitchCycle > 232;
        let gOff = isGlitch ? random(-2, 2) : 0;

        if (isGlitch) {
            fill(255, 51, 102);
            text('CODE BREAKER', this.center + 2, 200 + gOff);
            fill(0, 255, 204);
            text('CODE BREAKER', this.center - 2, 200 - gOff);
        }

        drawingContext.shadowBlur = 24;
        drawingContext.shadowColor = color(0, 255, 204);
        fill(0, 255, 204);
        text('CODE BREAKER', this.center + gOff, 200);

        // subtitle
        let flkPercent = (this.frameCount % 300) / 300;
        let flkAlpha = 255;

        if (flkPercent >= 0.93 && flkPercent < 0.95) {
            flkAlpha = 40;
        } else if (flkPercent >= 0.97 && flkPercent < 0.99) {
            flkAlpha = 100;
        }

        textFont('Orbitron');
        textSize(13);
        textStyle(NORMAL);
        drawingContext.letterSpacing = "9px";
        drawingContext.shadowBlur = 8;
        drawingContext.shadowColor = color(255, 51, 102, flkAlpha);
        fill(255, 51, 102, flkAlpha);
        text('◈ PROTOCOL ZERO ◈', this.center, 245);

        let linePulse = 0.7 + 0.3 * sin(this.frameCount * 0.06);
        let lineW = 220 + 10 * sin(this.frameCount * 0.04);

        drawingContext.shadowBlur = 10 * linePulse;
        drawingContext.shadowColor = color(0, 255, 204);
        stroke(0, 255, 204, 180 * linePulse);
        strokeWeight(1.5);
        line(this.center - lineW, 285, this.center + lineW, 285);

        // small label
        let promptPulse = 100 + 55 * sin(this.frameCount * 0.05);
        noStroke();
        drawingContext.shadowBlur = 0;
        fill(0, 255, 204, promptPulse);
        textFont('Share Tech Mono');
        textSize(11);
        drawingContext.letterSpacing = "5px";
        text('// SELECT OPERATION MODE //', this.center, 315);

        drawingContext.letterSpacing = "0px";
        pop();
    }

    drawButtons() {
        this.updateHoverState(0, this.btn1X);
        this.updateHoverState(1, this.btn2X);
        this.updateHoverState(2, this.btn3X);

        this.drawCyberBtn(this.btn1X, this.btnY, '⬡', 'CLASSIC', 'NODE_NORMAL', 'LIVES_3', false, this.btnHovers[0]);
        this.drawCyberBtn(this.btn2X, this.btnY, '◉', 'DARK', 'NODE_HIDDEN', 'VISION_BLIND', false, this.btnHovers[1]);
        this.drawCyberBtn(this.btn3X, this.btnY, '⚔', 'DUEL', 'NODE_PVP', 'KILL_ENEMY', true, this.btnHovers[2]);
    }

    updateHoverState(index, x) {
        let isHover = this.btnRange(x, this.btnY, this.btnW, this.btnH);
        if (isHover) {
            this.btnHovers[index] = lerp(this.btnHovers[index], 1, 0.2);
            cursor(HAND);
        } else {
            this.btnHovers[index] = lerp(this.btnHovers[index], 0, 0.2);
        }
    }

    drawCyberBtn(x, y, icon, name, desc1, desc2, isRed, hoverVal) {
        let mainCol = isRed ? color(255, 51, 102) : color(0, 255, 204);

        push();
        rectMode(CENTER);

        let yOffset = lerp(0, -3, hoverVal);
        translate(x, y + yOffset);

        let currentBlur = lerp(0, 25, hoverVal);
        let currentAlpha = lerp(5, 30, hoverVal);

        drawingContext.shadowBlur = currentBlur;
        drawingContext.shadowColor = mainCol;
        fill(red(mainCol), green(mainCol), blue(mainCol), currentAlpha);

        stroke(mainCol);
        strokeWeight(lerp(1, 2, hoverVal));

        let clip = 10;
        let hw = this.btnW / 2;
        let hh = this.btnH / 2;

        beginShape();
        vertex(-hw + clip, -hh);
        vertex(hw, -hh);
        vertex(hw - clip, hh);
        vertex(-hw, hh);
        endShape(CLOSE);

        drawingContext.shadowBlur = 0;
        noStroke();
        fill(mainCol);
        textAlign(CENTER, CENTER);

        textFont('sans-serif');
        textSize(30);
        text(icon, 0, -28);

        textFont('Orbitron', 'sans-serif');
        textSize(16);
        textStyle(BOLD);
        drawingContext.letterSpacing = "3px";
        text(name, 0, 8);

        textFont('Share Tech Mono', 'monospace');
        fill(red(mainCol), green(mainCol), blue(mainCol), 150);
        textSize(11);
        textStyle(NORMAL);
        drawingContext.letterSpacing = "0px";
        text(desc1, 0, 32);
        text(desc2, 0, 48);

        pop();
    }

    drawFooter() {
        push();
        textAlign(CENTER, CENTER);
        textFont('Share Tech Mono', 'monospace');
        textSize(10);
        fill(0, 255, 204, 60);
        drawingContext.letterSpacing = "3px";
        text('◈ NEURAL_LINK v2.077 · FIREWALL DETECTED · BREACH AUTHORIZED ◈', this.center, height - 25);
        drawingContext.letterSpacing = "0px";
        pop();
    }

    btnRange(x, y, tw, th) {
        return (mouseX > x - tw / 2 && mouseX < x + tw / 2 &&
            mouseY > y - th / 2 && mouseY < y + th / 2);
    }

    checkModeClicked() {
        if (!this.isIntroDone) return null;

        if (this.btnRange(this.btn1X, this.btnY, this.btnW, this.btnH)) return 'CLASSIC';
        if (this.btnRange(this.btn2X, this.btnY, this.btnW, this.btnH)) return 'DARK';
        if (this.btnRange(this.btn3X, this.btnY, this.btnW, this.btnH)) return 'DUEL';
        return null;
    }
}