define([], () => {
  var Collision = {}
  //Checks if shapes are colliding another
  Collision.computeCollisions = function(shapes){
    for (var i = 0; i < shapes.length; i++){
      for(var j = i+1; j < shapes.length; j++){
        var formA = shapes[i].constructor.name
        var formB = shapes[j].constructor.name
        if(formA == "Circle" && formB == "Circle"){
          this.checkForCircleCircleCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "Aabb"){
          this.checkForAabbAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Obb" && formB == "Obb"){
          this.checkForObbObbCollision(shapes[i], shapes[j])
        }
        if(formA == "Circle" && formB == "Aabb"){
          this.checkForCircleAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "Circle"){
          this.checkForCircleAabbCollision(shapes[j], shapes[i])
        }
        //TODO : More checks - depending on how we want to simplify it (ex: Aabb is the same as Obb with a 0° angle)
      }
    }
  }
  //Checks if circleA intersects circleB and compute resulting velocities
  Collision.checkForCircleCircleCollision = function(circleA, circleB){
    var dx = circleA.x - circleB.x
    var dy = circleA.y - circleB.y
    var distance = Math.sqrt(dx*dx + dy*dy)
    if(distance < circleA.radius + circleB.radius){
      //Collision detected
      Collision.dummyCollide(circleA, circleB)
    }
    //Checks if circle intersects rect and compute resulting velocities
    Collision.checkForCircleAabbCollision = function(circle, rect){
      /*var centerRectX = rect.x + rect.width/2
      var centerRectY = rect.y + rect.height/2
      var distanceX = Math.abs(circle.x - centerRectX)
      var distanceY = Math.abs(circle.y - centerRectY)

      if(distanceX < (rect.width/2 + circle.radius) &&
        distanceY < rect.height/2 + circle.radius){
          if(distanceX <=  (rect.width/2) || distanceY <= (rect.height/2)){
            Collision.dummyCollide(circle, rect)
          }
          var distanceXY = (distanceX - rect.width/2)*(distanceX - rect.width/2) +
            (distanceY - rect.height/2)*(distanceY - rect.height/2)
          if(distanceXY <= circle.radius*circle.radius){
            Collision.dummyCollide(circle,rect)
          }
      }*/
    }
    //Checks if rectA intersects rectB and compute resulting velocities
    Collision.checkForAabbAabbCollision = function(rectA, rectB){
      if(rectA.x < rectB.x + rectB.width &&
         rectA.x + rectA.width > rectB.x &&
         rectA.y < rectB.y + rectB.height &&
         rectA.height + rectA.y > rectB.y) {
           //Collision detected
           Collision.dummyCollide(rectA, rectB)
      }
    }
    //Swap velocities between two shapes
    Collision.dummyCollide = function(entityA, entityB){
      //TODO : Make collisions clever by sending to dest a strength proportionnal to the area of the src
      var tempX = entityA.dX
      var tempY = entityA.dY
      entityA.dX = entityB.dX
      entityA.dY = entityB.dY
      entityB.dX = tempX
      entityB.dY = tempY
    }
  }
  return Collision
})
