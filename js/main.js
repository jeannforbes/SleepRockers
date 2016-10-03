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
        app.levelManager.preload();
        app.entityManager.preload();
    },

    //Creates objects - called by phaser on initialization of game
    create: function(){

        app.levelManager.create();
        app.entityManager.create();
    },
	
    // Updates 1 step in the game state - called by phaser
	update: function(){
       //update entities
       app.levelManager.update();
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