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

/////////////////////////////////////////////////////////////////////
////                   ///////////////////////////////////////////////
/////   Map Resources   ///////////////////////////////////////////////
//////                   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var mapColor;
var mapBW;
var tilesColor;
var tilesBW;
var layerColor;
var layerBW


////////////////////////////////////////////////////////////////////////
////                      ///////////////////////////////////////////////
/////   Sprite Resources   ///////////////////////////////////////////////
//////                      ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

////////////////////////////////
////                      ///////
/////   Protag Resources   ///////
//////                      //////
///////////////////////////////////

var protagColor;
var protagBW;
var protagRed;
var protagBlue;
var protagGreen;
var activeProtags;
var allProtags;

var bwTint;
var bwAlpha;
var bwTintCache;
var bwAlphaCache;

var colorTint;
var colorAlpha;
var colorTintCache;
var colorAlphaCache;

var protagsUsed;
var facing;

var colorStock;

////////////////////////////
////                   //////
/////   Other Sprites   //////
//////                   //////
////////////////////////////////

var bluePower;
var redPower;
var greenPower;

var wallRight1;
var wallRight2;
var wallRight3;
var walls;



///////////////////////////////////////////////////////////////////////////
////                         ///////////////////////////////////////////////
/////   collision Tile Sets   ///////////////////////////////////////////////
//////                         ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var collisionTiles = [
  11, 12, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 103, 104, 116, 117
];

var colorCollision = [
  27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
];

var redCollision = [
  53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
];
var blueCollision = [
  27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
];
var greenCollision = [
  27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63
];

var redTiles = [27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37]
var blueTiles = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
var greenTiles = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]



/////////////////////////////////////////////////////////////////////////
////                              ////////////////////////////////////////
/////   Game Mechanics Components  ////////////////////////////////////////
//////                              ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

var greenLevers;
var blueLevers;
var redLevers;
var stopLever;

var levelScore;
var cachedScore = 0;

var blueOrbs;
var redOrbs;
var greenOrbs;

var cursors;
var enterButton;

var currentLevel;

////////////////////////////////////////////////////////////////
////                     ////////////////////////////////////////
/////   In-Game Display   ////////////////////////////////////////
//////                     ////////////////////////////////////////
////////////////////////////////////////////////////////////////////

var floor;

var redMarkers;
var greenMarkers;
var blueMarkers;


////////////////////////////////////////////////////////////////
////                     ////////////////////////////////////////
/////   Main Menu         ////////////////////////////////////////
//////                     ////////////////////////////////////////
////////////////////////////////////////////////////////////////////

var mainMenu;
var menuItem1;
var menuItem2;
var menuItem3;
var menuItems;
var menuItemSelect;

///////////////////////////////////////////////////////////////////////////////
var masterResources = [
  mapColor,
  mapBW,
  tilesColor,
  tilesBW,
  layerColor,
  layerBW,
  protagColor,
  protagBW,
  protagRed,
  protagBlue,
  protagGreen,
  activeProtags,
  allProtags,
  bwTint,
  bwAlpha,
  bwTintCache,
  bwAlphaCache,
  colorTint,
  colorAlpha,
  colorTintCache,
  colorAlphaCache,
  protagsUsed,
  facing,
  colorStock,
  bluePower,
  redPower,
  greenPower,
  wallRight1,
  wallRight2,
  wallRight3,
  walls,
  greenLevers,
  blueLevers,
  redLevers,
  stopLever,
  levelScore,
  blueOrbs,
  redOrbs,
  greenOrbs,
  cursors,
  enterButton,
  currentLevel,
  floor,
  redMarkers,
  greenMarkers,
  blueMarkers,
  mainMenu,
  menuItem1,
  menuItem2,
  menuItem3,
  menuItems,
  menuItemSelect
]
///////////////////////////////////////////////////////////////////////////////

function create() {
  var masterResources = [
    mapColor,
    mapBW,
    tilesColor,
    tilesBW,
    layerColor,
    layerBW,
    protagColor,
    protagBW,
    protagRed,
    protagBlue,
    protagGreen,
    activeProtags,
    allProtags,
    bwTint,
    bwAlpha,
    bwTintCache,
    bwAlphaCache,
    colorTint,
    colorAlpha,
    colorTintCache,
    colorAlphaCache,
    protagsUsed,
    facing,
    colorStock,
    bluePower,
    redPower,
    greenPower,
    wallRight1,
    wallRight2,
    wallRight3,
    walls,
    greenLevers,
    blueLevers,
    redLevers,
    stopLever,
    levelScore,
    blueOrbs,
    redOrbs,
    greenOrbs,
    cursors,
    enterButton,
    currentLevel,
    floor,
    redMarkers,
    greenMarkers,
    blueMarkers,
    mainMenu,
    menuItem1,
    menuItem2,
    menuItem3,
    menuItems,
    menuItemSelect
  ]
  game.paused = true;
  masterResources.forEach(function(resource){
    resource = null;
  })


  mainMenu = game.add.graphics(0, 0);
  mainMenu.beginFill(0xFF0000);
  mainMenu.drawRect(0+game.camera.x, 0+game.camera.y, gameWidth, gameHeight)
  mainMenu.endFill();

  mainMenu.beginFill(0x00FF00);
  mainMenu.drawRect(3+game.camera.x, 3+game.camera.y, gameWidth-6, gameHeight-6)
  mainMenu.endFill();

  mainMenu.beginFill(0x0000FF);
  mainMenu.drawRect(6+game.camera.x, 6+game.camera.y, gameWidth-12, gameHeight-12);
  mainMenu.endFill();

  mainMenu.beginFill(0x000000);
  mainMenu.drawRect(9+game.camera.x, 9, gameWidth-18+game.camera.y, gameHeight-18);
  mainMenu.endFill();

  var style = {font:"bold 32px courier", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

  menuItem1 = game.add.text(200, 150, "New Game", style);
  menuItem2 = game.add.text(200, 250, "Tutorial", style);
  menuItem3 = game.add.text(200, 350, "Leader Board", style);

  menuItems = [menuItem1, menuItem2, menuItem3]
  var colors = [0xFF0000, 0x00FF00, 0x0000FF]

  enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

  enterButton.onDown.add(menuEnter)

  menuItems.forEach(function(item, index){
    item.tint = colors[index]
    item.alpha = .4
  })

  menuItem2.alpha = 1;




  selectorArrow = game.add.sprite(140, 218, 'protagBW')
  selectorArrow.tint = 0x00FF00;
  selectorArrow.frame = 159;

  menuItemSelect = 1;

  cursors = game.input.keyboard.createCursorKeys();

  cursors.up.onDown.add(function(){

    menuItemSelect -= 1;
    if (menuItemSelect < 0) {
      menuItemSelect = menuItems.length - 1;
    }
    menuItems[(menuItemSelect+1)%menuItems.length].alpha = .4;

    selectorArrow.destroy()
    menuItems[menuItemSelect%menuItems.length].alpha = 1;

    selectorArrow = game.add.sprite(145, 118+(menuItemSelect%menuItems.length)*100, 'protagBW')
    selectorArrow.tint = colors[menuItemSelect%menuItems.length]
    selectorArrow.frame = 159;

    console.log(menuItemSelect)
  })

  cursors.down.onDown.add(function() {

    menuItemSelect += 1;
    menuItems[(menuItemSelect-1)%menuItems.length].alpha = .4;

    selectorArrow.destroy()
    menuItems[menuItemSelect%menuItems.length].alpha = 1;

    selectorArrow = game.add.sprite(145, 118+(menuItemSelect%menuItems.length)*100, 'protagBW')
    selectorArrow.tint = colors[menuItemSelect%menuItems.length]
    selectorArrow.frame = 159;

    console.log(menuItemSelect)
  })





}

function menuEnter() {
  switch (menuItemSelect%menuItems.length) {
    case 0:
      console.log("New Game Selected.")
      break;
    case 1:
      console.log("tutorial selected")
      mainMenu.destroy();
      menuItems.forEach(function(item){
        item.destroy();
      })
      selectorArrow.destroy();
      cursors.up.reset(true);
      cursors.down.reset(true);
      enterButton.reset(true);
      tutorial();
      game.paused = false;
      break;
    case 2:
      console.log("leaderboard selected")
    default:
      break;
  }
}


function tutorial() {

  currentLevel = tutorial;

  ////////////////////////////////////////////////////////////
  ////         ////////////////////////////////////////////////
  /////   Map   ////////////////////////////////////////////////
  //////         ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

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




  //////////////////////////////////////////////////////////////
  ////           ////////////////////////////////////////////////
  /////  Sprites  ////////////////////////////////////////////////
  //////           ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

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



  // Populate Necessary Sprite Arrays //

  activeProtags = [protagColor, protagBW]
  allProtags = [protagColor, protagBW, protagRed, protagGreen, protagBlue];
  bluePower = [bluePower1, bluePower2]
  greenPower = [greenPower1, greenPower2]
  redPower = [redPower1, redPower2]
  orbs = [bluePower1, bluePower2, greenPower1, greenPower2,redPower1, redPower2]
  walls = [wallRight1, wallRight2, wallRight3]



  // Add sprite animations and enable sprite physics //

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

  walls.forEach(function(wall) {
    wall.frame = 4;
    game.physics.enable(wall);
    wall.body.setSize(32, 32, 0, 0)
    wall.body.immovable = true;
  })



  // Set protag sprite colors and alphas //

  protagColor.alpha = 1;
  protagBW.alpha = 1;

  protagRed.alpha = 0;
  protagBlue.alpha = 0;
  protagGreen.alpha = 0;

  protagColor.tint = 0xFFFFFF;
  protagBW.tint = 0xFFFFFF;

  protagRed.tint = 0xAA0000;
  protagGreen.tint = 0x00AA00;
  protagBlue.tint = 0x0000AA;

  bwTint = 0xAAAAAA;
  bwAlpha = 1;
  bwTintCache = 0xAAAAAA;
  bwAlphaCache = 1;

  colorTint = 0xAAAAAA;
  colorAlpha = 1;
  colorTintCache = 0xAAAAAA;
  colorAlphaCache = 1;

  protagsUsed = [];
  facing = 'forward';

  colorStock = 3;

  /////////////////////////////////////////////////////////////////////////
  ////                              ////////////////////////////////////////
  /////   Game Mechanics Components  ////////////////////////////////////////
  //////                              ////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  greenLevers = 1;
  blueLevers = 1;
  redLevers = 1;
  stopLever = 0;

  levelScore = 0;

  blueOrbs = 0;
  redOrbs = 0;
  greenOrbs = 0;

  cursors = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addCallbacks(this, null, null, keyPress);

  enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

  enterButton.onDown.add(pressEnter)


  //////////////////////////////////////////////////////////////////////
  ////                   ////////////////////////////////////////////////
  /////  In-Game Display  ////////////////////////////////////////////////
  //////                   ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var boxHeight = 66;

  floor = game.add.graphics(0, 0)


  // Main Box //

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



  // Divider 1 //

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



  // Markers For Each Orb //

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



  // Score text with retro font //

  font = game.add.retroFont('font3', 31, 32, Phaser.RetroFont.TEXT_SET2, 10, 1, 1);

  var scoreText = game.add.image(12, gameHeight-boxHeight+12, font);

  scoreText.fixedToCamera = true

  scoreText.tint = 0xFFFFFF;

  scoreText.width = 64;
  scoreText.height = 64;



}




var animationSpeed = 20;  // fps
var playerVelocity = 200;



function update() {

  /////////////////////////////////////////////////////////////////////
  ////                  ////////////////////////////////////////////////
  /////  Sprite Updates  ////////////////////////////////////////////////
  //////                  ////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////


  game.camera.follow(activeProtags[0]);



  /////////////////////////////
  ////                    //////
  /////  Protag Movement   //////
  //////                    //////
  /////////////////////////////////

  allProtags.forEach(function(protag) {
    protag.body.velocity.set(0)
    game.physics.arcade.collide(protag, layerColor);
  })

  if (cursors.left.isDown) {

    // Left //

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



    // Right //

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



    // Down //

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



    // Up //

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



    // Idle //

    allProtags.forEach(function(protag) {
      protag.animations.stop();
    })

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



  // Update protag Colors //

  protagBW.alpha = bwAlpha;
  protagBW.tint = bwTint;
  protagColor.tint = colorTint;
  protagColor.alpha = colorAlpha;



  ////////////////////////
  ////               //////
  /////  Collisions   //////
  //////               //////
  ////////////////////////////

  bluePower.forEach(function(orb) {
    game.physics.arcade.collide(protagColor, orb, bluePowerConsume, null, this);
  })

  greenPower.forEach(function(orb) {
    game.physics.arcade.collide(protagColor, orb, greenPowerConsume, null, this);
  })

  redPower.forEach(function(orb) {
    game.physics.arcade.collide(protagColor, orb, redPowerConsume, null, this);
  })

  walls.forEach(function(wall) {
    allProtags.forEach(function(protag){
      game.physics.arcade.collide(protag, wall);
    })
  })


  //////////////////////////////////////////////////////////////////////////////

  if (greenLevers === 0 && redLevers === 0 && blueLevers === 0 && stopLever === 0) {
    killWall();
    stopLever = 1;
  }

  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////
  ////                   ////////////////////////////////////////////////
  /////  In-Game Display  ////////////////////////////////////////////////
  //////                   ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////


  font.text = 'Score: ' + (levelScore + cachedScore).toString();

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

}


/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////                            ///////////////////////////////////////
/////  Game Mechanic Callbacks   ///////////////////////////////////////
//////                            ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
////                   ///////////////////////////////////////
/////  Sprite Destroy   ///////////////////////////////////////
//////                   ///////////////////////////////////////
/////////////////////////////////////////////////////////////////

function killWall() {
  levelScore += 250
  walls.forEach(function(wall) {
    wall.kill()
  })
}

function bluePowerConsume(_protagBW, _bluePower) {
  levelScore += 25;
  _bluePower.kill();
  blueOrbs += 1;

  protagBW.tint += 0x000011;
  protagBW.alpha -= .1;
  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
}

function redPowerConsume(_protagBW, _redPower) {
  levelScore += 25;
  _redPower.kill();
  redOrbs += 1;

  protagBW.tint += 0x001100;
  protagBW.alpha -= .1;
  layerBW.tint -= 0x002222;
  layerBW.alpha -= .1;
}

function greenPowerConsume(_protagBW, _greenPower) {

  levelScore += 25;
  _greenPower.kill();
  greenOrbs += 1;

  bwTint -= 0x220022;
  bwTintCache -= 0x220022;
  bwAlpha -= .1;
  bwAlphaCache -= .1;

  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
}




//////////////////////////////////////////////////////////////
////                    ///////////////////////////////////////
/////  Character Split   ///////////////////////////////////////
//////                    ///////////////////////////////////////
//////////////////////////////////////////////////////////////////


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
      spaceKeydown()
      break;

    default:
      break;

  }
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

    mapColor.setCollision(collisionTiles.concat(collisionSet));
    mapBW.setCollision(collisionTiles.concat(collisionSet));

    return;

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

  mapColor.setCollision(collisionTiles.concat(colorCollision));
  mapBW.setCollision(collisionTiles.concat(colorCollision));
}




/////////////////////////////////////////////////////////////////
////                       ///////////////////////////////////////
/////  Game Functionality   ///////////////////////////////////////
//////                       ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////

function colorButtonDown(protag, tile) {
  // console.log(tile.index)
  var prevIndex = tile.index;
  levelScore += 50;
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

var red = 256;
var green = 256;
var blue = 256;


////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////                 /////////////////////////////////////////////////////
/////  In Game Menu   /////////////////////////////////////////////////////
//////                 /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var pauseItem1;
var pauseItem2;
var pauseItem3;
var pauseItems;
var selectorArrow;
var itemSelect;

function pressEnter() {
  game.paused = !game.paused
  if (game.paused) {
    itemSelect = 1;
    pauseMenu = game.add.graphics(0, 0)
    pauseMenu.beginFill(0xFF0000, 1)
    pauseMenu.drawRect(91+game.camera.x, 91+game.camera.y, gameWidth-182, gameHeight-182)
    pauseMenu.endFill()

    pauseMenu.beginFill(0x00FF00, 1)
    pauseMenu.drawRect(94+game.camera.x, 94+game.camera.y, gameWidth-188, gameHeight-188)
    pauseMenu.endFill()

    pauseMenu.beginFill(0x0000FF, 1)
    pauseMenu.drawRect(97+game.camera.x, 97+game.camera.y, gameWidth-194, gameHeight-194)
    pauseMenu.endFill()

    pauseMenu.beginFill(0x000000, 1)
    pauseMenu.drawRect(100+game.camera.x, 100+game.camera.y, gameWidth-200, gameHeight-200)
    pauseMenu.endFill()

    var style = {font:"bold 32px courier", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

    pauseItem1 = game.add.text(200+game.camera.x, 150+game.camera.y, "Main Menu", style);
    pauseItem2 = game.add.text(200+game.camera.x, 250+game.camera.y, "Continue", style);
    pauseItem3 = game.add.text(200+game.camera.x, 350+game.camera.y, "Restart Level", style);

    pauseItems = [pauseItem1, pauseItem2, pauseItem3]

    var colors = [0xFF0000, 0x00FF00, 0x0000FF]

    selectorArrow = game.add.sprite(140+game.camera.x, 218+game.camera.y, 'protagBW')
    selectorArrow.tint = 0x00FF00;
    selectorArrow.frame = 159;
    // selectorArrow.beginFill(0x00FF00)
    // selectorArrow.drawRect(, 250+game.camera.y, 32, 32)



    cursors.up.onDown.add(function(){

      itemSelect -= 1;
      if (itemSelect < 0) {
        itemSelect = pauseItems.length - 1;
      }
      pauseItems[(itemSelect+1)%pauseItems.length].alpha = .4;

      selectorArrow.destroy()
      pauseItems[itemSelect%pauseItems.length].alpha = 1;

      selectorArrow = game.add.sprite(145+game.camera.x, 118+game.camera.y+(itemSelect%pauseItems.length)*100, 'protagBW')
      selectorArrow.tint = colors[itemSelect%pauseItems.length]
      selectorArrow.frame = 159;

      console.log(itemSelect)
    })

    cursors.down.onDown.add(function(){

      itemSelect += 1;
      pauseItems[(itemSelect-1)%pauseItems.length].alpha = .4;

      selectorArrow.destroy()
      pauseItems[itemSelect%pauseItems.length].alpha = 1;

      selectorArrow = game.add.sprite(145+game.camera.x, 118+game.camera.y+(itemSelect%pauseItems.length)*100, 'protagBW')
      selectorArrow.tint = colors[itemSelect%pauseItems.length]
      selectorArrow.frame = 159;

      // selectorArrow = game.add.graphics(0, 0)
      // selectorArrow.beginFill(colors[itemSelect%pauseItems.length])
      // selectorArrow.drawRect(150+game.camera.x, 150+game.camera.y+(itemSelect%pauseItems.length)*100, 32, 32)
      console.log(itemSelect)
    })

    pauseItem1.tint = 0xFF0000;
    pauseItem2.tint = 0x00FF00;
    pauseItem3.tint = 0x0000FF;

    pauseItems.forEach(function(item){
      item.alpha = .4;
    })

    pauseItem2.alpha = 1



  } else {
    pauseMenu.destroy();
    pauseItems.forEach(function(item){
      item.destroy();
    })
    selectorArrow.destroy();
    cursors.up.reset(true);
    cursors.down.reset(true);
    switch(itemSelect%pauseItems.length) {
      case 0:
        console.log("go to main menu")
        create();
        break;
      case 1:
        console.log("continue selected, do nothing")
        break;
      case 2:
        console.log("restart level selected");
        currentLevel()
        break;
      default:
        console.log("error with select")
        console.log(itemSelect, pauseItems.length);
        console.log(itemSelect % pauseItems.length)
    }
  }
}






function render() {
  // floor.debug = true;
  // game.debug.geom(floor,'#0fffff');
  // layerColor.debug = true;
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(protagColor);
  // game.debug.bodyInfo(protagColor, 16, 24);
}
