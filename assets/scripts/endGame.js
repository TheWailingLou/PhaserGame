var endGame = function(game) {
  console.log("mainMenuState called")

}



var enterPressTimes = 0;
var allEndGameItems = [];


endGame.prototype = {
  create: function(){

    $.ajax("https://galvanize-cors-proxy.herokuapp.com/https://galvanize-leader-board.herokuapp.com/api/v1/leader-board", {
       method: "POST",
        contentType: "application/json",
       data: JSON.stringify({"game_name":"RGB","player_name":playerName,"score":cachedScore})
    })
    
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

    var styleRed = {font:"46px VT323", fill: "#FF0000", boundsAlignH: "center", boundsAlignV: "middle" };
    var styleGreen = {font:"43px VT323", fill: "#00FF00", boundsAlignH: "center", boundsAlignV: "middle" };
    var styleBlue = {font:"40px VT323", fill: "#0000FF", boundsAlignH: "center", boundsAlignV: "middle" };

    var styleWhite = {font:"40px VT323", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

    betweeenScoreText = game.add.text(0, -100, "FINAL SCORE:", styleWhite);
    finalScoreRed = game.add.text(0, -50, cachedScore.toString(), styleRed);
    finalScoreBlue = game.add.text(0, 0, cachedScore.toString(), styleGreen);
    finalScoreGreen = game.add.text(0, 50, cachedScore.toString(), styleBlue);
    thanksForPlaying = game.add.text(0, 100, "Thanks for playing!", styleWhite);

    thanksForPlaying.alpha = 0;

    protagRed = game.add.sprite(gameWidth/2-96, gameHeight-100, 'protagBW');
    protagBlue = game.add.sprite(gameWidth/2-32, gameHeight-100, 'protagBW');
    protagGreen = game.add.sprite(gameWidth/2+32, gameHeight-100, 'protagBW');

    allEndGameItems = [protagRed, protagGreen, protagBlue, betweeenScoreText, finalScoreRed, finalScoreGreen, finalScoreBlue, thanksForPlaying]

    protagRed.tint = 0xFF0000;
    protagGreen.tint = 0x00FF00;
    protagBlue.tint = 0x0000FF;

    protagRed.animations.add('win', [5, 12, 19, 26])
    protagBlue.animations.add('win', [12, 19, 26, 5])
    protagGreen.animations.add('win', [19, 26, 5, 12])

    protagRed.animations.play('win', 8, true)
    protagBlue.animations.play('win', 8, true)
    protagGreen.animations.play('win', 8, true)

    betweeenScoreText.setTextBounds(0, 0, gameWidth, gameHeight);
    finalScoreRed.setTextBounds(0, 0, gameWidth, gameHeight);
    finalScoreBlue.setTextBounds(0, 0, gameWidth, gameHeight);
    finalScoreGreen.setTextBounds(0, 0, gameWidth, gameHeight);
    thanksForPlaying.setTextBounds(0, 0, gameWidth, gameHeight);

    // continueText = game.add.text(300, 150, "Press ENTER to continue...", styleWhite);
    continueText.alpha = 0;


  },

  update: function() {
  },

  emptyScoreAndContinue: function(){
    if (enterPressTimes === 0) {
      enterPressTimes += 1;
      thanksForPlaying.alpha = 1;
    } else if (enterPressTimes === 1) {
      allEndGameItems.forEach(function(item){
        item.destroy();
      })
      displayLeaderboard(false)
    } else {
      cachedScore = 0;
      game.state.start("preload", true, true)
    }
  }
}
