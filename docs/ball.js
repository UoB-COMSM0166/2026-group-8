class Ball {
    constructor(x, y, r) {
        // Ball position (represented as a vector)
        this.pos = createVector(x, y); // pos.x is horizontal coordinate, pos.y is vertical coordinate
        // Ball velocity (vector)
        this.vel = createVector(4, -4); // x direction 4 means moving right, y direction -4 means moving up
        this.r = r; // Radius
        // Record the initial state for later scaling
        this.originalR = r; 
        this.baseSpeed = 5.65; // Used as a speed reference

    // MODIFIED: Added timers and state flags for overlapping effects (each lasts 6s/360 frames)
        this.effects = {
            large: 0,
            small: 0,
            fast: 0,
            slow: 0
        };
    }

    // Update every frame (core function), called continuously inside draw()
    update(paddle, bricks) {
        // MODIFIED: Update effect timers every frame (assuming 60fps, 360 frames = 6s)
        for (let key in this.effects) {
            if (this.effects[key] > 0) this.effects[key]--;
        }
        // MODIFIED: Apply dynamic scaling based on active timers
        this.applyDynamicStatus();
        if (paddle.isBallAttached) {
            this.pos.x = paddle.x + paddle.w / 2;
            this.pos.y = paddle.y - this.r;
        } else {
            this.pos.add(this.vel); // position = current position + velocity
            this.checkWallCollision(); // Check wall collision
            this.checkPaddleCollision(paddle); // Check paddle collision
            this.checkBrickCollision(bricks); // Check brick collision
            
            // MODIFIED: Safer check for gamePage to prevent "Cannot read properties of undefined"
            if (typeof gamePage !== 'undefined' && gamePage && gamePage.bricks) {
                this.checkDropCollision(gamePage.bricks.drops, paddle);
            }
        }
    }

    // MODIFIED: New helper to calculate overlapping scale and speed
    applyDynamicStatus() {
        let rScale = 1.0;
        let sScale = 1.0;

        if (this.effects.large > 0) rScale *= 1.5;
        if (this.effects.small > 0) rScale *= 0.6;
        if (this.effects.fast > 0) sScale *= 1.4;
        if (this.effects.slow > 0) sScale *= 0.7;

        // MODIFIED: Added safety check for this.vel
        if (this.vel && this.vel.mag() !== 0) {
            this.vel.setMag(this.baseSpeed * sScale);
        }
    
        this.r = this.originalR * rScale;
    }

    // Display the ball
    display() {
        fill('#4A90D9');
        stroke('#4A90D9');
        strokeWeight(3);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }


    // Wall collision (left, right, top walls; bottom handled by Game)
    checkWallCollision() {

        if (this.pos.x - this.r < 35) {
            this.pos.x = 35 + this.r;
            this.vel.x *= -1;
        }

        if (this.pos.x + this.r > 465) {
            this.pos.x = 465 - this.r;
            this.vel.x *= -1;
        }

        if (this.pos.y - this.r < 35) {
            this.pos.y = 35 + this.r;
            this.vel.y *= -1;
        }
    }


    // Paddle collision, change angle based on hit position
    checkPaddleCollision(paddle) {
        /* Check rectangle collision
        Conditions:
        1. Ball x is within paddle range
        2. Ball y touches the paddle
        3. Ball is moving downward (avoid repeated triggering)
        */
        if (
            this.pos.x > paddle.x &&
            this.pos.x < paddle.x + paddle.w &&
            this.pos.y + this.r > paddle.y &&
            this.pos.y - this.r < paddle.y + paddle.h &&
            this.vel.y > 0
        ) {
            // Calculate hit position relative to paddle center
            let hitPos = // Calculate the ball hit point relative to paddle center
                (this.pos.x - (paddle.x + paddle.w / 2))
                / (paddle.w / 2); // Result range: -1 to 1 (-1 far left; 0 center; 1 far right)
            let maxAngle = radians(60); // Maximum reflection angle: 60 degrees
            let angle = hitPos * maxAngle; // Actual reflection angle
            let speed = this.vel.mag(); // Record current speed magnitude (change direction only)

            // Recalculate velocity based on angle
            this.vel.x = speed * sin(angle); // x uses sin
            this.vel.y = -speed * cos(angle); // y uses cos, negative because ball bounces upward
        }
    }


    // Brick collision (distinguish left/right face vs top/bottom)
    // Using circle vs rectangle collision detection
    checkBrickCollision(bricks) {
        // Iterate through all bricks
        for (let brick of bricks) {

            if (!brick.active) continue; // If brick already destroyed, skip

            // Find the closest point on the brick to the ball
            let closestX = constrain( // Constrain ball x within brick left/right
                this.pos.x,
                brick.x,
                brick.x + brick.w
            );
            let closestY = constrain( // Constrain ball y within brick top/bottom
                this.pos.y,
                brick.y,
                brick.y + brick.h
            );
            let dx = this.pos.x - closestX; // Distance from ball center to closest point
            let dy = this.pos.y - closestY;
            let distanceSq = dx * dx + dy * dy; // Distance squared (no square root for efficiency)

            if (distanceSq < this.r * this.r) {  // If distance < radius → collision

                brick.active = false;  // Deactivate brick (destroyed)
                
                // MODIFIED: Added safety check for this.vel
                    gamePage.manage.score += 100;

                if (abs(dx) > abs(dy)) {
                    this.reflect(createVector(dx > 0 ? 1 : -1, 0));
                } else {
                    this.reflect(createVector(0, dy > 0 ? 1 : -1));
                }
                break;
                
            }
        }
    }


    // Checks if the paddle caught any falling items (drops), from the bricks.js file.
    // MODIFIED: Specifically handles the effects defined in bricks.js (Brick.BUFF_EFFECTS / DEBUFF_EFFECTS)
    checkDropCollision(drops, paddle) {
    
        for (let i = drops.length - 1; i >= 0; i--) {
            let d = drops[i];

            // Match hit detection from your source
            if (d.y + d.h/2 > paddle.y && d.y - d.h/2 < paddle.y + paddle.h && d.x > paddle.x && d.x < paddle.x + paddle.w) {
                
                // MODIFIED: Set 6-second timers (360 frames) for each specific effect string from bricks.js
                if (d.effect === 'ball_large') this.effects.large = 360;
                if (d.effect === 'ball_small') this.effects.small = 360;
                if (d.effect === 'ball_fast')  this.effects.fast = 360;
                if (d.effect === 'ball_slow')  this.effects.slow = 360;
                
                if (d.effect === 'ball_multi') {
                    this.handleMultiBall();
                }

                // Once caught, remove it from the screen so it doesn't trigger again
                drops.splice(i, 1); 
            }
        }
    }

    // MODIFIED: Logic for ball_multi to ensure one ball remaining won't lose life
    handleMultiBall() {
        if (typeof gamePage !== 'undefined' && gamePage) {
            if (!gamePage.extraBalls) gamePage.extraBalls = [];
        for (let i = 0; i < 2; i++) {
            let newBall = new Ball(this.pos.x, this.pos.y, this.originalR);
            newBall.vel = createVector(random(-4, 4), -4);
            window.gamePage.extraBalls.push(newBall);
        }
        }
    }

    // physically changes the ball's properties, based on a multiplier (scale).
    applyEffect(scale) {
        // Resizes the ball based on its "factory setting" (originalR)
        this.r = this.originalR * scale;          
        
        // Updates the ball's speed without changing its current flight direction
        this.vel.setMag(this.baseSpeed * scale); // setMag = "Set Magnitude" (changes the length of the velocity vector) 
    }


    /*
    Physical reflection formula: angle of incidence = angle of reflection
    Formula: v' = v - 2 (v·n) n
    v  = original velocity
    n  = normal vector
    v' = reflected velocity
    */
    reflect(normal) {
        normal.normalize(); // Ensure normal vector is unit length
        let dot = this.vel.dot(normal); // Dot product
        this.vel = p5.Vector.sub( // Reflection formula
            this.vel,
            p5.Vector.mult(normal, 2 * dot)
        );
    }

    reset(paddle) {
        this.pos.x = paddle.x + paddle.w / 2;
        this.pos.y = paddle.y - this.r;

        this.vel.set(0, 0);
        paddle.isBallAttached = true;

        this.r = this.originalR; // Reset the ball's size

        // MODIFIED: Clear all effects on reset
        for (let key in this.effects) this.effects[key] = 0;
    }
}
