// create phaser game
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

// preloads my assets
function preload() {

    // game.load.spritesheet('waters', 'assets/sprites/waters.png', 32, 400, 32);
    game.load.spritesheet('waters', 'assets/sprites/waters2.png', 50, 800);

    //  Here we load the octopus Texture Atlas and XML file
    game.load.atlasXML('octopus', 'assets/sprites/octopus.png', 'assets/sprites/octopus.xml');
} //end preload

// global variables
var water;
var counter = 0;
var text = 0;
var cursors;
var controlKey;
var enterKey= 0;
// var upKey = 0;
// var downKey = 0;
var runningGame = false;
var startPosition = 400; // y start position of water
var octopus;
var octopusTween;
var octopusStartPositionY = 450;
var questionsAnswersArray
// questions and answers array
 questionsAnswersArray =
 [
  //  ["Save", "s"],
  //  ["Copy", "c" ],
   ["control", "CONTROL"]
 ]

// start painting the screen
function create() {
  // constructor new TileSprite(game, x, y, width of sprite, height of sprite, key of image used, frame is part of sprite used)
    // water = game.add.tileSprite(0, 540, 800, 600, 'waters');
    water = game.add.tileSprite(0, startPosition, 1600, 800, 'waters');
    water.scale.setTo(.5,1);
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

    text = game.add.text(game.world.centerX, game.world.centerY, 'Press enter key to start', { font: "64px Arial", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 450 });
    text.anchor.setTo(0.5, 0.5);

    cursors = game.input.keyboard.createCursorKeys();

    controlKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    octopus = game.add.sprite(300, octopusStartPositionY, 'octopus');

    //  Create an animation called 'swim', the fact we don't specify any frames means it will use all frames in the atlas
    octopus.animations.add('swim');

    //  Play the animation at 30fps on a loop
    octopus.animations.play('swim', 30, true);

    //  Bob the octopus up and down with a tween
    // octopusTween = game.add.tween(octopus).to({ y: 400 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

} //end create



function update() {


  if(enterKey.isDown && water.y == startPosition) {
    console.log("enter");
    start();
    //  text.setText('Counter: ' + counter);
    game.time.events.start();
    enterKey.isDown = false;
    runningGame = true;
  }

   if (runningGame) {
     if(cursors.down.isDown){
       water.y+=10;
       // alert("1");
       // downKey.isDown = false;
        octopus.y += .5;
      // octopusTween = game.add.tween(octopus).to({ y: '+100' }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

     }
     else  {
     // else if answer is wrong water goes up
       water.y-=.5;
       // upKey.isDown = false;
        octopus.y -= .5;
      //  octopusTween = game.add.tween(octopus).to({ y: '-100' }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);;
     }

  }




  if( water.position.y <= -10 || water.position.y >= 580 ) {
      runningGame = false; //turns of my up/down game keys

      game.time.events.stop();


    if(water.position.y <= -10) {

      text.text = "You Lose! Press enter to restart";
      // upKey = " ";

    }
    else if ( water.position.y >= 580) {

      text.text = "You Win! Press enter to restart";
      // downKey = " ";


    }

    if(enterKey.isDown){
      restart();
      enterKey.isDown = false;
    }

  }
} // end update


// start game when enterkey is pressed
function start() {
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function updateCounter() {

    counter++;
    // if answer is true water.y-


    text.setText('Counter: ' + counter);

}

function restart() {
      water.position.y = startPosition;
      counter = 0;
      octopus.y = octopusStartPositionY;
      // runningGame = true;
      text.text = "Press enter to start";

}
