var gameWidth = 1000;
var gameHeight = 600;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });


function preload() {

  game.load.tilemap('map', 'assets/world/csv/Tutorial-NewTiles.csv', null, Phaser.Tilemap.CSV);

  game.load.image('tilesColor', 'assets/world/tiles/tilesColor.png');
  game.load.image('tilesBW', 'assets/world/tiles/tilesBW.png');

  game.load.image('font', 'assets/fonts/phaserFont.png')
  game.load.image('font2', 'assets/fonts/phaserFont2.png')
  game.load.image('font3', 'assets/fonts/set1PhaserFont2.png')

  game.load.image('blueMarker', 'assets/sprites/blueMarker.png')
  game.load.image('greenMarker', 'assets/sprites/greenMarker.png')
  game.load.image('redMarker', 'assets/sprites/redMarker.png')



  game.load.atlasJSONHash('protagColor', 'assets/sprites/protagColor.png', 'assets/sprites/protagColor.json');
  game.load.atlasJSONHash('protagBW', 'assets/sprites/protagBW.png', 'assets/sprites/protagBW.json');

  game.load.atlasJSONHash('bluePower', 'assets/sprites/bluePower.png', 'assets/sprites/powerOrb.json');
  game.load.atlasJSONHash('greenPower', 'assets/sprites/greenPower.png', 'assets/sprites/powerOrb.json');
  game.load.atlasJSONHash('redPower', 'assets/sprites/redPower.png', 'assets/sprites/powerOrb.json');

  game.load.atlasJSONHash('wall', 'assets/sprites/wall.png', 'assets/sprites/wall.json');

  game.load.atlasJSONHash('wallRight', 'assets/sprites/wallRight.png', 'assets/sprites/wallRight.json');

  game.load.atlasJSONHash('wallLeft', 'assets/sprites/wallLeft.png', 'assets/sprites/wallLeft.json');

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

var wallRight1;
var wallRight2;
var wallRight3;
var walls;

var colorStock = 3;

var blueOrbs = 0;
var redOrbs = 0;
var greenOrbs = 0;


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

var redMarkers;
var greenMarkers;
var blueMarkers;

var greenLevers = 1;
var blueLevers = 1;
var redLevers = 1;
var stopLever = 0;

var collisionTiles = [11, 12, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 103, 104, 116, 117];

// var standardCollisionTiles = [11, 12, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 103, 104, 116, 117];

var redTiles = [27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37]
var blueTiles = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
var greenTiles = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

var colorCollision = [27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

var redCollision = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
var blueCollision = [27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
var greenCollision = [27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
//
// var redActive = false;
// var blueActive = false;
// var greenActive = false;
// var colorActive = true;

var score = 0

var floor;


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

  mapColor.setCollision(collisionTiles.concat(colorCollision));
  mapBW.setCollision(collisionTiles.concat(colorCollision));

  mapColor.setTileIndexCallback([30, 43, 56], colorButtonDown)
  mapColor.setTileIndexCallback([124], winLevel)


  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////


  // add all sprites //
  protagColor = game.add.sprite(608, 32, 'protagColor');
  protagBW = game.add.sprite(608, 32, 'protagBW');

  protagRed = game.add.sprite(608, 32, 'protagBW');
  protagBlue = game.add.sprite(608, 32, 'protagBW');
  protagGreen = game.add.sprite(608, 32, 'protagBW');

  bluePower1 = game.add.sprite(800, 256, 'bluePower');
  bluePower2 = game.add.sprite(800, 288, 'bluePower');
  greenPower1 = game.add.sprite(672, 256, 'greenPower');
  greenPower2 = game.add.sprite(672, 288, 'greenPower');
  redPower1 = game.add.sprite(544, 256, 'redPower');
  redPower2 = game.add.sprite(544, 288, 'redPower');

  wallRight1 = game.add.sprite(832, 224, 'wallRight');
  wallRight2 = game.add.sprite(832, 192, 'wallRight');
  wallRight3 = game.add.sprite(832, 160, 'wallRight');



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
  //
  // wallRight1.animations.add('active', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  // wallRight1.animations.play('active', 20, false);
  // wallRight2.animations.add('active', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  // wallRight2.animations.play('active', 20, false);
  // wallRight3.animations.add('active', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  // wallRight3.animations.play('active', 20, false);

  wallRight1.frame = 4;
  wallRight2.frame = 4;
  wallRight3.frame = 4;

  walls = [wallRight1, wallRight2, wallRight3]

  walls.forEach(function(wall) {
    wall.frame = 4;
    game.physics.enable(wall);
    wall.body.setSize(32, 32, 0, 0)
    wall.body.immovable = true;
  })



  cursors = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addCallbacks(this, null, null, keyPress);


  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ///// Game Display /////
  var boxHeight = 66;

  floor = game.add.graphics(0, 0)
  floor.beginFill(0xAA0000, 1)
  floor.drawRect(0, gameHeight-boxHeight, gameWidth, boxHeight)
  floor.endFill()


  floor.beginFill(0x00AA00, 1)
  floor.drawRect(3, gameHeight-boxHeight+3, gameWidth-6, boxHeight-6)
  floor.endFill()

  floor.beginFill(0x0000AA, 1)
  floor.drawRect(6, gameHeight-boxHeight+6, gameWidth-12, boxHeight-12)
  floor.endFill()

  floor.beginFill(0x000000, 1)
  floor.drawRect(9, gameHeight-boxHeight+9, gameWidth-18, boxHeight-18)
  floor.endFill()

  floor.beginFill(0xAA0000, 1)
  floor.drawRect((gameWidth/3)-6, gameHeight-boxHeight+9, 12, boxHeight-18)
  floor.endFill()

  floor.beginFill(0x00AA00, 1)
  floor.drawRect((gameWidth/3)-4, gameHeight-boxHeight+9, 8, boxHeight-18)
  floor.endFill()

  floor.beginFill(0x0000AA, 1)
  floor.drawRect((gameWidth/3)-2, gameHeight-boxHeight+9, 4, boxHeight-18)
  floor.endFill()

  floor.fixedToCamera = true;

  // var t = game.add.text(12, gameHeight-boxHeight+12, "Score", { font: "32px Arial", fill: "#ffffff", align: "center" });
  //
  // t.fixedToCamera = true;

  font = game.add.retroFont('font3', 31, 32, Phaser.RetroFont.TEXT_SET2, 10, 1, 1);

  // var blueMarker0 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker1 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker2 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker3 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker4 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker5 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker6 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker7 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker8 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')
  // var blueMarker9 = game.add.image((gameWidth/3)+10, gameHeight-boxHeight+12, 'blueMarker')

  redMarkers = [];
  greenMarkers = [];
  blueMarkers = [];

  for (var i=0; i<10; i++) {
    var row = Math.floor(i/5)
    var redX = (gameWidth/3)+10+(i*24) - (row * 120)
    var greenX = redX + 130
    var blueX = greenX + 130
    var markerY = gameHeight-boxHeight+9 + (row * 24)

    var redMarker = game.add.image(redX, markerY, 'redMarker')
    var greenMarker = game.add.image(greenX, markerY, 'greenMarker')
    var blueMarker = game.add.image(blueX, markerY, 'blueMarker')

    var redKey = "redMarker"+i.toString();
    var greenKey = "greenMarker"+i.toString();
    var blueKey = "blueMarker"+i.toString();

    redMarker.key = redKey;
    greenMarker.key = greenKey;
    blueMarker.key = blueKey;

    redMarkers.push(redMarker);
    greenMarkers.push(greenMarker);
    blueMarkers.push(blueMarker);
  }

  redMarkers.forEach(function(marker){
    marker.fixedToCamera = true;
    marker.alpha = 0;
  })
  greenMarkers.forEach(function(marker){
    marker.fixedToCamera = true;
    marker.alpha = 0;
  })
  blueMarkers.forEach(function(marker){
    marker.fixedToCamera = true;
    marker.alpha = 0;
  })


  // var greenMarker = game.add.image((gameWidth/3)+34, gameHeight-boxHeight+12, 'greenMarker')
  // var redMarker = game.add.image((gameWidth/3)+58, gameHeight-boxHeight+12, 'redMarker')



  // blueMarker1.fixedToCamera = true;
  // greenMarker.fixedToCamera = true;
  // redMarker.fixedToCamera = true;


  var scoreText = game.add.image(12, gameHeight-boxHeight+12, font);

  scoreText.fixedToCamera = true


  scoreText.tint = 0xFFFFFF;

  scoreText.width = 64;
  scoreText.height = 64;

}

var animationSpeed = 20;  // fps
var playerVelocity = 200;

function update() {
  // console.log(redActive, blueActive, greenActive, colorActive)

  font.text = 'Score: ' + score.toString();

  for (var i=0; i<10; i++) {
    if (i < redOrbs) {
      redMarkers[i].alpha = 1;
    } else {
      redMarkers[i].alpha = 0;
    }
    if (i < greenOrbs) {
      greenMarkers[i].alpha = 1;
    } else {
      greenMarkers[i].alpha = 0;
    }
    if (i < blueOrbs) {
      blueMarkers[i].alpha = 1;
    } else {
      blueMarkers[i].alpha = 0;
    }
  }


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

  walls.forEach(function(wall) {
    allProtags.forEach(function(protag){
      game.physics.arcade.collide(protag, wall);
    })
  })

  if (greenLevers === 0 && redLevers === 0 && blueLevers === 0 && stopLever === 0) {
    killWall();
    stopLever = 1;
  }

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

function killWall() {
  score += 250
  walls.forEach(function(wall) {
    wall.kill()
  })
}

function colorButtonDown(protag, tile) {
  // console.log(tile.index)
  var prevIndex = tile.index;
  score += 50;
  tile.index = 17;
  switch (prevIndex) {
    case 30:
      redLevers -= 1;
      redOrbs -= 1;
      break;
    case 43:
      greenLevers -= 1;
      greenOrbs -= 1;
      break;
    case 56:
      blueLevers -= 1;
      blueOrbs -= 1;
      break;
    default:
      break;
  }
  console.log(greenLevers, redLevers, blueLevers)
}

function winLevel() {
  console.log("you win!")
}

// player separation
function keyPress(char) {
  console.log(char)
  switch(char) {
    case 'r':
      colorKeydown(protagRed, redOrbs, 0xAA0000, redCollision)
      break;
    case 'g':
      colorKeydown(protagGreen, greenOrbs, 0x00AA00, greenCollision);
      break;
    case 'b':
      colorKeydown(protagBlue, blueOrbs, 0x0000AA, blueCollision);
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

  redActive = false;
  blueActive = false;
  greenActive = false;
  colorActive = activeProtags[0] === protagColor;

  mapColor.setCollisionByExclusion([26], false, layerColor, true);
  mapBW.setCollisionByExclusion([26], false, layerBW, true);

  // mapColor.setCollision(redCollision, redActive);
  // mapBW.setCollision(redCollision, redActive);
  //
  // mapColor.setCollision(blueCollision, blueActive);
  // mapBW.setCollision(blueCollision, blueActive);
  //
  // mapColor.setCollision(greenCollision, greenActive);
  // mapBW.setCollision(greenCollision, greenActive);
  //
  mapColor.setCollision(collisionTiles.concat(colorCollision));
  mapBW.setCollision(collisionTiles.concat(colorCollision));
}

function colorKeydown(protag, orbs, tint, collisionSet) {
  if (orbs < 1) {
    console.log("no orbs!")
  } else {
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

    mapColor.setCollisionByExclusion([26], false, layerColor, true);
    mapBW.setCollisionByExclusion([26], false, layerBW, true);

    // mapColor.setCollision(redCollision, redActive);
    // mapBW.setCollision(redCollision, redActive);
    //
    // mapColor.setCollision(blueCollision, blueActive);
    // mapBW.setCollision(blueCollision, blueActive);
    //
    // mapColor.setCollision(greenCollision, greenActive);
    // mapBW.setCollision(greenCollision, greenActive);
    //
    mapColor.setCollision(collisionTiles.concat(collisionSet));
    mapBW.setCollision(collisionTiles.concat(collisionSet));
    return;
  }


}



var red = 256;
var green = 256;
var blue = 256;

function bluePowerConsume(_protagBW, _bluePower) {
  // _bluePower.animations.play('destroy', 16, false); // Doesn't do anything, sprite killed before it can show the animation.
  score += 25;
  _bluePower.kill();
  blueOrbs += 1;
  protagBW.tint += 0x000011;
  protagBW.alpha -= .1;

  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
}

function redPowerConsume(_protagBW, _redPower) {
  score += 25;
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
  score += 25;
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
  // floor.debug = true;
  // game.debug.geom(floor,'#0fffff');
  // layerColor.debug = true;
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(protagColor);
  // game.debug.bodyInfo(protagColor, 16, 24);
}
