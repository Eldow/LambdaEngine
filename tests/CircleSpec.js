define(['Circle', 'Aabb', 'Collision', 'Point', 'Obb', 'KDop'], function(Circle, Aabb, Collision, Point, Obb, KDop){

  var circleA = new Circle({"x": 750, "y": 200, "radius": 100, "color": "#fff"})
  var circleB = new Circle({"x": 750, "y": 200, "radius": 100, "color": "#fff"})
  var circleC = new Circle({"x": 250, "y": 700, "radius": 100, "color": "#fff"})

  var aabbB = new Aabb({"x": 750, "y": 200, "width": 150, "height": 100, "color": "#fff"})
  var aabbC = new Aabb({"x": 150, "y": 750, "width": 50, "height": 50, "color": "#fff"})

  var pointB = new Point({"x": 755, "y": 205, 'color': "#fff"})
  var pointC = new Point({"x": 150, "y": 750, 'color': "#fff"})

  var obbB = new Obb({'x': 850, 'y': 300, 'width': 350, 'height': 400, 'angle': 20, "color": "#fff"})
  var obbC = new Obb({'x': 150, 'y': 700, 'width': 150, 'height': 100, 'angle': 45, "color": "#fff"})

  var kdopB = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 100],
                        "maxs": [800, 250],
                        "color": "#fff"})
  var kdopC = new KDop({"axis": [{"x":1, "y":0}, {"x":0, "y":1}],
                        "mins": [200, 0],
                        "maxs": [500, 100],
                        "color": "#fff"})

  describe("Circle", function(){

    it("should instanciate x", function(){
      expect(circleA.x).toEqual(750)
    })

    it("should instanciate y", function(){
      expect(circleA.y).toEqual(200)
    })

    it("should instanciate radius", function(){
      expect(circleA.radius).toEqual(100)
    })


    describe("Circle-circle collision", function (){
      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and B:(x: 750, y: 200, radius: 100)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForCircleCircleCollision(circleA, circleB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForCircleCircleCollision(circleA, circleB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForCircleCircleCollision(circleA, circleB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(circleA, circleB)
        })

      })

      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and C:(x: 250, y: 700, radius: 100)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForCircleCircleCollision(circleA, circleC)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Circle-Point collision", function (){
      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and point B:(755, 205)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForPointCircleCollision(pointB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForPointCircleCollision(pointB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForPointCircleCollision(pointB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(pointB, circleA)
        })

      })

      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and point C:(150, 750)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForPointCircleCollision(pointC, circleA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Circle-Aabb collision", function (){
      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and Aabb B:(x: 750, y: 200, width: 150, height: 100)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForCircleAabbCollision(circleA, aabbB)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForCircleAabbCollision(circleA, aabbB)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForCircleAabbCollision(circleA, aabbB)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(circleA, aabbB)
        })

      })

      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and Aabb C:(x: 150, y: 750, width: 50, height: 50)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForPointCircleCollision(circleA, aabbB)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Circle-Obb collision", function (){
      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and Obb B:(x: 850, y: 300, width: 350, height: 400, angle: 20)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForObbCircleCollision(obbB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForObbCircleCollision(obbB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForObbCircleCollision(obbB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(obbB, circleA)
        })

      })

      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and Obb C:(x: 150, y: 700, width: 150, height: 100, angle: 45)", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForObbCircleCollision(obbC, circleA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

    describe("Circle-KDop collision", function (){
      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and KDop B:(axis: [{1,0}{1,0}], mins: [200,100], max: [800, 250])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was called", function() {
          Collision.checkForKdopCircleCollision(kdopB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalled()
        })

        it("tracks that dummyCollide was called one time", function() {
          Collision.checkForKdopCircleCollision(kdopB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalledTimes(1)
        })

        it("tracks all the arguments of its calls", function() {
          Collision.checkForKdopCircleCollision(kdopB, circleA)
          expect(Collision.dummyCollide).toHaveBeenCalledWith(kdopB, circleA)
        })

      })

      describe("dummyCollide spy for Circle A:(x: 750, y: 200, radius: 100) and KDop C:(axis: [{1,0}{1,0}], mins: [200,0], max: [500, 100])", function() {

        beforeEach(function() {
          spyOn(Collision, 'dummyCollide')
        })

        it("tracks that dummyCollide was not called", function() {
          Collision.checkForKdopCircleCollision(kdopC, circleA)
          expect(Collision.dummyCollide).not.toHaveBeenCalled()
        })
      })
    })

  })
})
