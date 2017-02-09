function run(){
  var gameWidth = 1000;
  var gameHeight = 600;


	var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "RGB");
  game.state.add("boot", boot);
	game.state.add("preload", preload);
	game.state.add("mainMenuState",mainMenuState);
	game.state.add("tutorial", tutorial);
	game.state.start("preload");
};

$(document).on('keydown', function (event) {
    event.preventDefault();
});

run()
