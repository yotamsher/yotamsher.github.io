var iteration = 0

var xScale = 5;
var yScale = 350;
var numberOfParts = 10;

var x0 = 0;
var y0 = 350;

var myReq;

var colors = undefined;

var directionInDegrees = getRandomInt(180) - 90;
var ctx;
function startDrawing(){
	initAnimation();
	myTimer = setInterval(function(){window.requestAnimationFrame(drawFunction);}, 30-drwawingSpeed );
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
	//var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 1800, 1000);
	ctx.save();
	drawTennis(ctx, iteration);
	ctx.restore();
}
var drawingShape = "triangle";
function setDrawingShape(shape){ drawingShape = shape; }

var drawingColor = "azure";
function setDrawingColor(color){ drawingColor = color; }

var drwawingSpeed = 15;
function setDrawingSpeed(speed){ drwawingSpeed = speed; }

var lineWidth = 1;
function setLineWidth(width){ lineWidth = width; }

function drawTennis(ctx, iteration){
	drawSingleIteration(ctx, iteration, drawingColor, drawingShape);
}


function drawSinusToCosinus(ctx, iteration){
	if (colors == undefined)
	{
		colors =  Array.apply(null, Array(numberOfParts)).map(function () {getRandomColor()});
	}

	if(drawingColor == "rainbow"){
		var color = getRandomColor();
		let newLength = colors.push(color);
		colors.shift();
	}

	for(i = 0; i < numberOfParts; i++){
		if(drawingColor == "rainbow"){
			drawSingleIteration(ctx, iteration + i, colors[i], drawingShape);
		}else{
			drawSingleIteration(ctx, iteration + i, drawingColor, drawingShape);
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
	ctx.stroke();
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getRandomColor(){
	var r = genndomInt(255);
	var g = getRandomInt(255);
	var b = getRandomInt(255);
	return fullColorHex(r,g,b);
}

var rgbToHex = function (rgb) { 
	var hex = Number(rgb).toString(16);
	if (hex.length < 2) {
		 hex = "0" + hex;
	}
	return hex;
  };

  var fullColorHex = function(r,g,b) {   
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);
	return "#"+red+green+blue;
  };