// create phaser game
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

// preloads my assets
function preload() {

    // game.load.spritesheet('waters', 'assets/sprites/waters.png', 32, 400, 32);
    game.load.spritesheet('waters', 'assets/sprites/waters1.png', 50, 800);

}

// global variables
var water;
var counter = 0;
var text = 0;
var controlKey;
var enterKey;
var upKey;

// questions and answers
// var myobj = {
//   "questions": ["copy","paste","cut", "add", "subtract", "single quote", "double quote"],
//   "answers": ["namit","amit","sushil"]
// }

// start painting the screen
function create() {
  // constructor new TileSprite(game, x, y, width of sprite, height of sprite, key of image used, frame is part of sprite used)
    // water = game.add.tileSprite(0, 540, 800, 600, 'waters');
    water = game.add.tileSprite(0, 200, 800, 600, 'waters');
    water.scale.setTo(1,1.5)
    // water = game.add.sprite(0, 0, 'waters');
    // water animation set up
    water.animations.add('waves0', [0, 1, 2, 3, 2, 1]);
    water.animations.add('waves1', [4, 5, 6, 7, 6, 5]);
    water.animations.add('waves2', [8, 9, 10, 11, 10, 9]);
    water.animations.add('waves3', [12, 13, 14, 15, 14, 13]);
    water.animations.add('waves4', [16, 17, 18, 19, 18, 17]);
    water.animations.add('waves5', [20, 21, 22, 23, 22, 21]);
    water.animations.add('waves6', [24, 25, 26, 27, 26, 25]);
    water.animations.add('waves7', [28, 29, 30, 31, 30, 29]);
    // water.animations.add('waves8', [32, 33, 34, 35, 36, 35, 34, 33]);
    // water.animations.add('waves9', [36, 37, 38, 39, 40, 39, 38, 37]);
    // water.animations.add('waves10',[40, 41, 42, 43, 44, 43, 42, 41]);
    // water.animations.add('waves11',[44, 45, 46, 47, 48, 47, 46, 45]);

    // change to animation num
    var n = 7;
    // play animation
    water.animations.play('waves' + n, 8, true);

    text = game.add.text(game.world.centerX, game.world.centerY, 'Press enter key to start', { font: "64px Arial", fill: "#ffffff", align: "center" });
    text.anchor.setTo(0.5, 0.5);


      controlKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
      enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);




}
function start() {
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}
function updateCounter() {

    counter++;
    // if answer is true water.y-


    text.setText('Counter: ' + counter);

}

function update() {


  if(enterKey.isDown ) {
   start();
   enterKey.isDown = false;

  }
  if(controlKey.isDown){
    water.y+=10;
    // alert("1");
    controlKey.isDown = false;
  }
  else if(upKey.isDown) {
  // else if answer is wrong water.y+
    water.y-=10;
    upKey.isDown = false;
  }

  if(water.position.y <= -40) {

    game.time.events.stop();

    text.setText("You Lose!");
    upKey.removeKey(UP);
  }
  else if ( water.position.y >= 580) {
    text.setText("You Win!");
  }


}
