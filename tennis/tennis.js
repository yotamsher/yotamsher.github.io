var iteration = 0

var xScale = 10;
var yScale = 350;
var numberOfParts = 10;

var x0 = 0;
var y0 = 350;

var myReq;

var colors = undefined;

var directionInDegrees = getRandomInt(180) - 90;
var ctx;
var clientWidth = 500;
var clientHeight = 500;
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

function handleCanvasSize(){
	const canvas = document.getElementById("canvas2");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth - 100;
	canvas.height = window.innerHeight - 200;
	clientHeight = ctx.canvas.clientHeight;
	clientWidth = ctx.canvas.clientWidth;
}

function initAnimation(){
	c = document.getElementById("canvas2");
	ctx = c.getContext("2d");
	clientHeight = ctx.canvas.clientHeight;
	clientWidth = ctx.canvas.clientWidth;
	//	ctx.translate(x0,y0);
	console.log("canvas client area: " + clientWidth + "x" + clientHeight);
	directionInDegrees = getRandomInt(170) - 85;
}

function stopDrawing(){
	window.clearInterval(myTimer);
}

var xDirection = 1;

function drawFunction()
{
	
	iteration=iteration+xDirection;
	ctx.clearRect(0, 0, clientWidth, clientHeight);
	ctx.save();
	drawTennis(ctx, iteration);
	ctx.restore();
}

function drawTennis(ctx, iteration){
	if (colors == undefined)
	{
		colors =  Array.apply(null, Array(numberOfParts)).map(function () { ColorUtil.getRandomColor()});
	}

	if(drawingColor == "rainbow"){
		var color = ColorUtil.getRandomColor();
		let newLength = colors.push(color);
		colors.shift();
	}
	var item = iteration;
	for(i = 0; i < numberOfParts; i++){
		item = item+xDirection;
		if(drawingColor == "rainbow"){
			drawSingleIteration(ctx, item, colors[i], colors[(i+1)%numberOfParts], drawingShape);
		}else{
			drawSingleIteration(ctx, item, drawingColor, drawingColor, drawingShape);
		}
	}
}

function getNewDirection(oldDirectionInDegrees){
   var newDirection = -oldDirectionInDegrees + getRandomInt(6)-3;
   if( Math.abs(newDirection) > 87 ){
	   newDirection= Math.sign(newDirection) * 87
   }
   return newDirection;
}

function drawSingleIteration(ctx, iteration, lineColor, fillColor, shape){
	var direction = directionInDegrees / 360 *(2 * Math.PI);
	var startX = xScale * iteration;
	var startY = y0 + (startX - x0) * Math.tan(direction);
	if ((startX > clientWidth-5 && xDirection >0) || ((iteration < 1) && xDirection < 0))
	{
		console.log("change xDirection");
		xDirection = -xDirection;
		x0 = startX;
		y0 = startY;
		directionInDegrees = getNewDirection(directionInDegrees);
		console.log("directionInDegrees="+directionInDegrees);
	}
	if((startY > clientHeight-5 && (directionInDegrees * xDirection) > 0) || (startY < 10 && (directionInDegrees * xDirection) < 0))
	{
		console.log("change yDirection");
		x0 = startX;
		y0 = startY;
		//ctx.translate(x0, y0);
		directionInDegrees = getNewDirection(directionInDegrees);
		console.log("directionInDegrees="+directionInDegrees);
		//iteration = 0;
	}

	var endX = startX;
	var endY = startY + 50;

	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.fillStyle = fillColor;
	ctx.strokeStyle = lineColor;

// console.log("drawing at: (" + startX + " , " + startY + " )");

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
		ctx.arc(startX-20, startY, 20, Math.PI, 2 * Math.PI) ;
		ctx.arc(startX+20, startY, 20, Math.PI, 2 * Math.PI) ;
		ctx.moveTo(startX-40, startY);
		ctx.lineTo(startX, startY + 40);
		ctx.lineTo(startX+40, startY);
	}
	ctx.fill();
	ctx.stroke();
}
