define(['Vector'], (Vector) => {
  "use strict"
  class Obb {
    //This Obb's constructor
    constructor(config){

      var rad = -config.angle
      var vectorX = new Vector(Math.cos(rad), Math.sin(rad))
      vectorX.productWithScalar(config.width/2)
      var vectorY = new Vector(- Math.sin(rad), Math.cos(rad))
      vectorY.productWithScalar(config.height/2)

      var center = new Vector(config.x, config.y)

      this.points = []
      this.points.push(center.substractVector(vectorX).substractVector(vectorY))
      this.points.push(center.addVector(vectorX).substractVector(vectorY))
      this.points.push(center.addVector(vectorX).addVector(vectorY))
      this.points.push(center.substractVector(vectorX).addVector(vectorY))
      this.dX = 1
      this.dY = 1
      console.log(this.points)
      this.fillColor = config.color
    }

    //Project corners on a vector and return min and max boundaries
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

    //project shape on the normal vectors of collidedShapePoints
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

    //Update this Obb's position
    update(canvas){
      if(this.points[0].x > canvas.width
        || this.points[1].x > canvas.width
        || this.points[2].x > canvas.width
        || this.points[3].x > canvas.width
        || this.points[0].x < 0
        || this.points[1].x < 0
        || this.points[2].x < 0
        || this.points[3].x < 0){
        this.dX = -this.dX
      }
      if(this.points[0].y > canvas.height
        || this.points[1].y > canvas.height
        || this.points[2].y > canvas.height
        || this.points[3].y > canvas.height
        || this.points[0].y < 0
        || this.points[1].y < 0
        || this.points[2].y < 0
        || this.points[3].y < 0){
        this.dY = -this.dY
      }

      var toAdd = new Vector(this.dX, this.dY)
      for (var i = 0; i < 4; i ++){
        this.points[i] = this.points[i].addVector(toAdd)
      }

    }
    //Draw this Obb
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
  return Obb
})
