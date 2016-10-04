
"use strict";

var app = app || {};

app.levelManager = {
	//Properties
	game: undefined,
	canvas: undefined,
	map: undefined,
	sky: undefined,
	fog:{
		visible: true,
		bitmap: undefined,
		gradient: undefined,
		innerCircle: undefined,
		outerCircle: undefined,
		color: 'rgba(20,0,10,1)',
		outerColor: 'rgba(10,0,0,1)',
		intensity: .05,
	},
	showTiles: true,
	visibleMap: undefined,
	tileSize: 64,
	viewDistance: 64*4,

	//Init game and groups
	init : function() {

        this.game = app.main.game;
        this.canvas = document.querySelector("canvas");

        console.log("LevelManager initialized.");
	},

	//Load assets
	preload : function(){

		//Tiles
		this.game.load.image('day0', 'assets/tiles/desert_day1.jpg');
		this.game.load.image('day1', 'assets/tiles/desert_day2.jpg');
		this.game.load.image('day2', 'assets/tiles/desert_day3.jpg');

	},

	create : function(){

		//Creates the background
		this.game.stage.backgroundColor = this.fog.outerColor;

		//Creates the tilemap
		this.map = this.game.add.group();
		for(var y=0; y<this.game.world.bounds.height/this.tileSize; y++){
			for(var x=0; x<this.game.world.bounds.width/this.tileSize; x++) 
				this.map.create(x*this.tileSize,y*this.tileSize,'day'+parseInt(Math.random()*3));
		}

		//Creates fog
		var w = window.innerWidth;
		var h = window.innerHeight;
		this.fog.bitmap = this.game.make.bitmapData(this.game.world.bounds.width*2,this.game.world.bounds.height*2);
		this.fog.bitmap.addToWorld();
		this.fog.innerCircle = new Phaser.Circle(w/2,h/2, 0);
		this.fog.outerCircle = new Phaser.Circle(w/2,h/2, w*1.3);
	},

	//Updates all entities in group
	update : function(){
		if(!this.showTiles) this.hideTiles();
		if(this.fog.visible) this.fogOfWar();
	},

	//Hides tiles outside of the view distance
	//  Turn this on/off with showTiles
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

	//Creates a bitmap "fog of war" to limit player view
	//  Turn this on/off with fog.visible
	fogOfWar : function(){
		this.fog.innerCircle.x = this.fog.outerCircle.x = app.entityManager.player.x;
		this.fog.innerCircle.y = this.fog.outerCircle.y = app.entityManager.player.y;
		var mult = Math.sin(this.game.time.totalElapsedSeconds()*50)*this.fog.intensity;
		this.fog.innerCircle.radius = 50 + 50*mult;
		this.fog.gradient = this.fog.bitmap.context.createRadialGradient(
			this.fog.innerCircle.x, this.fog.innerCircle.y, this.fog.innerCircle.radius,
			this.fog.outerCircle.x, this.fog.outerCircle.y, this.fog.outerCircle.radius);

		this.fog.gradient.addColorStop(0, 'rgba(0,0,0,0)');
		this.fog.gradient.addColorStop(0.5, this.fog.color);
		this.fog.gradient.addColorStop(1,this.fog.outerColor);

		this.fog.bitmap.cls();
		this.fog.bitmap.circle(	this.fog.outerCircle.x, 
								this.fog.outerCircle.y, 
								this.fog.outerCircle.radius, 
								this.fog.gradient);
	},
}
