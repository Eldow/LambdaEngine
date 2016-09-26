"use strict"

var gEngine = gEngine || { }

gEngine.Core = (function() {
  var mGL = null
  var getGL = function() { return mGL }
  var initializeWebGL = function(htmlCanvasID){
    var canvas = document.getElementById(htmlCanvasID)
    mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgls")
    if(mGL === null){
      document.write("<br><b>WebGL is not supported.</b>")
      return;
    }
    gEngine.VertexBuffer.initialize()
  }
  var clearCanvas = function(color){
    mGL.clearColor(color[0], color[1], color[2], color[3])
    mGL.clear(mGL.COLOR_BUFFER_BIT)
  }
  var mPublic = {
    getGL: getGL,
    initializeWebGL: initializeWebGL,
    clearCanvas: clearCanvas
  }
  return mPublic
})
