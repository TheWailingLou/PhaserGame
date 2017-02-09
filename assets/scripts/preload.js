var preload = function(game) {
  console.log("preload called")
}

var gameWidth = 1000;
var gameHeight = 600;

var game;

///////////////////////////////////////////////////////////////////////////
////                         ///////////////////////////////////////////////
/////   collision Tile Sets   ///////////////////////////////////////////////
//////                         ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var collisionTiles = [
  11, 12, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 103, 104, 116, 117
];

var colorCollision = [
  27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
];

var redCollision = [
  53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
];
var blueCollision = [
  27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
];
var greenCollision = [
  27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63
];

var redTiles = [27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37]
var blueTiles = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
var greenTiles = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

///////////////////////////////////////////////////////////////////
////                 ///////////////////////////////////////////////
/////   Google Font   ///////////////////////////////////////////////
//////                 ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

WebFontConfig = {

    active: function() { game.time.events.add(Phaser.Timer.SECOND); },

    google: {
      families: ['VT323']
    }

};


preload.prototype = {
  preload: function() {
    game = this.game
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    this.game.load.tilemap('map', 'assets/world/csv/Tutorial-NewTiles.csv', null, Phaser.Tilemap.CSV);

    this.game.load.image('tilesColor', 'assets/world/tiles/tilesColor.png');
    this.game.load.image('tilesBW', 'assets/world/tiles/tilesBW.png');

    this.game.load.image('font', 'assets/fonts/set1PhaserFont2.png')

    this.game.load.image('blueMarker', 'assets/sprites/blueMarker.png')
    this.game.load.image('greenMarker', 'assets/sprites/greenMarker.png')
    this.game.load.image('redMarker', 'assets/sprites/redMarker.png')

    this.game.load.atlasJSONHash('protagColor', 'assets/sprites/protagColor.png', 'assets/sprites/protagColor.json');
    this.game.load.atlasJSONHash('protagBW', 'assets/sprites/protagBW.png', 'assets/sprites/protagBW.json');

    this.game.load.atlasJSONHash('bluePower', 'assets/sprites/bluePower.png', 'assets/sprites/powerOrb.json');
    this.game.load.atlasJSONHash('greenPower', 'assets/sprites/greenPower.png', 'assets/sprites/powerOrb.json');
    this.game.load.atlasJSONHash('redPower', 'assets/sprites/redPower.png', 'assets/sprites/powerOrb.json');

    this.game.load.atlasJSONHash('wall', 'assets/sprites/wall.png', 'assets/sprites/wall.json');

    this.game.load.atlasJSONHash('wallRight', 'assets/sprites/wallRight.png', 'assets/sprites/wallRight.json');

    this.game.load.atlasJSONHash('wallLeft', 'assets/sprites/wallLeft.png', 'assets/sprites/wallLeft.json');
  },

  create: function() {
    this.game.state.start("mainMenuState");
  }
}
