/*
loader.js
*/
"use strict";

var app = app || {}; //singleton

//When the window first loads, call main's initialization
window.onload = function(){
	console.log("window.onload called");
	app.main.init();
}

//Called when the window is out of focus (background tab or unfocused browser)
window.onblur = function(){
	//Pause
}

//Called when the window is in focus
window.onfocus = function(){
	//Unpause & update
}