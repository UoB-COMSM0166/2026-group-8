class GameManage {
    constructor() {
        this.lives = 3;
        this.score = 0;
        this.state = 'INSTRUCTION';  // instruction, playing, won, gameover
        this.prevState = 'PLAYING';
    }


    handleBallLost(ball, paddle) {
        this.lives--;
        if (this.lives <= 0) {
            this.state = 'GAMEOVER';
        } else {
            ball.reset(paddle);
        }
    }


    checkWinCondition(bricks) {
        const remaining = bricks.filter(b => b.active);
        if (remaining.length === 0 && bricks.length > 0) {
            this.state = 'WON';
        }
    }


    getLifeString() {
        return "❤️".repeat(this.lives);
    }

    togglePause() {
        if (this.state === 'PAUSED') {
            this.state = this.prevState;
        } else {
            this.prevState = this.state;
            this.state = 'PAUSED';
        }
    }
}