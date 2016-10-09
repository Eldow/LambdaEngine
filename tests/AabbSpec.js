define(['Aabb', 'Collision', 'Point', 'Obb', 'KDop'], function(Aabb, Collision, Point, Obb, KDop){

  var aabbA = new Aabb({"x": 750, "y": 200, "width": 150, "height": 100, "color": "#fff"})
  var aabbB = new Aabb({"x": 750, "y": 200, "width": 150, "height": 100, "color": "#fff"})
  var aabbC = new Aabb({"x": 150, "y": 750, "width": 50, "height": 50, "color": "#fff"})

  var pointB = new Point({"x": 755, "y": 205, 'color': "#fff"})
  var pointC = new Point({"x": 150, "y": 750, 'color': "#fff"})

  var obbB = new Obb({'x': 750, 'y': 200, 'width': 350, 'height': 400, 'angle': 20, "color": "#fff"})
  var obbC = new Obb({'x': 150, 'y': 700, 'width': 150, 'height': 100, 'angle': 45, "color": "#fff"})

  var kdopB = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 100],
                        "maxs": [800, 250],
                        "color": "#fff"})
  var kdopC = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 0],
                        "maxs": [500, 100],
                        "color": "#fff"})

  describe("Aabb", function(){

    it("should instanciate x", function(){
      expect(aabbA.x).toEqual(750)
    })

    it("should instanciate y", function(){
      expect(aabbA.y).toEqual(200)
    })

    it("should instanciate width", function(){
      expect(aabbA.width).toEqual(150)
    })

    it("should instanciate height", function(){
      expect(aabbA.height).toEqual(100)
    })

    describe("Aabb-Aabb collision", function (){
      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and B:(x: 750, y: 200, width: 150, height: 100)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForAabbAabbCollision(aabbA, aabbB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForAabbAabbCollision(aabbA, aabbB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForAabbAabbCollision(aabbA, aabbB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(aabbA, aabbB)
        })

      })

      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and C:(x: 150, y: 750, width: 50, height: 50)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForAabbAabbCollision(aabbA, aabbC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Aabb-Point collision", function (){
      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and point B:(755, 205)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForPointAabbCollision(pointB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForPointAabbCollision(pointB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForPointAabbCollision(pointB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(pointB, aabbA)
        })

      })

      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and point C:(150, 750)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForPointAabbCollision(pointC, aabbA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Aabb-Obb collision", function (){
      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and Obb B:(x: 750, y: 200, width: 350, height: 400, angle: 20)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForObbAabbCollision(obbB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForObbAabbCollision(obbB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForObbAabbCollision(obbB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(obbB, aabbA)
        })

      })

      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and Obb C:(x: 150, y: 700, width: 150, height: 100, angle: 45)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForObbAabbCollision(obbC, aabbA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Aabb-KDop collision", function (){
      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and KDop B:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForKdopAabbCollision(kdopB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForKdopAabbCollision(kdopB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForKdopAabbCollision(kdopB, aabbA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(kdopB, aabbA)
        })

      })

      describe("dummyCollide spy for Aabb A:(x: 750, y: 200, width: 150, height: 100) and KDop C:(axis: [{1,0}{1,0}], mins: [200,0], max: [500, 100])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForKdopAabbCollision(kdopC, aabbA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

  })
})
