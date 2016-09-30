// main.js
// This object is our main "controller" class and should contain references
// to most of the objects in our game.

"use strict";

// Only make 1 of main (it's a singleton)
var app = app || {};

app.main = {
	//  Properties
    game,
    maxSpeed: 200,
   	lastTime: 0, // use to calculate deltaTime
    
    
    // Initializes global variables and states - only called once!
	init : function() {
		console.log("Initializing...");

        game = new Phaser.Game(800,600,Phaser.AUTO, '', { preload: preload, create: create, update: update});

	},

    //Preloads assets for the game
    preload: function(){

    },

    create: function(){

    },
	
    // Updates 1 step in the game state
	update: function(){
        console.log("Current fps: "+calculateDeltaTime());
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