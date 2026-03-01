class Bricks {
    constructor() {
        this.brickW = 45;
        this.brickH = 20;
        this.items = [];
        // Define a palette of three colors (RGB format)
        this.colorPalette = [
            [255, 105, 97],  // Red
            [119, 221, 119], // Green
            [135, 206, 235]  // Blue
        ];
        // Generate the initial layout of bricks
        this.generateLevel();
    }

    generateLevel() {
        this.items = [];     // Clear existing bricks
        let cols = 8;        // Number of columns
        let rows = 5;        // Number of rows
        let offsetX = 20;    // Starting X position to perfectly fit the team's game box

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Randomly pick one color from the palette
                let pickedColor = random(this.colorPalette);
                // Add the new brick object to the items array
                this.items.push({
                    x: offsetX + c * (this.brickW + 5), // Calculate X position with a 5px gap
                    y: 60 + r * (this.brickH + 5),      // Calculate Y position with a 5px gap
                    w: this.brickW,                     // Width
                    h: this.brickH,                     // Height
                    active: true,                       // Status flag used for collision and rendering
                    color: pickedColor                  // Store the assigned color for this brick
                });
            }
        }
    }

    display() {
        push();
        for (let b of this.items) {
            // Only draw the brick if it hasn't been destroyed (active is true)
            if (b.active) {
                fill(b.color[0], b.color[1], b.color[2]);
                stroke(255);       // White border
                strokeWeight(1);   // Border thickness
                rect(b.x, b.y, b.w, b.h, 4);
            }
        }
        pop();
    }
}