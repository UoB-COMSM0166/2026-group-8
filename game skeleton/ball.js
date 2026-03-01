class Ball {
    constructor(x, y, r) {
        // Ball position (represented as a vector)
        this.pos = createVector(x, y); // pos.x is horizontal coordinate, pos.y is vertical coordinate
        // Ball velocity (vector)
        this.vel = createVector(4, -4); // x direction 4 means moving right, y direction -4 means moving up
        this.r = r; // Radius
    }

    // Update every frame (core function), called continuously inside draw()
    update(paddle, bricks) {
        if (paddle.isBallAttached) {
            this.pos.x = paddle.x + paddle.w / 2;
            this.pos.y = paddle.y - this.r;
        } else {
            this.pos.add(this.vel); // position = current position + velocity
            this.checkWallCollision(); // Check wall collision
            this.checkPaddleCollision(paddle); // Check paddle collision
            this.checkBrickCollision(bricks); // Check brick collision
        }
    }

    // Display the ball
    display() {
        fill('#4A90D9');
        noStroke();
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    // Wall collision (left, right, top walls; bottom handled by Game)
    checkWallCollision() {
        // Hit left wall
        if (this.pos.x - this.r < 15) {
            this.pos.x = 15 + this.r;        // Push the ball back inside the boundary
            this.vel.x *= -1;           // Reverse x velocity
        }
        // Hit right wall
        if (this.pos.x + this.r > 425) {
            this.pos.x = 425 - this.r;
            this.vel.x *= -1;
        }
        // Hit top wall
        if (this.pos.y - this.r < 15) {
            this.pos.y = 15 + this.r;
            this.vel.y *= -1;
        }
        // Bottom not handled here; if the ball falls below, Game switches to GameOver state
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

                // Determine if collision is left/right face or top/bottom face
                if (abs(dx) > abs(dy)) { // If x penetration is greater
                    let normal = createVector( // Left/right collision
                        dx > 0 ? 1 : -1,
                        0
                    );
                    this.reflect(normal);
                } else {
                    let normal = createVector( // Top/bottom collision
                        0,
                        dy > 0 ? 1 : -1
                    );
                    this.reflect(normal);
                }
                break; // Stop after hitting one brick
            }
        }
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
}
