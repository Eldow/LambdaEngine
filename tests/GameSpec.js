define(['Game'], function(Game){

  var game = new Game(60)

  describe("Game", function(){

    it("should instanciate", function(){
      expect(game.fps).toEqual(60);
    })

    describe("run", function(){
      it("should start", function(){
        game.run()
        expect(game.loop).not.toBeNull();
      })
    })

    describe("stop", function(){
      it("should stop", function(){
        game.stop()
        expect(game.loop).toBeNull();
      })
    })
  })
})
