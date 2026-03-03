let canvasLayer;
let img, back;
let maskImg;

let brushColor;
let isEraser = false;


function preload() {
  img = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkcwmOTWu55hweHJDspmsCSiWVyAdg4XBGg&s');
  back = loadImage('https://media.istockphoto.com/id/835370890/photo/sunset-sunrise-with-clouds-light-rays-and-other-atmospheric-effect.jpg?s=612x612&w=0&k=20&c=zGDOBYVFY74wX2gUgkonYGtNl1zenev5mPotAqUlJbM=');
}

function setup() {
  createCanvas(600, 400);
  
  canvasLayer = createGraphics(600, 400); // drawing area
  canvasLayer.clear();
  
  maskImg = createGraphics(img.width, img.height);
  maskImg.rect(0, 0, 250, img.height, 90); 
  img.mask(maskImg);
  
  brushColor = color(0);
  drawUI();
}

function draw() {
  drawUI();
  
  if (mouseIsPressed) {
    if (isEraser) {
      canvasLayer.erase();
      canvasLayer.ellipse(mouseX, mouseY, 30, 30);
      canvasLayer.noErase();
    } else {
      // spraypaint
      canvasLayer.noStroke();
      canvasLayer.fill(brushColor);
      for (let i = 0; i < 20; i++) {
        let angle = random(TWO_PI); // Randomly generate an angle
        let r = random(0, 8); // Randomly generate a radius
        // Calculate the specific coordinates of the point
        let x = mouseX + cos(angle) * r;
        let y = mouseY + sin(angle) * r;
        canvasLayer.ellipse(x, y, 1 + random(4), 1 + random(4));
      }
    }
  }

  image(canvasLayer, 0, 0); // 
}

function drawUI() {
  background(240);
  tint(255, 80);
  image(back, 0, 0, width, height);
  noStroke();
  fill(255);
  rect(30, 30, 540, 340);
  noTint();
  image(img, 40, 260, 150, 100);
  
  textStyle(NORMAL); 
  textSize(15);
  fill(150, 150, 150);
  text("(Meow~❤️)", 180, 350);
  text("press 'r': change color / 'e': eraser / 'c': clear / 's': save", 40, 80);
  
  textStyle(BOLD);
  textSize(20);
  fill(0, 0, 0);
  text("✏️ Let's DRAW", 40, 60);
  
  // 顯示目前模式提示
  textStyle(NORMAL);
  textSize(12);
  fill(0, 0, 255);
  text("[ Mode: " + (isEraser ? "Eraser" : "Pen") + " ]", 480, 50);
}

function keyTyped() {
  if (key === 'r') {
    isEraser = false; 
    brushColor = color(random(255), random(255), random(255));   }
  if (key === 'e') {
    isEraser = true;
  }
  if (key === 'c') {
    canvasLayer.clear();
    isEraser = false;
  } 
  if (key === 's') {
    save('myCanvas.png'); 
  }
}
