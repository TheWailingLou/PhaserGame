var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tileMessing/Tutorial-Test.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'assets/tileMessing/gridtiles.png');
    game.load.image('bwTiles', 'assets/tileMessing/bwGridtiles.png');

    game.load.atlasJSONHash('cat', 'assets/GameSpriteTry/spritething.png', 'assets/GameSpriteTry/spritething.json');
    game.load.atlasJSONHash('guy', 'assets/GameSpriteTry/blackAndWhiteGold.png', 'assets/GameSpriteTry/blackAndWhiteGold.json');
    game.load.image('background', 'assets/test/background2.png');

    game.load.atlasJSONHash('bluePower', 'assets/GameSpriteTry/bluePower.png', 'assets/GameSpriteTry/bluePower.json');

}

var map;
var map2;
var tileset;
var layer;
var cursors;
var cat;
var guy;
var facing = 'forward';
var bg;

function create() {



    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    // bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    map = game.add.tilemap('map', 32, 32);
    map2 = game.add.tilemap('map', 32, 32)

    // console.log(map)
    //  Now add in the tileset
    map.addTilesetImage('tiles');
    map2.addTilesetImage('bwTiles');




    // map.forEach(function(tile){
    //   tile.tint = 0x00FFFFF
    //   if (tile.index === 138) {
    //     tile.alpha = 0.3
    //   }
    //   if (tile.index === 60) {
    //     console.log(tile)
    //   }
    //   // console.log(tile.index)
    //
    // })



    //  Create our layer
    layer = map.createLayer(0);

    layer2 = map2.createLayer(0);

    layer2.alpha = 1;

    layer.alpha = 1
    // layer.tint = 0x00FFFFF



    console.log(layer);


    layer.resizeWorld();

    map.setCollision([138])

    // map.replace(0, 1, 0, 0, 40, 40)

    // game.input.onDown.addOnce(replaceTiles, this);

    // map.shuffle(0,0,40,40)


    // layer.debug = true;


    //  Resize the world


    // game.physics.arcade.gravity.y = 0;



    // map.setCollisionBetween(138, 138);
    // game.physics.box2d.convertTilemap(map, layer);

    //  Allow cursors to scroll around the map
    // cursors = game.input.keyboard.createCursorKeys();

    // var help = game.add.text(16, 16, 'Arrows to scroll', { font: '14px Arial', fill: '#ffffff' });
    // help.fixedToCamera = true;



    /////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    cat = game.add.sprite(640, 32, 'cat');


    bluePower1 = game.add.sprite(640, 128, 'bluePower');
    bluePower1.animations.add('active', [0,1,2,3])
    bluePower1.animations.add('destroy', [4,5,6,7])
    bluePower1.animations.play('active', 16, true);

    game.physics.arcade.enable(bluePower1);
    bluePower1.body.setSize(32, 32, 0, 0);

    bluePower2 = game.add.sprite(640, 192, 'bluePower');
    bluePower2.animations.add('active', [0,1,2,3])
    bluePower2.animations.add('destroy', [4,5,6,7])
    bluePower2.animations.play('active', 16, true);

    game.physics.arcade.enable(bluePower2);
    bluePower2.body.setSize(32, 32, 0, 0);


    // game.physics.enable(cat, Phaser.Physics.ARCADE);

    console.log(cat)

    // cat.anchor.set(0.01)

    // game.physics.box2d.enable(cat);
    // cat.body.setCircle(14);

    //  Here we add a new animation called 'run'
    //  We haven't specified any frames because it's using every frame in the texture atlas
    cat.animations.add('forward', [79, 80, 81, 82, 83, 84, 85, 86]);
    cat.animations.add('away', [61, 62, 63, 64, 65, 66, 67, 68]);
    cat.animations.add('right', [88, 89, 90, 91, 92, 93, 94, 95]);
    cat.animations.add('left', [70, 71, 72, 73, 74, 75, 76, 77]);
    cat.animations.add('forward-right', [86,87,88])
    cat.animations.add('forward-left', [79,78,77])
    cat.animations.add('right-forward', [88,87,86])
    cat.animations.add('left-forward', [77,78,79])
    cat.animations.add('left-right', [77,78,87,88])
    cat.animations.add('right-left', [88,87,78,77])

    cat.animations.add('away-right', [95,96])
    cat.animations.add('away-left', [68,69])
    cat.animations.add('away-forward', [96,97,87,86])
    cat.animations.add('left-away', [69,68])
    cat.animations.add('right-away', [96,95])
    cat.animations.add('forward-away', [86,87,97,96])

    game.physics.arcade.enable(cat);
    cat.body.collideWorldBounds = true;



    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    // cat.animations.play('right-left', 12, true);


      // bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
      // game.input.onDown.add(recolor, this);
  	// setInterval(recolor, 500);
    //  This sprite is using a texture atlas for all of its animation data
    // cat = game.add.sprite(20, 20, bmd);

    //// cat.anchor.set(0.01)
    //// game.physics.arcade.enable(cat);



    guy = game.add.sprite(640, 32, 'guy');

    guy.alpha = 1



    // game.physics.enable(guy, Phaser.Physics.ARCADE);

    // guy.anchor.set(0.01)



    //  Here we add a new animation called 'run'
    //  We haven't specified any frames because it's using every frame in the texture atlas
    guy.animations.add('forward', [79, 80, 81, 82, 83, 84, 85, 86]);
    guy.animations.add('away', [61, 62, 63, 64, 65, 66, 67, 68]);
    guy.animations.add('right', [88, 89, 90, 91, 92, 93, 94, 95]);
    guy.animations.add('left', [70, 71, 72, 73, 74, 75, 76, 77]);
    guy.animations.add('forward-right', [86,87,88])
    guy.animations.add('forward-left', [79,78,77])
    guy.animations.add('right-forward', [88,87,86])
    guy.animations.add('left-forward', [77,78,79])
    guy.animations.add('left-right', [77,78,87,88])
    guy.animations.add('right-left', [88,87,78,77])

    guy.animations.add('away-right', [95,96])
    guy.animations.add('away-left', [68,69])
    guy.animations.add('away-forward', [96,97,87,86])
    guy.animations.add('left-away', [69,68])
    guy.animations.add('right-away', [96,95])
    guy.animations.add('forward-away', [86,87,97,96])

    game.physics.arcade.enable(guy);
    guy.body.collideWorldBounds = true;

    guy.body.setSize(24, 20, 20, 44);
    cat.body.setSize(24, 20, 20, 44);

    game.camera.follow(guy);




    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    // guy.animations.play('right-left', 12, true);


      // bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
      // game.input.onDown.add(recolor, this);
    // setInterval(recolor, 500);
    //  This sprite is using a texture atlas for all of its animation data
    // guy = game.add.sprite(20, 20, bmd);

    // guy.anchor.set(0.01)
    // game.physics.arcade.enable(guy, Phaser.Physics.ARCADE);

    ///////##################
    ////////////////////////// Use this for tiles with events.
    // map.setTileIndexCallback(138, function() {
    //   console.log("it worked")
    // }, this);
    /////////////////////////
    ///////#################

    // map.setTileLocationCallback(21, 0, 1, 1, function() {
    //   console.log("it worked")
    // }, this);

    // cat.tint = 0xFFFFFF;

    cursors = game.input.keyboard.createCursorKeys();


    mask = game.add.graphics(0, 0);

     //	Shapes drawn to the Graphics object must be filled.
    //  mask.beginFill(0xffffff);

     //	Here we'll draw a circle
    //  mask.drawRect(0,0, 128, 128);

    //  mask.endFill(0xFFFFFF);

     //	And apply it to the Sprite
    // layer2.mask = mask;
    // layer.mask = mask;

     //	As you move the mouse / touch, the circle will track the sprite
    //  game.input.addMoveCallback(move, this);

    console.log(mask.isMask)

}

function move(guy) {



}

// function replaceTiles(){
//   console.log("blah")
//   // map.replace(138, 278, 0, 0, 40, 40)
//   var gray = game.add.filter('Gray', 800, 600);
//   game.world.filters = [gray];
// };

var animationSpeed = 20; //fps
var playerVelocity = 200;

function update() {


  // mask.x = guy.x - 32
  // mask.y = guy.y - 32

  game.physics.arcade.collide(cat, layer);
  game.physics.arcade.collide(guy, layer);
  cat.body.velocity.set(0);
  guy.body.velocity.set(0);

  game.physics.arcade.collide(cat, bluePower1, bluePowerConsume, null, this);
  game.physics.arcade.collide(cat, bluePower2, bluePowerConsume, null, this);

  // console.log("hmm")
    // cursor for camera movement
    // if (cursors.left.isDown)
    // {
    //     game.camera.x -= 4;
    // }
    // else if (cursors.right.isDown)
    // {
    //     game.camera.x += 4;
    // }
    //
    // if (cursors.up.isDown)
    // {
    //     game.camera.y -= 4;
    // }
    // else if (cursors.down.isDown)
    // {
    //     game.camera.y += 4;
    // }

    if (cursors.left.isDown)
        {
            cat.body.velocity.x = -playerVelocity;

            if (facing != 'left')
            {
                cat.animations.play(facing+'-left', animationSpeed, false);
                facing = 'left';
            }
            cat.animations.play('left', animationSpeed)
            // cat.tint = Math.random()*0xFFFFFF;

            guy.body.velocity.x = -playerVelocity;

            if (facing != 'left')
            {
                guy.animations.play(facing+'-left', animationSpeed, false);
                facing = 'left';
            }
            guy.animations.play('left', animationSpeed)
            // guy.alpha -= .001
            // layer2.alpha -= .001;
            // guy.tint = Math.random()*0xFFFFFF;
        }
        else if (cursors.right.isDown)
        {
            cat.body.velocity.x = playerVelocity;

            if (facing != 'right')
            {
                cat.animations.play(facing+'-right', animationSpeed, false);
                facing = 'right';
            }
            cat.animations.play('right', animationSpeed)
            // cat.tint = Math.random()*0xFFFFFF;

            guy.body.velocity.x = playerVelocity;

            if (facing != 'right')
            {
                guy.animations.play(facing+'-right', animationSpeed);
                facing = 'right';
            }
            guy.animations.play('right', animationSpeed)
            // guy.alpha -= .001;
            // guy.tint -= 0x000101;
            // layer2.alpha -= .001;
            // guy.tint = Math.random()*0xFFFFFF;
        }
        else if (cursors.down.isDown)
        {
            cat.body.velocity.y = playerVelocity;

            if (facing != 'forward')
            {
                cat.animations.play(facing+'-forward', animationSpeed);
                facing = 'forward';
            }
            cat.animations.play('forward', animationSpeed)
            // guy.alpha -= .001
            // cat.tint = Math.random()*0xFFFFFF;

            guy.body.velocity.y = playerVelocity;

            if (facing != 'forward')
            {
                guy.animations.play(facing+'-forward', animationSpeed);
                facing = 'forward';
            }
            guy.animations.play('forward', animationSpeed)
            // guy.alpha -= .001
            // layer2.alpha -= .001;
            // guy.tint = Math.random()*0xFFFFFF;

        }
        else if (cursors.up.isDown)
        {
            cat.body.velocity.y = -playerVelocity;

            if (facing != 'away')
            {
                cat.animations.play(facing+'-away', animationSpeed);
                facing = 'away';
            }
            cat.animations.play('away', animationSpeed)
            // cat.tint = Math.random()*0xFFFFFF;

            guy.body.velocity.y = -playerVelocity;

            if (facing != 'away')
            {
                guy.animations.play(facing+'-away', animationSpeed);
                facing = 'away';
            }
            guy.animations.play('away', animationSpeed)
            // guy.alpha -= .001
            // layer2.alpha -= .001;
            // guy.tint = Math.random()*0xFFFFFF;
        }
        else
        {
            // if (facing != 'idle')

            cat.animations.stop();
            cat.tint = 0xFFFFFF;

            if (facing == 'left')
                {
                    cat.frame = 77;
                }
                else if (facing == 'right')
                {
                    cat.frame = 87;
                }
                else if (facing == 'forward')
                {
                    cat.frame = 79;
                }
                else if (facing == 'away')
                {
                    cat.frame = 96;
                }

                guy.animations.stop();
                guy.tint = 0xFFFFFF;

                if (facing == 'left')
                    {
                        guy.frame = 77;
                    }
                    else if (facing == 'right')
                    {
                        guy.frame = 87;
                    }
                    else if (facing == 'forward')
                    {
                        guy.frame = 79;
                    }
                    else if (facing == 'away')
                    {
                        guy.frame = 96;
                    }




        }


}

var red = 256;
var green = 256;
var blue = 256;
console.log(red*green*blue);
console.log(0xFFFFFF)
function bluePowerConsume(_guy, _bluePower) {
  console.log("working?")
  // _bluePower.animations.play('destroy', 16, false); // Doesn't do anything, sprite killed before it can show the animation.
  _bluePower.kill();
  guy.tint -= 0x222200;
  guy.alpha -= .1;
  layer2.tint -= 0x222200;

  layer2.alpha -= .1;
}

function render() {
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(cat);
  // game.debug.bodyInfo(cat, 16, 24);
}
