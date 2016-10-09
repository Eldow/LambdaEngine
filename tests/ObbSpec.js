define(['Obb', 'Point', 'KDop', 'Collision'], function(Obb, Point, KDop, Collision){

  var obbA = new Obb({'x': 850, 'y': 300, 'width': 350, 'height': 400, 'angle': 20, "color": "#fff"})
  var obbB = new Obb({'x': 850, 'y': 300, 'width': 350, 'height': 400, 'angle': 20, "color": "#fff"})
  var obbC = new Obb({'x': 150, 'y': 700, 'width': 50, 'height': 50, 'angle': 45, "color": "#fff"})

  var pointB = new Point({"x": 755, "y": 205, 'color': "#fff"})
  var pointC = new Point({"x": 150, "y": 750, 'color': "#fff"})

  var kdopB = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 100],
                        "maxs": [800, 250],
                        "color": "#fff"})
  var kdopC = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 0],
                        "maxs": [500, 100],
                        "color": "#fff"})

  describe("Obb", function(){

    it("should instanciate points", function(){
      expect(obbA.points.length).toEqual(4)
    })


    describe("Obb-Obb collision", function (){
      describe("dummyCollide spy for Obb A:(x: 850, y: 300, width: 350, heigth: 400, angle: 20) and B:(x: 850, y: 300, width: 350, heigth: 400, angle: 20)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForObbObbCollision(obbA, obbB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForObbObbCollision(obbA, obbB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForObbObbCollision(obbA, obbB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(obbA, obbB)
        })

      })

      describe("dummyCollide spy for Obb A:(x: 850, y: 300, width: 350, heigth: 400, angle: 20) and C:(x: 150, y: 700, width: 50, heigth: 50, angle: 45)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForObbObbCollision(obbA, obbC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Obb-Point collision", function (){
      describe("dummyCollide spy for Obb A:(x: 850, y: 300, width: 350, heigth: 400, angle: 20) and point B:(755, 205)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForObbPointCollision(obbA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForObbPointCollision(obbA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForObbPointCollision(obbA, pointB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(obbA, pointB)
        })

      })

      describe("dummyCollide spy for Obb A:(x: 850, y: 300, width: 350, heigth: 400, angle: 20) and point C:(150, 750)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForObbPointCollision(obbA, pointC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Obb-KDop collision", function (){
      describe("dummyCollide spy for Obb A:(x: 850, y: 300, width: 350, heigth: 400, angle: 20) and KDop B:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForKdopObbCollision(kdopB, obbA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForKdopObbCollision(kdopB, obbA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForKdopObbCollision(kdopB, obbA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(kdopB, obbA)
        })

      })

      describe("dummyCollide spy for Obb A:(x: 850, y: 300, width: 350, heigth: 400, angle: 20) and KDop C:(axis: [{1,0}{1,0}], mins: [200,0], max: [500, 100])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForKdopCircleCollision(kdopB, obbA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

  })
})
