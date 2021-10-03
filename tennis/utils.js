function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getRandomColor(){
	var r = getRandomInt(255);
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