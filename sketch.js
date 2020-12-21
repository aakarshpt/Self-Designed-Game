var player;
var enemy;
var ground;
var s;
var jumpBoost;
var defBoost;
var attBoost;
var speedBoost;
var jumpImg;
var speedImg;
var defImg;
var attImg;
var left;
var observer;
var right;
var bottom;
var bgimg;
var grimg;
var hpPlayer;
var hpEnemy;
var hp = 100;
var hp2 = 200;
var PLAY = 1;
var END =0;
var gameState = PLAY;
var lives = 3;
var lives2 = 3;
function preload(){
 jumpImg = loadImage('Sprites/JUMP.png');
 speedImg = loadImage('Sprites/SPEED.png');
 defImg = loadImage('Sprites/DEF.png');
 attImg = loadImage('Sprites/ATT.png');

    bgimg =loadImage('Sprites/BGsprite.png');
   grimg = loadImage('Sprites/GRsprite.png');
}
function setup(){
createCanvas(1366,657)
hp = 100;

ground = createSprite(682.5,555,1000,200)
ground.scale = 2.1;
ground.addImage(grimg);
left = createSprite(0,330,1,660);
right = createSprite(1366,330,1,660)
bottom = createSprite(650,660,1500,1)
player = createSprite(300,275,50,50)
enemy = createSprite(1050,265,70,70)
hpPlayer = createSprite(110,40,200,10);
hpEnemy = createSprite(1150,40,400,10);
jumpBoost = createSprite(250,40,40,40);
speedBoost = createSprite(320,40,40,40);
defBoost = createSprite(390,40,40,40);
attBoost = createSprite(460,40,40,40);
        jumpBoost.addImage(jumpImg)
        speedBoost.addImage(speedImg)
        defBoost.addImage(defImg)
        attBoost.addImage(attImg)
        jumpBoost.scale = 0.5;
        speedBoost.scale = 0.5;
        defBoost.scale = 0.5;
        attBoost.scale = 0.5;
speedBoost.visible = false;
defBoost.visible = false;
attBoost.visible = false;
player.shapeColor = 'blue';
enemy.shapeColor = 'red';
hpPlayer.shapeColor = 'green';
hpEnemy.shapeColor = 'green';
}
function draw(){
   s = second();
   enemy.setCollider("rectangle",0,0,90,90);
   player.debug = true;

   ground.debug = true;
   enemy.debug = true;
    background(bgimg);
    textSize(25);
    fill("white");
    textFont('blackChancery')
    text('𝕷𝖎𝖛𝖊𝖘: '+ lives,650,120);




    textSize(30);
    fill("white");
    text('HP '+hp,60,80);

   
    
    textSize(30);
    fill("white");
    text('HP '+hp2,1200,80);
    
 if(hpPlayer.width<150){
 speedBoost.visible = true;
 }
 if(hpPlayer.width<100){
 defBoost.visible = true;
 }
 if(hpPlayer.width<50){
attBoost.visible = true;
 }

    if(keyDown("RIGHT_ARROW")&&gameState===PLAY&&speedBoost.visible===true){
     player.x = player.x + 12;
    }
    if(keyDown("RIGHT_ARROW")&&gameState===PLAY&&speedBoost.visible===false){
        player.x = player.x + 9;
       }

       if(keyDown("LEFT_ARROW")&&gameState===PLAY&&speedBoost.visible===true){
        player.x = player.x -12;
       }
       if(keyDown("LEFT_ARROW")&&gameState===PLAY&&speedBoost.visible===false){
           player.x = player.x - 9;
          }
    drawSprites();
     if(keyDown("space")&&gameState===PLAY && player.y > 400&& player.y < 433 && player.x >125 && player.x < 1245){
         player.velocityY= -19;
    }
    player.velocityY = player.velocityY + 1;
    
    
    if(enemy.x-player.x<100&&player.x-enemy.x<100&&keyDown('SHIFT')&&frameCount%4===0){
      
         hpEnemy.width = hpEnemy.width - 4;
         hp2 = hp2-2;
       
   
    
   }
console.log(s);
    if(player.y> 620){
     player.x = 300;
     player.y = 430;
     lives = lives-1;
    hpPlayer.width=200;
    hp=100;
    speedBoost.visible = false;
    defBoost.visible = false;
    attBoost.visible = false;
    }

    if(player.isTouching(enemy)&&defBoost.visible===false&&frameCount%15==0){
     hpPlayer.width = hpPlayer.width -10;
     hp = hp - 5;
    }
    if(player.isTouching(enemy)&&defBoost.visible===true&&frameCount%4==0){
        hpPlayer.width = hpPlayer.width -2;
        hp = hp - 1;
       }
    if(hpPlayer.width<1){
      hpPlayer.width = 200;
      hp = 100
      player.x = 300;
     player.y = 430;
      lives = lives-1;
      speedBoost.visible = false;
    defBoost.visible = false;
    attBoost.visible = false;
    }
    if(lives === 0){
        gameState = END;
    }
    if(gameState===END){
    textSize(100);
    fill('white');
    text("𝕲𝖆𝖒𝖊 𝕺𝖛𝖊𝖗",430,350);
   
    player.velocityY = 0;
     
    player.velocityX = 0;
    }
    if(gameState===END && keyDown('Space')){
    reset();
    }
     
      enemy.velocityY = enemy.velocityY + 0.8;
    player.collide(ground);
    //player.collide(enemy);
    player.collide(bottom);
    player.collide(left)
    player.collide(right)
   enemy.collide(ground);
}
function reset(){
   gameState=PLAY;
       
   lives = 3;

    
}