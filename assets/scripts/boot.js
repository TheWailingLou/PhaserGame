var boot = function(game) {
  console.log("starting up rgb", "color:white; background:black");
}

boot.prototype = {
  create: function() {
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start("Preload")
  }
}
