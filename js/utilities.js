// All of these functions are in the global scope
		
"use strict";

//Returns a random number between the given min and max
function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
};

//Returns a random rgba value
function makeColor(red, green, blue, alpha){
	var color='rgba('+red+','+green+','+blue+', '+alpha+')';
	return color;
};

//Clamps a given value between the min and max
function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
};


//Returns a random element from a given array
Array.prototype.randomElement = function(){
	return this[Math.floor(Math.random() * this.length)];
};

function resizeScreen(){
	var canvas = document.querySelector("canvas");
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerHeight;
	app.main.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
}