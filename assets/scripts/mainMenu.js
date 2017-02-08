var mainMenu = function(game) {
  console.log("mainMenu called")

}
var game;

var mainMenu;
var menuItem1;
var menuItem2;
var menuItem3;
var menuItems;
var menuItemSelect;

mainMenu.prototype = {

  create: function() {
    game = this.game;

    game.paused = true;
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

    var style = {font:"bold 32px courier", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };

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




    selectorArrow = game.add.sprite(140, 218, 'protagBW')
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
        console.log("leaderboard selected");
        displayLeaderboard()
      default:
        break;
    }
  },





}

$.post("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board", 
  {
    "game_name": "RGB",
    "player_name": "RGB",
    "score": 1000
  }
)
.then(postSuccess)
.catch(postFail)

function postSuccess(result) {
  console.log(result)
}

function postFail(result) {
  console.log(result)
}

function displayLeaderboard() {
  $.get("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board")
  .then(apiLeaderboardGet)
  .catch(apiLeaderboardGetFail)
};

function apiLeaderboardGet(result) {
  console.log(result)
};

function apiLeaderboardGetFail(result) {
  console.log(result)
};
