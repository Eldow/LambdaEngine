define(['Collision', 'Circle', 'Aabb', 'Obb', 'Point', 'KDop'], (Collision, Circle, Aabb, Obb, Point, KDop) => {
  "use strict"
  class Canvas {
    //Canvas constructor
    constructor(id){
      this.canvas = document.getElementById(id)
      this.ctx = this.canvas.getContext("2d")
      this.width  = window.innerWidth
      this.height = window.innerHeight
      this.ratioX = this.width/1920
      this.ratioY = this.height/1080
      this.shapes = []
      this.validity = false
    }
    //Setup background
    setup(){
      this.ctx.canvas.width  = this.width;
      this.ctx.canvas.height = this.height;
      this.ctx.fillStyle = "#fff"
      this.ctx.fillRect(0,0,this.width, this.height)
    }
    //Update all shapes
    update(){
      for (var shape of this.shapes){
        shape.update(this)
        this.validity = false
      }
      Collision.computeCollisions(this.shapes)
    }
    //Draw all shapes
    draw(){
      if (!this.validity){
        this.setup()
      }
      for (var shape of this.shapes){
        shape.draw(this.ctx)
      }
      this.validity = true
    }
    //Add a shape
    addShape(shape){
      if(shape.type == "circle"){
        shape.x = shape.x * this.ratioX
        shape.y = shape.y * this.ratioY
        shape.radius = shape.radius * ((this.ratioX + this.ratioY)/2)
        shape = new Circle(shape)
      }
      else if(shape.type == "aabb"){
        shape.x = shape.x * this.ratioX
        shape.y = shape.y * this.ratioY
        shape.width = shape.width * this.ratioX
        shape.height = shape.height * this.ratioY
        shape = new Aabb(shape)
      }
      else if(shape.type == "obb"){
        shape.x = shape.x * this.ratioX
        shape.y = shape.y * this.ratioY
        shape.width = shape.width * this.ratioX
        shape.height = shape.height * this.ratioY
        shape = new Obb(shape)
      }
      else if(shape.type == "point"){
        shape.x = shape.x * this.ratioX
        shape.y = shape.y * this.ratioY
        shape = new Point(shape)
      }
      else if(shape.type == "kdop"){
        for (var i = 0; i < shape.mins.length; i++){
          shape.mins[i] *= (this.ratioX + this.ratioY) / 2
          shape.maxs[i] *= (this.ratioX + this.ratioY) / 2
        }
        shape = new KDop(shape)
      }
      this.shapes.push(shape)
    }
  }
  return Canvas
})
