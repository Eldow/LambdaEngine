define([], () => {
  "use strict"
  class Aabb {
    //Constructeur de cercle
    constructor(config){
      this.x = config.x
      this.y = config.y
      this.width = config.width
      this.height = config.height
      this.fillColor = config.fillColor
    }
    //Mise à jour de la position de l'objet
    update(canvas){
      //Ici on peut modifier x et y en fonction de la vitesse, des collisions, de la gravité...
    }
    //Instructions pour dessiner un rectangle aabb
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
