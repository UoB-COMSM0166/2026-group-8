class GameManage {
    constructor() {
        this.lives = 3;
        this.score = 0;
        this.state = 'PLAYING';  // playing, won, gameover
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
}