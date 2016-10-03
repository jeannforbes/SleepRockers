
"use strict";

var app = app || {};

app.entityManager = {
	game: undefined,
	entities: undefined,
	player: undefined,
	playerSpeed: 4,
	ship: undefined,

	//Init game and groups
	init : function() {

        this.game = app.main.game;
        //this.entities = this.game.add.group();

        console.log("EntityManager initialized.");
	},

	//Load assets
	preload : function(){
		this.game.load.spritesheet('player', 'assets/sprites/player.png', 32, 36);
	},

	create : function(){

		this.entities = this.game.add.group();
		//Set values for all entities in world
        this.entities.enableBody = true;
        this.entities.physicsBodyType = Phaser.Physics.ARCADE;

        this.player = this.game.add.sprite(this.game.world.bounds.width/2,this.game.world.bounds.height/2,'player');
        this.entities.add(this.player);
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('up', [0, 1, 2], 10, true);
        this.player.animations.add('down', [3, 4, 5], 10, true);
        this.player.animations.add('right', [6, 7, 8], 10, true);
        this.player.animations.add('left', [9, 10, 11], 10, true);
        this.player.animations.add('idle', [5, 3, 4], 2, true);

        this.player.body.collideWorldBounds = true;
	},

	//Updates all entities in group
	update : function(){
		//Keep camera on player
		this.game.camera.bounds = null;
		this.game.camera.x = this.player.x - window.innerWidth/2;
		this.game.camera.y = this.player.y - window.innerHeight/2;

		//Update entities
		//this.entities.callAll('move');

		//Update player
		this.player.bringToTop();
		this.player.animations.play('walk',50,true);

		//Updates the player's position
	    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	    {
	        this.player.x -= this.playerSpeed;
	        this.player.animations.play('left');
	    }
	    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	    {
	        this.player.x += this.playerSpeed;
	        this.player.animations.play('right');
	    }
	    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
	    	this.player.y -= this.playerSpeed;
	    	this.player.animations.play('up');
	    }
	    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
	    	this.player.y += this.playerSpeed;
	    	this.player.animations.play('down');
	    }
	    else
	    {
	        this.player.rotation = 0;
	        this.player.animations.play('idle');
	    }
	},

	playerInput : function(){

	}

};