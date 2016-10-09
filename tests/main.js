// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: '.',
  // paths: maps ids with paths (no extension)
  paths: {
      'jasmine': ['../lib/jasmine-2.5.2/jasmine'],
      'jasmine-html': ['../lib/jasmine-2.5.2/jasmine-html'],
      'jasmine-boot': ['../lib/jasmine-2.5.2/boot'],
      'Game': ['../src/Game'],
      'Canvas': ['../src/Canvas'],
      'Aabb': ['../src/Aabb'],
      'Circle': ['../src/Circle'],
      'Collision': ['../src/Collision'],
      'JSONLoader': ['../src/JSONLoader'],
      'KDop': ['../src/KDop'],
      'Obb': ['../src/Obb'],
      'Point': ['../src/Point'],
      'Vector': ['../src/Vector']
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});
require(['jasmine-boot'], function () {
  require(['CanvasSpec', 'GameSpec', 'PointSpec'], function(Canvas, Game, Point){
    //trigger Jasmine
    window.onload();
  })
});
