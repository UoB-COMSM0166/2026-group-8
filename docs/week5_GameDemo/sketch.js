let bricks = [];
let powerUps = [];
let particles = [];
let brickW, brickH;

// Game State Management
let gameState = 'PLAYING'; // 'PLAYING', 'UPGRADE', or 'VICTORY'
let levelCount = 1;
const MAX_LEVEL = 5; // Total days to win
let clickCooldown = 0; // Cooldown to prevent UI click-through
let wallShakeTimer = 0;

// Player Rogue-like Stats (To be read by teammates' ball/paddle module)
let playerStats = {
  atk: 1,
  paddleWidthMod: 1.0,
  ballSpeedMod: 1.0
};

const THEME = {
  bgTop: [255, 252, 248],
  bgBottom: [245, 235, 225],
  border: [255, 180, 180],
  buff: [160, 230, 180],   
  debuff: [255, 160, 170],  
  normal: [150, 210, 255],  
  hard: [180, 150, 130],    
  eye: [40, 40, 40]
};

function setup() {
  createCanvas(800, 600);
  generateRogueLevel();
}

function draw() {
  drawGradientBG();

  // Cooldown timer decreases every frame
  if (clickCooldown > 0) clickCooldown--;

  // Handle screen shake
  let sx = 0, sy = 0;
  if (wallShakeTimer > 0) {
    sx = random(-6, 6) * (wallShakeTimer / 10);
    sy = random(-6, 6) * (wallShakeTimer / 10);
    wallShakeTimer--;
  }

  push();
  translate(sx, sy);
  drawCreamyBorder();

  if (gameState === 'PLAYING') {
    // Render bricks
    for (let b of bricks) {
      if (b.active) {
        b.scale = lerp(b.scale, 1.0, 0.12); 
        drawJellyBrick(b);
      }
    }
    updatePowerUps();
    updateParticles();
    checkWinCondition(); // Check if level is cleared
  } else if (gameState === 'UPGRADE') {
    drawUpgradeScreen();
  } else if (gameState === 'VICTORY') {
    drawVictoryScreen();
  }
  pop();

  drawUI();
}

//Draw 3D Jelly Brick
function drawJellyBrick(b) {
  push();
  translate(b.x + b.w/2, b.y + b.h/2);
  scale(b.scale);

  // 1. Bottom shadow
  fill(0, 15); noStroke();
  rect(-b.w/2 + 4, -b.h/2 + 4, b.w, b.h, 15);

  // 2. Base color
  let baseCol = (b.health > 1) ? THEME.hard : (b.type === 'buff' ? THEME.buff : (b.type === 'debuff' ? THEME.debuff : THEME.normal));
  fill(baseCol); stroke(255, 150); strokeWeight(2);
  rect(-b.w/2, -b.h/2, b.w, b.h, 15);

  // 3. Inner bottom shadow
  fill(0, 30); noStroke();
  rect(-b.w/2 + 5, b.h/2 - 12, b.w - 10, 8, 10);

  // 4. Top highlight
  fill(255, 180); ellipse(-b.w/4, -b.h/4, b.w/3, b.h/4); 

  // 5. Side reflection
  fill(255, 80); rect(-b.w/2 + 6, -b.h/2 + 6, 6, b.h * 0.4, 10);

  // 6. Facial expression
  fill(THEME.eye);
  if (b.health < b.maxHealth) {
    rect(-12, -4, 10, 3); rect(2, -4, 10, 3); // Hurt squint
  } else {
    ellipse(-12, -5, 7, 9); ellipse(12, -5, 7, 9); // Normal big eyes
    fill(255); ellipse(-13, -7, 2, 2); ellipse(11, -7, 2, 2);
  }
  pop();
}

//Win condition logic
function checkWinCondition() {
  if (bricks.length > 0 && bricks.every(b => !b.active)) {
    gameState = 'UPGRADE'; // Intercept and go to upgrade screen
  }
}

//Draw Upgrade Selection Screen
 
function drawUpgradeScreen() {
  fill(0, 100); 
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text("✨ ALL JELLIES CLEARED! ✨", width/2, 180);
  textSize(18);
  text("Choose a permanent upgrade for the next day:", width/2, 220);

  let options = ["Wider Paddle (Size +20%)", "Slowing Aura (Ball -10%)", "Heavy Strike (ATK +1)"];
  for (let i = 0; i < 3; i++) {
    fill(255, 240, 240);
    stroke(THEME.border);
    strokeWeight(3);
    rect(width/2 - 150, 260 + i * 80, 300, 60, 30);
    
    noStroke();
    fill(100, 50, 50);
    text(options[i], width/2, 297 + i * 80);
  }
}

//Draw Victory Screen
function drawVictoryScreen() {
  fill(255, 240, 240, 200); 
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  fill(THEME.border);
  textSize(48);
  text("🎉 LEVEL CLEARED! 🎉", width/2, height/2 - 40);
  
  fill(THEME.hard);
  textSize(24);
  text("You devoured all the jellies!", width/2, height/2 + 20);
  text(`Final ATK: ${playerStats.atk}`, width/2, height/2 + 60);
  
  textSize(16);
  fill(150);
  text("Click anywhere to restart", width/2, height/2 + 120);
}

function mousePressed() {
  // Prevent click-through and double clicks
  if (clickCooldown > 0) return;

  // 1. Victory screen restart
  if (gameState === 'VICTORY') {
    levelCount = 1;
    playerStats = { atk: 1, paddleWidthMod: 1.0, ballSpeedMod: 1.0 }; 
    generateRogueLevel();
    gameState = 'PLAYING';
    clickCooldown = 45; 
    return;
  }

  // 2. Upgrade screen logic
  if (gameState === 'UPGRADE') {
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150) {
      let optionSelected = false;

      if (mouseY > 260 && mouseY < 320) { playerStats.paddleWidthMod *= 1.2; optionSelected = true; } 
      else if (mouseY > 340 && mouseY < 400) { playerStats.ballSpeedMod *= 0.9; optionSelected = true; } 
      else if (mouseY > 420 && mouseY < 480) { playerStats.atk += 1; optionSelected = true; }
      
      if (optionSelected) {
        levelCount++;
        if (levelCount > MAX_LEVEL) {
          gameState = 'VICTORY';
          clickCooldown = 45; 
        } else {
          generateRogueLevel();
          gameState = 'PLAYING';
          clickCooldown = 45; 
        }
      }
    }
    return;
  }

  // 3. Testing logic for PLAYING state (Delete or comment out once ball is added)
  if (gameState === 'PLAYING') {
    let hit = false;
    for (let b of bricks) {
      if (b.active && mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
        breakBrick(b); hit = true; break;
      }
    }
    // Shake wall on miss
    if (!hit && (mouseX < 30 || mouseX > width-30 || mouseY < 30 || mouseY > height-30)) {
      wallShakeTimer = 10;
    }
  }
}

//Core API: Break Brick 
function breakBrick(b) {
  b.health -= playerStats.atk; 
  b.scale = 0.6; // Jelly hit effect
  if (b.health <= 0) {
    b.active = false;
    let col = (b.type === 'buff' ? THEME.buff : (b.type === 'debuff' ? THEME.debuff : THEME.normal));
    spawnJellyParticles(b.x + b.w/2, b.y + b.h/2, col);
    if (b.type !== 'normal') {
      powerUps.push({ x: b.x+b.w/2, y: b.y, size: 25, speed: 2, effect: b.type, col: col });
    }
  }
}

function spawnJellyParticles(x, y, col) {
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: x, y: y, vx: random(-5, 5), vy: random(-8, 2),
      size: random(8, 15), life: 255, col: col, rot: random(TWO_PI), vRot: random(-0.1, 0.1)
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 8; p.rot += p.vRot;
    push(); translate(p.x, p.y); rotate(p.rot);
    fill(p.col[0], p.col[1], p.col[2], p.life); noStroke();
    rect(-p.size/2, -p.size/2, p.size, p.size, 4); pop();
    if (p.life <= 0) particles.splice(i, 1);
  }
}

// Procedural Level Generation
function generateRogueLevel() {
  bricks = [];
  powerUps = [];   // CLEAR previous power-ups!
  particles = [];  // CLEAR previous particles!
  
  let cols = 7;
  brickW = (width - 150) / cols;
  brickH = 50;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < cols; c++) {
      if (random(1) < 0.6) {
        let type = random() < 0.2 ? 'buff' : (random() < 0.4 ? 'debuff' : 'normal');
        let initialHealth = random() < 0.2 ? 3 : 1; // Dynamic initial health
        
        bricks.push({
          x: c * brickW + 75, y: r * brickH + 120,
          w: brickW - 14, h: brickH - 14,
          active: true, scale: 1.0, type: type,
          health: initialHealth, 
          maxHealth: initialHealth // Ensure big eyes at full health
        });
      }
    }
  }
}

function updatePowerUps() {
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let p = powerUps[i];
    p.y += p.speed;
    let float = sin(frameCount * 0.1) * 4;
    fill(p.col); stroke(255); strokeWeight(3);
    ellipse(p.x, p.y + float, p.size);
    fill(255, 150); noStroke();
    ellipse(p.x - 6, p.y + float - 6, 8, 8);
    if (p.y > height) powerUps.splice(i, 1);
  }
}

function drawCreamyBorder() {
  stroke(THEME.border); strokeWeight(24); noFill();
  rect(12, 12, width - 24, height - 24, 40);
  stroke(255, 120); strokeWeight(3);
  rect(24, 24, width - 48, height - 48, 30);
  noStroke();
}

function drawGradientBG() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(THEME.bgTop), color(THEME.bgBottom), inter);
    stroke(c); line(0, y, width, y);
  }
}

function drawUI() {
  fill(120); textAlign(LEFT); textSize(14);
  text(`DAY: ${levelCount} / ${MAX_LEVEL} | JELLY ROGUE`, 50, 60);
  text(`ATK: ${playerStats.atk}`, 50, 80);
}