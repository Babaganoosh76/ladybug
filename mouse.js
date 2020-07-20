var dragging = false;
var update;

function engage(e){
	dragging = true;
	moveBug(e);
}

function moveBug(e){
	if(!drawing&&dragging){
		restoreImage();
		j.drawBug(e.offsetX, e.offsetY);
		j.x = e.offsetX;
		j.y = e.offsetY;
	}
	if(drawing&&dragging){
		curve(e);
	}
	if(!dragging)
		return;
}

function disengage(e){
	dragging = false;
	j.incA = 0;
	clearInterval(update);
}

function curve(e) {
	var mario = Math.atan((j.y-e.offsetY)/(j.x-e.offsetX));

	if(j.x>=e.offsetX)
		mario += Math.PI;

	j.incA = (mario-j.ang)/2;

	j.ang += j.incA;
	
	if(j.ang > Math.PI*2){
		j.ang%=Math.PI/2;
	}
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', moveBug);
canvas.addEventListener('mouseup', disengage);
//canvas.addEventListener('mouseout', disengage);