// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express')        // call express
var app        = express()                 // define our app using express
var port = process.env.PORT || 3000        // set our port

app.use(express.static(__dirname + '/src'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Game Engine JS running on port : ' + port)
