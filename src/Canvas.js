define([], () => {
  "use strict"
  class Canvas {
    //Constructeur de canvas
    constructor(id){
      this.canvas = document.getElementById(id)
      this.ctx = this.canvas.getContext("2d")
      this.height=parseInt(this.canvas.getAttribute("height"));
      this.width=parseInt(this.canvas.getAttribute("width"));
      this.shapes = []
      this.validity = false
    }
    //Initialise le canvas
    setup(){
      this.ctx.fillStyle = "#EEE"
      this.ctx.fillRect(0,0,this.width, this.height)
    }
    //Mets à jour toutes les formes du canvas
    update(){
      for (var shape of this.shapes){
        shape.update(this)
        this.validity = false
      }
    }
    //Dessine toutes les formes du canvas
    draw(){
      if (!this.validity){
        this.setup()
      }
      for (var shape of this.shapes){
        shape.draw(this.ctx)
      }
      this.validity = true
    }
    //Ajoute une forme au canvas
    addShape(shape){
      this.shapes.push(shape)
    }
  }
  return Canvas
})
