const W = 500, H = 700;
let menuPage, gamePage, duelPage;
let currentMode = 'menu';
let bgImg, brickImg;


function preload() {
    BaseScene.brickImg = loadImage('./brickImg.png');
    bgImg = loadImage('./Cyber.jpg');
}

function setup() {
    createCanvas(W, H);
    menuPage = new Menu();
}

function draw() {
    cursor(ARROW);

    switch (currentMode) {
        case 'game': gamePage.display(); break;
        case 'duel': duelPage.display(); break;
        default: menuPage.display();
    }
}

function mouseClicked() {
    if (currentMode === 'menu') {
        let selectedMode = menuPage.checkModeClicked();
        if (selectedMode === 'CLASSIC' || selectedMode === 'DARK') {
            currentMode = 'game';
            gamePage = new Game(selectedMode);
            return;
        }
        else if (selectedMode === 'DUEL') {
            currentMode = 'duel';
            duelPage = new Duel();
            return;
        }
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

    if (currentMode === 'duel') {
        let currentState = duelPage.manage.state;

        if (['INSTRUCTION', 'PAUSED'].includes(currentState)) {
            if (
                mouseX > 170 && mouseX < 330 &&
                mouseY > 540 && mouseY < 580
            ) {
                currentMode = 'menu';
                return;
            }
        }
        if (currentState === 'INSTRUCTION') {
            duelPage.manage.state = 'PLAYING';
        } else if (currentState === 'PLAYING') {
            // duelPage.paddle2.launchBall(duelPage.ball);
        }

        return;
    }
}

function keyPressed() {
    if (key === 'p' || key === 'P') {
        let activeScene = (currentMode === 'game') ? gamePage : (currentMode === 'duel' ? duelPage : null);

        if (activeScene) {
            activeScene.requestTogglePause();
        }
    }
}
