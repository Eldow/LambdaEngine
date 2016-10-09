define(['Canvas', 'PointSpec', 'AabbSpec', 'CircleSpec', 'ObbSpec', 'KDopSpec'], function(Canvas){

  var canvas = new Canvas("canvas")

  describe("Canvas", function(){

    it("should instanciate", function(){
      expect(canvas.ctx).not.toBeNull();
    })

    describe("addShape", function(){
      it("should add a shape", function(){
        var shape = { "type": "circle", "x": 100, "y": 100, "radius": 50 }
        canvas.addShape(shape)
        expect(canvas.shapes[0].constructor.name).toBe("Circle");
      })
    })

  })
})
