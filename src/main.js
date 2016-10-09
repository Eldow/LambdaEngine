(function() {
  'use strict';
  require(['Game', 'JSONLoader'], (Game, JSONLoader) => {
    //Load configuration
    JSONLoader.loadJSON(function(response){
      //FPS init
      var fps = 60
      var fpsElement = document.getElementById("fps")
      fpsElement.innerHTML = fps + "fps"
      //Game init
      var g = new Game(fps)
      var obj = JSON.parse(response)
      g.loadGame(obj)
      //Play/Pause button
      var play = document.getElementById("play")
      play.addEventListener("click", function(){
        if(g.loop == null){
          g.run()
          play.style.backgroundImage = 'url(assets/pause-button.png)'
        } else {
          g.stop()
          play.style.backgroundImage = 'url(assets/play-button.png)'
        }
      })
    })
  })
})()
