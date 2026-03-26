// Helper function: Find current active scene (gamePage or duelPage)
// 'duelPage' is a temporary name; it can be changed later
function getActiveScene() {
    if (typeof currentMode !== 'undefined') {
        if (currentMode === 'game' && typeof gamePage !== 'undefined') return gamePage;
        if (currentMode === 'duel' && typeof duelPage !== 'undefined') return duelPage;
    }
    return typeof gamePage !== 'undefined' ? gamePage : null;
}

class Brick {
    // Colors for different brick types 
    static COLOR_RED = [255, 105, 97];
    static COLOR_GREEN = [119, 221, 119];
    static COLOR_BLUE = [135, 206, 235];
    static COLOR_PURPLE = [160, 80, 220];

    // Item lists for Classic mode
    static BUFF_EFFECTS = ['ball_large', 'ball_slow', 'paddle_long', 'ball_multi'];
    static DEBUFF_EFFECTS = ['ball_small', 'ball_fast', 'paddle_short', 'paddle_reverse'];

    constructor(x, y, w, h, opts = {}) {
        this.x = x; this.y = y; this.w = w; this.h = h; // Set pos and size 
        this.hp = opts.hp ?? 1; this.mhp = this.hp;     // Current and Max HP 
        this.isKing = opts.isKing ?? false;             // Is this the King brick? 
        this.color = opts.color ?? Brick.COLOR_BLUE;
        this.dropType = opts.dropType ?? null;          // Item type 
        this.dropEffect = opts.dropEffect ?? null;      // Specific effect 
        this._active = true; this.flash = 0; this.flashT = 0; this.needsDrop = false;
    }

    get active() { return this._active; }

    // Handle hp damage and item drop trigger
    set active(val) {
        if (val === false && this._active === true) {
            this.hp--; // Lose 1 HP 
            this.flash = 6; this.flashT = 8; // Trigger hit flash 
            if (this.hp > 0) { this._active = true; }
            else {
                this._active = false; // Destroyed 
                if (this.dropType) this.needsDrop = true; // Prepare to drop item 
            }
        } else { this._active = val; }
    }

    update() {
        // Decrease flash timers every frame
        if (this.flash > 0) this.flash--;
        if (this.flashT > 0) this.flashT--;
    }

    display() {
        if (!this._active) return;
        push();
        if (this.isKing) { // Draw King brick with crown 
            if (this.flash > 0) { fill(255); stroke(255); rect(this.x, this.y, this.w, this.h, 8); }
            else {
                fill(80, 0, 0); stroke(255, 215, 0); strokeWeight(2); rectMode(CORNER);
                rect(this.x, this.y, this.w, this.h, 8);
                noStroke(); textAlign(CENTER, CENTER); textSize(16); text('👑', this.x + this.w / 2, this.y + this.h / 2);
            }
            if (this.hp < this.mhp) { // King Health Bar 
                noStroke(); fill(60); rect(this.x + 2, this.y + this.h - 4, this.w - 4, 3);
                fill(255, 50, 50); rect(this.x + 2, this.y + this.h - 4, (this.w - 4) * (this.hp / this.mhp), 3);
            }
        } else { // Normal brick
            if (this.flash > 0) { fill(255); stroke(255); }
            else { fill(this.color[0], this.color[1], this.color[2]); stroke(min(this.color[0] + 60, 255), min(this.color[1] + 60, 255), min(this.color[2] + 60, 255)); }
            strokeWeight(1); rectMode(CORNER); rect(this.x, this.y, this.w, this.h, 4);
            if (this.mhp >= 2 && this.hp < this.mhp) { // Tough brick HP bar 
                noStroke(); fill(60); rect(this.x + 2, this.y + this.h - 4, this.w - 4, 3);
                fill(180, 80, 255); rect(this.x + 2, this.y + this.h - 4, (this.w - 4) * (this.hp / this.mhp), 3);
            }
        }
        pop();
    }

    // Static logic to generate a full row based on mode
    static makeStandardRow(y, ignoredLv, cfg) {
        const row = []; const scene = getActiveScene();
        const isDark = (scene && (scene.mode === 'DARK' || scene.mode === 'ILLUMINATED'));
        const isDuel = (scene && scene.mode === 'DUEL');
        const wave = (scene && scene._wave) ? scene._wave : 1;
        // Chance of spawning tough bricks (increases with wave count)
        const pProb = isDark ? 0.25 : Math.min(0.05 + wave * 0.05, 0.60);

        for (let c = 0; c < cfg.COLS; c++) {
            let hp = 1, col = Brick.COLOR_BLUE, drop = null, effect = null;
            if (isDuel) { hp = 1; col = Brick.COLOR_BLUE; } // blue bricks for Duel 
            else {
                hp = Math.random() < pProb ? 2 : 1;
                if (hp === 2) {
                    col = Brick.COLOR_PURPLE;
                    if (isDark) drop = 'light'; // Dark mode purple bricks drop lights 
                } else {
                    if (isDark) col = Brick.COLOR_BLUE;
                    else {
                        // Random items: Buffs (Green) or Debuffs (Red)
                        let r = Math.random();
                        if (r < 0.15) { col = Brick.COLOR_RED; drop = 'debuff'; effect = Brick.DEBUFF_EFFECTS[Math.floor(Math.random() * Brick.DEBUFF_EFFECTS.length)]; }
                        else if (r < 0.30) { col = Brick.COLOR_GREEN; drop = 'buff'; effect = Brick.BUFF_EFFECTS[Math.floor(Math.random() * Brick.BUFF_EFFECTS.length)]; }
                        else col = Brick.COLOR_BLUE;
                    }
                }
            }
            row.push(new Brick(cfg.X0 + c * (cfg.BW + cfg.GAP), y, cfg.BW, cfg.BH, { hp, color: col, dropType: drop, dropEffect: effect }));
        }
        return row;
    }
}

class Bricks {
    constructor(customConfig = {}) {
        // Brick layout settings
        this.cfg = { COLS: 7, ROWS: 5, BW: 45, BH: 20, GAP: 5, X0: 77.5, Y0: customConfig.Y0 ?? 80 };
        this.items = []; // Store brick objects 
        this.drops = []; // Store falling items 
        this.isInitialized = false;
        // Timers for wave spawning 
        this.wave = 1;
        this.spawnTimer = 0;
        this.spawnInterval = 20000;
        // Safety net: An invisible brick to prevent crashes when screen is empty
        this.dummyBrick = new Brick(-1000, -1000, 10, 10, { hp: 999999 });
        // Timer for Dark Mode illumination
        this.lightTimer = 0;
        // Duel mode variables 
        this.hasKing = false;
        this.kingSelectedIndex = 0;
        this.keyCooldown = 0;
    }

    // Set up bricks for different modes
    initGame() {
        this.items = []; this.drops = [];
        let scene = getActiveScene();
        let isClassic = (scene && scene.mode === 'CLASSIC');
        let isDark = (scene && (scene.mode === 'DARK' || scene.mode === 'ILLUMINATED'));
        let isDuel = (scene && scene.mode === 'DUEL');

        if (isClassic) this.items.push(this.dummyBrick);
        let initialRows = isDark ? 6 : this.cfg.ROWS;
        if (isClassic) initialRows = 4;

        // Set symmetric positions for Duel mode (P1 vs P2)
        if (isDuel && scene) {
            let totalHeight = initialRows * this.cfg.BH + (initialRows - 1) * this.cfg.GAP;
            if (scene.bricks1 === this) this.cfg.Y0 = 55 + 15; // P1 Top 
            else if (scene.bricks2 === this) this.cfg.Y0 = 595 - 15 - totalHeight; // P2 Bottom 
        }

        for (let r = 0; r < initialRows; r++) {
            let yPos = this.cfg.Y0 + r * (this.cfg.BH + this.cfg.GAP);
            this.items.push(...Brick.makeStandardRow(yPos, 1, this.cfg));
        }

        // Setup the King brick (Manual for Duel, Random for Dark)
        if (isDuel) {
            this.hasKing = false;
            this.kingSelectedIndex = Math.floor(this.items.length / 2);
        } else {
            this.hasKing = true;
            if (isDark) {
                let coreBrick = this.items[Math.floor(Math.random() * (this.items.length - 1)) + 1];
                if (coreBrick) { coreBrick.isKing = true; coreBrick.hp = 2; coreBrick.mhp = 2; }
            }
        }
        this.isInitialized = true;
    }

    update() {
        if (!this.isInitialized) this.initGame();
        let scene = getActiveScene();
        if (this.lightTimer > 0) {
            this.lightTimer--;
        }

        let isDuel = (scene && scene.mode === 'DUEL');
        let visibleActiveCount = 0;

        for (let b of this.items) {
            if (b === this.dummyBrick) continue;

            // Check if King is destroyed -> Win or Lose
            if (b.isKing && !b.active) {
                if (scene && scene.manage) scene.manage.state = isDuel ? 'GAMEOVER' : 'WON';
            }

            // Spawn new item drop if brick is broken
            if (b.needsDrop) {
                this.drops.push({ x: b.x + b.w / 2, y: b.y + b.h / 2, w: 44, h: 28, speed: 2.5, type: b.dropType, effect: b.dropEffect });
                b.needsDrop = false;
            }
            if (b.active) { visibleActiveCount++; b.update(); }
        }

        // Classic Mode Logic: Automatically spawn new rows over time
        if (scene && scene.mode === 'CLASSIC' && scene.manage && scene.manage.state === 'PLAYING') {
            this.spawnTimer += deltaTime;
            if (this.spawnTimer > this.spawnInterval) { this.spawnTimer = 0; this.wave++; this.shiftAndSpawnRows(2); }
            // Spawn 4 rows immediately if the screen is cleared
            if (visibleActiveCount === 0) { this.spawnTimer = 0; this.wave++; this.shiftAndSpawnRows(4); }
        }

        // Garbage Collection: Remove dead bricks from the array
        this.items = this.items.filter(b => b.active || b === this.dummyBrick);

        // Update falling items movement and catch detection
        for (let i = this.drops.length - 1; i >= 0; i--) {
            let d = this.drops[i]; d.y += d.speed;
            if (d.y > 650) { this.drops.splice(i, 1); continue; }
            // Collision check: Paddle catches the Light item
            if (d.type === 'light' && scene && scene.paddle) {
                let p = scene.paddle;
                if (d.x - d.w / 2 < p.x + p.w && d.x + d.w / 2 > p.x && d.y - d.h / 2 < p.y + p.h && d.y + d.h / 2 > p.y) {
                    this.lightTimer = 120; // 2 seconds of light
                    this.drops.splice(i, 1);
                }
            }
        }
        this.updateKingSelection(scene);
    }

    // Choosing King logic for Duel mode
    updateKingSelection(scene) {
        if (scene && scene.mode === 'DUEL' && !this.hasKing && this.items.length > 0) {
            let isP2 = scene.bricks2 === this;
            let leftKey = isP2 ? LEFT_ARROW : 65, rightKey = isP2 ? RIGHT_ARROW : 68, confirmKey = isP2 ? UP_ARROW : 87;
            if (this.keyCooldown > 0) this.keyCooldown--;
            if (this.keyCooldown <= 0) {
                // Select left/right 
                if (keyIsDown(leftKey)) { this.kingSelectedIndex--; this.keyCooldown = 10; }
                else if (keyIsDown(rightKey)) { this.kingSelectedIndex++; this.keyCooldown = 10; }
            }
            this.kingSelectedIndex = (this.kingSelectedIndex + this.items.length) % this.items.length;
            let targetBrick = this.items[this.kingSelectedIndex];
            // Press confirm key to set King 
            if (targetBrick && targetBrick.active && keyIsDown(confirmKey)) {
                targetBrick.isKing = true; targetBrick.hp = 2; targetBrick.mhp = 2; this.hasKing = true;
            }
        }
    }

    display() {
        if (!this.isInitialized) this.initGame();
        // 1. Draw active bricks
        push(); for (let b of this.items) { if (b !== this.dummyBrick && b.active) b.display(); } pop();

        // 2. Draw falling items
        this.displayDrops();

        // 3. Draw yellow selection cursor (Duel mode only)
        let scene = getActiveScene();
        if (scene && scene.mode === 'DUEL' && !this.hasKing && this.items.length > 0) {
            let targetBrick = this.items[this.kingSelectedIndex];
            if (targetBrick && targetBrick.active) {
                push();
                stroke(255, 255, 0);
                strokeWeight(3);
                noFill();
                // Create a "breathing" animation effect using sin()
                let glow = 2 + sin(frameCount * 0.2) * 2;
                rect(targetBrick.x - glow, targetBrick.y - glow, targetBrick.w + glow * 2, targetBrick.h + glow * 2, 6); pop();
            }
        }
    }

    // Draw Drops: Uses a clip mask to ensure items stay inside the play area.
    displayDrops() {
        if (this.drops.length === 0) return;
        push(); drawingContext.save(); drawingContext.beginPath(); drawingContext.rect(25, 25, 450, 600); drawingContext.clip();
        rectMode(CENTER); textAlign(CENTER, CENTER); textStyle(BOLD);
        // Short text mapping for items
        const iconMap = { 'ball_large': 'B+', 'ball_slow': 'S-', 'paddle_long': 'P+', 'ball_multi': 'x3', 'ball_small': 'B-', 'ball_fast': 'S+', 'paddle_short': 'P-', 'paddle_reverse': 'Rev' };
        for (let d of this.drops) {
            if (d.type === 'debuff') fill(255, 105, 97); else fill(119, 221, 119);
            rect(d.x, d.y, d.w, d.h, 6); noStroke(); fill(255); textSize(14);
            text(d.type === 'light' ? '💡' : (iconMap[d.effect] || ''), d.x, d.y);
        }
        drawingContext.restore(); pop();
    }

    // Scroll Logic: Moves current bricks down and generates new rows at the top.
    shiftAndSpawnRows(rowCount) {
        let dist = rowCount * (this.cfg.BH + this.cfg.GAP);
        for (let b of this.items) { if (b !== this.dummyBrick) b.y += dist; }
        for (let r = 0; r < rowCount; r++) {
            this.items.push(...Brick.makeStandardRow(this.cfg.Y0 + r * (this.cfg.BH + this.cfg.GAP), 1, this.cfg));
        }
    }
}
