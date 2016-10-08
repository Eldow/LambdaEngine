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
      this.points = []

      this.points.push(new Vector(this.x, this.y))
      this.points.push(new Vector(this.x + this.width, this.y))
      this.points.push(new Vector(this.x + this.width, this.y + this.height))
      this.points.push(new Vector(this.x, this.y + this.height))
      console.log(this.points)
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

    projectShape(collidedShapePoints, second){
      var projectedShape = []
      for(var i = 0; i < collidedShapePoints.length; i++){
        if(second){
          projectedShape.push(this.getProjectedVector(new Vector(collidedShapePoints[(i+1) % collidedShapePoints.length].x - collidedShapePoints[i].x,
            collidedShapePoints[(i+1) % collidedShapePoints.length].y - collidedShapePoints[i].y).getNormalVector()))
          projectedShape.push(this.getProjectedVector(new Vector(this.points[(i+1) % collidedShapePoints.length].x - this.points[i].x,
            this.points[(i+1) % collidedShapePoints.length].y - this.points[i].y).getNormalVector()))
        }else{
          projectedShape.push(this.getProjectedVector(new Vector(this.points[(i+1) % collidedShapePoints.length].x - this.points[i].x,
            this.points[(i+1) % collidedShapePoints.length].y - this.points[i].y).getNormalVector()))
          projectedShape.push(this.getProjectedVector(new Vector(collidedShapePoints[(i+1) % collidedShapePoints.length].x - collidedShapePoints[i].x,
            collidedShapePoints[(i+1) % collidedShapePoints.length].y - collidedShapePoints[i].y).getNormalVector()))
        }
      }
      return projectedShape
    }

    getProjectedVector(vector){
      var projectedPoints = []
      for (var i = 0; i < 4; i ++){
        projectedPoints.push(vector.getProjectedPoint(this.points[i]))
      }

      var d = 0
      var p1, p2, currentD, maxPoints

      for (var j = 0; j < 4; j ++){
        for (var k = j + 1; k < 4; k ++){
          p1 = projectedPoints[k]
          p2 = projectedPoints[j]
          currentD = Math.sqrt((p1.x - p2.x)*(p1.x - p2.x)+(p1.y - p2.y)*(p1.y - p2.y))
          if (currentD > d){
            d = currentD
            maxPoints = [p1, p2]
          }
        }
      }
      return maxPoints
    }
  }
  return Aabb
})
