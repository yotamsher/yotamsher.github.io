class Triangle{
    static Name = "triangle";
    draw(ctx, x, y){
        var endX = x;
        var endY = y + 50;
        ctx.moveTo(x, y);
        ctx.lineTo(x - 150, 350);
        ctx.lineTo(endX, endY);
        ctx.lineTo(x, y);
    }
}

class VerticalLine{
    static Name = "line";
    draw(ctx, x, y){
        var endY = y + 50;
        ctx.moveTo(x, y);
        ctx.lineTo(x, endY);
    }
}

class Circle{
    static name = "circle";
    draw(ctx, x, y){
        ctx.arc(tn.startX, tn.startY, 20,0, 2 * Math.PI) ;
    }
}

class Heart{
    static name = "heart";
    draw(ctx, x, y){
        ctx.arc(x-20, y, 20, Math.PI, 2 * Math.PI) ;
		ctx.arc(x+20, y, 20, Math.PI, 2 * Math.PI) ;
		ctx.moveTo(x-40, y);
		ctx.lineTo(x, y + 40);
		ctx.lineTo(x+40, y);
    }
}



class Shapes{
    shapes = new Map([
                        ['triangle', new Triangle()],
                        ['line', new VerticalLine()],
                        ['circle', new Circle()],
                        ['heart', new Heart()]
                    ])
    Get(shape){
        if(this.shapes.has(shape)){
            return this.shapes.get(shape);
        }else return this.shapes.get('triangle');
    
    }
}