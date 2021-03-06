define(['Vector', 'Obb'], (Vector, Obb) => {
  var Collision = {}
  //Call the appropriate collision test depending on shapes types
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
  /*****************************************************************************
  ******************************SHAPE COLLISIONS********************************
  *****************************************************************************/
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
  //Checks if obbA intersects obbB and compute resulting velocities
  Collision.checkForObbObbCollision = function(obbA, obbB){
    if(Collision.arePolygonColliding(obbA,obbB)){
      Collision.dummyCollide(obbA, obbB)
    }
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
    if(Collision.arePolygonColliding(obb, convertedAabb)){
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
  //Checks if kdopA intersects kdopB and compute resulting velocities
  Collision.checkForKdopKdopCollision = function(kdopA, kdopB){
    var k = ((kdopA.k > kdopB.k) ? kdopA.k : kdopB.k)
    for(var i = 0; i < k/2; i++){
      if(kdopA.mins[i] > kdopB.maxs[i] || kdopA.maxs[i] < kdopB.mins[i])
        return
    }
    Collision.dummyCollide(kdopA, kdopB)
  }
  //Check if aabb and kdop are colliding by turning the aabb into a kdop4
  Collision.checkForKdopAabbCollision = function(kdop, aabb){
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
    if(Collision.arePolygonColliding(kdop, convertedAabb)){
      Collision.dummyCollide(kdop, aabb)
    }
  }
  //Check if point and kdop are colliding by looping through all segments
  Collision.checkForKdopPointCollision = function(kdop, p){
    var isCollide = false
    for (var i = 0; i < kdop.points.length; i++){
      if(Collision.checkForPointSegmentCollision(p, {"a":kdop.points[i], "b":kdop.points[(i+1)%kdop.points.length]}))
        isCollide = true
    }
    if(isCollide)
      Collision.dummyCollide(kdop, p)
  }
  //Check if KDop intersects circle
  Collision.checkForKdopCircleCollision = function(kdop, circle){
    if(Collision.isKdopSegmentCollideCircle(kdop, circle))
      Collision.dummyCollide(kdop, circle)
  }
  //Check if KDop intersects obb
  Collision.checkForKdopObbCollision = function(kdop, obb){
    if(Collision.arePolygonColliding(kdop, obb))
      Collision.dummyCollide(kdop, obb)
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

  /*****************************************************************************
  **************************************UTILS***********************************
  *****************************************************************************/
  //Project corners on a vector and return min and max boundaries
  Collision.getProjectedVector = function(vector, points){
    var projectedPoints = []
    for (var i = 0; i < points.length; i ++){
      projectedPoints.push(vector.getProjectedPoint(points[i]))
    }
    var d = 0
    var p1, p2, currentD, maxPoints

    for (var j = 0; j < points.length; j++){
      for (var k = j + 1; k < points.length; k++){
        p1 = projectedPoints[k]
        p2 = projectedPoints[j]
        currentD = Math.sqrt((p1.x - p2.x)*(p1.x - p2.x)+(p1.y - p2.y)*(p1.y - p2.y))
        if (currentD > d){
          d = currentD
          maxPoints = [p1, p2]
        }
      }
    }
    return maxPoints
  }
  //Loop through points and compare the overlapping of each segments
  Collision.arePolygonColliding = function(polygonA, polygonB){
    var overlap = true
    var projectedPoints = Collision.projectShape(polygonA.points, polygonB.points)
    for (var i = 0; i < projectedPoints.shapeA.length; i++){
      var segmentA = projectedPoints.shapeA[i]
      var segmentB = projectedPoints.shapeB[i]
      if(segmentA !== undefined && segmentB !== undefined){
        if (!Collision.overlap(segmentA, segmentB)){
          overlap = false
        }
      }
    }
    return overlap
  }
  //Return true if segments are overlaping
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
  //project shape on the normal vectors of collidedShapePoints
  Collision.projectShape = function(pointsA, pointsB){
    var projectedShapeA = []
    var projectedShapeB = []
    var normalsA = []
    var normalsB = []
    //Compute all normals to each shape
    for(var i = 0; i < pointsA.length; i++){
      normalsA.push(new Vector(pointsA[i].x - pointsA[(i+1)%pointsA.length].x, pointsA[i].y - pointsA[(i+1)%pointsA.length].y).getNormalVector())
    }
    for(var i = 0; i < pointsB.length; i++){
      normalsB.push(new Vector(pointsB[i].x - pointsB[(i+1)%pointsB.length].x, pointsB[i].y - pointsB[(i+1)%pointsB.length].y).getNormalVector())
    }
    //Compute each shape's projection to all normals
    for(var normal of normalsA){
      projectedShapeA.push(Collision.getProjectedVector(normal, pointsA))
      projectedShapeB.push(Collision.getProjectedVector(normal, pointsB))
    }
    for(var normal of normalsB){
      projectedShapeA.push(Collision.getProjectedVector(normal, pointsA))
      projectedShapeB.push(Collision.getProjectedVector(normal, pointsB))
    }
    return { "shapeA": projectedShapeA, "shapeB": projectedShapeB}
  }
  //Check if segment defined by points a and b intersects circle
  Collision.checkForSegmentCircleCollision = function(a, b, circle){
    var AC = new Vector (circle.x - a.x, circle.y - a.y)
    var AB = new Vector (b.x - a.x, b.y - a.y)
    var dot = AC.dotProduct(AB)
    var len = AB.x * AB.x + AB.y * AB.y
    var proj = -1
    var x, y

    if (len != 0)
      proj = dot/len
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

    if(Math.sqrt(dx * dx + dy * dy) <= circle.radius)
      return true
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
    function dist2(v, w) { return (v.x - w.x)*(v.x - w.x) + (v.y - w.y)*(v.y - w.y) }
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
  //Check if segment is colliding circle
  Collision.isKdopSegmentCollideCircle = function (kdop, circle){
    for (var i = 0; i < kdop.points.length; i++){
      if(Collision.checkForSegmentCircleCollision(kdop.points[i], kdop.points[(i+1) % kdop.points.length], circle))
        return true
    }
    return false
  }
  //One function to collide them all
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
