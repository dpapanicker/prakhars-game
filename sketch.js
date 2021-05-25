var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var runner, runnerImg;
var coin, coinImg;
var rock, rockImg;
var cone, coneImg;
var blade, baldeImg;
var box, boxImg;
var gameOver, gameOverImg;
var restart, restartImg;
var bg, bgImg;
var obstaclesGroup, coinsGroup;
var invisibleGround;
var runnercollided, coincoll, bladecoll;

function preload() {
  bgImg = loadImage("images/bg2.png");
  rockImg = loadImage("images/barrier_2.png");
  coneImg = loadImage("images/barrier_1.png");
  boxImg = loadImage("images/box.jpg");
  runnercollided = loadAnimation("images/3.png");
  coincoll = loadAnimation("images/c3.png");
  bladecoll = loadAnimation("images/b3.png");

  bladeImg = loadAnimation(
    "images/b1.png",
    "images/b2.png",
    "images/b3.png",
    "images/b4.png"
  );

  runnerImg = loadAnimation(
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png"
  );

  coinImg = loadAnimation(
    "images/c1.png",
    "images/c2.png",
    "images/c3.png",
    "images/c4.png"
  );
}

function setup() {
  bg = createSprite(0, 0, 600, 300);
  bg.scale = 0.8;
  bg.addImage(bgImg);
  createCanvas(600, 300);

  runner = createSprite(55, 210, 20, 40);
  runner.addAnimation("running", runnerImg);
  runner.addAnimation("collided", runnercollided);
  runner.scale = 0.3;

  coin = createSprite(480, 15, 10, 10);
  coin.addAnimation("coin", coinImg);
  coin.scale = 0.2;
  coin = createSprite(570, 15, 10, 10);
  coin.addAnimation("coin", coinImg);
  coin.scale = 0.2;
  coin.addAnimation("coll", coincoll);

  invisibleGround = createSprite(50, 290, 100, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  coinsGroup = new Group();
}

function draw() {
  bg.velocityX = -6;
  if (bg.x < 0) {
    bg.x = bg.width / 2;
  }
  background(220);
  drawSprites();
  fill("white");
  text("Score:" + score, 500, 20);
  if (gameState === PLAY) {
    spawnObstacles();
    spawnCoins();
    score = score + 1;
    if (keyDown("space") && runner.y >= 210) {
      runner.velocityY = -15;
    }
    if (obstaclesGroup.isTouching(runner)) {
      runner.changeAnimation("collided", runnercollided);
      coin.changeAnimation("coll", coincoll);
      blade.changeAnimation("coll", bladecoll);
      gameState = END;
    }
  }

  if (gameState === END) {
    bg.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setVelocityXEach(0);
    coinsGroup.setLifetimeEach(-1);
  }

  runner.velocityY = runner.velocityY + 0.8;
  console.log(runner.y);
  runner.collide(invisibleGround);
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 250, 10, 40);
    obstacle.velocityX = -6;

    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage(rockImg);
        obstacle.scale = 0.3;
        break;
      case 2:
        obstacle.addImage(coneImg);
        obstacle.scale = 0.4;
        break;
      case 3:
        obstacle.addImage(boxImg);
        obstacle.scale = 0.3;
        break;
      case 4:
        obstacle.addAnimation("blade", bladeImg);
        obstacle.scale = 0.7;
        break;
      default:
        break;
    }
    obstacle.lifetime = 110;
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coin = createSprite(600, 120, 40, 10);
    coin.y = Math.round(random(80, 120));
    coin.addAnimation("coin", coinImg);
    coin.scale = 0.2;
    coin.velocityX = -3;

    //assign lifetime to the variable
    coin.lifetime = 200;

    //adjust the depth
    coin.depth = runner.depth;
    runner.depth = runner.depth + 1;

    //add each cloud to the group
    coinsGroup.add(coin);
  }
}
