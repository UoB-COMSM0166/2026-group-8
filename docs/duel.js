class Duel extends BaseScene {
    constructor() {
        super();
        this.mode = 'DUEL';
        // this.ball = new Ball(200, 350, 5);
        // this.paddle1 = new Paddle();
        // this.paddle2 = new Paddle();
        // this.bricks1 = new Bricks();
        // this.bricks2 = new Bricks();
        this.manage = new GameManage();
    }

    display() {
        this.drawInitPage();

        if (this.manage.state === 'INSTRUCTION') {
            this.drawInstructionScreen();
        } else if (this.manage.state === 'PAUSED') {
            this.drawPauseScreen();
        }
    }

    getRules() {
        return [
            "• P1: Keyboard (Up/Down Keys) / P2: Keyboard (A/D Keys)",
            "• Break your opponent's KING first!",
            "• Press 'P' to pause / resume"
        ];
    }
}