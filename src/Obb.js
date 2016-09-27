define(['Circle', 'Aabb'], (Circle, Aabb) => {
  "use strict"
  class Obb {
    //Constructeur de cercle
    constructor(config){
      this.shapes = config.shapes
      this.x = 0
      this.y = 0
      this.velocity = { "x" : 0, "y" : 0 }
      this.width = 0
      this.height = 0
      this.computeBoundaryBox(config.shapes)
      this.fillColor = config.fillColor
    }
    //Fonction déterminant le plus proche rectangle entourant un tableau de formes données
    computeBoundaryBox(shapeArray){
      var xmin, xmax, ymin, ymax
      for(var shape of shapeArray){
        if (shape.type == "circle"){
          if (xmin == undefined || (shape.x - shape.radius) < xmin)
            xmin = shape.x - shape.radius
          if (xmax == undefined || (shape.x + shape.radius) > xmax)
            xmax = shape.x + shape.radius
          if (ymin == undefined || (shape.y - shape.radius) < ymin)
            ymin = shape.y - shape.radius
          if (ymax == undefined || (shape.y + shape.radius) > ymax)
            ymax = shape.y + shape.radius
        } else if (shape.type == "aabb"){
          if (xmin == undefined || (shape.x) < xmin)
            xmin = shape.x
          if (xmax == undefined || (shape.x + shape.width) > xmax)
            xmax = shape.x + shape.width
          if (ymin == undefined || (shape.y) < ymin)
            ymin = shape.y
          if (ymax == undefined || (shape.y + shape.height) > ymax)
            ymax = shape.y + shape.height
        }
      }
      this.x = xmin
      this.y = ymin
      this.width = xmax - xmin
      this.height = ymax - ymin
    }
    //Mise à jour de la position de l'objet
    update(canvas){
      //Ici on peut modifier x et y en fonction de la vitesse, des collisions, de la gravité...
    }
    //Instructions pour dessiner un rectangle obb
    draw(ctx){
      ctx.beginPath()
      ctx.rect(this.x, this.y, this.width, this.height)
      if(this.fillColor !== null){
        ctx.globalAlpha = 0.3
        ctx.fillStyle = this.fillColor
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
  }
  return Obb
})
