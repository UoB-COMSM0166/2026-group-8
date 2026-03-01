class GameManager {
  constructor() {
    this.lives = 3;
    this.score = 0; 
    this.gameState = "PLAYING";  // playing, won, gameover
  }


  checkBallOut(ball) {
    if (ball.pos.y > height) {
      this.lives -= 1;
      if (this.lives <= 0) {
        this.gameState = "GAMEOVER";
      } else {
        ball.reset();
      }
    }
  }


  checkWin(bricks) {
    // check all bricks' enable_flag === false
    const allCleared = bricks.every(b => b.enable_flag === false);
    if (allCleared && bricks.length > 0) {
      this.gameState = "WON";
    }
  }

  
  addScore() {
    this.score += 100;
  }


  displayStatus() {
    fill(0);
    textSize(24);
    text(`Score: ${this.score}`, 20, 30);
    text(`Lives: ${"❤️".repeat(this.lives)}`, 20, 60);

    if (this.gameState === "GAMEOVER") {
      this.drawEndScreen("GAME OVER", color(255, 0, 0));
    } else if (this.gameState === "WON") {
      this.drawEndScreen("YOU WIN!", color(0, 200, 0));
    }
  }

  drawEndScreen(msg, textColor) {
    fill(255, 200);
    rect(0, 0, width, height);
    fill(textColor);
    textAlign(CENTER);
    textSize(64);
    text(msg, width / 2, height / 2);
    textSize(32);
    text(`Total Score: ${this.score}`, width / 2, height / 2 + 50);
  }
}