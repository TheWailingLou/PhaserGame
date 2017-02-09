var mainMenuState = function(game) {
  console.log("mainMenuState called")

}


mainMenuState.prototype = {

  shutdown: function() {
    console.log("is this working?")
    this.create()

  },

  shutDown: function() {
    console.log("is this working? AAAAAH")
    this.create()

  },

  create: function() {
    game = this.game;

    // game.paused = true;
    console.log(game)

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

    var style = {font:"40px VT323", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

    menuItem1 = game.add.text(200, 150, "New Game", style);
    menuItem2 = game.add.text(200, 250, "Tutorial", style);
    menuItem3 = game.add.text(200, 350, "Leader Board", style);

    menuItems = [menuItem1, menuItem2, menuItem3]
    var colors = [0xFF0000, 0x00FF00, 0x0000FF]

    enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

    enterButton.onDown.add(this.menuEnter)

    menuItems.forEach(function(item, index){
      item.tint = colors[index]
      item.alpha = .4
    })

    menuItem2.alpha = 1;




    selectorArrow = game.add.sprite(120, 225, 'protagBW')
    selectorArrow.tint = 0x00FF00;
    selectorArrow.frame = 159;

    console.log(selectorArrow)

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

      console.log(game)
      selectorArrow = game.add.sprite(120, 125+(menuItemSelect%menuItems.length)*100, 'protagBW')
      selectorArrow.tint = colors[menuItemSelect%menuItems.length]
      selectorArrow.frame = 159;

      console.log(menuItemSelect)
    })

    cursors.down.onDown.add(function() {

      menuItemSelect += 1;
      menuItems[(menuItemSelect-1)%menuItems.length].alpha = .4;

      selectorArrow.destroy()
      menuItems[menuItemSelect%menuItems.length].alpha = 1;

      selectorArrow = game.add.sprite(120, 125+(menuItemSelect%menuItems.length)*100, 'protagBW')
      selectorArrow.tint = colors[menuItemSelect%menuItems.length]
      selectorArrow.frame = 159;

      console.log(menuItemSelect)
    })

  },

  menuEnter: function() {
    switch (menuItemSelect%menuItems.length) {
      case 0:
        console.log("New Game Selected.")
        break;
      case 1:
        console.log("tutorial selected")
        mainMenu = null;
        menuItems.forEach(function(item){
          item.destroy();
        })
        selectorArrow.destroy();
        cursors.up.reset(true);
        cursors.down.reset(true);
        enterButton.reset(true);
        game.state.start("tutorial")
        game.paused = false;
        break;
      case 2:
        menuItems.forEach(function(item){
          item.destroy();
        })
        selectorArrow.destroy();
        cursors.up.reset(true);
        cursors.down.reset(true);
        enterButton.reset(true);
        console.log("leaderboard selected");
        displayLeaderboard();
      default:
        break;
    }
  },



}

// $.ajax("https://galvanize-cors-proxy.herokuapp.com/https://galvanize-leader-board.herokuapp.com/api/v1/leader-board", {
//   method: "POST",
//   contentType: "application/json",
//   data: JSON.stringify({"game_name":"RGB","player_name":"RGB","score":10000})
// })
// .then(postSuccess)
// .catch(postFail)
//
// function postSuccess(result) {
//   console.log(result)
// }
//
// function postFail(result) {
//   console.log(result)
// }
var leaderboardData;

function displayLeaderboard() {
  console.log("enterButton");
  var topTen = leaderboardData.slice(0, 10);
  var style = {font:"40px VT323", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
  var scoreBoxAndText = [];
  topTen.forEach(function(scoreArr, i){
    var scoreBox = game.add.graphics(0, 0);
    scoreBox.beginFill(0xFF0000);
    scoreBox.drawRect(gameWidth/2-201, 50+(i*50), 402, 48)
    scoreBox.endFill();
    scoreBox.beginFill(0x00FF00);
    scoreBox.drawRect(gameWidth/2-198, 53+(i*50), 396, 42)
    scoreBox.endFill();
    scoreBox.beginFill(0x0000FF);
    scoreBox.drawRect(gameWidth/2-195, 56+(i*50), 390, 36)
    scoreBox.endFill();
    scoreBox.beginFill(0x000000);
    scoreBox.drawRect(gameWidth/2-192, 59+(i*50), 384, 30)
    scoreBox.endFill();


    var playerNames = game.add.text(gameWidth/2 - 150, 50+(i*50), scoreArr[0], style);
    var playerScores = game.add.text(gameWidth/2 + 50, 50+(i*50), scoreArr[1], style)

    scoreBoxAndText.push(scoreBox)
    scoreBoxAndText.push(playerNames)
    scoreBoxAndText.push(playerScores)
  })
  var sprite = game.add.sprite(gameWidth/2-300, gameHeight/2-100, 'protagBW');
  sprite.frame = 77;
  var backText = game.add.text(gameWidth/2-300, gameHeight/2, 'Back', style);

  enterButton.onDown.add(function(){
    // game.state.getCurrentState().create()
    game.state.start("mainMenuState", true, false, menuItemSelect)
  })
};

$.get("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/RGB")
.then(apiLeaderboardGet)
.catch(apiLeaderboardGetFail)


function apiLeaderboardGet(result) {
  var sortData = result.sort(function(item1, item2){
    return item2.score - item1.score;
  })
  leaderboardData = sortData.map(function(scoreObject){
    return [scoreObject.player_name, scoreObject.score]
  })
  console.log(leaderboardData)
};

function apiLeaderboardGetFail(result) {
  console.log(result)
};
