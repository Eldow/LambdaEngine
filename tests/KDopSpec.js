define(['KDop', 'Point', 'Collision'], function(KDop, Point, Collision){

  var kdopA = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 100],
                        "maxs": [800, 250],
                        "color": "#fff"})
  var kdopB = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 100],
                        "maxs": [800, 250],
                        "color": "#fff"})
  var kdopC = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 0],
                        "maxs": [500, 50],
                        "color": "#fff"})

  var pointB = new Point({"x": 800, "y": 100, 'color': "#fff"})
  var pointC = new Point({"x": 150, "y": 750, 'color': "#fff"})

  describe("KDop", function(){

    it("should instanciate points", function(){
      expect(kdopA.points).toEqual(jasmine.anything())
    })


    describe("KDop-KDop collision", function (){
      describe("dummyCollide spy for KDop A:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250]) and B:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForKdopKdopCollision(kdopA, kdopB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForKdopKdopCollision(kdopA, kdopB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForKdopKdopCollision(kdopA, kdopB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(kdopA, kdopB)
        })

      })

      describe("dummyCollide spy for KDop A:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250]) and C:(axis: [{1,0}{1,0}], mins: [200, 0], max: [500, 50])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForKdopKdopCollision(kdopA, kdopC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Kdop-Point collision", function (){
      describe("dummyCollide spy for KDop A:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250]) and point B:(800, 100)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForKdopPointCollision(kdopA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForKdopPointCollision(kdopA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForKdopPointCollision(kdopA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(kdopA, pointB)
        })

      })

      describe("dummyCollide spy for KDop A:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250]) and point C:(150, 750)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForKdopPointCollision(kdopA, pointC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

  })
})
