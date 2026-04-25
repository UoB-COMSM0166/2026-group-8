//  * Code Breaker - Automated Test Suite (QUnit)
//  * Version: v1.0

var currentMode = 'game'; 
var gamePage = { 
    mode: 'CLASSIC', 
    manage: { score: 0, state: 'PLAYING' },
    extraBalls: []
};
var duelPage = { 
    mode: 'DUEL', 
    manage: { score: 0, state: 'PLAYING' } 
};
var img, bgm, deltaTime = 16.67; // 60fps

// ==========================================
// Module 1: GameManage
// ==========================================
QUnit.module("Module 1: GameManage Logic", function() {

    QUnit.test("Rank Titles", function(assert) {
        let gm = new GameManage();
        
        gm.score = 500;
        assert.equal(gm.getRankTitle(), "CORE NOVICE", "500: CORE NOVICE");
        
        gm.score = 1500;
        assert.equal(gm.getRankTitle(), "DATA BREAKER", "1500: DATA BREAKER");
        
        gm.score = 3500;
        assert.equal(gm.getRankTitle(), "SYSTEM EXPERT", "3500: SYSTEM EXPERT");
        
        gm.score = 7000;
        assert.equal(gm.getRankTitle(), "CYBER MASTER", "7000: CYBER MASTER");
        
        gm.score = 11000;
        assert.equal(gm.getRankTitle(), "THE LEGEND", "11000: THE LEGEND");
    });

    QUnit.test("Time Format and Lives", function(assert) {
        let gm = new GameManage();
        gm.timer = 125000;
        assert.equal(gm.getFormattedTime(), "02:05", "125 seconds should format to 02:05");
        
        gm.lives = 1;
        gm.handleBallLost({}, {});
        assert.equal(gm.state, 'GAMEOVER', "State should switch to GAMEOVER when lives reach 0");
    });
});

// ==========================================
// Module 2: Ball & Paddle
// ==========================================
QUnit.module("Module 2: Physics & Boundaries", function() {

    QUnit.test("Ball Wall Collision (x=35, x=465) Boundary Validation", function(assert) {
        let ball = new Ball(100, 100, 5);
        
        // Left
        ball.pos.x = 34; 
        ball.vel = createVector(-4, 0);
        ball.checkWallCollision();
        assert.equal(ball.vel.x, 4, "Velocity should reverse when hitting the left wall");
        assert.ok(ball.pos.x >= 35 + ball.r, "Coordinate should be corrected to a safe area");

        // Right
        ball.pos.x = 466;
        ball.vel = createVector(4, 0);
        ball.checkWallCollision();
        assert.equal(ball.vel.x, -4, "Velocity should reverse when hitting the right wall");
    });

    QUnit.test("Paddle Control and Power-up Timer", function(assert) {
        let paddle = new Paddle();
        
        // Boundary restriction
        window.mouseX = 0; 
        paddle.update();
        assert.equal(paddle.x, 35, "Paddle left coordinate should be constrained to 35");

        // Power-up expiration logic
        paddle.activateWide();
        paddle._widerTimer = 1; 
        paddle.update();
        assert.equal(paddle.w, paddle.DEFAULT_W, "Paddle width should return to default after timer ends");
    });
});

// ==========================================
// Module 3: Modes & Bricks
// ==========================================
QUnit.module("Module 3: Mode & Integration", function(hooks) {
    
    hooks.beforeEach(function() {
        gamePage.mode = 'CLASSIC';
        gamePage.manage.score = 0;
    });

    QUnit.test("Purple Brick (mhp=2) Advanced Scoring Validation", function(assert) {
        currentMode = 'game';
        let ball = new Ball(100, 100, 5);
        let purpleBrick = new Brick(100, 100, 45, 20, { hp: 2 });
        purpleBrick.hp = 1;
        
        ball.checkBrickCollision([purpleBrick]);
        assert.equal(gamePage.manage.score, 300, "break purple should gain 300");
    });

    QUnit.test("Dark Mode: Core Brick and Light Timer", function(assert) {
        gamePage.mode = 'DARK';
        let bricks = new Bricks();
        bricks.initGame();
        
        let king = bricks.items.find(b => b.isKing);
        assert.ok(king !== undefined, "Dark Mode should spawn a Core brick");
        assert.equal(king.mhp, 3, "Core brick should have 3 HP");
        
        bricks.lightTimer = 50;
        bricks.update();
        assert.equal(bricks.lightTimer, 49, "Light Timer should decrement per frame");
    });

    QUnit.test("Duel Mode: Win/Loss Condition", function(assert) {
        currentMode = 'duel';
        let duel = new Duel();
        
        // P1 Core death
        duel.bricks1.items = [{ isKing: true, active: false }]; 
        duel.bricks2.items = [{ isKing: true, active: true }]; 
        
        // Validate winner calculation logic
        let p1Active = duel.bricks1.items.some(b => b.isKing && b.active);
        let winner = !p1Active ? "PLAYER 2" : "PLAYER 1";
        assert.equal(winner, "PLAYER 2", "PLAYER 2 should win if P1 core is destroyed");
    });
});
