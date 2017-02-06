var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/world/csv/Tutorial-Test.csv', null, Phaser.Tilemap.CSV);

    game.load.image('tilesColor', 'assets/world/tiles/tilesColor.png');
    game.load.image('tilesBW', 'assets/world/tiles/tilesBW.png');

    game.load.atlasJSONHash('protagColor', 'assets/sprites/protagColor.png', 'assets/sprites/protagColor.json');
    game.load.atlasJSONHash('protagBW', 'assets/sprites/protagBW.png', 'assets/sprites/protagBW.json');

    game.load.atlasJSONHash('bluePower', 'assets/sprites/bluePower.png', 'assets/sprites/bluePower.json');

}

var mapColor;
var mapBW;
var tileset;
var layerColor;
var layerBW
var cursors;
var protagColor;
var protagBW;
var facing = 'forward';

var rKey;
var gKey;
var bKey;

var collisionTiles = [138]


function create() {

  mapColor = game.add.tilemap('map', 32, 32);
  mapBW = game.add.tilemap('map', 32, 32)

  mapColor.addTilesetImage('tilesColor');
  mapBW.addTilesetImage('tilesBW');

  layerColor = mapColor.createLayer(0);
  layerBW = mapBW.createLayer(0);

  layerColor.alpha = 1
  layerBW.alpha = 1;

  layerColor.resizeWorld();

  mapColor.setCollision(collisionTiles);
  mapBW.setCollision(collisionTiles);

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////


  // add all sprites //
  protagColor = game.add.sprite(640, 32, 'protagColor');
  protagBW = game.add.sprite(640, 32, 'protagBW');
  bluePower1 = game.add.sprite(640, 128, 'bluePower');
  bluePower2 = game.add.sprite(640, 192, 'bluePower');


  // add all animations //
  bluePower1.animations.add('active', [0,1,2,3])
  bluePower1.animations.add('destroy', [4,5,6,7])

  bluePower2.animations.add('active', [0,1,2,3])
  bluePower2.animations.add('destroy', [4,5,6,7])

  protagColor.animations.add('forward', [79, 80, 81, 82, 83, 84, 85, 86]);
  protagColor.animations.add('away', [61, 62, 63, 64, 65, 66, 67, 68]);
  protagColor.animations.add('right', [88, 89, 90, 91, 92, 93, 94, 95]);
  protagColor.animations.add('left', [70, 71, 72, 73, 74, 75, 76, 77]);
  protagColor.animations.add('forward-right', [86,87,88])
  protagColor.animations.add('forward-left', [79,78,77])
  protagColor.animations.add('right-forward', [88,87,86])
  protagColor.animations.add('left-forward', [77,78,79])
  protagColor.animations.add('left-right', [77,78,87,88])
  protagColor.animations.add('right-left', [88,87,78,77])
  protagColor.animations.add('away-right', [95,96])
  protagColor.animations.add('away-left', [68,69])
  protagColor.animations.add('away-forward', [96,97,87,86])
  protagColor.animations.add('left-away', [69,68])
  protagColor.animations.add('right-away', [96,95])
  protagColor.animations.add('forward-away', [86,87,97,96])

  protagBW.animations.add('forward', [79, 80, 81, 82, 83, 84, 85, 86]);
  protagBW.animations.add('away', [61, 62, 63, 64, 65, 66, 67, 68]);
  protagBW.animations.add('right', [88, 89, 90, 91, 92, 93, 94, 95]);
  protagBW.animations.add('left', [70, 71, 72, 73, 74, 75, 76, 77]);
  protagBW.animations.add('forward-right', [86,87,88])
  protagBW.animations.add('forward-left', [79,78,77])
  protagBW.animations.add('right-forward', [88,87,86])
  protagBW.animations.add('left-forward', [77,78,79])
  protagBW.animations.add('left-right', [77,78,87,88])
  protagBW.animations.add('right-left', [88,87,78,77])
  protagBW.animations.add('away-right', [95,96])
  protagBW.animations.add('away-left', [68,69])
  protagBW.animations.add('away-forward', [96,97,87,86])
  protagBW.animations.add('left-away', [69,68])
  protagBW.animations.add('right-away', [96,95])
  protagBW.animations.add('forward-away', [86,87,97,96])

  // enable physics for all sprites //
  game.physics.arcade.enable(bluePower1);
  game.physics.arcade.enable(bluePower2);
  game.physics.arcade.enable(protagColor);
  game.physics.arcade.enable(protagBW);


  // set collider body for all sprites //
  bluePower1.body.setSize(32, 32, 0, 0);
  bluePower2.body.setSize(32, 32, 0, 0);
  protagBW.body.setSize(24, 20, 20, 44);
  protagColor.body.setSize(24, 20, 20, 44);

  // activate animations that need to start when game does //
  bluePower1.animations.play('active', 16, true);
  bluePower2.animations.play('active', 16, true);

  // make player unable to walk out of bounds //
  protagColor.body.collideWorldBounds = true;
  protagBW.body.collideWorldBounds = true;

  protagBW.alpha = 1

  game.camera.follow(protagBW);

  cursors = game.input.keyboard.createCursorKeys();

  rKey = game.input.keyboard.addKey(Phaser.Keyboard.R)
  gKey = game.input.keyboard.addKey(Phaser.Keyboard.G)
  bKey = game.input.keyboard.addKey(Phaser.Keyboard.B)



  ///////##################
  ////////////////////////// Use this for tiles with events.
  // map.setTileIndexCallback(138, function() {
  //   console.log("it worked")
  // }, this);
  /////////////////////////
  ///////#################
}

var animationSpeed = 20;  // fps
var playerVelocity = 200;

function update() {
  game.physics.arcade.collide(protagColor, layerColor);
  game.physics.arcade.collide(protagBW, layerBW);

  protagColor.body.velocity.set(0);
  protagBW.body.velocity.set(0);

  game.physics.arcade.collide(protagColor, bluePower1, bluePowerConsume, null, this);
  game.physics.arcade.collide(protagColor, bluePower2, bluePowerConsume, null, this);

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////



  // Player Movement //
  if (cursors.left.isDown) {

    protagColor.body.velocity.x = -playerVelocity;
    protagBW.body.velocity.x = -playerVelocity;

    if (facing != 'left') {

      protagColor.animations.play(facing+'-left', animationSpeed, false);
      protagBW.animations.play(facing+'-left', animationSpeed, false);

      facing = 'left';
    }

    protagColor.animations.play('left', animationSpeed)
    protagBW.animations.play('left', animationSpeed)


  } else if (cursors.right.isDown) {

    protagColor.body.velocity.x = playerVelocity;
    protagBW.body.velocity.x = playerVelocity;

    if (facing != 'right') {

      protagColor.animations.play(facing+'-right', animationSpeed, false);
      protagBW.animations.play(facing+'-right', animationSpeed, false);

      facing = 'right';
    }

    protagColor.animations.play('right', animationSpeed)
    protagBW.animations.play('right', animationSpeed)


  } else if (cursors.down.isDown) {

    protagColor.body.velocity.y = playerVelocity;
    protagBW.body.velocity.y = playerVelocity;

    if (facing != 'forward') {

      protagColor.animations.play(facing+'-forward', animationSpeed);
      protagBW.animations.play(facing+'-forward', animationSpeed);

      facing = 'forward';
    }

    protagColor.animations.play('forward', animationSpeed)
    protagBW.animations.play('forward', animationSpeed)

  } else if (cursors.up.isDown) {

    protagColor.body.velocity.y = -playerVelocity;
    protagBW.body.velocity.y = -playerVelocity;

    if (facing != 'away') {

      protagColor.animations.play(facing+'-away', animationSpeed);
      protagBW.animations.play(facing+'-away', animationSpeed);

      facing = 'away';
    }
    protagColor.animations.play('away', animationSpeed)
    protagBW.animations.play('away', animationSpeed)


  } else {

    protagColor.animations.stop();
    protagBW.animations.stop();

    protagColor.tint = 0xFFFFFF;
    protagBW.tint = 0xFFFFFF;

    if (facing == 'left') {

      protagColor.frame = 77;
      protagBW.frame = 77;

    } else if (facing == 'right') {

      protagColor.frame = 87;
      protagBW.frame = 87;

    } else if (facing == 'forward') {

      protagColor.frame = 79;
      protagBW.frame = 79;

    } else if (facing == 'away') {

      protagColor.frame = 96;
      protagBW.frame = 96;

    }

  }

  // resynchronize two character layers //

  if (protagColor.x !== protagBW.x || protagColor.y !== protagBW.y) {
    protagColor.x = protagBW.x
    protagColor.y = protagBW.y
  }

}

var red = 256;
var green = 256;
var blue = 256;

function bluePowerConsume(_protagBW, _bluePower) {

  // _bluePower.animations.play('destroy', 16, false); // Doesn't do anything, sprite killed before it can show the animation.
  _bluePower.kill();

  protagBW.tint -= 0x222200;
  protagBW.alpha -= .1;

  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
}

function render() {
  // layerColor.debug = true;
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(protagColor);
  // game.debug.bodyInfo(protagColor, 16, 24);
}
