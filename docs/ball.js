/* ball.js  —  Ball class for CORE_BREAKER
   Supports three modes: standard (multi-ball, powerups), stealth  (single ball, light-radius), duel (single ball, accelerating) */
class Ball {
  /* p - p5 instance
     x - initial x
     y - initial y
     r - radius
     [opts] - { fire, pierce, dead }
   */
  constructor(p, x, y, r, opts = {}) {
    this.p      = p;
    this.x      = x;
    this.y      = y;
    this.r      = r;
    this.vx     = 0;
    this.vy     = 0;

    // Standard-mode powerup flags
    this.fire   = opts.fire   ?? false; // OVERFLOW: deals 2 dmg per hit
    this.pierce = opts.pierce ?? false; // PIERCE: doesn't bounce off bricks

    this.dead   = opts.dead   ?? false; // Lifecycle
  }


  clone(dvx = 0, dvy = 0) {  // Cloning
    const b = new Ball(this.p, this.x, this.y, this.r, {
      fire: this.fire, pierce: this.pierce,
    });
    b.vx = this.vx + dvx;
    b.vy = this.vy + dvy;
    return b;
  }

  // Launch helpers
  launch(speed, spreadDeg = 20) {   // Standard & stealth launch: angled upward from paddle
    const a = (Math.random() * spreadDeg * 2 - spreadDeg) * Math.PI / 180;
    this.vx = speed * Math.sin(a);
    this.vy = -speed;
  }

  launchDuel(speed, spreadDeg = 15) {  //Duel launch: random direction (up or down)
    const a   = (Math.random() * spreadDeg * 2 - spreadDeg) * Math.PI / 180;
    const dir = Math.random() > 0.5 ? 1 : -1;
    this.vx   = speed * Math.sin(a);
    this.vy   = speed * Math.cos(a) * dir;
  }

  
  /* Physics
   Move ball; reflect off left/right/top walls.
   Returns 'lost' if ball exits bottom (or top in duel).
   W - canvas width
   H - canvas height
   [duelTop=false] - also reflect off top in duel mode
   */
  move(W, H, duelTop = false) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.r < 0) { this.x = this.r;     this.vx =  Math.abs(this.vx); }  // Left and right walls
    if (this.x + this.r > W) { this.x = W - this.r; this.vx = -Math.abs(this.vx); }

    
    if (duelTop) { // Top wall
      // In duel the ball scores when it exits top
      if (this.y + this.r < 0) return 'scored_p1';   // ball exited P2 side → P1 scores
    } else {
      if (this.y - this.r < 0) { this.y = this.r; this.vy = Math.abs(this.vy); }
    }

    
    if (this.y - this.r > H) { // Bottom exit (standard/stealth = ball lost; duel = P2 scores)
      if (duelTop) return 'scored_p2';
      this.dead = true;
      return 'lost';
    }

    return null;
  }

  checkPaddle(paddle, maxSpeed = 10, accel = 0, fromBelow = false) {  // Check & resolve collision with a Paddle object.
    if (!this._hitsRect(paddle)) return false;

    const movingToward = fromBelow ? this.vy < 0 : this.vy > 0;
    if (!movingToward) return false;

    const spd = Math.min(Math.hypot(this.vx, this.vy) + accel, maxSpeed);
    const dir = Ball._paddleBounceDir(paddle.x, paddle.w, this.x);

    this.vx = dir.vx * spd;
    this.vy = fromBelow ? -Math.abs(dir.vy) * spd : Math.abs(dir.vy) * spd * -1;

    
    this.y = fromBelow  // Un-embed
      ? paddle.y + paddle.h + this.r + 1
      : paddle.y - this.r - 1;

    return true;
  }

  checkBrick(brick, dmg = 1) {  // Check & resolve collision with a Brick object.
    if (!brick.alive || !this._hitsRect(brick)) return false;

    const axis = this._brickBounceAxis(brick);
    if (!this.pierce) {
      if (axis === 'y') this.vy *= -1; else this.vx *= -1;
    }

    brick.hit(dmg);
    return true; // Applies damage; returns true if hit occurred.
  }

  // Rendering
  draw() {  // Standard mode: colour reflects powerup state
    const p = this.p;
    if (this.dead) return;

    let r = 100, g = 200, b = 255; // default: soft blue
    if (this.fire)  { r = 255; g = 120; b = 0;   } // orange-red
    if (this.pierce){ r = 255; g = 220; b = 0;   } // yellow

    p.fill(r, g, b);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r * 2);
  }

  
  drawStealth() { // Stealth mode which draw ball with a subtle glow halo
    const p = this.p;
    // Outer halo (drawn before clipping for the light effect)
    p.noStroke();
    p.fill(100, 180, 255, 40);
    p.ellipse(this.x, this.y, this.r * 6);
    p.fill(100, 180, 255, 80);
    p.ellipse(this.x, this.y, this.r * 3);
    // Core
    p.fill(100, 180, 255);
    p.ellipse(this.x, this.y, this.r * 2);
  }

  
  drawDuel() { // Duel mode: purple tint, speed-based glow radius
    const p    = this.p;
    const spd  = Math.hypot(this.vx, this.vy);
    const glow = this.p.map(spd, 5, 12, 0, 80, true);
    if (glow > 0) {
      p.noStroke(); p.fill(220, 180, 255, glow);
      p.ellipse(this.x, this.y, this.r * 4);
    }
    p.fill(220, 180, 255);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r * 2);
  }

  // Private helpers
  _hitsRect(rect) {
    return this.x + this.r > rect.x &&
           this.x - this.r < rect.x + rect.w &&
           this.y + this.r > rect.y &&
           this.y - this.r < rect.y + rect.h;
  }

  _brickBounceAxis(b) {
    const ol  = this.x + this.r - b.x;
    const or2 = b.x + b.w - (this.x - this.r);
    const ot  = this.y + this.r - b.y;
    const ob  = b.y + b.h - (this.y - this.r);
    const mv  = Math.min(ol, or2, ot, ob);
    return (mv === ot || mv === ob) ? 'y' : 'x';
  }

  static _paddleBounceDir(px, pw, bx) {
    const off = (bx - (px + pw / 2)) / (pw / 2);
    const ang = Math.max(-1, Math.min(1, off)) * (65 * Math.PI / 180);
    return { vx: Math.sin(ang), vy: -Math.cos(ang) };
  }
}
