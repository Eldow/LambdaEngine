define(['Canvas', 'Circle', 'Aabb', 'Obb'], (Canvas, Circle, Aabb, Obb) => {
  "use strict"
  class Game {
    //Constructeur de Game
    constructor(fps){
      this.canvas = new Canvas("canvas")
      this.canvas.setup()
      this.fps = fps
      this.interval = null
    }
    //Boucle rafraîchissant la vue à la fréquence des fps
    run(){
      console.log("Game started")
      var canvas = this.canvas
      this.interval = setInterval(function(){
        canvas.update()
        canvas.draw()
      },1000 / this.fps)
    }
    stop() {
      console.log("Game paused")
      clearInterval(this.interval)
      this.interval = null
    }
    //Initialise le canvas et charge les formes
    loadGame(gameConfig){
      for (var shape of gameConfig){
        if(shape.type == "circle"){
          this.canvas.addShape(new Circle(shape))
        }
        else if(shape.type == "aabb"){
          this.canvas.addShape(new Aabb(shape))
        }
        else if (shape.type == "obb"){
          this.canvas.addShape(new Obb(shape))
          this.loadGame(shape.shapes)
        }
      }
      this.canvas.draw()
    }
  }
  return Game
})
