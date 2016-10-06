define([], () => {
  "use strict"
  class Vector {
    //This vector constructor
    constructor(x, y){
      this.x = x
      this.y = y
    }

    addVector(vector){
      return new Vector(this.x + vector.x, this.y + vector.y)
    }

    substractVector(vector){
      return new Vector(this.x - vector.x, this.y - vector.y)
    }

    dotProduct(vector){
      return (this.x * vector.x) + (this.y * vector.y)
    }

    productWithScalar(k){
      this.x *= k
      this.y *= k
    }

    getNorm(){
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    getUnitVector(){
      return new Vector(this.x / this.getNorm(), this.y / this.getNorm())
    }

    getProjectedPoint(point){
      var value = point.x * this.x + point.y * this.y
      return {'x' : value * this.x, 'y' : value * this.y}
    }

    getNormalVector(){
      return new Vector(-this.y/this.getNorm(), this.x/this.getNorm())
    }
  }
  return Vector
})
