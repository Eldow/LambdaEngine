define(['Vector', 'Obb'], (Vector, Obb) => {
  var Collision = {}
  //Checks if shapes are colliding another
  Collision.computeCollisions = function(shapes){
    for (var i = 0; i < shapes.length; i++){
      for(var j = i+1; j < shapes.length; j++){
        var formA = shapes[i].constructor.name
        var formB = shapes[j].constructor.name
        if(formA == "Circle" && formB == "Circle")
          this.checkForCircleCircleCollision(shapes[i], shapes[j])
        if(formA == "Aabb" && formB == "Aabb")
          this.checkForAabbAabbCollision(shapes[i], shapes[j])
        if(formA == "Obb" && formB == "Obb")
          this.checkForObbObbCollision(shapes[i], shapes[j])
        if(formA == "Obb" && formB == "Circle")
          this.checkForObbCircleCollision(shapes[i], shapes[j])
        if(formA == "Circle" && formB == "Obb")
          this.checkForObbCircleCollision(shapes[j], shapes[i])
        if(formA == "Obb" && formB == "Aabb")
          this.checkForObbAabbCollision(shapes[i], shapes[j])
        if(formA == "Aabb" && formB == "Obb")
          this.checkForObbAabbCollision(shapes[j], shapes[i])
        if(formA == "Obb" && formB == "Point")
          this.checkForObbPointCollision(shapes[i], shapes[j])
        if(formA == "Point" && formB == "Obb")
          this.checkForObbPointCollision(shapes[j], shapes[i])
        if(formA == "Circle" && formB == "Aabb")
          this.checkForCircleAabbCollision(shapes[i], shapes[j])
        if(formA == "Aabb" && formB == "Circle")
          this.checkForCircleAabbCollision(shapes[j], shapes[i])
        if(formA == "Point" && formB == "Point")
          this.checkForPointPointCollision(shapes[i], shapes[j])
        if(formA == "Point" && formB == "Circle")
          this.checkForPointCircleCollision(shapes[i], shapes[j])
        if(formA == "Circle" && formB == "Point")
          this.checkForPointCircleCollision(shapes[j], shapes[i])
        if(formA == "Point" && formB == "Aabb")
          this.checkForPointAabbCollision(shapes[i], shapes[j])
        if(formA == "Aabb" && formB == "Point")
          this.checkForPointAabbCollision(shapes[j], shapes[i])
        if(formA == "KDop" && formB == "KDop")
          this.checkForKdopKdopCollision(shapes[i], shapes[j])
        if(formA == "KDop" && formB == "Aabb")
          this.checkForKdopAabbCollision(shapes[i], shapes[j])
        if(formA == "Aabb" && formB == "KDop")
          this.checkForKdopAabbCollision(shapes[j], shapes[i])
        if(formA == "KDop" && formB == "Point")
          this.checkForKdopPointCollision(shapes[i], shapes[j])
        if(formA == "Point" && formB == "KDop")
          this.checkForKdopPointCollision(shapes[j], shapes[i])
        if(formA == "Kdop" && formB == "Circle")
          this.checkForKdopCircleCollision(shapes[i], shapes[j])
        if(formA == "Circle" && formB == "KDop")
          this.checkForKdopCircleCollision(shapes[j], shapes[i])
        if(formA == "Kdop" && formB == "Obb")
          this.checkForKdopObbCollision(shapes[i], shapes[j])
        if(formA == "Obb" && formB == "KDop")
          this.checkForKdopObbCollision(shapes[j], shapes[i])
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
    if(Collision.isObbObbCollided(obbA,obbB)){
      Collision.dummyCollide(obbA, obbB)
    }
  }

  Collision.isObbObbCollided = function(obbA, obbB){
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
    return overlap
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
    var config = {
      "type": "obb",
      "x": aabb.x + aabb.width/2,
      "y": aabb.y + aabb.height/2,
      "width": aabb.width,
      "height": aabb.height,
      "angle": 0,
      "color": aabb.fillColor
    }
    var convertedAabb = new Obb(config)
    if(Collision.isObbObbCollided(obb, convertedAabb)){
      Collision.dummyCollide(obb, aabb)
    }
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
    var AC = new Vector (circle.x - a.x, circle.y - a.y)
    var AB = new Vector (b.x - a.x, b.y - a.y)
    var dot = AC.dotProduct(AB)
    var len = AB.x * AB.x + AB.y * AB.y
    var proj = -1
    if (len != 0){
      proj = dot/len
    }
    var x, y

    if (proj < 0){
      x = a.x
      y = a.y
    }else if (proj > 1){
      x = b.x
      y = b.y
    }else {
      x = a.x + proj * AB.x
      y = a.y + proj * AB.y
    }

    var dx = circle.x - x
    var dy = circle.y - y

    if(Math.sqrt(dx * dx + dy * dy) <= circle.radius){
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
  //Check if point intersects segment
  Collision.checkForPointSegmentCollision = function(p, segment){
    function sqr(x) { return x * x }
    function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
    function distToSegmentSquared(p, v, w) {
      var l2 = dist2(v, w);
      if (l2 == 0) return dist2(p, v);
      var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      return dist2(p, { x: v.x + t * (w.x - v.x),
                        y: v.y + t * (w.y - v.y) });
    }
    function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
    if(distToSegment(p, segment.a, segment.b) < 2){
      return true
    } else {
      return false
    }
  }
  //Check if aabb and kdop are colliding by turning the aabb into a kdop4
  Collision.checkForKdopAabbCollision = function(kdop, aabb){
    var kAabb = {"k":4, "mins":[aabb.x, aabb.y], "maxs":[aabb.x+aabb.width, aabb.y+aabb.height], "dX":aabb.dX,"dY":aabb.dY}
    Collision.checkForKdopKdopCollision(kdop, kAabb)
    aabb.dX = kAabb.dX
    aabb.dY = kAabb.dY
  }
  //Check if point and kdop are colliding by computing a kdop4 for point
  Collision.checkForKdopPointCollision = function(kdop, p){
    for (var i = 0; i < kdop.points.length; i++){
      if(Collision.checkForPointSegmentCollision(p, {"a":kdop.points[i], "b":kdop.points[(i+1)%kdop.points.length]}))
        Collision.dummyCollide(kdop, p)
    }
  }
  //Check if KDop intersects circle
  Collision.checkForKdopCircleCollision = function(kdop, circle){
    if(Collision.isKdopSegmentCollideCircle(kdop, circle)){
      Collision.dummyCollide(kdop, circle)
    }
  }
  //Check if segment is colliding circle
  Collision.isKdopSegmentCollideCircle = function (kdop, circle){
    for (var i = 0; i < kdop.points.length; i++){
      if(Collision.checkForSegmentCircleCollision(kdop.points[i], kdop.points[(i+1) % kdop.points.length], circle)){
        return true
      }
    }
    return false
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
