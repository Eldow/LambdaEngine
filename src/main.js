(function() {
  'use strict';
  require(['Game', 'JSONLoader'], (Game, JSONLoader) => {
    //Et on y charge la configuration de base
    JSONLoader.loadJSON(function(response){
      var fps = 60
      var g = new Game(fps)
      var fpsElement = document.getElementById("fps")
      fpsElement.innerHTML = fps + "fps"
      var obj = JSON.parse(response)
      g.loadGame(obj)
      var play = document.getElementById("play")
      play.addEventListener("click", function(){
        if(g.interval == null){
          g.run()
          play.style.backgroundImage = 'url(pause-button.png)'
        } else {
          g.stop()
          play.style.backgroundImage = 'url(play-button.png)'
        }
      })
    })
  })
})()
