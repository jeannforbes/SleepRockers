// main.js
// This object is our main "controller" class and should contain references
// to most of the objects in our game.

"use strict";

// Only make 1 of main (it's a singleton)
var app = app || {};

app.main = {
	//  Properties
    maxSpeed: 200,
   	lastTime: 0, // use to calculate deltaTime
    game: undefined,
    LevelManager: undefined,
    EntityManager: undefined,
    PlotManager: undefined,

    
    // Initializes global variables and states - only called once!
	init : function() {
		console.log("Initializing...");

        this.game = new Phaser.Game(800,600,Phaser.AUTO, '', { 
            preload: this.preload.bind(this), 
            create: this.create.bind(this),
            update: this.update.bind(this)});
	},

    //Preloads assets for the game - called by phaser on initialization of game
    preload: function(){
        this.game.load.image('test', 'assets/sprites/test.png');
    },

    //Creates objects - called by phaser on initialization of game
    create: function(){
        initEntityManager(this.game);
        new Entity(100, 100, 'test');
    },
	
    // Updates 1 step in the game state - called by phaser
	update: function(){
       //update entities
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