let img, back;
let maskImg;
let brushColor;

function preload() {
  img = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkcwmOTWu55hweHJDspmsCSiWVyAdg4XBGg&s');
  back = loadImage('https://media.istockphoto.com/id/835370890/photo/sunset-sunrise-with-clouds-light-rays-and-other-atmospheric-effect.jpg?s=612x612&w=0&k=20&c=zGDOBYVFY74wX2gUgkonYGtNl1zenev5mPotAqUlJbM=');
}

function setup() {
  createCanvas(600, 400);
  background(240);
  
  maskImg = createGraphics(img.width, img.height);
  maskImg.rect(0, 0, 250, img.height, 90); 
  img.mask(maskImg);
  
  tint(255, 80);
  image(back, 0, 0, width, height);
  noStroke();
  rect(30, 30, 540, 340);
  noTint();
  image(img, 40, 260, 150, 100);
  
  textSize(15);
  fill(150,150,150);
  text("(Meow~❤️)", 180, 350);
  text("press 'r': change color/ 'c': clear cavas / 's': save to file", 40, 80)
  
  fill(0,0,0);
  textStyle(BOLD);
  textSize(20);
  text("✏️ Let's DRAW", 40, 60);
  
  brushColor = color(0);
}

function draw() {
  if (mouseIsPressed) { // 噴漆畫筆
    // 每次點擊或移動時噴出 20 個小點
    for (let i = 0; i < 20; i++) {
      // 1. 隨機產生一個角度
      let angle = random(TWO_PI); 
      // 2. 隨機產生一個半徑（距離圓心的遠近）
      let r = random(0, 8);  
      // 3. 使用 cos 和 sin 計算出點的具體座標
      let x = mouseX + cos(angle) * r;
      let y = mouseY + sin(angle) * r;
      
      fill(brushColor);
      ellipse(x, y, 1 + random(4)); // 畫下噴漆點
    }
  }
}

function keyTyped() {
  if(key === 'r') { // change to random color
     brushColor = color(random(255), random(255), random(255));
  }
  if(key === 'c') { // clear canvas
    clear();
    setup();
  }
  if(key === 's') { // save to file
    save('myCanvas.png');
  }
}