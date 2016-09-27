define([], () => {
  "use strict"
  class Circle {
    //Constructeur de cercle
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.radius = config.radius
      this.fillColor = config.fillColor
      this.strokeColor = config.strokeColor
    }
    //Update(ctx)
    update(canvas){
      var velocity = 1.05;
      var nextPosition = this.y*1.05;
      //On vérifie que la boule ne dépasse pas vers le bas
      if((nextPosition + this.radius) > canvas.height){
        this.y = canvas.height - this.radius
      } else {
        this.y = nextPosition
      }
    }
    //Instructions pour dessiner un cercle
    draw(ctx){
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
      if(this.fillColor !== null){
        ctx.fillStyle = this.fillColor
        ctx.fill()
      }
  /*    if(this.strokeColor !== null){
        ctx.lineWidth = 20
        ctx.strokeStyle = this.strokeColor
        ctx.stroke()
      }*/
    }
  }
  return Circle
})
