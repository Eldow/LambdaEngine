define([], () => {
  "use strict"
  class Obb {
    //This Obb's constructor
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.dX = 5
      this.dY = 10
      this.angle = config.angle
      this.width = config.width
      this.height = config.height
      this.fillColor = config.color
    }
    //Update this Obb's position
    update(canvas){
      //TODO check if it collides a canvas boundary, place back & invert velocity
      //Update position
      this.x += this.dX
      this.y += this.dY
    }
    //Draw this Obb
    draw(ctx){
      ctx.beginPath()
      ctx.rotate(this.angle*Math.PI/180)
      ctx.rect(this.x, this.y, this.width, this.height)
      if(this.fillColor !== null){
        ctx.fillStyle = this.fillColor
        ctx.fill()
      }
      ctx.rotate(-this.angle*Math.PI/180)
    }
  }
  return Obb
})
