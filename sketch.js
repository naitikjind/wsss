/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;
var cow,cowImage;

function preload(){
  cowImage =   loadImage("cow22.png");
  jungleImage = loadImage("bg.png");
  shrub1 = loadImage("chapati.jpg");
  shrub2 = loadImage("banana.jpg");
  shrub3 = loadImage("spinach.jpg");
  obstacle1 = loadImage("yawning-lion-removebg-preview.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.wav");
  collidedSound = loadSound("collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  cow = createSprite(50,10,20,50);
  cow.scale=0.2;
  // cowImage.scale(0.5);
  cow.addImage("cow",cowImage)
 
  //kangaroo.addAnimation("running", kangaroo_running);
  //kangaroo.addAnimation("collided", kangaroo_collided);
  //kangaroo.scale = 0.15;
  cow.setCollider("circle",0,0,300)
    
  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
 cow.x=camera.position.x-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(cow.y)
    if(keyDown("space")&& cow.y>270) {
      jumpSound.play();
      cow.velocityY = -16;
    }
  
    cow.velocityY = cow.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

   cow.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(cow)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(cow)){
      score = score + 1;
      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    cow.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

 //  cow.changeAnimation("collided");
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }

  else if (gameState === WIN) {
    jungle.velocityX = 0;
    cow.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

  //  cow.changeAnimation("collided");

    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("blue")
  text("Score: "+ score, camera.position.x,50);
  
  if(score >= 5){
    cow.visible = false;
    textSize(30);
    stroke(3);
    fill("cyan");
    text("Congragulations!! You win the game!! ", 70,200);
    gameState = WIN;
  }
}

function spawnShrubs() {
 
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
       
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;      

    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}

/*function reset(){
  gameState = PLAY;
  gameOver.visible = true;
  restart.visible = true;
  kangaroo.visible = true;
  kangaroo.changeAnimation("running",
                kangaroo_running);
  obstaclesGroup.Each();
  shrubsGroup.destroyEach();
  score = 0;
}*/

/*function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  kangaroo.visible = true;
  kangaroo.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();

}*/

/*function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  kangaroo.visible = false;
  kangaroo.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyeach();
  shrubsGroup.destroyeach();
  score = 0;
}*/

/*function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  kangaroo.visible = true;
  kangaroo.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();
  score = 0;
}*/

