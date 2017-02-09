
function pressEnter() {
  pauseMenu.destroy();
  pauseItems.forEach(function(item){
    item.destroy();
  })
  selectorArrow.destroy();
  cursors.up.reset(true);
  cursors.down.reset(true);
  enterButton.reset(true);
  switch(itemSelect%pauseItems.length) {
    case 0:
      console.log("go to main menu")
      var popUp = game.add.graphics(0, 0);
      areYouSure("mainMenuState")
      break;
    case 1:
      console.log("continue selected, do nothing")
      game.paused = false;
      break;
    case 2:
      console.log("restart level selected");
      areYouSure("tutorial")
      break;
    default:
      console.log("error with select")
      console.log(itemSelect, pauseItems.length);
      console.log(itemSelect % pauseItems.length)
  }
}


function areYouSure(gameState) {
  var areYouSureSelector = 0;
  var popUp = game.add.graphics(0, 0);
  popUp.beginFill(0xFF0000)
  popUp.drawRect(game.camera.x+game.width/2-200, game.camera.y+game.height/2-100, 400, 200)
  popUp.endFill();
  popUp.beginFill(0x00FF00)
  popUp.drawRect(game.camera.x+game.width/2-197, game.camera.y+game.height/2-97, 394, 194)
  popUp.endFill();
  popUp.beginFill(0x0000FF)
  popUp.drawRect(game.camera.x+game.width/2-194, game.camera.y+game.height/2-94, 388, 188)
  popUp.endFill();
  popUp.beginFill(0x000000)
  popUp.drawRect(game.camera.x+game.width/2-191, game.camera.y+game.height/2-91, 382, 182)
  popUp.endFill();
  var style = {font:"bold 36px VT323", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

  var yes = game.add.text(0, -50, "YES", style);

  yes.setTextBounds(game.camera.x+game.width/2-191, game.camera.y+game.height/2, 191, 182);

  var no = game.add.text(0, -50, "NO", style);

  no.setTextBounds(game.camera.x+game.width/2, game.camera.y+game.height/2, 191, 182);

  var confirmation = game.add.text(0, -60, "Are you sure?", style)

  confirmation.setTextBounds(game.camera.x+game.width/2-191, game.camera.y+game.height/2-91, 382, 182)

  yes.alpha = .4;
  no.alpha = 1;

  cursors.left.onDown.add(function(){

    if (areYouSureSelector === 0) {
      areYouSureSelector = 1;
      yes.alpha = 1;
      no.alpha = .4
    } else {
      areYouSureSelector = 0;
      yes.alpha = .4;
      no.alpha = 1;
    }

  })

  cursors.right.onDown.add(function(){

    if (areYouSureSelector === 0) {
      areYouSureSelector = 1;
      yes.alpha = 1;
      no.alpha = .4
    } else {
      areYouSureSelector = 0;
      yes.alpha = .4;
      no.alpha = 1;
    }

  })

  enterButton.onDown.add(function() {
    if (areYouSureSelector === 1) {
      console.log("yes Selected");
      console.log(gameState)
      game.paused = false;
      game.state.start(gameState)
    } else {
      console.log("no Selected")
      game.paused = false;
      yes.destroy();
      no.destroy();
      confirmation.destroy();
      popUp.destroy();
      cursors.left.reset(true)
      cursors.right.reset(true)
      enterButton.reset(true)
    }
  })


  // game.state.start("mainMenuState");
}



function bluePowerConsume(_protagBW, _bluePower) {
  levelScore += 25;
  _bluePower.kill();
  blueOrbs += 1;
  console.log(layerBW)
  console.log(game)
  protagBW.tint += 0x000011;
  protagBW.alpha -= .1;
  layerBW.tint -= 0x222200;
  layerBW.alpha -= .1;
  console.log(layerBW)
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
};



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

};
