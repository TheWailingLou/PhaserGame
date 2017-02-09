var tutorial = function(game) {
}

tutorial.prototype = {
  create: function() {

    game = this.game

    console.log(game);

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
    layerBW.resizeWorld();

    mapColor.setCollision(collisionTiles.concat(colorCollision));
    mapBW.setCollision(collisionTiles.concat(colorCollision));

    mapColor.setTileIndexCallback([30, 43, 56], this.colorButtonDown)
    mapColor.setTileIndexCallback([124], this.winLevel)




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
      protag.animations.add('win', [15, 16, 17, 18, 19])

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

    ////////////////////////////////////////////////////////////////////////s
    ////                              ///////////////////////////////////////
    /////   Game Mechanics Components  ///////////////////////////////////////
    //////                              ///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    greenLevers = 1;
    blueLevers = 1;
    redLevers = 1;
    stopLever = 0;

    levelScore = 0;

    blueOrbs = 0;
    redOrbs = 0;
    greenOrbs = 0;

    cursors = game.input.keyboard.createCursorKeys();

    rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
    gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    rKey.onDown.add(function(){
      this.colorKeydown(protagRed, redOrbs, 0xAA0000, redCollision)
    })

    gKey.onDown.add(function(){
      this.colorKeydown(protagGreen, greenOrbs, 0x00AA00, greenCollision)
    })

    bKey.onDown.add(function(){
      this.colorKeydown(protagBlue, blueOrbs, 0x0000AA, blueCollision)
    })

    spacebar.onDown.add(function(){
      spaceKeydown()
    })





    // game.input.keyboard.addCallbacks(this, null, null, this.keyPress);

    enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

    escapeButton = game.input.keyboard.addKey(Phaser.Keyboard.ESC)

    escapeButton.onDown.add(this.pressEscape)


    //////////////////////////////////////////////////////////////////////
    ////                   ////////////////////////////////////////////////
    /////  In-Game Display  ////////////////////////////////////////////////
    //////                   ////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    boxHeight = 66;

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

    font = game.add.retroFont('font', 31, 32, Phaser.RetroFont.TEXT_SET2, 10, 1, 1);

    var scoreText = game.add.image(12, gameHeight-boxHeight+12, font);

    scoreText.fixedToCamera = true

    scoreText.tint = 0xFFFFFF;

    scoreText.width = 64;
    scoreText.height = 64;



  },


  update: function() {

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
      game.physics.arcade.collide(protag, layerBW);
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
      game.physics.arcade.collide(protagColor, orb, this.greenPowerConsume, null, this);
    })

    redPower.forEach(function(orb) {
      game.physics.arcade.collide(protagColor, orb, this.redPowerConsume, null, this);
    })

    walls.forEach(function(wall) {
      allProtags.forEach(function(protag){
        game.physics.arcade.collide(protag, wall);
      })
    })


    ////////////////////////////////////////////////////////////////////////////

    if (greenLevers === 0 && redLevers === 0 && blueLevers === 0 && stopLever === 0) {
      this.killWall();
      stopLever = 1;
    }

    ////////////////////////////////////////////////////////////////////////////


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

  },

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

  killWall: function() {
    levelScore += 250
    walls.forEach(function(wall) {
      wall.kill()
    })
  },




  //////////////////////////////////////////////////////////////
  ////                    ///////////////////////////////////////
  /////  Character Split   ///////////////////////////////////////
  //////                    ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////


  // keyPress: function(char) {
  //   console.log(char)
  //   switch(char) {
  //     case 'r':
  //       this.colorKeydown(protagRed, redOrbs, 0xAA0000, redCollision)
  //       break;
  //
  //     case 'g':
  //       this.colorKeydown(protagGreen, greenOrbs, 0x00AA00, greenCollision);
  //       break;
  //
  //     case 'b':
  //       this.colorKeydown(protagBlue, blueOrbs, 0x0000AA, blueCollision);
  //       break;
  //
  //     case ' ':
  //       this.spaceKeydown()
  //       break;
  //
  //     default:
  //       break;
  //
  //   }
  // },



  /////////////////////////////////////////////////////////////////
  ////                       ///////////////////////////////////////
  /////  Game Functionality   ///////////////////////////////////////
  //////                       ///////////////////////////////////////
  /////////////////////////////////////////////////////////////////////

  colorButtonDown: function(protag, tile) {
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
  },

  winLevel: function() {
    mapColor.setTileIndexCallback(124, function(){})

    allProtags.forEach(function(protag) {
      protag.animations.play('win')
    });

    setTimeout(function(){

    }, 100)
  },


  ////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ////                 /////////////////////////////////////////////////////
  /////  In Game Menu   /////////////////////////////////////////////////////
  //////                 /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////



  pressEscape: function() {
    if (!game.paused) {
      game.paused = true;
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

      var style = {font:"bold 36px VT323", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

      pauseItem1 = game.add.text(200+game.camera.x, 150+game.camera.y, "Main Menu", style);
      pauseItem2 = game.add.text(200+game.camera.x, 250+game.camera.y, "Continue", style);
      pauseItem3 = game.add.text(200+game.camera.x, 350+game.camera.y, "Restart Level", style);

      pauseItems = [pauseItem1, pauseItem2, pauseItem3]

      var colors = [0xFF0000, 0x00FF00, 0x0000FF]

      selectorArrow = game.add.sprite(125+game.camera.x, 225+game.camera.y, 'protagBW')
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

        selectorArrow = game.add.sprite(125+game.camera.x, 125+game.camera.y+(itemSelect%pauseItems.length)*100, 'protagBW')
        selectorArrow.tint = colors[itemSelect%pauseItems.length]
        selectorArrow.frame = 159;

        console.log(itemSelect)
      })

      cursors.down.onDown.add(function(){

        itemSelect += 1;
        pauseItems[(itemSelect-1)%pauseItems.length].alpha = .4;

        selectorArrow.destroy()
        pauseItems[itemSelect%pauseItems.length].alpha = 1;

        selectorArrow = game.add.sprite(125+game.camera.x, 125+game.camera.y+(itemSelect%pauseItems.length)*100, 'protagBW')
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

      enterButton.onDown.add(pressEnter)




    } else {
      game.paused = false;
      pauseMenu.destroy();
      pauseItems.forEach(function(item){
        item.destroy();
      })
      selectorArrow.destroy();
      cursors.up.reset(true);
      cursors.down.reset(true);
      enterButton.reset(true);
    }
  },

  render: function() {

    // game.debug.layer(layerColor);

  }

}
