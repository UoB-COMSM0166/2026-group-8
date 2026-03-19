class GameManage {
    constructor() {
        this.lives = 3;
        this.score = 0;
        this.timer = 180000;  // 3 mins.
        this.state = 'INSTRUCTION';  // instruction, playing, won, gameover
        this.prevState = 'PLAYING';
    }


    updateTimer() {
        if (this.state === 'PLAYING') {
            this.timer -= deltaTime;

            if (this.timer <= 0) {
                this.timer = 0;
                this.state = 'GAMEOVER';
            }
        }
    }


    getFormattedTime() {
        let totalSeconds = ceil(this.timer / 1000);
        let mins = floor(totalSeconds / 60);
        let secs = totalSeconds % 60;
        return nf(mins, 2) + ":" + nf(secs, 2);
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
        let remaining = bricks.filter(b => b.active);
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
