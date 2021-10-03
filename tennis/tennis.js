var iteration = 0

var xScale = 5;
var yScale = 350;
var numberOfParts = 7;

var x0 = 0;
var y0 = 350;

var myReq;

var colors = undefined;

var directionInDegrees = getRandomInt(180) - 90;
var ctx;
var myTimer;

var drawingShape = "triangle";
function setDrawingShape(shape){ drawingShape = shape; }

var drawingColor = "azure";
function setDrawingColor(color){ drawingColor = color; }

var drwawingSpeed = 15;
function setDrawingSpeed(speed){ 
	drwawingSpeed = speed; 
	if(myTimer){
		window.clearInterval(myTimer);
		myTimer = setInterval(function(){window.requestAnimationFrame(drawFunction);}, 100-drwawingSpeed );
	}
}

var lineWidth = 1;
function setLineWidth(width){ lineWidth = width; }

function startDrawing(){
	initAnimation();

	if(myTimer){
		window.clearInterval(myTimer);
	}
	myTimer = setInterval(function(){window.requestAnimationFrame(drawFunction);}, 100-drwawingSpeed );
}

function initAnimation(){
	c = document.getElementById("canvas2");
	ctx = c.getContext("2d");
//	ctx.translate(x0,y0);
	directionInDegrees = getRandomInt(180) - 90;
}

function stopDrawing(){
	window.clearInterval(myTimer);
}

var xDirection = 1;

function drawFunction()
{
	
	iteration=iteration+xDirection;
	ctx.clearRect(0, 0, 1800, 1000);
	ctx.save();
	drawTennis(ctx, iteration);
	ctx.restore();
}

function drawTennis(ctx, iteration){
	if (colors == undefined)
	{
		colors =  Array.apply(null, Array(numberOfParts)).map(function () {getRandomColor()});
	}

	if(drawingColor == "rainbow"){
		var color = getRandomColor();
		let newLength = colors.push(color);
		colors.shift();
	}
	var item = iteration;
	for(i = 0; i < numberOfParts; i++){
		item = item+xDirection;
		if(drawingColor == "rainbow"){
			drawSingleIteration(ctx, item, colors[i], drawingShape);
		}else{
			drawSingleIteration(ctx, item, drawingColor, drawingShape);
		}
	}
}

function drawSingleIteration(ctx, iteration, color, shape){
	var direction = directionInDegrees / 360 *(2 * Math.PI);
	var startX = xScale * iteration;
	var startY = y0 + (startX - x0) * Math.tan(direction);
	if ((iteration > 300 && xDirection >0) || ((iteration < 10) && xDirection < 0))
	{
		xDirection = -xDirection;
		x0 = startX;
		y0 = startY;
		directionInDegrees = -directionInDegrees;
	}
	if((startY > 600 && (directionInDegrees * xDirection) > 0) || (startY < 20 && (directionInDegrees * xDirection) < 0))
	{
		x0 = startX;
		y0 = startY;
		//ctx.translate(x0, y0);
		directionInDegrees = -directionInDegrees;
		//iteration = 0;
	}

	var endX = startX;
	var endY = startY + 50;

	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;

	if(shape == "triangle")
	{
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX - 150, 350);
		ctx.lineTo(endX, endY);
		ctx.lineTo(startX, startY);
	}
	else if(shape == "line")
	{
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
	}
	else if(shape == "circle"){
		ctx.arc(startX, startY, 20,0, 2 * Math.PI) ;
	}
	else if(shape == "heart"){
		ctx.arc(startX-10, startY, 10, Math.PI, 2 * Math.PI) ;
		ctx.arc(startX+10, startY, 10, Math.PI, 2 * Math.PI) ;
		ctx.moveTo(startX-20, startY);
		ctx.lineTo(startX, startY + 20);
		ctx.lineTo(startX+20, startY);
	}
	ctx.stroke();
}
