function run(){
  var gameWidth = 1000;
  var gameHeight = 600;


	var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game");
  game.state.add("boot", boot);
	game.state.add("preload", preload);
	game.state.add("mainMenu",mainMenu);
	game.state.add("tutorial", tutorial);
	game.state.start("preload");
};
run()
