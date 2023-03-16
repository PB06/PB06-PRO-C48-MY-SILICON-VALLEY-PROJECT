var SERVE = 1;
var END = 0;
var PLAY = 2;
var VERYEND = 3;
var gameState = PLAY;
var rock1Img, rock2Img;
var rocket, rocketImg,rocket1,rocket1Img;
var warmhole,warmholeImg;
var startImg,start;
var earth,earthImg;
var score,restart,restartImg, dot,dotImg;

function preload(){
  rock1Img = loadImage("rock1.png");
  rocketImg = loadImage("spacecraft.png");
  restartImg = loadImage("restart.png")
  dotImg = loadImage("whitedot.png")
  warmholeImg = loadImage("th.jpg")
  startImg = loadImage("start.jpg")
  earthImg = loadImage("earth.png")
}  

function setup(){
  createCanvas(1350,650);
  earth = createSprite(1200,350,5000,50);
  earth.addImage(earthImg);
  earth.scale = 0.7;
  earth.debug = false
  earth.setCollider("rectangle",150,50,earth.width,earth.height);

  rocket = createSprite(300,550,50,50);
  rocket.scale = 0.3;
  rocket.addImage("rocket", rocketImg);
  rocket.debug = false
  rocket.setCollider("rectangle",0,-50,rocket.width,rocket.height);

  restart = createSprite(650,500);
  restart.addImage(restartImg);
  restart.scale = 1;

  start = createSprite(670,500);
  start.addImage(startImg);
  start.scale = 0.5;


  rocksGroup = createGroup();
  dotsGroup = createGroup();
  warmholesGroup = createGroup();

  score = 0;

}

function draw(){
  background("black");
  fill("green")
  textSize(50)
  text("Score: "+ score, 1100,50);

  if(gameState === PLAY){
    textSize(20)
    text("Hi, wellcome to SPACE ADVERTURE",500,300)
    text("EARTH OZONE SHIELD IS COMES TO BREAK VERY SOON",400,350)
    text("HELP ALPHA TEAM TO FIND HABITABLE PLANET",460,380)
    earth.visible = false;


    if(mousePressedOver(start)){
      gameState = SERVE     
    }
  }
  if(gameState === SERVE){
    restart.visible = false;
    start.visible = false;
    rocket.visible = true;
    earth.visible = false;
    score = score + 1

// spawn rock,dots    
    spawnRock();
    spawndots(); 
    spawnwarmholes();

// moving rocket code
    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 10;
    }
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 10;
    }
    if(keyDown("up_arrow")){
      rocket.y = rocket.y - 10;
    }
    if(keyDown("down_arrow")){
      rocket.y = rocket.y + 10;  
    }
    
    if(rocksGroup.isTouching(rocket)){
      gameState = END;
    }
    if(warmholesGroup.isTouching(rocket)){
      gameState = VERYEND;
    }


  }
   else if (gameState === END) {
    restart.visible = true;
    earth.visible = false;
    rocket.velocityY = 0
    rocket.visible = false;
    warmholesGroup.destroyEach();
    rocksGroup.destroyEach();
    dotsGroup.destroyEach();
    fill("yellow")
    textSize(50)
    text("GAME OVER",500,300)

  
    if(mousePressedOver(restart)) {
      reset();
    }

  }
  else if (gameState === VERYEND) {

    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 10;
    }
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 10;
    }
    if(keyDown("up_arrow")){
      rocket.y = rocket.y - 10;
    }
    if(keyDown("down_arrow")){
      rocket.y = rocket.y + 10;  
    }
    
    restart.visible = false;
    earth.visible = true;
    rocksGroup.destroyEach();
    dotsGroup.destroyEach();
    warmholesGroup.destroyEach(); 
    text("Please safely land on planet",400,100)
    if(earth.isTouching(rocket)){
      gameState = END;
    }

  
 }
 drawSprites();
}

function reset(){
  gameState=SERVE
  score=0;
}

function spawnRock() {
  //write code here to spawn the rocks
  if (frameCount % 40 === 0) {
    var rock = createSprite(510,10);
    rock.x = Math.round(random(100,1200));
    rock.addImage(rock1Img);
    rock.lifetime = 2220;
    rock.scale = 0.5;
    rock.velocityY = 7;
    
    //add each rock to the group
    rocksGroup.add(rock);
  }
}

function spawndots() {
  //write code here to spawn the dots
  if (frameCount % 1 === 0) {
    var dot = createSprite(510,10);
    dot.x = Math.round(random(100,1300));
    dot.addImage(dotImg);
    dot.lifetime = 2220;
    dot.scale = 0.1;
    dot.velocityY = 7;

    //add each dot to the group
    dotsGroup.add(dot);
  }
}

function spawnwarmholes() {
  //write code here to spawn the dots
  if (frameCount % 300 === 0) {
    var warmhole = createSprite(510,10);
    warmhole.x = Math.round(random(100,1000));
    warmhole.addImage(warmholeImg);
    warmhole.lifetime = 2220;
    warmhole.scale = 0.5;
    warmhole.velocityY = 7;

    //add each dot to the group
    warmholesGroup.add(warmhole);
  }
}

