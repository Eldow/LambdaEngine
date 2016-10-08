define(['Vector'], (Vector) => {
  "use strict"
  class Aabb {
    //This Aabb's constructor
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.dX = 1
      this.dY = 1
      this.width = config.width
      this.height = config.height
      this.fillColor = config.color
    }
    //Update this Aabb's position
    update(canvas){
      //Keep this Aabb inside boundaries
      if(this.x + this.width > canvas.width || this.x < 0){
        this.dX = -this.dX
      }
      if(this.y + this.height > canvas.height || this.y < 0){
        this.dY = -this.dY
      }
      //Update position
      this.x += this.dX
      this.y += this.dY
    }
    //Draw this Aabb
    draw(ctx){
      ctx.beginPath()
      ctx.rect(this.x, this.y, this.width, this.height)
      if(this.fillColor !== null){
        ctx.fillStyle = this.fillColor
        ctx.fill()
      }
    }
  }
  return Aabb
})
