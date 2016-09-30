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