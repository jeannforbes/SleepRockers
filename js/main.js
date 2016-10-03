// main.js
// This object is our main "controller" class and should contain references
// to most of the objects in our game.

"use strict";

// Singletons
var app = app || {};

app.main = {
	//  Properties
    maxSpeed: 200,
   	lastTime: 0, // use to calculate deltaTime
    game: undefined,
    TEMP_LEVEL: undefined,

    
    // Initializes global variables and states - only called once!
	init : function() {

        /* CREATE THE GAME */

        this.game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO, '', { 
            preload: this.preload.bind(this), 
            create: this.create.bind(this),
            update: this.update.bind(this)});

        app.plotManager.init();
        app.levelManager.init();
        app.entityManager.init();

        /* EVENT HANDLERS */
        window.addEventListener('resize', resizeScreen);
	},

    //Preloads assets for the game - called by phaser on initialization of game
    preload: function(){
        //app.levelManager.preload();
        app.entityManager.preload();

        //TEMPORARY CODE FOR PLAYTEST
        this.game.load.image('tempTile', 'assets/tiles/Sand.png');
        this.game.load.image('sky', 'assets/background/sky.jpg');
    },

    //Creates objects - called by phaser on initialization of game
    create: function(){

        //app.levelManager.create();

        //TEMPORARY CODE FOR PLAYTEST
        this.game.world.setBounds(0,0,900,900);

        this.BG = this.game.add.sprite(0,0,'sky');
        this.TEMP_LEVEL = this.game.add.group();
        var x=0, y=0;
        for(x=0; y<11; x++){
            if( x > 11){ y++; x = 0;}
            var tile = this.TEMP_LEVEL.create(x*64 + 64,256 + 64*y,'tempTile');
                tile.scale.setTo(.25,.25);
        }

        app.entityManager.create();
    },
	
    // Updates 1 step in the game state - called by phaser
	update: function(){
       //update entities
      // app.levelManager.update();
       app.entityManager.update();
	},

    //Calculates the current fps
    calculateDeltaTime: function(){
        var now,fps;
        now = performance.now(); 
        fps = 1000 / (now - this.lastTime);
        fps = clamp(fps, 12, 60);
        this.lastTime = now;
        return 1/fps;
    },
    
}; // end app.main