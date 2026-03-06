class Bricks {
    constructor() {
        this.brickW = 45;
        this.brickH = 20;
        this.items = [];
        this.drops = []; //change1:store the buffs/debuffs that are about to drop
        // Define a palette of three colors (RGB format)
        this.colorPalette = [
            [255, 105, 97],  // Red(is set to drop a debuff when broken)
            [119, 221, 119], // Green(is set to drop a buff when broken)
            [135, 206, 235]  // Blue
        ];
        // Generate the initial layout of bricks
        this.generateLevel();
    }

    generateLevel() {
        this.items = [];
        this.drops = []; //change2:clear the dropped items when resetting the level
        let cols = 7;
        let rows = 8;
        let gap = 5;
        let offsetX = 75;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let pickedColor = random(this.colorPalette);

                // change3:Determine the type of the dropping items based on pickedColor
                let dropType = 'none';
                if (pickedColor === this.colorPalette[0]) {
                    dropType = 'debuff'; 
                } else if (pickedColor === this.colorPalette[1]) {
                    dropType = 'buff';   
                }
                
                this.items.push({
                    x: offsetX + c * (this.brickW + gap),
                    y: 80 + r * (this.brickH + gap),
                    w: this.brickW,
                    h: this.brickH,
                    active: true,
                    wasActive: true, // change4:Tracks the previous state to detect the exact moment the brick breaks
                    color: pickedColor,
                    drop: dropType   // change5:Stores the specific buff or debuff this brick contains
                });
            }
        }
    }

    display() {
        push();
        for (let b of this.items) {
            // change6:Check if the brick was just broken by the ball
            if (b.wasActive && !b.active) {
                b.wasActive = false; // Stop it from dropping items again
                
                // If this brick has a dropping item, create it
                if (b.drop !== 'none') {
                    this.drops.push({
                        x: b.x + b.w / 2, // Center X of the brick
                        y: b.y + b.h / 2, // Center Y of the brick
                        r: 8,             // Radius of the dropped item
                        speed: 3,         // Falling speed
                        type: b.drop      // 'buff' or 'debuff'
                    });
                }
            }
            
            // Only draw the brick if it hasn't been destroyed (active is true)
            if (b.active) {
                fill(b.color[0], b.color[1], b.color[2]);
                stroke(255);       // White border
                strokeWeight(1);   // Border thickness
                rect(b.x, b.y, b.w, b.h, 4);
            }
        }
        pop();

        // Draw the falling items right after drawing the bricks
        this.displayDrops();
    }

    // change7:Helper function: updates the position of the drops and draws them on screen
    displayDrops() {
        push();
        // Loop backwards so we can safely delete items when they go off-screen
        for (let i = this.drops.length - 1; i >= 0; i--) {
            let d = this.drops[i];
            d.y += d.speed; // Move the item down

            // Draw the item (matching the brick's color)
            noStroke();
            if (d.type === 'buff') {
                fill(119, 221, 119); 
            } else if (d.type === 'debuff') {
                fill(255, 105, 97);  
            }
            circle(d.x, d.y, d.r * 2);

            // Clean up: remove the item if it goes off the bottom of the screen
            if (d.y > height + d.r) { 
                this.drops.splice(i, 1);
            }
        }
        pop();
    }
}

