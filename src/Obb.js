define(['Vector'], (Vector) => {
  "use strict"
  class Obb {
    //This Obb's constructor
    constructor(config){
      /*this.x = config.x
      this.y = config.y*/
      /*this.angle = config.angle
      this.width = config.width
      this.height = config.height*/
      //var rad = (config.angle * Math.PI)/180
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

      this.vecs = []
      var vecX = this.points[1].substractVector(this.points[0])
      var vecY = this.points[3].substractVector(this.points[0])
      this.vecs.push(vecX)
      this.vecs.push(vecY)

      this.origin = []

      for (var i = 0; i < 2; i++){
        //this.vecs[i] = this.vecs[i].getUnitVector()
        this.origin.push(this.points[0].dotProduct(this.vecs[i]))
      }
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

    //project shape on the normal vectors
    projectShape(collidedObb, second){
      var projectedShape = []
      for(var i = 0; i < 4; i++){
        if(second){
          projectedShape.push(this.getProjectedVector(new Vector(collidedObb.points[(i+1) % 4].x - collidedObb.points[i].x,
            collidedObb.points[(i+1) % 4].y - collidedObb.points[i].y).getNormalVector()))
          projectedShape.push(this.getProjectedVector(new Vector(this.points[(i+1) % 4].x - this.points[i].x,
            this.points[(i+1) % 4].y - this.points[i].y).getNormalVector()))
        }else{
          projectedShape.push(this.getProjectedVector(new Vector(this.points[(i+1) % 4].x - this.points[i].x,
            this.points[(i+1) % 4].y - this.points[i].y).getNormalVector()))
          projectedShape.push(this.getProjectedVector(new Vector(collidedObb.points[(i+1) % 4].x - collidedObb.points[i].x,
            collidedObb.points[(i+1) % 4].y - collidedObb.points[i].y).getNormalVector()))
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
      for (var j = 0; j < 2; j++){
        this.origin[j] = this.points[0].dotProduct(this.vecs[j])
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
