//Ladybug
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var canvasData;
var image = new Image();
var drawing = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
image.crossOrigin = "anonymous";
image.src = "https://dl.dropboxusercontent.com/s/9o55i00sdvw8z8k/temp_ladybug_sm.png?raw=1";

var j = new Bug(window.innerWidth/2, window.innerHeight, -Math.PI/2);

var myVar = window.setInterval(function(){ 
	draw() 
}, 100);
playPause();

function draw() {
	j.update()
	j.render();
}

function Bug(x, y, initAng){
	this.x = x;
	this.y = y;
	this.rad = 5;
	this.incA = 0;
	this.incL;
	this.ang = initAng;
	var count = 0, prevx, prevy, angle;

	this.update = function(){ //INCREMENTING COORDINATES
		prevx=this.x;
		prevy=this.y;
		this.x+=this.incL*Math.cos(this.ang);
		this.y+=this.incL*Math.sin(this.ang);
		this.ang+=this.incA;

		if(this.ang > Math.PI*2){
			this.ang%=Math.PI/2;
		}
		angle = this.ang + Math.PI/2;

		console.log(this.ang);
	}

	this.render = function(){ //DRAW TO SCREEN
		ctx.lineWidth = this.rad;
		if(count%2==1)
			ctx.strokeStyle = "rgb(0,0,0)";
		else
			ctx.strokeStyle = "rgb(255,255,255)";

		if(count>1)
			restoreImage();
		ctx.beginPath();
		ctx.moveTo(prevx, prevy);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
		saveImage();
		this.drawBug(prevx, prevy);
		count++;
	}

	this.drawBug = function(i, j){
		ctx.save();		
		ctx.translate(i, j);				// move the origin
		ctx.rotate(angle);					// rotate around this point
		ctx.drawImage(image, -37.5, -75);	// draw the image
		ctx.restore();
	}
};

function playPause(){
	if(drawing){
		//clearInterval(myVar);
		drawing = false;
		j.incL = 0;
	}else{
		//myVar = window.setInterval(function(){ draw() }, 100);
		drawing = true;
		j.incL = 10;
	}
}

function saveImage(){
	canvasData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
}

function restoreImage(){
	ctx.putImageData(canvasData, 0, 0);
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 32:
			playPause();
			break;
		case 37:
			j.incA = -0.2;
			break;
		case 38:
			if(drawing)
				j.incL = 25;
			break;
		case 39:
			j.incA = 0.2;
			break;
		case 76:
			j.ang-=Math.PI/2;
			break;
		case 82:
			j.ang+=Math.PI/2;
			break;
		default:
			j.incA = 0;
			break;
    }
};

document.onkeyup = function(e) {
	j.incA = 0;
	if(drawing)
		j.incL = 10;
};

// document.onkeydown = function(e){
// 	if(e.keyCode==32)
// 		playPause();
// }
