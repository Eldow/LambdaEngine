define(['Vector'], (Vector) => {
  var Collision = {}
  //Checks if shapes are colliding another
  Collision.computeCollisions = function(shapes){
    for (var i = 0; i < shapes.length; i++){
      for(var j = i+1; j < shapes.length; j++){
        var formA = shapes[i].constructor.name
        var formB = shapes[j].constructor.name
        console.log(formA, formB)
        if(formA == "Circle" && formB == "Circle"){
          this.checkForCircleCircleCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "Aabb"){
          this.checkForAabbAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Obb" && formB == "Obb"){
          this.checkForObbObbCollision(shapes[i], shapes[j])
        }
        if(formA == "Obb" && formB == "Circle"){
          this.checkForObbCircleCollision(shapes[i], shapes[j])
        }
        if(formA == "Circle" && formB == "Obb"){
          this.checkForObbCircleCollision(shapes[j], shapes[i])
        }
        if(formA == "Obb" && formB == "Aabb"){
          this.checkForObbAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "Obb"){
          this.checkForObbAabbCollision(shapes[j], shapes[i])
        }
        if(formA == "Obb" && formB == "Point"){
          this.checkForObbPointCollision(shapes[i], shapes[j])
        }
        if(formA == "Point" && formB == "Obb"){
          this.checkForObbPointCollision(shapes[j], shapes[i])
        }
        if(formA == "Circle" && formB == "Aabb"){
          this.checkForCircleAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "Circle"){
          this.checkForCircleAabbCollision(shapes[j], shapes[i])
        }
        if(formA == "Point" && formB == "Point"){
          this.checkForPointPointCollision(shapes[i], shapes[j])
        }
        if(formA == "Point" && formB == "Circle"){
          this.checkForPointCircleCollision(shapes[i], shapes[j])
        }
        if(formA == "Circle" && formB == "Point"){
          this.checkForPointCircleCollision(shapes[j], shapes[i])
        }
        if(formA == "Point" && formB == "Aabb"){
          this.checkForPointAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "Point"){
          this.checkForPointAabbCollision(shapes[j], shapes[i])
        }
        if(formA == "KDop" && formB == "KDop"){
          this.checkForKdopKdopCollision(shapes[i], shapes[j])
        }
        if(formA == "Kdop" && formB == "Aabb"){
          this.checkForKdopAabbCollision(shapes[i], shapes[j])
        }
        if(formA == "Aabb" && formB == "KDop"){
          this.checkForKdopAabbCollision(shapes[j], shapes[i])
        }
        //TODO : More checks - depending on how we want to simplify it (ex: Aabb is the same as Obb with a 0° angle)
      }
    }
  }
  //Checks if pointA intersects pointB and compute resulting velocities
  Collision.checkForPointPointCollision = function(pointA, pointB){
    if(pointA.x == pointB.x && pointA.y == pointB.y){
      Collision.dummyCollide(pointA, pointB)
    }
  }

  //Checks if point intersects circle and compute resulting velocities
  Collision.checkForPointCircleCollision = function(point, circle){
    var distance2 = (point.x-circle.x)*(point.x-circle.x) + (point.y-circle.y)*(point.y-circle.y)
    if (distance2 < circle.radius * circle.radius){
      Collision.dummyCollide(point, circle)
    }
  }
  //Checks if point intersects rectangle and compute resulting velocities
  Collision.checkForPointAabbCollision = function(point, rect){
    if(point.x > rect.x && point.x < rect.x + rect.width
      && point.y > rect.y && point.y < rect.y + rect.height){
        Collision.dummyCollide(point, rect)
    }
  }

  //Checks if circleA intersects circleB and compute resulting velocities
  Collision.checkForCircleCircleCollision = function(circleA, circleB){
    var dx = circleA.x - circleB.x
    var dy = circleA.y - circleB.y
    var distance2 = dx*dx + dy*dy
    if(distance2 < (circleA.radius + circleB.radius)*(circleA.radius + circleB.radius)){
      //Collision detected
      Collision.dummyCollide(circleA, circleB)
    }
  }
  //Checks if circle intersects rect and compute resulting velocities
  Collision.checkForCircleAabbCollision = function(circle, rect){
    var centerRectX = rect.x + rect.width/2
    var centerRectY = rect.y + rect.height/2
    var distanceX = Math.abs(circle.x - centerRectX)
    var distanceY = Math.abs(circle.y - centerRectY)

    if(distanceX < (rect.width/2 + circle.radius) &&
      distanceY < rect.height/2 + circle.radius){
        if(distanceX <= (rect.width/2) || distanceY <= (rect.height/2)){
          Collision.dummyCollide(circle, rect)
        }else{
          var distanceXY = (distanceX - rect.width/2)*(distanceX - rect.width/2) +
            (distanceY - rect.height/2)*(distanceY - rect.height/2)
          if(distanceXY <= circle.radius*circle.radius){
            Collision.dummyCollide(circle,rect)
          }
        }
    }
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
  //Checks if kdopA intersects kdopB and compute resulting velocities
  Collision.checkForKdopKdopCollision = function(kdopA, kdopB){
    var k = ((kdopA.k > kdopB.k) ? kdopB.k : kdopA.k)
    for(var i = 0; i < k/2; i++){
      if(kdopA.mins[i] >= kdopB.maxs[i] || kdopA.maxs[i] <= kdopB.mins[i])
        return
    }
    Collision.dummyCollide(kdopA, kdopB)
  }
  //Checks if obbA intersects obbB and compute resulting velocities
  Collision.checkForObbObbCollision = function(obbA, obbB){
    var overlap = true
    var projectedPointsA = obbA.projectShape(obbB.points)
    var projectedPointsB = obbB.projectShape(obbA.points, true)
    for (var i = 0; i < projectedPointsA.length; i++){
      var segmentA = projectedPointsA[i]
      var segmentB = projectedPointsB[i]
        if (!Collision.overlap(segmentA, segmentB)){
          overlap = false
      }
    }
    if(overlap)
      Collision.dummyCollide(obbA, obbB)
  }

  Collision.overlap = function(segmentA, segmentB){
    var distance, currentDistance, maxPoints
    var currentDistance = 0
    //TODO: Optimize loop so it doesn't make checks twice for same points
    for (var p1 of segmentA){
      for (var p2 of segmentB){
        distance = Math.sqrt((p2.x - p1.x)*(p2.x - p1.x)+(p2.y - p1.y)*(p2.y - p1.y))
        if(distance > currentDistance){
          currentDistance = distance
        }
      }
    }
    //TODO: Minimize code maybe by constructing the vectors segA and segB
    var normSegmentA = Math.sqrt((segmentA[0].x - segmentA[1].x)*(segmentA[0].x - segmentA[1].x)+(segmentA[0].y - segmentA[1].y)*(segmentA[0].y - segmentA[1].y))
    var normSegmentB = Math.sqrt((segmentB[0].x - segmentB[1].x)*(segmentB[0].x - segmentB[1].x)+(segmentB[0].y - segmentB[1].y)*(segmentB[0].y - segmentB[1].y))
    if(currentDistance < (normSegmentA + normSegmentB))
      return true
    return false
  }
  //Check if obb intersect circle and compute the resulting velocities
  Collision.checkForObbCircleCollision =  function(obb, circle){
    var isCollide = false
    for (var i = 0; i < obb.points.length; i++){
      if (Collision.checkForSegmentCircleCollision(obb.points[i], obb.points[(i+1)%obb.points.length], circle)){
        isCollide = true
      }
    }
    if(isCollide){
      Collision.dummyCollide(obb, circle)
    }
  }

  //Check if obb intersects abb and compute the resulting velocities
  Collision.checkForObbAabbCollision = function(obb, aabb){
    Collision.checkForObbObbCollision(obb, aabb)
  }

  //Check if obb intersect point and compute the resulting velocities
  Collision.checkForObbPointCollision = function(obb, point){
    var v1 = new Vector(obb.points[1].x - obb.points[0].x, obb.points[1].y - obb.points[0].y)
    var v2 = new Vector(point.x - obb.points[0].x, point.y - obb.points[0].y)
    var dotProduct = v1.dotProduct(v2)

    if (dotProduct >= 0 && dotProduct <= v1.x * v1.x + v1.y * v1.y){
      v1 = new Vector(obb.points[2].x - obb.points[1].x, obb.points[2].y - obb.points[1].y)
      v2 = new Vector(point.x - obb.points[1].x, point.y - obb.points[1].y)
      dotProduct = v1.dotProduct(v2)
      if (dotProduct >= 0 && dotProduct <= v1.x * v1.x + v1.y * v1.y){
        Collision.dummyCollide(obb, point)
      }
    }
  }

  //Check if segment defined by points a and b intersects circle
  Collision.checkForSegmentCircleCollision = function(a, b, circle){
    if (!Collision.checkForLineCircleCollision(a, b, circle)){
      return false
    }
    var AB = new Vector(b.x - a.x, b.y - b.y)
    var AC = new Vector(circle.x - a.x, circle.y - a.y)
    var BC = new Vector(circle.x - b.x, circle.y - b.y)

    var dotABAC = AB.dotProduct(AC)
    AB.productWithScalar(-1)
    var dotBABC = AB.dotProduct(BC)

    if (dotABAC > 0 && dotBABC > 0){
      return true
    }
    if (AC.getNorm() < circle.radius || BC.getNorm() < circle.radius){
      return true
    }
    return false
  }
  //Check if line defined by points a and b intersects circle
  Collision.checkForLineCircleCollision = function(a, b, circle){
    var AB = new Vector(b.x - a.x, b.y - b.y)
    var AC = new Vector(circle.x - a.x, circle.y - a.y)

    var num = Math.abs(AB.x * AC.y - AB.y * AC.x)
    var den = AB.getNorm()

    if (num/den < circle.radius){
      return true
    }
    return false
  }
  //Check if aabb and kdop are colliding by turning the aabb into a kdop4
  Collision.checkForKdopAabbCollision = function(kdop, aabb){
    var kAabb = {"k":4, "mins":[aabb.x, aabb.y], "maxs":[aabb.x+aabb.width, aabb.y+aabb.height], "dX":aabb.dX,"dY":aabb.dY}
    Collision.checkForKdopKdopCollision(kdop, kAabb)
    aabb.dX = kAabb.dX
    aabb.dY = kAabb.dY
  }
  //Swap velocities between two shapes
  Collision.dummyCollide = function(entityA, entityB){
    //TODO : Make collisions clever by sending to dest a strength proportionnal to the area of the src
    var tempX = entityA.dX
    var tempY = entityA.dY
    entityA.dX = entityB.dX
    entityA.dY = entityB.dY
    if(entityB.type !== "boundary"){
      entityB.dX = tempX
      entityB.dY = tempY
    }
  }

return Collision
})
