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
        this.items = [];
        let cols = 7;
        let rows = 8;
        let gap = 5;
        let offsetX = 75;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let pickedColor = random(this.colorPalette);
                this.items.push({
                    x: offsetX + c * (this.brickW + gap),
                    y: 80 + r * (this.brickH + gap),
                    w: this.brickW,
                    h: this.brickH,
                    active: true,
                    color: pickedColor
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