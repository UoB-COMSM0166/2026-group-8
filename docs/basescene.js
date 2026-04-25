class BaseScene {
    constructor() {
        this.manage = new GameManage();

        // === data setting for Cyber background effect === //
        this.bgInitDone = false;
        this.C = {
            bg: [12, 24, 42],
            green: '0,255,204',
            blue: '0,180,255',
            purple: '180,100,255',
            red: '255,51,102',
            white: '220,255,240'
        };
        this.ghosts = [];
        this.rain = [];
        this.scanners = [];
        this.floaters = [];
        this.alarmCooldown = 0;
    }

    drawInitPage() {
        this.drawCyberEffect();

        push();
        noFill();
        stroke(200, 240, 255);
        strokeWeight(2);

        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);
        this.drawRectangleOverlay(color(0, 0), color(200, 240, 255));

        image(img, 425, 635, 50, 50);
        drawingContext.shadowBlur = 0;

        this.drawPlayerStatusBar();
        pop();
    }

    drawPlayerStatusBar() {
        push();
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color(255, 255, 255, 200);

        textSize(15);
        textAlign(LEFT);
        fill('white');
        stroke(0);
        strokeWeight(3);

        if (this.mode !== 'DUEL') {
            text(`LIVES:`, 35, 660);
            this.displayHeartEmojis(this.manage.getLifeString(), 90, 660);
            text(`TIME: ${this.manage.getFormattedTime()}`, 175, 660);

            if (this.mode === 'CLASSIC') {
                text(`SCORE: ${this.manage.score}`, 285, 660);
            } else if (this.mode === 'DARK') {
                text("# _THE_CORE", 285, 660);
            }
        } else {
            text("# _SMASH_YOUR_RIVAL'S_KING", 35, 660);
        }

        drawingContext.shadowBlur = 0;
        pop();
    }

    displayHeartEmojis(heartString, x, y) {
        push();
        textSize(15);
        noStroke();
        textAlign(LEFT, CENTER);
        text(heartString, x, y - 2);
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

    drawInstructionScreen() {
        push();
        this.drawRectangleOverlay(color(10, 15, 30, 230), color(255));

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(255);

        fill(255, 255, 0);
        noStroke();
        textSize(20);
        textStyle(BOLD);
        text('CLICK ANYWHERE TO START', 250, 500);

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
            this.drawItemContext(250, 350);
        } else if (this.mode === 'DARK') {
            this.drawDarkItemContext(250, 400);
        }

        this.drawHomeButton();
        drawingContext.shadowBlur = 0;
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
        textAlign(CENTER, CENTER);

        this.drawGameOverContent();
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

        textSize(18);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);

        fill(200, 240, 255);
        textAlign(CENTER);
        text('----- POWER UP ITEMS -----', centerX, startY - 30);
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
        text('----- SPECIAL ITEM -----', centerX, startY - 30);

        push();
        fill(160, 80, 220);
        stroke(255);
        strokeWeight(1);
        rectMode(CENTER);
        rect(centerX - 115, startY, 35, 22, 4);
        pop();

        fill(255);
        textAlign(LEFT, CENTER);
        textSize(15);
        textStyle(NORMAL);
        text('Temporary Light Support: 3 secs', centerX - 80, startY);
    }

    requestTogglePause() {
        this.manage.togglePause();
    }

    getRules() {
        return [];
    }



    // === the animated Cyber background effect === //
    _initDynamicBackground() {
        let w = width, h = height;

        // Ghost Texts
        this.ghosts = Array.from({ length: 15 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            char: Math.random() > 0.5 ? '1' : '0',
            size: 60 + Math.floor(Math.random() * 100),
            phase: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.004,
            col: Math.random() > 0.5 ? this.C.green : this.C.blue
        }));

        // Digital Rain
        const COLS = 30;
        const colW = w / COLS;
        this.rain = Array.from({ length: COLS }, (_, i) => ({
            x: i * colW + colW / 2,
            drops: Array.from({ length: 22 }, () => ({
                y: Math.random() * h,
                // slowed down the falling speed here
                speed: 0.1 + Math.random() * 0.2,
                char: Math.random() > 0.5 ? '1' : '0'
            })),
            active: Math.random() > 0.2,
            col: Math.random() > 0.6 ? this.C.green : Math.random() > 0.5 ? this.C.blue : this.C.purple,
            phase: Math.random() * Math.PI * 2,
            alarm: false,
            alarmTimer: 0
        }));

        // soft light wave effect
        this.scanners = [
            { y: 0, speed: 0.4 + Math.random() * 0.2, alpha: 0.08, width: 35 + Math.random() * 10, col: this.C.blue },
            { y: h / 2, speed: -(0.35 + Math.random() * 0.2), alpha: 0.08, width: 35 + Math.random() * 10, col: this.C.red },
            { y: h / 2, speed: 0.7 + Math.random() * 0.2, alpha: 0.06, width: 25 + Math.random() * 10, col: this.C.blue }
        ];

        // floating particles
        this.floaters = Array.from({ length: 80 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            char: Math.random() > 0.5 ? '1' : '0',
            phase: Math.random() * Math.PI * 2,
            speed: 0.008 + Math.random() * 0.018,
            size: 9 + Math.floor(Math.random() * 7),
            col: Math.random() > 0.6 ? this.C.green : Math.random() > 0.5 ? this.C.blue : this.C.purple
        }));

        this.bgInitDone = true;
    }

    // main drawing function
    drawCyberEffect() {
        if (!this.bgInitDone) this._initDynamicBackground();
        let w = width, h = height;

        background(this.C.bg);
        push();

        // Ghost Texts
        textFont('monospace'); textStyle(BOLD); textAlign(LEFT, BASELINE);
        this.ghosts.forEach(g => {
            let a = 0.015 + 0.015 * (0.5 + 0.5 * Math.sin(frameCount * g.speed + g.phase));
            textSize(g.size); fill(`rgba(${g.col},${a})`); noStroke();
            text(g.char, g.x, g.y);
            g.y += 0.05;
            if (g.y > h + g.size) { g.y = -g.size; g.x = Math.random() * w; }
        });

        // soft light wave effect
        this.scanners.forEach(s => {
            s.y += s.speed;
            if (s.y > h + s.width) s.y = -s.width;
            if (s.y < -s.width) s.y = h + s.width;

            let sg = drawingContext.createLinearGradient(0, s.y - s.width, 0, s.y + s.width);
            sg.addColorStop(0, `rgba(${s.col},0)`);
            sg.addColorStop(0.5, `rgba(${s.col},${s.alpha})`);
            sg.addColorStop(1, `rgba(${s.col},0)`);

            drawingContext.shadowBlur = 15;
            drawingContext.shadowColor = `rgba(${s.col}, 0.5)`;
            drawingContext.fillStyle = sg;
            drawingContext.fillRect(0, s.y - s.width, w, s.width * 2);
            drawingContext.shadowBlur = 0;
        });

        // Digital Rain - same logic, only the start speed was changed
        this.alarmCooldown--;
        if (this.alarmCooldown <= 0) {
            let t = this.rain[Math.floor(Math.random() * this.rain.length)];
            t.alarm = true; t.alarmTimer = 60 + Math.floor(Math.random() * 80);
            this.alarmCooldown = 120 + Math.floor(Math.random() * 200);
        }
        textSize(11); textStyle(NORMAL);
        this.rain.forEach(col => {
            if (!col.active) return;
            if (col.alarm) { col.alarmTimer--; if (col.alarmTimer <= 0) col.alarm = false; }
            let colAlpha = 0.04 + 0.08 * (0.5 + 0.5 * Math.sin(frameCount * 0.008 + col.phase));
            let drawCol = col.alarm ? this.C.red : col.col;
            col.drops.forEach(d => {
                d.y += d.speed;
                if (d.y > h + 20) { d.y = -10; d.char = Math.random() > 0.5 ? '1' : '0'; }
                if (Math.random() > 0.985) d.char = Math.random() > 0.5 ? '1' : '0';
                fill(`rgba(${drawCol},${colAlpha})`); text(d.char, col.x - 4, d.y);
            });
        });

        // Floaters
        this.floaters.forEach(b => {
            let alpha = 0.04 + 0.1 * (0.5 + 0.5 * Math.sin(frameCount * b.speed + b.phase));
            textSize(b.size); fill(`rgba(${b.col},${alpha})`); text(b.char, b.x, b.y);
            if (Math.random() > 0.998) b.char = b.char === '1' ? '0' : '1';
        });

        // Glitch Tear Effect
        if (Math.random() > 0.974) {
            let gy = Math.random() * h, gh = 1 + Math.random() * 8, go = (Math.random() - 0.5) * 40;
            let segment = get(0, gy, w, gh);
            image(segment, go, gy);
            fill('rgba(0,255,204,0.04)'); noStroke(); rect(0, gy, w, gh);
        }

        // faint scan lines
        fill('rgba(0,0,0,0.02)'); noStroke();
        for (let i = 0; i < h; i += 3) rect(0, i, w, 1);

        // dark corners
        let vig = drawingContext.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 1.2);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(0,5,15,0.4)');
        drawingContext.fillStyle = vig;
        drawingContext.fillRect(0, 0, w, h);

        pop();
    }
}
