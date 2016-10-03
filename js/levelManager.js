
"use strict";

var app = app || {};

app.levelManager = {
	//Properties
	//delta: 0, //not sure if this is the right manager to keep track of this value.
	//scrollSpeed: 5,
	game: undefined,
	level: undefined,
	backgroundLayer: undefined,
	collisionLayer: undefined,
	
	//Initializes the level manager object
	init: function(){
		this.game = app.main.game;
		
		console.log("levelManager initialized");
	},
	
	//Preloads assets for the game - called by phaser on initialization of game
    preload: function(){
		//map data
		this.game.load.tilemap('planet','assets/tilemaps/maps/testMap.json', null, Phaser.Tilemap.TILED_JSON);
		//tileset
		this.game.load.image('planetTiles','assets/tilemaps/tiles/testTiles.jpg');
    },

    //Creates objects - called by phaser on initialization of game
    create: function(){
		//set level
		this.level = app.main.game.add.tilemap('planet');
		this.level.addTilesetImage('testTiles','planetTiles');
		
		//set layers
		this.backgroundLayer = this.level.createLayer('backgroundLayer');
		this.collisionLayer = this.level.createLayer('collisionLayer');
		
		//set collision with the collisionLayer
		this.level.setCollisionBetween(1,2000,true,'collisionLayer');
		
		this.backgroundLayer.resize();
		
		console.log("Level has been created.");
    },
	
    // Updates 1 step in the game state - called by phaser
	update: function(){
        //app.entityManager.update();
		//delta = game.Time.now()-game.Time.prevTime();
		
		//[Collision handling occurs here?] 
	},
	
	//levelManager specific functions
	/*
	//scrolls the level to the left by off-setting the camera to the right.
	//Used for when the player is moving right.
	scrollLeft: function(){
		app.main.game.camera.x -= scrollSpeed*delta;
	}
	
	//scrolls the level to the right by off-setting the camera to the left.
	//Used for when the player is moving left.
	scrollRight: function(){
		app.main.game.camera.x += scrollSpeed*delta;
	}
	
	//scrolls the level upwards by off-setting the camera downwards.
	//Used for when the player is moving up.
	scrollUp: function(){
		app.main.game.camera.y -= scrollSpeed*delta;
	}
	
	//scrolls the level downwards by off-setting the camera upwards.
	//Used for when the player is moving down.
	scrollDown: function(){
		app.main.game.camera.y += scrollSpeed*delta;
	}
	*/
}
