define(['Point', 'Collision'], function(Point, Collision){

  var pointA = new Point({'x': 1, 'y': 2, 'color': "#fff"})
  var pointB = new Point({'x': 1, 'y': 2, 'color': "#fff"})
  var pointC = new Point({'x': 3, 'y': 4, 'color': "#fff"})
  describe("Point", function(){

    it("should instanciate x", function(){
      expect(pointA.x).toEqual(1)
      expect(pointB.x).toEqual(1)
      expect(pointC.x).toEqual(3)
    })

    it("should instanciate y", function(){
      expect(pointA.y).toEqual(2)
      expect(pointB.y).toEqual(2)
      expect(pointC.y).toEqual(4)
    })

    describe("Point-Point collision", function (){
      describe("dummyCollide spy for point A:(1,2) and B(1,2)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForPointPointCollision(pointA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForPointPointCollision(pointA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForPointPointCollision(pointA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(pointA, pointB)
        })

      })

      describe("dummyCollide spy for point A:(1,2) and C(3,4)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForPointPointCollision(pointA, pointC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })



  })
})
