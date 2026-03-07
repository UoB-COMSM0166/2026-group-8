let menuPage;
let gamePage;
let currentMode = 'menu';
let brickImg;


function preload() {
    brickImg = loadImage('https://cdn-icons-png.flaticon.com/512/5805/5805666.png');
}


function setup() {
    createCanvas(500, 700);
    menuPage = new Menu();
}


function draw() {
    cursor(ARROW);

    if (currentMode === 'menu') {
        menuPage.display();
    } else if (currentMode === 'game') {
        gamePage.display();
    }
}


function mouseClicked() {
    if (currentMode === 'menu') {
        let selectedMode = menuPage.checkModeClicked();
        if (selectedMode) {
            currentMode = 'game';
            gamePage = new Game(brickImg, selectedMode);
        }
    } else if (currentMode === 'game') {
        let currentState = gamePage.manage.state;

        if (currentState === 'INSTRUCTION' || currentState === 'PAUSED' ||
            currentState === 'WON' || currentState === 'GAMEOVER') {
            if (
                mouseX > 170 && mouseX < 330 &&
                mouseY > 540 && mouseY < 580
            ) {
                currentMode = 'menu';
                return;
            }
        }

        if (currentState === 'INSTRUCTION') {
            gamePage.manage.state = 'PLAYING';
        } else if (currentState === 'PLAYING') {
            gamePage.paddle.launchBall(gamePage.ball);
        }
    }
}


function keyPressed() {
    if (currentMode === 'game') {
        if (key === 'p' || key === 'P') {
            gamePage.manage.togglePause();
        }
    }
}

