define(['Canvas'], (Canvas) => {
  "use strict"
  class Game {
    //Game constructor
    constructor(fps){
      this.canvas = new Canvas("canvas")
      this.canvas.setup()
      this.fps = fps
      this.interval = null
      window.addEventListener('resize', function(event){
        location.reload()
      });
      this.loop = null
    }
    //Starts the game loop
    run(){
      var timeStart = new Date()
      this.canvas.update()
      this.canvas.draw()
      this.loop = setTimeout (this.run.bind(this), (1000/this.fps) - (new Date() - timeStart))
    }
    //Stops the game loop
    stop(){
      clearTimeout(this.loop)
      this.loop = null
    }
    //Load forms and initialize canvas
    loadGame(gameConfig){
      for (var shape of gameConfig){
        this.canvas.addShape(shape)
      }
      this.canvas.draw()
    }
  }
  return Game
})
