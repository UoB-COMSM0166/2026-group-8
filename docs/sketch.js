let menuPage;
let gamePage;
let currentMode = 'menu';
let brickImg, ballImg;

function preload() {
    brickImg = loadImage('https://cdn-icons-png.flaticon.com/512/5805/5805666.png');
    ballImg = loadImage('https://cdn-icons-png.freepik.com/256/1974/1974163.png?semt=ais_white_label');
}

function setup() {
    createCanvas(500, 700);

    menuPage = new Menu();
    gamePage = new Game(brickImg, ballImg);
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
        if (menuPage.checkStartClicked()) {
            currentMode = 'game';
        }
    } else if (currentMode === 'game') {
        gamePage.paddle.launchBall();
    }
}
