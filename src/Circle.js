define([], () => {
  "use strict"
  class Circle {
    //Constructeur de cercle
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.radius = config.radius
      this.fillColor = config.fillColor
    }
    //Mise à jour de la position de l'objet
    update(canvas){
      //Ici on peut modifier x et y en fonction de la vitesse, des collisions, de la gravité...
      if (this.y + this.radius < canvas.height){
        this.y = this.y * 1.05
      } else {
        this.y = canvas.height - this.radius
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
    }
  }
  return Circle
})
