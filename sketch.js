var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var ground;
var score;

function preload(){
   
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 600);

  monkey = createSprite(50,560,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,580,400,20);
  ground.x = ground.width /2;
  
  obstacleGroup = createGroup();
  FoodGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  score = 0;
  
}


function draw() {
background(160);
  
  var falseGround=createSprite(300,580,600,30);
  text(mouseX+", "+mouseY, mouseX, mouseY);
  text("SurvivalTime: "+ score, 500,50);
  
  ground.velocityX = -4 ;
    ground.visible=false;
  score = score + Math.round(getFrameRate()/60);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (monkey.y>=538){
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -15;   
    }
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  spawnBananas();
  
  spawnObstacles();
  
  if(obstacleGroup.isTouching(monkey)) {     
       reset();
    }
    
  
  monkey.collide(ground);
  
  drawSprites();
}
function reset(){
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
  score=0;
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,550,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
}
}
function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,520,40,10);
    banana.y = Math.round(random(440,480));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}