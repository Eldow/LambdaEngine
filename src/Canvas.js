define(['Collision', 'Circle', 'Aabb', 'Obb', 'Polygon', 'Point', 'KDop'], (Collision, Circle, Aabb, Obb, Polygon, Point, KDop) => {
  "use strict"
  class Canvas {
    //Canvas constructor
    constructor(id){
      this.canvas = document.getElementById(id)
      this.ctx = this.canvas.getContext("2d")
      this.width  = window.innerWidth;
      this.height = window.innerHeight;
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
        shape = new Circle(shape)
      }
      else if(shape.type == "aabb"){
        shape = new Aabb(shape)
      }
      else if(shape.type == "obb"){
        shape = new Obb(shape)
      }
      else if(shape.type == "polygon"){
        shape = new Polygon(shape)
      }
      else if(shape.type == "point"){
        shape = new Point(shape)
      }
      else if(shape.type == "kdop"){
        shape = new KDop(shape)
      }
      this.shapes.push(shape)
    }
  }
  return Canvas
})
