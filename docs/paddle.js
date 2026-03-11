//  paddle.js  —  Paddle class for CORE_BREAKER

class Paddle {

  constructor(p, x, y, w, h, ctrl = 'mouse', opts = {}) {
    this.p      = p;
    this.x      = x;
    this.y      = y;
    this.w      = w;
    this.h      = h;
    this.ctrl   = ctrl;  // 'mouse' | 'kbd_p1' | 'kbd_p2'

    // Config
    this.baseW    = w;
    this.speed    = opts.speed   ?? 6;
    this.canvasW  = opts.canvasW ?? 500;
    this.color    = opts.color   ?? [200, 120, 0];

    // Width animation
    this._targetW = w;
    this._wideW   = opts.wideW  ?? w;   // expanded width (stealth WIDE powerup)
    this._wide    = false;

    // Reversed control (REVERSE powerup in standard mode)
    this.reversed = false;
  }

  //Control

  update(mouseX = null, keys = {}) {
    if (this.ctrl === 'mouse') {
      let tx = (mouseX ?? this.p.mouseX) - this.w / 2;
      if (this.reversed) tx = (this.canvasW - (mouseX ?? this.p.mouseX)) - this.w / 2;
      this.x = this.p.constrain(tx, 0, this.canvasW - this.w);

    } else if (this.ctrl === 'kbd_p1') {
      if (keys['KeyA']) this.x -= this.speed;
      if (keys['KeyD']) this.x += this.speed;
      this.x = this.p.constrain(this.x, 0, this.canvasW - this.w);

    } else if (this.ctrl === 'kbd_p2') {
      if (keys['ArrowLeft'])  this.x -= this.speed;
      if (keys['ArrowRight']) this.x += this.speed;
      this.x = this.p.constrain(this.x, 0, this.canvasW - this.w);
    }

    // Animate width change
    if (Math.abs(this.w - this._targetW) > 0.5) {
      this.w += (this._targetW - this.w) * 0.18;
    } else {
      this.w = this._targetW;
    }
  }

  // Width powerup

  /** Activate WIDE paddle (stealth mode) */
  activateWide() {
    this._wide    = true;
    this._targetW = this._wideW;
  }

  /** Deactivate WIDE paddle */
  deactivateWide() {
    this._wide    = false;
    this._targetW = this.baseW;
  }

  get isWide() { return this._wide; }

  // Draw 

  /** Standard / Stealth draw: orange/cyan paddle */
  draw() {
    const p = this.p;
    const [r, g, b] = this.isWide
      ? [0, 200, 200]   // teal tint when wide
      : this.color;
    p.fill(r, g, b);
    p.noStroke();
    p.rect(this.x, this.y, this.w, this.h);
  }

  /** Duel P1 paddle (bottom, cyan) */
  drawP1() {
    this.p.fill(0, 200, 140);
    this.p.noStroke();
    this.p.rect(this.x, this.y, this.w, this.h);
  }

  /** Duel P2 paddle (top, red) */
  drawP2() {
    this.p.fill(220, 60, 60);
    this.p.noStroke();
    this.p.rect(this.x, this.y, this.w, this.h);
  }
}


