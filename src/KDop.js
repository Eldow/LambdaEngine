define(['Collision', 'Vector'], (Collision, Vector) => {
  "use strict"
  class KDop {
    //This kDop's constructor
    constructor(config){
      this.k = config.axis.length*2
      this.dX = 1
      this.dY = 1
      this.mins = config.mins
      this.maxs = config.maxs
      this.axis = config.axis
      this.fillColor = config.color
      this.points = []
      this.setup()
    }
    //Setup Kdop - compute straight lines and their intersections so we can draw its shape
    setup(){
      var minStraights = []
      var maxStraights = []
      this.points = []
      //Order the axis clockwise
      var indexs = this.orderAxis()
      //Store all straight lines
      for (var i = 0; i < this.k/2; i++){
        minStraights.push({"x": this.axis[i].x, "y":this.axis[i].y, "k": this.mins[i]})
        maxStraights.push({"x": this.axis[i].x, "y":this.axis[i].y, "k": this.maxs[i]})
      }
      //Loop through ordered lines to construct the intersections points needed to draw the kdop
      var a, b
      for (var i = 0; i < indexs.length-1; i++){
        a = indexs[i]
        b = indexs[i+1]
        this.points.push(this.intersect(minStraights[a], minStraights[b]))
      }
      this.points.push(this.intersect(minStraights[indexs[indexs.length-1]], maxStraights[indexs[0]]))
      for (var i = 0; i < indexs.length-1; i++){
        a = indexs[i]
        b = indexs[i+1]
        this.points.push(this.intersect(maxStraights[a], maxStraights[b]))
      }
      this.points.push(this.intersect(maxStraights[indexs[indexs.length-1]], minStraights[indexs[0]]))
      var temp = []
      var isUnique
      for(var i = 0; i < this.points.length; i++){
        isUnique = true
        for(var j = i+1; j < this.points.length; j++){
          if(this.points[i].x == this.points[j].x && this.points[i].y == this.points[j].y){
            isUnique = false
          }
        }
        if(isUnique)
          temp.push(this.points[i])
        isUnique = true
      }
      this.points = temp
    }
    //order axis
    orderAxis(){
      var xIndexs = []
      var yIndexs = []
      for (var i = 0; i < this.axis.length; i++){
        if(i%2==0){
          xIndexs.splice(1, 0, i)
        } else {
          yIndexs.splice(1, 0, i)
        }
      }
      return xIndexs.concat(yIndexs)
    }
    //returns the intersection point between two straight lines
    intersect(straightA, straightB){
      //Eq are of the form a*x + b*y = k
      var x, y
      if(straightA.y < 0){
        straightA.y = -straightA.y
        straightA.x = -straightA.x
        straightA.k = -straightA.k
      }
      if(straightB.y < 0){
        straightB.y = -straightB.y
        straightB.x = -straightB.x
        straightB.k = -straightB.k
      }
      if(straightA.y==0){
        x = -straightA.k / straightA.x
        y = straightB.x * x + straightB.k
      }
      if(straightB.y==0){
        x = -straightB.k / straightB.x
        y = straightA.x * x + straightA.k
      }
      if(x == undefined && y == undefined) {
        x = (straightB.k - straightA.k)/(straightA.x - straightB.x)
        y = straightA.x * x + straightA.k
      }
      return {"x":-x, "y":y}
    }
    //Update this kDop's position
    update(canvas){
      //Keep the shape inside canvas's boundaries
      var top = { "type": "boundary", "k":4, "mins":[0,-canvas.height], "maxs":[canvas.width, 0], "dX": this.dX, "dY": -this.dY}
      var bot = {  "type": "boundary","k":4, "mins":[0, canvas.height], "maxs":[canvas.width, 2*canvas.height], "dX": this.dX, "dY": -this.dY}
      var left = {  "type": "boundary","k":4, "mins":[-canvas.width,0], "maxs":[0, canvas.height], "dX": -this.dX, "dY": this.dY}
      var right = {  "type": "boundary","k":4, "mins":[canvas.width,0], "maxs":[2*canvas.width, canvas.height], "dX": -this.dX, "dY": this.dY}
      Collision.checkForKdopKdopCollision(this, top)
      Collision.checkForKdopKdopCollision(this, bot)
      Collision.checkForKdopKdopCollision(this, left)
      Collision.checkForKdopKdopCollision(this, right)
      //Update position
      for(var i = 0; i < this.k/2; i++){
        var speed = this.axis[i].x * this.dX +   this.axis[i].y * this.dY
        this.mins[i]+= speed
        this.maxs[i]+= speed
      }
      this.setup()
    }
    //Draw this kDop
    draw(ctx){
      ctx.beginPath()
      ctx.moveTo(this.points[0].x, this.points[0].y)
      for (var point of this.points){
        ctx.lineTo(point.x, point.y)
      }
      ctx.lineTo(this.points[0].x, this.points[0].y)
      ctx.closePath()
      if(this.fillColor !== null){
        ctx.fillStyle = this.fillColor
        ctx.fill()
      }
    }
  }
  return KDop
})
