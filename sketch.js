var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var oo1,oo2,oo3;
var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var o1,o2,o3;
var o1g,o2g,o3g;
var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,750,900);
mainCyclist.debug = true
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
o2g = new Group();
o1g = new Group();
o3g = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,6));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer == 3){
      redCyclists();
     }
     else if (select_oppPlayer ==4 ) {
      Obstacle1();}
      else if (select_oppPlayer == 5) {
     Obstacle2();}
     else  {
      Obstacle3();}
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    if(o1g.isTouching(mainCyclist)){
      gameState = END;
      oo1.velocityY = 0;
    
    }
    if(o2g.isTouching(mainCyclist)){
      gameState = END;
      oo2.velocityY = 0;
   
    }
    if(o3g.isTouching(mainCyclist)){
      gameState = END;
      oo3.velocityY = 0;
   
    }
    
   }
else if (gameState === END) {

    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    text("Press up key to restart",550,200)
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    o1g.setVelocityXEach(0);
    o1g.setLifetimeEach(-1);
    o2g.setVelocityXEach(0);
    o2g.setLifetimeEach(-1);
    o3g.setVelocityXEach(0);
    o3g.setLifetimeEach(-1);
}
 if(keyDown("up")){
      console.log("restart")
      reset();
     }
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}
function Obstacle1(){
  oo1 =createSprite(1100,Math.round(random(50, 250)));
  oo1.scale =0.06;
  oo1.velocityX = -(6 + 2*distance/150);
  oo1.addAnimation("obstacle1",o1);
  oo1.setLifetime=170;
    o1g.add(oo1);
  }
   function Obstacle2(){
    oo2 =createSprite(1100,Math.round(random(50, 250)));
    oo2.scale =0.06;
    oo2.velocityX = -(6 + 2*distance/150);
    oo2.addImage("obstacle2",o2);
    oo2.setLifetime=170;
     o2g.add(oo2);
    }
    function Obstacle3(){
      oo3 =createSprite(1100,Math.round(random(50, 250)));
      oo3.scale =0.04;
      oo3.velocityX = -(6 + 2*distance/150);
      oo3.addImage("obstacle3",o3);
      oo3.setLifetime=170;
        o3g.add(oo3);
      }
   //create reset function here
   function reset(){
    gameState=PLAY;
    gameOver.visible=false;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1)
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    o1g.destroyEach();
    o2g.destroyEach();
    o3g.destroyEach();
    distance=0;
  }







