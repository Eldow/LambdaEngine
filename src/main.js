(function() {
  'use strict';
  require(['Game', 'JSONLoader'], (Game, JSONLoader) => {
    //Et on y charge la configuration de base
    JSONLoader.loadJSON(function(response){
      var g = new Game(60)
      var obj = JSON.parse(response)
      g.loadGame(obj)
      g.run()
    })
  })
})()
