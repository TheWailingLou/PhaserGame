var betweenLevels = function(game) {
  console.log("mainMenuState called")

}

var levelBonus;

var timeBonus;



betweenLevels.prototype = {
  create: function(){
    var timeScoreReduction = Math.floor(timeDiff/100) - Math.floor(timeDiff/100) % 10;
    timeBonus = timePointsPossible - timeScoreReduction;
    if (timeBonus < 0) {
      timeBonus = 0;
    }
    levelChangeBackground = game.add.graphics(0, 0);
    levelChangeBackground.beginFill(0xFF0000);
    levelChangeBackground.drawRect(0+game.camera.x, 0+game.camera.y, gameWidth, gameHeight)
    levelChangeBackground.endFill();

    levelChangeBackground.beginFill(0x00FF00);
    levelChangeBackground.drawRect(3+game.camera.x, 3+game.camera.y, gameWidth-6, gameHeight-6)
    levelChangeBackground.endFill();

    levelChangeBackground.beginFill(0x0000FF);
    levelChangeBackground.drawRect(6+game.camera.x, 6+game.camera.y, gameWidth-12, gameHeight-12);
    levelChangeBackground.endFill();

    levelChangeBackground.beginFill(0x000000);
    levelChangeBackground.drawRect(9+game.camera.x, 9, gameWidth-18+game.camera.y, gameHeight-18);
    levelChangeBackground.endFill();

    enterButton.reset(true);
    enterButton.onDown.add(this.emptyScoreAndContinue)

    var styleRed = {font:"40px VT323", fill: "#FF0000", boundsAlignH: "center", boundsAlignV: "middle" };
    var styleGreen = {font:"40px VT323", fill: "#00FF00", boundsAlignH: "center", boundsAlignV: "middle" };
    var styleBlue = {font:"40px VT323", fill: "#0000FF", boundsAlignH: "center", boundsAlignV: "middle" };

    var styleWhite = {font:"40px VT323", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

    betweeenScoreText = game.add.text(200, 150, "SCORE: " + cachedScore.toString(), styleRed);
    levelBonusText = game.add.text(200, 250, "LEVEL BONUS: +" + levelBonus.toString(), styleGreen);
    timeBonusText = game.add.text(200, 350, "TIME BONUS: +" + timeBonus.toString(), styleBlue);
    continueText = game.add.text(200, 450, "Press ENTER to continue...", styleWhite);
    continueText.alpha = 0;

  },

  update: function() {
    if (levelBonus > 0) {
      levelBonus -= 10;
      cachedScore += 10;
      betweeenScoreText.text = "SCORE: " + cachedScore.toString();
      levelBonusText.text = "LEVEL BONUS: +" + levelBonus.toString()
    } else {
      if (timeBonus > 0) {
        timeBonus -= 10;
        cachedScore += 10;
        betweeenScoreText.text = "SCORE: " + cachedScore.toString();
        levelBonusText.text = "LEVEL BONUS: +" + levelBonus.toString()
        timeBonusText.text = "TIME BONUS: +" + timeBonus.toString()
      } else {
        betweeenScoreText.text = "SCORE: " + cachedScore.toString();
        levelBonusText.text = "LEVEL BONUS: +" + levelBonus.toString()
        timeBonusText.text = "TIME BONUS: +" + timeBonus.toString()
        continueText.alpha = 1;
      }
    }
  },

  emptyScoreAndContinue: function(){
    if (levelBonus > 0) {
      cachedScore += levelBonus;
      levelBonus = 0;

    } else {
      if (timeBonus > 0) {
        cachedScore += timeBonus;
        timeBonus = 0;
      } else {
        game.state.start(currentLevel, true, false, cachedScore, playerName)
      }

    }

  }

}
