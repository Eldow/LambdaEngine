define(['Canvas', 'Circle'], (Canvas, Circle) => {
  "use strict"
  class Game {
    //Constructeur de Game
    constructor(fps){
      this.canvas = new Canvas("canvas")
      this.fps = fps;
    }
    //Boucle rafraîchissant la vue à la fréquence des fps
    run(){
      var canvas = this.canvas
      setInterval(function(){
        canvas.update()
        canvas.draw()
      },1000 / this.fps)
    }
    //Initialise le canvas et charge les formes
    loadGame(gameConfig){
      this.canvas.setup()
      for (var shape of gameConfig){
        if(shape.type == "circle"){
          this.canvas.addShape(new Circle(shape))
        }
      }
      this.canvas.draw()
    }
  }
  return Game
})
