var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/world/csv/Tutorial-Test.csv', null, Phaser.Tilemap.CSV);

    game.load.image('tilesColor', 'assets/world/tiles/tilesColor.png');
    game.load.image('tilesBW', 'assets/world/tiles/tilesBW.png');

    game.load.atlasJSONHash('protagColor', 'assets/sprites/protagColor.png', 'assets/sprites/protagColor.json');
    game.load.atlasJSONHash('protagBW', 'assets/sprites/protagBW.png', 'assets/sprites/protagBW.json');

    game.load.atlasJSONHash('bluePower', 'assets/sprites/bluePower.png', 'assets/sprites/powerOrb.json');

    game.load.atlasJSONHash('greenPower', 'assets/sprites/greenPower.png', 'assets/sprites/powerOrb.json');

    game.load.atlasJSONHash('redPower', 'assets/sprites/redPower.png', 'assets/sprites/powerOrb.json');

}

var mapColor;
var mapBW;
var tileset;
var layerColor;
var layerBW
var cursors;
var protagColor;
var protagBW;
var protagRed;
var protagBlue;
var protagGreen;
var activeProtags;
var allProtags;
var protagsUsed = [];
var facing = 'forward';
var bluePower;
var redPower;
var greenPower;

var colorStock = 3;
var blueOrbs = 1;
var redOrbs = 1;
var greenOrbs = 1;

var bwTint = 0xAAAAAA;
var bwAlpha = 1;
var bwTintCache = 0xAAAAAA;
var bwAlphaCache = 1;

var colorTint = 0xAAAAAA;
var colorAlpha = 1;
var colorTintCache = 0xAAAAAA;
var colorAlphaCache = 1;

var rKey;
var gKey;
var bKey;
var rFlag = false;
var gFlag = false;
var bFlag = false;

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

  protagRed = game.add.sprite(640, 32, 'protagBW');
  protagBlue = game.add.sprite(640, 32, 'protagBW');
  protagGreen = game.add.sprite(640, 32, 'protagBW');

  bluePower1 = game.add.sprite(640, 128, 'bluePower');
  bluePower2 = game.add.sprite(640, 192, 'bluePower');
  greenPower1 = game.add.sprite(672, 128, 'greenPower');
  greenPower2 = game.add.sprite(672, 192, 'greenPower');
  redPower1 = game.add.sprite(704, 128, 'redPower');
  redPower2 = game.add.sprite(704, 192, 'redPower');

  protagRed.alpha = 0;
  protagBlue.alpha = 0;
  protagGreen.alpha = 0;

  protagRed.tint = 0xAA0000;
  protagGreen.tint = 0x00AA00;
  protagBlue.tint = 0x0000AA;


  activeProtags = [protagColor, protagBW]
  allProtags = [protagColor, protagBW, protagRed, protagGreen, protagBlue];
  bluePower = [bluePower1, bluePower2]
  greenPower = [greenPower1, greenPower2]
  redPower = [redPower1, redPower2]
  orbs = [bluePower1, bluePower2, greenPower1, greenPower2,redPower1, redPower2]

  // add all animations and necessary components //

  allProtags.forEach(addAnimation)

  function addAnimation(protag) {
    protag.animations.add('forward', [79, 80, 81, 82, 83, 84, 85, 86]);
    protag.animations.add('away', [61, 62, 63, 64, 65, 66, 67, 68]);
    protag.animations.add('right', [88, 89, 90, 91, 92, 93, 94, 95]);
    protag.animations.add('left', [70, 71, 72, 73, 74, 75, 76, 77]);
    protag.animations.add('forward-right', [86,87,88])
    protag.animations.add('forward-left', [79,78,77])
    protag.animations.add('right-forward', [88,87,86])
    protag.animations.add('left-forward', [77,78,79])
    protag.animations.add('left-right', [77,78,87,88])
    protag.animations.add('right-left', [88,87,78,77])
    protag.animations.add('away-right', [95,96])
    protag.animations.add('away-left', [68,69])
    protag.animations.add('away-forward', [96,97,87,86])
    protag.animations.add('left-away', [69,68])
    protag.animations.add('right-away', [96,95])
    protag.animations.add('forward-away', [86,87,97,96])

    game.physics.arcade.enable(protag);
    protag.body.setSize(24, 20, 20, 44);
    protag.body.collideWorldBounds = true;
  }

  orbs.forEach(function(orb) {
    orb.animations.add('active', [0,1,2,3]);
    orb.animations.add('destroy', [4,5,6,7]);
    orb.animations.play('active', 16, true);

    game.physics.arcade.enable(orb);
    orb.body.setSize(32, 32, 0, 0);
  })

  cursors = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addCallbacks(this, null, null, keyPress);


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

  protagBW.alpha = bwAlpha;
  protagBW.tint = bwTint;
  protagColor.tint = colorTint;
  protagColor.alpha = colorAlpha;

  game.camera.follow(activeProtags[0]);

  // game.physics.arcade.collide(protagColor, layerColor);
  // game.physics.arcade.collide(protagBW, layerBW);

  allProtags.forEach(function(protag) {
    protag.body.velocity.set(0)
    game.physics.arcade.collide(protag, layerColor);
  })


  bluePower.forEach(function(orb) {
    game.physics.arcade.collide(protagColor, orb, bluePowerConsume, null, this);
  })

  greenPower.forEach(function(orb) {
    game.physics.arcade.collide(protagColor, orb, greenPowerConsume, null, this);
  })

  redPower.forEach(function(orb) {
    game.physics.arcade.collide(protagColor, orb, redPowerConsume, null, this);
  })

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////



  // Player Movement //
  if (cursors.left.isDown) {

    activeProtags.forEach(function(protag) {
      protag.body.velocity.x = -playerVelocity;
    })

    if (facing != 'left') {

      allProtags.forEach(function(protag) {
        protag.animations.play(facing+'-left', animationSpeed, false);
      })

      facing = 'left';
    }

    activeProtags.forEach(function(protag) {
      protag.animations.play('left', animationSpeed, true);
    })

  } else if (cursors.right.isDown) {

    activeProtags.forEach(function(protag) {
      protag.body.velocity.x = playerVelocity;
    })

    if (facing != 'right') {

      allProtags.forEach(function(protag) {
        protag.animations.play(facing+'-right', animationSpeed, false);
      })

      facing = 'right';
    }

    activeProtags.forEach(function(protag) {
      protag.animations.play('right', animationSpeed, true);
    })


  } else if (cursors.down.isDown) {

    activeProtags.forEach(function(protag) {
      protag.body.velocity.y = playerVelocity;
    })

    if (facing != 'forward') {

      allProtags.forEach(function(protag) {
        protag.animations.play(facing+'-forward', animationSpeed, false);
      })

      facing = 'forward';
    }

    activeProtags.forEach(function(protag) {
      protag.animations.play('forward', animationSpeed, true);
    })

  } else if (cursors.up.isDown) {

    activeProtags.forEach(function(protag) {
      protag.body.velocity.y = -playerVelocity;
    })

    if (facing != 'away') {

      allProtags.forEach(function(protag) {
        protag.animations.play(facing+'-away', animationSpeed, false);
      })

      facing = 'away';
    }

    activeProtags.forEach(function(protag) {
      protag.animations.play('away', animationSpeed, true);
    })


  } else {

    allProtags.forEach(function(protag) {
      protag.animations.stop();
    })

    // protagColor.tint = 0xFFFFFF;
    // protagBW.tint = 0xFFFFFF;

    if (facing == 'left') {

      allProtags.forEach(function(protag) {
        protag.frame = 77;
      })

    } else if (facing == 'right') {

      allProtags.forEach(function(protag) {
        protag.frame = 87;
      })

    } else if (facing == 'forward') {

      allProtags.forEach(function(protag) {
        protag.frame = 79;
      })

    } else if (facing == 'away') {

      allProtags.forEach(function(protag) {
        protag.frame = 96;
      })

    }

  }

  // resynchronize two character layers //

  if (protagColor.x !== protagBW.x || protagColor.y !== protagBW.y) {
    protagColor.x = protagBW.x
    protagColor.y = protagBW.y
  }

}

// player separation
function keyPress(char) {
  console.log(char)
  switch(char) {
    case 'r':
      colorKeydown(protagRed, redOrbs, 0xAA0000)
      break;
    case 'g':
      colorKeydown(protagGreen, greenOrbs, 0x00AA00);
      break;
    case 'b':
      colorKeydown(protagBlue, blueOrbs, 0x0000AA);
      break;
    case ' ':
      spaceKeydown();
    default:
      break;
  }
}

function spaceKeydown() {
  allProtags.forEach(function(protag) {
    protag.alpha = 0;
  });
  protagColor.x = activeProtags[0].x;
  protagColor.y = activeProtags[0].y;
  protagBW.x = activeProtags[0].x;
  protagBW.y = activeProtags[0].y;

  colorAlpha = colorAlphaCache;
  colorTint = colorTintCache;
  bwAlpha = bwAlphaCache;
  bwTint = bwTintCache;

  colorStock = 3;
  protagsUsed = [];
  activeProtags = [protagColor, protagBW];
}

function colorKeydown(protag, orbs, tint) {
  if (activeProtags[0] !== protag) {
    var protagHasBeenUsed = protagsUsed.some(function(protagInList) {
      return (protagInList === protag)
    })
    if (!protagHasBeenUsed) {
      bwTint -= tint;
      bwAlpha -= .1 * orbs;
      // colorAlpha -= .1 * orbs;
      colorTint -= tint;
      console.log(bwTint, bwTintCache)
      protag.x = protagColor.x;
      protag.y = protagColor.y
      colorStock -= 1;
      if (colorStock === 0) {
        colorAlpha = 0;
        bwAlpha = 0;
      }
      protagsUsed.push(protag);
    }
    protag.alpha = .5 + .1 * orbs;
    activeProtags = [protag];
  }
  return;
}



var red = 256;
var green = 256;
var blue = 256;

function bluePowerConsume(_protagBW, _bluePower) {
  // _bluePower.animations.play('destroy', 16, false); // Doesn't do anything, sprite killed before it can show the animation.
  _bluePower.kill();
  blueOrbs += 1;
  protagBW.tint += 0x000011;
  protagBW.alpha -= .1;

  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
}

function redPowerConsume(_protagBW, _redPower) {
  // _redPower.animations.play('destroy', 16, false); // Doesn't do anything, sprite killed before it can show the animation.
  _redPower.kill();
  redOrbs += 1;
  protagBW.tint += 0x001100;
  protagBW.alpha -= .1;

  layerBW.tint -= 0x002222;
  layerBW.alpha -= .1;
}

function greenPowerConsume(_protagBW, _greenPower) {
  // _greenPower.animations.play('destroy', 16, false); // Doesn't do anything, sprite killed before it can show the animation.
  _greenPower.kill();
  greenOrbs += 1;
  bwTint -= 0x220022;
  bwTintCache -= 0x220022;
  bwAlpha -= .1;
  bwAlphaCache -= .1;


  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
}



function render() {
  // layerColor.debug = true;
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(protagColor);
  // game.debug.bodyInfo(protagColor, 16, 24);
}
