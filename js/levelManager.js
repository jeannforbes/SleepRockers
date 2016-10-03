
"use strict";

var app = app || {};

app.levelManager = {
	//Properties
	//delta: 0, //not sure if this is the right manager to keep track of this value.
	//scrollSpeed: 5,
	game: undefined,
	gameMap: undefined,
	backgroundLayer: undefined,
	collisionLayer: undefined,
	
	//Initializes the level manager object
	init: function(){
		this.game = app.main.game;
		
		console.log("levelManager initialized.");
	},
	
	//Preloads assets for the game - called by phaser on initialization of game
    preload: function(){
		//map data
		this.game.load.tilemap('planet','assets/tilemaps/maps/testMap.json', null, Phaser.Tilemap.TILED_JSON);
		//tileset
		this.game.load.image('planetTiles','assets/tilemaps/tiles/testTiles.png');
    },

    //Creates objects - called by phaser on initialization of game
    create: function(){
		
		//set level
		this.gameMap = app.main.game.add.tilemap('planet');
		this.gameMap.addTilesetImage('testTiles','planetTiles');
		
		//sets layers
		this.backgroundLayer = this.gameMap.createLayer('backgroundLayer');
		this.collisionLayer = this.gameMap.createLayer('collisionLayer');
		
		//set collision with the collisionLayer
		this.gameMap.setCollisionBetween(1,10000,true,'collisionLayer');
		
		this.backgroundLayer.resizeWorld();
		
		console.log("Level has been created.");
		
    },
	
    // Updates 1 step in the game state - called by phaser
	update: function(){

        app.entityManager.update();
	},
}
