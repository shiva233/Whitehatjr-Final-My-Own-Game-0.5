var player,playerRun,playerRunFlip

var backgroundIMG,bg

var enemy,enemyIMG,enemyGroup

var cooldown = 0;

var bulletIMG,bulletGroup

var diamond,diamondIMG,diamondGroup

var diamondsLeft = 7;



function preload(){

  
  backgroundIMG = loadImage("background.png");

  diamondIMG = loadAnimation("Animations/Diamond/tile000.png","Animations/Diamond/tile001.png",
  "Animations/Diamond/tile002.png","Animations/Diamond/tile003.png","Animations/Diamond/tile004.png","Animations/Diamond/tile005.png",
  "Animations/Diamond/tile006.png","Animations/Diamond/tile007.png","Animations/Diamond/tile008.png","Animations/Diamond/tile009.png")

  playerRun = loadAnimation("Animations/Run/tile000.png","Animations/Run/tile001.png",
  "Animations/Run/tile002.png","Animations/Run/tile003.png","Animations/Run/tile004.png","Animations/Run/tile005.png",
  "Animations/Run/tile006.png","Animations/Run/tile007.png","Animations/Run/tile008.png","Animations/Run/tile009.png","Animations/Run/tile010.png","Animations/Run/tile011.png",)



  enemyIMG = loadImage("Animations/Spiked Ball.png")

  playerRunFlip = loadAnimation("Animations/Run2/tile000.png","Animations/Run2/tile001.png",
  "Animations/Run2/tile002.png","Animations/Run2/tile003.png","Animations/Run2/tile004.png","Animations/Run2/tile005.png",
  "Animations/Run2/tile006.png","Animations/Run2/tile007.png","Animations/Run2/tile008.png","Animations/Run2/tile009.png","Animations/Run2/tile010.png","Animations/Run2/tile011.png",)

  bulletIMG = loadImage("Animations/Bullet.png")

}

function setup() {
  createCanvas(400,800);
  
  bg = createSprite(200,400,20,20);

  bg.addImage(backgroundIMG);

  bg.scale = 15

  player = createSprite(200,600,32,32);

  player.addAnimation("runRight",playerRun);
  player.addAnimation("runLeft",playerRunFlip);

  player.scale = 1.5

  bulletGroup = new Group()

  enemyGroup = new Group()

  diamondGroup = new Group()



  for(var i = 50; i < 400; i = i + 50 ) {

    diamond = createSprite(i,700,18,14);
    diamond.addAnimation("diamonds",diamondIMG);
    diamond.scale = 2;
    diamondGroup.add(diamond);

  }

 

  

 


  
}

function draw() {
  background(0);
  

  if(keyDown("d")){


    player.x = player.x + 3;

    player.changeAnimation("runRight",playerRun);


  }

  
  if(keyDown("a")){


    player.x = player.x - 3;

    player.changeAnimation("runLeft",playerRunFlip);


  }
  


  if(mouseDown() && cooldown < 0){


    //shoot the bullet

    createBullets();

    //console.log("it works :D")

    //cooldown


    cooldown = 50

   

  }

  for (var i = 0; i < enemyGroup.length; i++) {

  if(enemyGroup.get(i).isTouching(bulletGroup)){


    enemyGroup.get(i).destroy();

    bulletGroup.destroyEach();

  }
  }


  for (var i = 0; i < diamondGroup.length; i++){

    if(diamondGroup.get(i).isTouching(enemyGroup)){


      diamondGroup.get(i).destroy();

      diamondsLeft--

      console.log(diamondsLeft);

      


    }

  }

  cooldown = cooldown - 1;



 

  createEnemys();

  makeDiamonds();

  drawSprites();

  if(diamondsLeft === 0){

    player.destroy();
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();

    textSize(20);
    
    text("YOU LOSE",width/2 - 50,height/2 - 20);

  }

  
}

function createEnemys(){

  if(frameCount % 60 === 0){
    var enemy = createSprite(200,0,32,32);

    enemy.x = Math.round(random(0,400));

    enemy.addImage(enemyIMG);

    enemy.velocityY = 4

    enemy.lifetime = 200;

    enemy.scale = 0.7;

    enemy.debug = true;

    enemy.setCollider("circle",0,0,7)

    

    enemyGroup.add(enemy);




    enemy.depth = player.depth
    player.depth = player.depth + 1;

  }



}

function createBullets(){


  var bullet = createSprite(player.x,600,32,32);

  bullet.velocityY = -5

  bullet.addImage(bulletIMG);

  bullet.depth = player.depth
  player.depth = player.depth + 1;

  bulletGroup.add(bullet);
  

}

function makeDiamonds(){


  



}