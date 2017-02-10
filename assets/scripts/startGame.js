function run(){
  var gameWidth = 1000;
  var gameHeight = 600;


	var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "RGB");

	game.state.add("preload", preload);
	game.state.add("mainMenuState",mainMenuState);
	game.state.add("tutorial", tutorial);
  game.state.add("level_1", level_1);
  game.state.add("level_2", level_2);
  game.state.add("level_3", level_3);
  game.state.add("endGame", endGame);
  game.state.add("betweenLevels", betweenLevels)
	game.state.start("preload");
};

$(document).on('keydown', function (event) {
    event.preventDefault();
});

run()
