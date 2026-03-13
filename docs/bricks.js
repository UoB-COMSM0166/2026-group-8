class Brick {
  static COLOR_RED    = [255, 105, 97];
  static COLOR_GREEN  = [119, 221, 119];
  static COLOR_BLUE   = [135, 206, 235];
  static COLOR_PURPLE = [160,  80, 220]; 

  static BUFF_POOL = [
    { effect: 'paddle_long',  label: 'W+' }, 
    { effect: 'score_double', label: 'x2' }, 
    { effect: 'ball_slow',    label: 'V-' }  
  ];

  static DEBUFF_POOL = [
    { effect: 'paddle_short', label: 'W-' }, 
    { effect: 'score_half',   label: '/2' }, 
    { effect: 'ball_fast',    label: 'V+' }  
  ];

  constructor(x, y, w, h, opts = {}) {
    this.x      = x;
    this.y      = y;
    this.w      = w;
    this.h      = h;
    this.hp     = opts.hp     ?? 1;
    this.mhp    = this.hp;
    this.lv     = opts.lv     ?? 1;
    this.isKing = opts.isKing ?? false;
    this.owner  = opts.owner  ?? 0;
    this.drop   = opts.drop   ?? false; 
    this.color  = opts.color  ?? null;
    this.customDrop = opts.customDrop ?? null; 
    this.alive  = true;
    this.active = true;
    this.flash  = 0;
    this.flashT = 0;
  }

  hit(dmg = 1) {
    if (!this.alive) return false;
    this.hp -= dmg;
    this.flash = 6;
    this.flashT = 8;
    
    if (this.hp <= 0) {
      this.alive = false;
      this.active = false;

      if (typeof gamePage !== 'undefined' && gamePage._drops) {
        
        if (!gamePage._customPatched) {
          const originalApply = gamePage._applyPowerup;
          gamePage._applyPowerup = function(type) {
            if      (type === 'W+') { this.paddle.activateWide(); }
            else if (type === 'W-') { this.paddle._targetW = 50; } 
            else if (type === 'x2') { this.manage.score *= 2; }
            else if (type === '/2') { this.manage.score = Math.floor(this.manage.score / 2); }
            else if (type === 'V+') { for (let b of this._balls) b.vel.mult(1.2); } 
            else if (type === 'V-') { for (let b of this._balls) b.vel.mult(0.8); } 
            else { originalApply.call(this, type); } // 交还给队友处理
          };
          gamePage._customPatched = true; 
        }

        // Automatically clear all dropped items when the game is over.
        if (!gamePage._renderPatched && gamePage._displayClassic) {
          const originalDisplay = gamePage._displayClassic;
          gamePage._displayClassic = function() {
            if (this.manage.state === 'GAMEOVER' || this.manage.state === 'WON') {
              this._drops = [];
            }
            originalDisplay.call(this);
            push();
            for (const d of this._drops) {
              if (d.dead) continue;
              if (['W+', 'W-', 'x2', '/2', 'V+', 'V-'].includes(d.type)) {
                 const isBuff = ['W+', 'x2', 'V-'].includes(d.type);
                 fill(isBuff ? color(119, 221, 119) : color(255, 105, 97));
                 stroke(255); strokeWeight(2);
                 rect(d.x - 22, d.y - 14, 44, 28, 6); 
                 noStroke(); fill(255); textSize(16); textStyle(BOLD); textAlign(CENTER, CENTER);
                 text(d.type, d.x, d.y);
              }
            }
            pop();
          };
          gamePage._renderPatched = true;
        }

        // Fix ball tunneling (penetration) bug.
        if (typeof Ball !== 'undefined' && !Ball.prototype._physicsPatched) {
          const originalCheckB = Ball.prototype.checkBrickB;
          Ball.prototype.checkBrickB = function(brick, dmg) {
            const hit = originalCheckB.call(this, brick, dmg);
            // Force position correction to prevent tunneling if a hit is successful and not in PIERCE mode.
            if (hit && !this.pierce) {
              const axis = this._brickBounceAxis(brick);
              if (axis === 'y') {
                if (this.pos.y < brick.y + brick.h/2) this.pos.y = brick.y - this.r - 1;
                else this.pos.y = brick.y + brick.h + this.r + 1;
              } else {
                if (this.pos.x < brick.x + brick.w/2) this.pos.x = brick.x - this.r - 1;
                else this.pos.x = brick.x + brick.w + this.r + 1;
              }
            }
            return hit;
          };
          Ball.prototype._physicsPatched = true;
        }

        if (this.customDrop) {
          gamePage._drops.push({ x: this.x + this.w / 2, y: this.y, vy: 2.2, type: this.customDrop.label, dead: false });
        }
      }
      return true;
    }
    return false;
  }

  tickFlash() {
    if (this.flash  > 0) this.flash--;
    if (this.flashT > 0) this.flashT--;
  }

  display() {
    if (!this.alive) return;
    push();
    if (this.flash > 0) { fill(255); stroke(255); }
    else if (this.color) { fill(this.color[0], this.color[1], this.color[2]); stroke(min(this.color[0] + 60, 255), min(this.color[1] + 60, 255), min(this.color[2] + 60, 255)); }
    else { fill(0, 100, 80); stroke(0, 200, 160); }
    strokeWeight(1); rect(this.x, this.y, this.w, this.h);
    if ((this.lv === 2 || this.mhp >= 2) && this.hp < this.mhp) {
      noStroke(); fill(60); rect(this.x + 2, this.y + this.h - 4, this.w - 4, 3);
      fill(180, 80, 255); rect(this.x + 2, this.y + this.h - 4, (this.w - 4) * (this.hp / this.mhp), 3);
    }
    noStroke(); fill(255); textSize(10); textAlign(CENTER, CENTER);
    if (this.isKing) text('CORE', this.x + this.w / 2, this.y + this.h / 2);
    else if (this.lv === 2 || this.mhp >= 2) text('LV2', this.x + this.w / 2, this.y + this.h / 2);
    else text('LV1', this.x + this.w / 2, this.y + this.h / 2);
    pop();
  }

  displayStealth() {
    if (!this.alive) return;
    push();
    if (this.isKing) { fill(this.flashT > 0 ? 255 : 180, 0, 0); stroke(255, 0, 0); strokeWeight(2); rect(this.x, this.y, this.w, this.h); noStroke(); fill(255, 0, 0); textSize(8); textAlign(CENTER, CENTER); text('CORE', this.x + this.w / 2, this.y + this.h / 2); }
    else if (this.mhp >= 2) { fill(this.flashT > 0 ? 255 : 80, this.flashT > 0 ? 255 : 30, this.flashT > 0 ? 255 : 120); stroke(150, 60, 220); strokeWeight(1); rect(this.x, this.y, this.w, this.h); if (this.hp < this.mhp) { noStroke(); fill(40); rect(this.x + 2, this.y + this.h - 4, this.w - 4, 3); fill(150, 60, 220); rect(this.x + 2, this.y + this.h - 4, (this.w - 4) * (this.hp / this.mhp), 3); } noStroke(); fill(200); textSize(8); textAlign(CENTER, CENTER); text(`LV2[${this.hp}]`, this.x + this.w / 2, this.y + this.h / 2); }
    else { fill(this.flashT > 0 ? 255 : 0, this.flashT > 0 ? 255 : 140, this.flashT > 0 ? 255 : 100); stroke(0, 200, 140); strokeWeight(1); rect(this.x, this.y, this.w, this.h); noStroke(); fill(200); textSize(8); textAlign(CENTER, CENTER); text('LV1', this.x + this.w / 2, this.y + this.h / 2); }
    pop();
  }

  displayDuel(img = null, showCursor = false, isSelecting = false) {
    if (!this.alive) return;
    push();
    const isP1 = this.owner === 1;
    if (this.isKing) { fill(this.flashT > 0 ? 255 : 220, this.flashT > 0 ? 220 : 180, 0); stroke(255, 200, 0); strokeWeight(2); rect(this.x, this.y, this.w, this.h); noStroke(); fill(0); textSize(8); textAlign(CENTER, CENTER); text('CORE', this.x + this.w / 2, this.y + this.h / 2); }
    else { const fr = this.flashT > 0 ? 255 : (isP1 ? 0 : 120); const fg = this.flashT > 0 ? 255 : (isP1 ? 120 : 20); const fb = this.flashT > 0 ? 255 : (isP1 ? 80 : 20); fill(fr, fg, fb); stroke(isP1 ? 0 : 220, isP1 ? 200 : 60, isP1 ? 140 : 60); strokeWeight(1); rect(this.x, this.y, this.w, this.h); if (isSelecting && showCursor) { noFill(); stroke(255); strokeWeight(2); rect(this.x + 2, this.y + 2, this.w - 4, this.h - 4); noStroke(); fill(255); textSize(8); textAlign(CENTER, CENTER); const labelY = isP1 ? this.y - 4 : this.y + this.h + 10; text('▲ CORE', this.x + this.w / 2, labelY); } }
    pop();
  }

  static makeStandardRow(y, ignoredLv, cfg) {
    const row = [];
    const currentWave = (typeof gamePage !== 'undefined' && gamePage._wave) ? gamePage._wave : 0;
    const purpleProb = Math.min(0.25 + currentWave * 0.04, 0.65);
    for (let c = 0; c < cfg.COLS; c++) {
      let hp = Math.random() < purpleProb ? 2 : 1; 
      let pColor = null; let selectedCustomDrop = null; let useOriginalDrop = false; 
      if (hp === 2) { 
        pColor = Brick.COLOR_PURPLE; 
        useOriginalDrop = Math.random() < 0.12;
      } else {
        let randColor = Math.random();
        if (randColor < 0.33) { 
          pColor = Brick.COLOR_RED; 
          selectedCustomDrop = Brick.DEBUFF_POOL[Math.floor(Math.random() * Brick.DEBUFF_POOL.length)]; 
        } else if (randColor < 0.66) { 
          pColor = Brick.COLOR_GREEN; 
          selectedCustomDrop = Brick.BUFF_POOL[Math.floor(Math.random() * Brick.BUFF_POOL.length)]; 
        } else { 
          pColor = Brick.COLOR_BLUE; 
        }
      }
      row.push(new Brick(cfg.X0 + c * (cfg.BW + cfg.GAP), y, cfg.BW, cfg.BH, { hp, lv: hp, color: pColor, customDrop: selectedCustomDrop, drop: useOriginalDrop }));
    }
    return row;
  }

  static makeStealthGrid(layout, cfg) {
    const bricks = [];
    for (let row = 0; row < layout.length; row++) { for (let col = 0; col < layout[row].length; col++) { const hp = layout[row][col]; bricks.push(new Brick(cfg.X0 + col * cfg.BW, cfg.Y0 + row * cfg.BH, cfg.BW, cfg.BH, { hp })); } }
    const hard = bricks.filter(b => b.mhp >= 2); const pool = hard.length ? hard : bricks; const k = pool[Math.floor(Math.random() * pool.length)]; k.isKing = true;
    return { bricks, kingIdx: bricks.indexOf(k) };
  }

  static makeDuelWalls(cfg) {
    const bricks = [], p1Bricks = [], p2Bricks = [];
    for (let row = 0; row < cfg.ROWS; row++) { for (let col = 0; col < cfg.COLS; col++) { p2Bricks.push(bricks.length); bricks.push(new Brick(col * cfg.BW, cfg.P2_BRICK_Y + row * cfg.BH, cfg.BW, cfg.BH, { owner: 2 })); } }
    for (let row = 0; row < cfg.ROWS; row++) { for (let col = 0; col < cfg.COLS; col++) { p1Bricks.push(bricks.length); bricks.push(new Brick(col * cfg.BW, cfg.P1_BRICK_Y + row * cfg.BH, cfg.BW, cfg.BH, { owner: 1 })); } }
    return { bricks, p1Bricks, p2Bricks };
  }
}

class Bricks {
  constructor() {
    this.brickW = 45;
    this.brickH = 20;
    this.items  = [];
  }
  display() {
    for (let b of this.items) { b.tickFlash(); b.display(); }
  }
}
