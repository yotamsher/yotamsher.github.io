class Point {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

class tennisMovement{
	startX;
	startY;
	directionInDegrees = getRandomInt(180) - 90;
	static xScale = 10;
	x0 = 0;
	y0 = 350;
	
	getNewDirection(oldDirectionInDegrees){
		var newDirection = -oldDirectionInDegrees + getRandomInt(6)-3;
		if( Math.abs(newDirection) > 87 ){
			newDirection= Math.sign(newDirection) * 87
		}
		return newDirection;
	 }
	 

	handleMovement(iteration){
		var direction = this.directionInDegrees / 360 *(2 * Math.PI);
		this.startX = tennisMovement.xScale * iteration;
		this.startY = this.y0 + (this.startX - this.x0) * Math.tan(direction);
		if ((this.startX > clientWidth-5 && xDirection >0) || ((iteration < 1) && xDirection < 0))
		{
			console.log("change xDirection");
			xDirection = -xDirection;
			this.x0 = this.startX;
			this.y0 = this.startY;
			this.directionInDegrees = this.getNewDirection(this.directionInDegrees);
			console.log("directionInDegrees="+this.directionInDegrees);
		}
		if((this.startY > clientHeight-5 && (this.directionInDegrees * xDirection) > 0) || (this.startY < 10 && (this.directionInDegrees * xDirection) < 0))
		{
			console.log("change yDirection");
			this.x0 = this.startX;
			this.y0 = this.startY;
			this.directionInDegrees = this.getNewDirection(this.directionInDegrees);
			console.log("directionInDegrees="+ this.directionInDegrees);
		}
	}
}

var tn = new tennisMovement();
var shapesContainer = new Shapes();

var iteration = 0

var numberOfParts = 10;

var myReq;

var colors = undefined;

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
	//directionInDegrees = getRandomInt(170) - 85;
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

function drawSingleIteration(ctx, iteration, lineColor, fillColor, shape){

	tn.handleMovement(iteration);
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.fillStyle = fillColor;
	ctx.strokeStyle = lineColor;

// console.log("drawing at: (" + startX + " , " + startY + " )");

	var shapeObj = shapesContainer.Get(shape);
	shapeObj.draw(ctx, tn.startX, tn.startY);

	ctx.fill();
	ctx.stroke();
}
