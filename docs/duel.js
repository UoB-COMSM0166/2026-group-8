class Duel extends BaseScene {
    constructor() {
        super();
        this.mode = 'DUEL';
        this.ball = new Ball(250, 315, 5);

        this.paddle1 = new Paddle(); // Player 1
        this.paddle1.y = 200;
        this.paddle1.isBallAttached = false;

        this.paddle2 = new Paddle(); // Player 2 (with ball)
        this.paddle2.y = 430;
        this.paddle2.isBallAttached = true;
        this.ball.reset(this.paddle2);

        this.bricks1 = new Bricks(); // Bricks for Player 1
        this.bricks2 = new Bricks(); // Bricks for Player 2

        this.manage = new GameManage();
    }

    display() {
        this.drawInitPage();
        this.drawDuelLayout();

        // this.bricks1.display(); 
        // this.bricks2.display();
        this.paddle1.display();
        this.paddle2.display();
        this.ball.display();

        if (this.manage.state === 'INSTRUCTION') {
            this.drawInstructionScreen();
        } else if (this.manage.state === 'PAUSED') {
            this.drawPauseScreen();
        }
    }

    drawDuelLayout() {
        // player 1 control instruction
        fill(255, 0, 0, 50);
        rect(25, 25, 450, 30);
        fill(0);
        textSize(12);
        text("P1: Use 'A'/'D' to move, Click 'W' to set King", 250, 40);

        // player 1 bricks, paddle area
        noFill();
        rect(25, 55, 450, 250);

        // player 2 bricks, paddle area
        rect(25, 345, 450, 250);

        // player 2 control instruction
        noStroke();
        fill(255, 0, 0, 50);
        rect(25, 595, 450, 30);

        fill(0);
        text("P2: Use ←/→ to move paddle, Click ↑ to set King", 250, 610);
    }

    getRules() {
        return [
            "• P1: Keyboard (Left/Right Keys) / P2: Keyboard (A/D Keys)",
            "• Break your opponent's KING to win!",
            "• Press 'P' to pause / resume"
        ];
    }
}