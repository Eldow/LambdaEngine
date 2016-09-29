define([], () => {
  "use strict"
  class Circle {
    //This circle's constructor
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.radius = config.radius
      this.dX = 1
      this.dY = 1
      this.fillColor = config.color
    }
    //Update this circle's position
    update(canvas){
      //Keep this circle inside boundaries
      if(this.y + this.radius > canvas.height){
        this.y = canvas.height - this.radius
        this.dY = -this.dY
      }
      if(this.y - this.radius < 0){
        this.y = this.radius
        this.dY = -this.dY
      }
      if(this.x + this.radius > canvas.width){
        this.x = canvas.width - this.radius
        this.dX = -this.dX
      }
      if(this.x - this.radius < 0){
        this.x = this.radius
        this.dX = -this.dX
      }
      //Update position
      this.y += this.dY
      this.x += this.dX
    }
    //Draw this circle
    draw(ctx){
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
      if(this.fillColor !== null){
        ctx.fillStyle = this.fillColor
        ctx.fill()
      }
    }
  }
  return Circle
})
