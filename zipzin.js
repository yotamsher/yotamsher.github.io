var iteration = 0

var xScale = 5;
var yScale = 350;
var numberOfParts = 10;

var myReq;

function stopDrawing(){
	window.cancelAnimationFrame(myReq)
}

function drawFunction()
{
	c = document.getElementById("canvas2");
	iteration=iteration+1;
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 1800, 1000);
	ctx.save();
	drawSinusToCosinus(ctx, iteration);
	ctx.restore();
	myReq = window.requestAnimationFrame(drawFunction);
}
var drawingShape = "triangle";
function setDrawingShape(shape){ drawingShape = shape; }

var drawingColor = "azure";
function setDrawingColor(color){ drawingColor = color; }

var lineWidth = 1;
function setLineWidth(width){ lineWidth = width; }


function drawSinusToCosinus(ctx, iteration){
	for(i = 0; i < numberOfParts; i++){
		drawSingleIteration(ctx, iteration + i, drawingColor, drawingShape);
	}
}

function drawSingleIteration(ctx, iteration, color, shape){
	var angleInDegrees = (iteration % 360);
	var angle = angleInDegrees /360*(2 * Math.PI);
	var startX = xScale * angleInDegrees;
	var startY = 350 + yScale * Math.cos(angle);
	var endX = startX;
	var endY = 350 + yScale * Math.sin(angle);

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
	//	ctx.moveTo(startX, 350);
		ctx.arc(startX, 350, Math.abs((endY - startY)/2),0, 2 * Math.PI) ;
	}
	ctx.stroke();
}


