class Brick {
    static COLOR_RED    = [255, 105, 97];
    static COLOR_GREEN  = [119, 221, 119];
    static COLOR_BLUE   = [135, 206, 235];
    static COLOR_PURPLE = [160,  80, 220]; 

    constructor(x, y, w, h, opts = {}) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.hp = opts.hp ?? 1;
        this.mhp = this.hp;
        this.lv = opts.lv ?? 1;
        this.isKing = opts.isKing ?? false;
        this.owner = opts.owner ?? 0;
        this.color = opts.color ?? Brick.COLOR_BLUE;
        this.dropType = opts.dropType ?? null; 
        
        this._active = true; 
        this.flash = 0;
        this.flashT = 0; 
        this.needsDrop = false; 
    }

    get active() { return this._active; }
    set active(val) {
        if (val === false && this._active === true) {
            this.hp--;
            this.flash = 6;
            this.flashT = 8;
            if (this.hp > 0) {
                this._active = true;
            } else {
                this._active = false;
                if (this.dropType) {
                    this.needsDrop = true; 
                }
            }
        } else {
            this._active = val;
        }
    }

    update() {
        if (this.flash > 0) this.flash--;
        if (this.flashT > 0) this.flashT--;
    }

    display() {
        if (!this._active) return;
        push();
        
        if (this.isKing) {
            if (this.flash > 0) {
                fill(255); stroke(255);
                rect(this.x, this.y, this.w, this.h, 8);
            } else {
                fill(80, 0, 0); 
                stroke(255, 215, 0); 
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.h, 8); 
                
                noStroke();
                fill(255, 50, 50); 
                ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w * 0.6, this.h * 0.7);
                fill(255, 255, 0); 
                ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w * 0.3, this.h * 0.4);
            }
            
            if (this.hp < this.mhp) {
                noStroke(); fill(60); rect(this.x + 2, this.y + this.h - 4, this.w - 4, 3);
                fill(255, 50, 50); rect(this.x + 2, this.y + this.h - 4, (this.w - 4) * (this.hp / this.mhp), 3);
            }
            pop();
            return; 
        }
        
        if (this.flash > 0) { fill(255); stroke(255); } 
        else { 
            fill(this.color[0], this.color[1], this.color[2]); 
            stroke(min(this.color[0]+60, 255), min(this.color[1]+60, 255), min(this.color[2]+60, 255)); 
        }
        strokeWeight(1); 
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h, 4);
        
        if ((this.lv === 2 || this.mhp >= 2) && this.hp < this.mhp) {
            noStroke(); fill(60); rect(this.x + 2, this.y + this.h - 4, this.w - 4, 3);
            fill(180, 80, 255); rect(this.x + 2, this.y + this.h - 4, (this.w - 4) * (this.hp / this.mhp), 3);
        }
        pop();
    }

    static makeStandardRow(y, ignoredLv, cfg) {
        const row = [];
        const wave = (typeof gamePage !== 'undefined' && gamePage._wave) ? gamePage._wave : 1;
        const isDark = (typeof gamePage !== 'undefined' && (gamePage.mode === 'DARK' || gamePage.mode === 'ILLUMINATED'));
        
        const pProb = isDark ? 0.25 : Math.min(0.05 + wave * 0.05, 0.60);

        for (let c = 0; c < cfg.COLS; c++) {
            let hp = Math.random() < pProb ? 2 : 1;
            let col = null;
            let drop = null;

            if (hp === 2) {
                col = Brick.COLOR_PURPLE; 
                if (isDark) {
                    drop = Math.random() < 0.50 ? 'light' : 'buff';
                }
            } else {
                if (isDark) {
                    col = Brick.COLOR_BLUE;
                } else {
                    let r = Math.random();
                    if (r < 0.15) { 
                        col = Brick.COLOR_RED; 
                        drop = 'debuff'; 
                    } else if (r < 0.30) { 
                        col = Brick.COLOR_GREEN; 
                        drop = 'buff'; 
                    } else { 
                        col = Brick.COLOR_BLUE; 
                    }
                }
            }
            
            row.push(new Brick(cfg.X0 + c * (cfg.BW + cfg.GAP), y, cfg.BW, cfg.BH, { hp, lv: hp, color: col, dropType: drop }));
        }
        return row;
    }
}

class Bricks {
    constructor() {
        this.cfg = { COLS: 7, ROWS: 8, BW: 45, BH: 20, GAP: 5, X0: 75, Y0: 80 };
        this.items = []; 
        this.drops = []; 
        this.wave = 1;
        this.spawnTimer = 0; 
        
        this.spawnInterval = 20000;
        
        this.dummyBrick = new Brick(-1000, -1000, 10, 10, { hp: 999999 });
        this.lightTimer = 0;
        this.isInitialized = false;
        
        this.patchBallPhysics();
    }

    patchBallPhysics() {
        if (typeof Ball !== 'undefined' && !Ball.prototype._physicsPatched) {
            Ball.prototype.checkBrickCollision = function(bricks) {
                let hitBricks = [];
                for (let brick of bricks) {
                    if (!brick.active) continue;
                    let bcX = brick.x + brick.w / 2; 
                    let bcY = brick.y + brick.h / 2; 
                    let dX = Math.abs(this.pos.x - bcX);
                    let dY = Math.abs(this.pos.y - bcY);
                    
                    let overlapX = (brick.w / 2 + this.r) - dX;
                    let overlapY = (brick.h / 2 + this.r) - dY;

                    if (overlapX > 0 && overlapY > 0) {
                        let isCorner = dX > brick.w/2 && dY > brick.h/2;
                        if (isCorner) {
                            let cornerDistSq = Math.pow(dX - brick.w/2, 2) + Math.pow(dY - brick.h/2, 2);
                            if (cornerDistSq >= this.r * this.r) continue; 
                        }
                        hitBricks.push({ brick, overlapX, overlapY, bcX, bcY });
                    }
                }

                if (hitBricks.length > 0) {
                    hitBricks.sort((a, b) => Math.min(a.overlapX, a.overlapY) - Math.min(b.overlapX, b.overlapY));
                    let target = hitBricks[0];
                    let b = target.brick;

                    b.active = false;
                    if (typeof gamePage !== 'undefined' && gamePage.manage) {
                        gamePage.manage.score += 100;
                    }

                    if (target.overlapX < target.overlapY) {
                        if ((this.pos.x < target.bcX && this.vel.x > 0) || (this.pos.x > target.bcX && this.vel.x < 0)) {
                            this.vel.x *= -1; 
                        }
                        this.pos.x = this.pos.x < target.bcX ? b.x - this.r : b.x + b.w + this.r;
                    } else {
                        if ((this.pos.y < target.bcY && this.vel.y > 0) || (this.pos.y > target.bcY && this.vel.y < 0)) {
                            this.vel.y *= -1; 
                        }
                        this.pos.y = this.pos.y < target.bcY ? b.y - this.r : b.y + b.h + this.r;
                    }
                }
            };
            Ball.prototype._physicsPatched = true;
        }
    }

    initGame() {
        this.items = []; 
        this.drops = [];
        let isClassic = (typeof gamePage !== 'undefined' && gamePage.mode === 'CLASSIC');
        
        if (isClassic) this.items.push(this.dummyBrick);
        
        for (let r = 0; r < 4; r++) {
            let yPos = this.cfg.Y0 + r * (this.cfg.BH + this.cfg.GAP);
            this.items.push(...Brick.makeStandardRow(yPos, 1, this.cfg));
        }

        let isDark = (typeof gamePage !== 'undefined' && (gamePage.mode === 'DARK' || gamePage.mode === 'ILLUMINATED'));
        if (isDark) {
            let coreIndex = Math.floor(Math.random() * (this.items.length - 1)) + 1;
            let coreBrick = this.items[coreIndex];
            coreBrick.isKing = true;
            coreBrick.hp = 2;       
            coreBrick.mhp = 2;
        }

        this.isInitialized = true;
    }

    shiftAndSpawnRows(rowCount) {
        let dist = rowCount * (this.cfg.BH + this.cfg.GAP);
        for (let b of this.items) { if (b !== this.dummyBrick) b.y += dist; }
        for (let r = 0; r < rowCount; r++) {
            this.items.push(...Brick.makeStandardRow(this.cfg.Y0 + r * (this.cfg.BH + this.cfg.GAP), 1, this.cfg));
        }
    }

    update() {
        if (!this.isInitialized) this.initGame();

        let visibleActiveCount = 0;
        for (let b of this.items) {
            if (b === this.dummyBrick) continue;
            
            if (b.needsDrop) {
                let dropW = 44, dropH = 28;
                this.drops.push({
                    x: b.x + b.w / 2, 
                    y: b.y + b.h / 2, 
                    w: dropW, 
                    h: dropH, 
                    r: dropH / 2, 
                    speed: 2.5, 
                    type: b.dropType 
                });
                b.needsDrop = false; 
            }

            if (b.active) {
                visibleActiveCount++;
                b.update(); 
                
                if (b.y + b.h >= 600 && typeof gamePage !== 'undefined' && gamePage.manage) {
                    gamePage.manage.state = 'GAMEOVER';
                }
            } else {
                if (b.isKing && typeof gamePage !== 'undefined' && gamePage.manage) {
                    gamePage.manage.state = 'WON';
                }
            }
        }

        if (typeof gamePage !== 'undefined' && gamePage.manage) {
            if (gamePage.mode === 'CLASSIC' && gamePage.manage.timer <= 0) {
                gamePage.manage.state = 'WON'; 
            }

            if (gamePage.mode === 'CLASSIC' && gamePage.manage.state === 'PLAYING') {
                this.spawnTimer += deltaTime; 
                if (this.spawnTimer > this.spawnInterval) {
                    this.spawnTimer = 0; 
                    this.wave++; 
                    gamePage._wave = this.wave;
                    this.shiftAndSpawnRows(2); 
                }
                if (visibleActiveCount === 0) {
                    this.spawnTimer = 0; 
                    this.wave++; 
                    gamePage._wave = this.wave;
                    this.shiftAndSpawnRows(4); 
                }
            }
        }

        for (let i = this.drops.length - 1; i >= 0; i--) {
            let d = this.drops[i];
            d.y += d.speed; 
            
            if (d.y > 625) { 
                this.drops.splice(i, 1);
                continue;
            }

            if (d.type === 'light' && typeof gamePage !== 'undefined' && gamePage.paddle) {
                let p = gamePage.paddle;
                if (d.x - d.w/2 < p.x + p.w && d.x + d.w/2 > p.x &&
                    d.y - d.h/2 < p.y + p.h && d.y + d.h/2 > p.y) {
                    
                    this.lightTimer = 120; 
                    this.drops.splice(i, 1); 
                }
            }
        }

        if (this.lightTimer > 0) {
            this.lightTimer--;
            if (typeof gamePage !== 'undefined') {
                if (this.lightTimer > 0) {
                    if (gamePage.mode === 'DARK') gamePage.mode = 'ILLUMINATED';
                } else {
                    if (gamePage.mode === 'ILLUMINATED') gamePage.mode = 'DARK';
                }
            }
        }

        this.items = this.items.filter(b => b.active || b === this.dummyBrick || b.needsDrop);
    }

    display() {
        if (!this.isInitialized) this.initGame();

        let isPlaying = (typeof gamePage !== 'undefined' && gamePage.manage && gamePage.manage.state === 'PLAYING');
        if (isPlaying) {
            this.update();
            if (typeof gamePage !== 'undefined' && gamePage.paddle && typeof gamePage.paddle.checkCatch === 'function') {
                gamePage.paddle.checkCatch(this);
            }
        }

        push();
        for (let b of this.items) {
            if (b !== this.dummyBrick && b.active) {
                b.display(); 
            }
        }
        pop();

        this.displayDrops();
    }

    displayDrops() {
        push();
        drawingContext.save();
        drawingContext.beginPath();
        drawingContext.rect(25, 25, 450, 600); 
        drawingContext.clip();

        rectMode(CENTER);
        for (let d of this.drops) {
            if (d.type === 'debuff') {
                fill(255, 105, 97); 
                stroke(255);
            } else {
                fill(119, 221, 119); 
                if (d.type === 'light') {
                    stroke(255, 223, 0); 
                    strokeWeight(3);
                } else {
                    stroke(255);
                    strokeWeight(2);
                }
            }
            rect(d.x, d.y, d.w, d.h, 6); 
        }
        
        drawingContext.restore(); 
        pop();
    }
}