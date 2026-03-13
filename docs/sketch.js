const W = 500, H = 700;
let menuPage, gamePage;
let currentMode = 'menu';
let brickImg;


function preload() {
    brickImg = loadImage('https://cdn-icons-png.flaticon.com/512/5805/5805666.png');
}


function setup() {
    createCanvas(W, H);
    menuPage = new Menu();
}


function draw() {
    cursor(ARROW);

    switch (currentMode) {
        case 'game': gamePage.display(); break;
        // case 'duel': break;
        default: menuPage.display();
    }
}


function mouseClicked() {
    if (currentMode === 'menu') {
        let selectedMode = menuPage.checkModeClicked();
        if (selectedMode === 'CLASSIC' || selectedMode === 'DARK') {
            currentMode = 'game';
            gamePage = new Game(brickImg, selectedMode);
        }
        // else if (selectedMode === 'DUEL') {

        // }
    }

    if (currentMode === 'game') {
        let currentState = gamePage.manage.state;

        if (['INSTRUCTION', 'PAUSED', 'WON', 'GAMEOVER'].includes(currentState)) {
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
        return;
    }
}


function keyPressed() {
    if (currentMode === 'game') {
        if (key === 'p' || key === 'P') {
            gamePage.manage.togglePause();
        }
    }
}

