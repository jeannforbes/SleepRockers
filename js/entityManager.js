
var game, entities;

function initEntityManager(game){
	this.game = game;
	entities = this.game.add.group();
	entities.enableBody = true;

	//inheritance
	inheritsFrom(Player, Entity);
};

/* ENTITIES */

//Basic entity object
var Entity = function(x, y, sprite){
	this.x = x;
	this.y = y;
	this.sprite = sprite;
	var e = entities.create(this.x,this.y,this.sprite);
};

Entity.prototype.update = function(){
	x++;
};


var Player = function(){

}