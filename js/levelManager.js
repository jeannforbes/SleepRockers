
"use strict";

var app = app || {};

app.levelManager = {
	game: undefined,
	map: undefined,
	sky: undefined,
	visibleMap: undefined,
	tileSize: 64,
	viewDistance: 64*4,

	//Init game and groups
	init : function() {

        this.game = app.main.game;

        console.log("LevelManager initialized.");
	},

	//Load assets
	preload : function(){
		//Background assets
        this.game.load.image('storm', 'assets/background/storm.jpg');

		//Tiles
		this.game.load.image('day0', 'assets/tiles/desert_day1.jpg');
		this.game.load.image('day1', 'assets/tiles/desert_day2.jpg');
		this.game.load.image('day2', 'assets/tiles/desert_day3.jpg');

	},

	create : function(){

		//Creates the background
		this.sky = this.game.add.group();
		this.sky.create(0,0,'storm');

		//Creates the tilemap
		this.map = this.game.add.group();
		for(var y=0; y<this.game.world.bounds.height/this.tileSize; y++){
			for(var x=0; x<this.game.world.bounds.width/this.tileSize; x++) 
				this.map.create(x*this.tileSize,y*this.tileSize,'day'+parseInt(Math.random()*3));
		}
	},

	//Updates all entities in group
	update : function(){
		this.hideTiles();

		this.sky.position.x = app.entityManager.player.x - 600;
		this.sky.position.y = app.entityManager.player.y - 800;
	},

	hideTiles : function(){
		this.map.setAll('visible', false);
		for(var i=0; i<this.map.length; i++){
			var x = this.map.children[i].x;
			var y = this.map.children[i].y;
			if(    (x > (app.entityManager.player.x - this.viewDistance-64))
				&& (x < (app.entityManager.player.x + this.viewDistance))
				&& (y > (app.entityManager.player.y - this.viewDistance))
				&& (y < (app.entityManager.player.y + this.viewDistance))){
				this.map.children[i].visible = true;
			}
		}
	},

};