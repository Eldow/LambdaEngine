define([], () => {
  "use strict"
  class KDop {
    //This kDop's constructor
    constructor(config){
      //We only implemented 8-Dops
      this.k = config.mins.length + config.maxs.length
      console.log(this.k)
      this.dX = 1
      this.dY = 1
      this.mins = config.mins
      this.maxs = config.maxs
      this.fillColor = config.color
      this.rects = []
      this.setup()
    }
    setup(){
      var x, y, centerX, centerY, ax, ay, bx, by, cx, cy, dx, dy, theta, rect, width, height, cos, sin
      var rects = []
      for(var i = 0; i < this.k/2; i+=2){
        //compute center
        width = this.maxs[i] - this.mins[i]
        height = this.maxs[i+1] - this.mins[i+1]
        theta = Math.PI/(4*(i+1))
        cos = Math.cos(theta)
        sin = Math.sin(theta)
        //offsets
        x = width/2
        y = height/2
        //center
        centerX = this.mins[i] + width/2
        centerY = this.mins[i+1] + height/2
        //rotate corners
        ax = centerX + x*cos - y*sin
        ay = centerY + x*sin + y*cos
        x = -width/2
        bx = centerX + x*cos - y*sin
        by = centerY + x*sin + y*cos
        y = -height/2
        cx = centerX + x*cos - y*sin
        cy = centerY + x*sin + y*cos
        x = width/2
        dx = centerX + x*cos - y*sin
        dy = centerY + x*sin + y*cos

        //push new rectangle
        rect = {"A": {"x":ax, "y":ay},
                  "B": {"x":bx, "y":by},
                   "C": {"x":cx, "y":cy},
                    "D": {"x":dx, "y":dy}}
        this.rects.push(rect)
      }
    }
    //Update this kDop's position
    update(canvas){
      //Keep this kDop inside boundaries
      //Update position
      for(var rect of this.rects){
        rect.A.x += this.dX
        rect.A.y += this.dY
        rect.B.x += this.dX
        rect.B.y += this.dY
        rect.C.x += this.dX
        rect.C.y += this.dY
        rect.D.x += this.dX
        rect.D.y += this.dY
      }
    }
    drawRect(ctx, index, color){
      ctx.beginPath()
      ctx.moveTo(this.rects[index].A.x, this.rects[index].A.y)
      ctx.lineTo(this.rects[index].B.x, this.rects[index].B.y)
      ctx.lineTo(this.rects[index].C.x, this.rects[index].C.y)
      ctx.lineTo(this.rects[index].D.x, this.rects[index].D.y)
      ctx.lineTo(this.rects[index].A.x, this.rects[index].A.y)
      ctx.closePath()
      if(color !== null){
        ctx.fillStyle = color
        ctx.fill()
      }
    }
    //Draw this kDop
    draw(ctx){
      //first plane 01 10
      ctx.save()
      this.drawRect(ctx, 0, null)
      ctx.clip()
      //second plane 11 1-1
      this.drawRect(ctx, 1, this.fillColor)
      ctx.restore()
    }
  }
  return KDop
})
