define([], () => {
  "use strict"
  class Polygon {
    //This polygon's constructor
    constructor(config){
      this.points = config.points
      this.dX = 5
      this.dY = 10
      this.fillColor = config.fillColor
    }
    shift(offsetX, offsetY){
      for(var p of this.points){
        p.x += offsetX
        p.y += offsetY
      }
    }
    //Update this polygon's position
    update(canvas){
      for(var p of this.points){
        //TODO check if out of canvas boundaries : if so, place it back inside and invert velocity
        //Update position
        p.x += this.dX
        p.y += this.dY
      }
    }
    //Draw this polygon
    draw(ctx){
      ctx.beginPath()
      ctx.moveTo(this.points[0].x, this.points[0].y)
      for(var i = 0; i < this.points.length; i++){
        ctx.lineTo(this.points[i].x, this.points[i].y)
      }
      ctx.lineTo(this.points[0].x, this.points[0].y)
      if(this.fillColor !== null){
        ctx.fillStyle = this.fillColor
        ctx.fill()
      }
    }
  }
  return Polygon
})
