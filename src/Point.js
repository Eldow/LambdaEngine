define([], () => {
  "use strict"
  class Point {
    //This point's constructor
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.dX = 1
      this.dY = 1
      this.strokeColor = config.color
    }
    //Update this point's position
    update(canvas){
      //Keep this point inside boundaries
      if(this.y > canvas.height){
        this.y = canvas.height
        this.dY = -this.dY
      }
      if(this.y < 0){
        this.y = 0
        this.dY = -this.dY
      }
      if(this.x > canvas.width){
        this.x = canvas.width
        this.dX = -this.dX
      }
      if(this.x < 0){
        this.x = 0
        this.dX = -this.dX
      }
      //Update position
      this.y += this.dY
      this.x += this.dX
    }
    //Draw this point
    draw(ctx){
      ctx.beginPath()
      ctx.moveTo(this.x-5, this.y)
      ctx.lineTo(this.x+5, this.y)
      ctx.moveTo(this.x, this.y-5)
      ctx.lineTo(this.x, this.y+5)
      if(this.strokeColor !== null){
        ctx.strokeStyle = this.strokeColor
        ctx.stroke()
      }
      ctx.textAlign="end";
      var text = this.x + ":" + this.y
      ctx.fillText(text,this.x - 5, this.y - 5);
    }
  }
  return Point
})
