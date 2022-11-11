var cometImg, rocketImg, starImg;
var comet, rocket, star;
var cometGroup, starGroup;
var gameState = "start"
var score = 0

function preload(){
    cometImg = loadImage("comet.png");
    rocketImg = loadImage("rocket.png");
    starImg = loadImage("star.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    rocket = createSprite(width / 2, height - 50);
    rocket.addImage(rocketImg)
    rocket.scale = 0.05

    cometGroup = new Group();
    starGroup = new Group();

}

function draw() {
    background("black");

    createStar();

    drawSprites();
}

function start() {
    fill("white");
    score = 0
   
    textSize(25)
    text("Press SPACEBAR to start", width / 2.5, height / 2)
    if (keyDown("space")) {
      gameState = "play"
    }
  }
  
function play() {
    createstar();
    
    createComet()
    if (keyDown(LEFT_ARROW)) {
      cannon.x -= 5
    }
    if (keyDown(RIGHT_ARROW)) {
      cannon.x += 5
    }
    if (frameCount % 15 == 0 && (keyDown(UP_ARROW) || keyDown("space"))) {
      createBomb();
    }
  
    if (starGroup.isTouching(bombGroup)) {
  
      for (var i = 0; i < starGroup.length; i++) {
  
        for (var j = 0; j < bombGroup.length; j++) {
  
          if (bombGroup[j].isTouching(starGroup[i])) {
            bombGroup[j].destroy();
            starGroup[i].destroy();
            score += Math.round(random(10, 20))
          }
        }
  
      }
    }
  
    for (var k = 0; k < starGroup.length; k++) {
  
      if (starGroup[k].isTouching(cannon) || starGroup[k].y > height) {
        gameState = "end"
      }
    }
  
}
  
function end() {
    starGroup.setVelocityYEach(0)
    starGroup.destroyEach();
    bombGroup.destroyEach();
    
    cannon.x = width / 2
    if (mousePressedOver(restart)){
      gameState = "start"
    }
  
}
  
function createStar() {
    if (frameCount % 60 == 0) {
      
        star = createSprite((width / 11), 20)
        star.addImage(starImg);
        starGroup.add(star)
        star.velocityY = 1
        star.scale = 0.1
        star.x = Math.round(random(50, width-50))
      
    }
}
function createComet() {
    if (frameCount % 70 == 0) {
      
        comet = createSprite((width / 11), 20)
        comet.velocityY = 1;
        comet.addImage(cometImg)
        cometGroup.add(comet);
        
     console.log("comet") 
    }
}
  
function createBomb() {
    bomb = createSprite(cannon.x, cannon.y)
    bomb.addImage(bombImg)
    bomb.velocityY = -5
    bomb.lifetime = 1000
    bomb.scale = 0.025
    bombGroup.add(bomb)
  
}