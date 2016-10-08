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
    }
    //Game loop
    run(){
      console.log("Game started")
      var canvas = this.canvas
      this.interval = setInterval(function(){
        canvas.update()
        canvas.draw()
      },1000 / this.fps)
    }
    //Game pause
    stop() {
      console.log("Game paused")
      clearInterval(this.interval)
      this.interval = null
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
