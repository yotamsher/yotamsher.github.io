function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

class ColorUtil {
	static getRandomColor(){
		var r = getRandomInt(255);
		var g = getRandomInt(255);
		var b = getRandomInt(255);
		return this.fullColorHex(r,g,b);
	}

	static rgbToHex (rgb) { 
		var hex = Number(rgb).toString(16);
		if (hex.length < 2) {
			 hex = "0" + hex;
		}
		return hex;
	}
	
	static fullColorHex (r,g,b) {   
		var red = this.rgbToHex(r);
		var green = this.rgbToHex(g);
		var blue = this.rgbToHex(b);
		return "#"+red+green+blue;
	}
}

