// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express')        // call express
var app        = express()                 // define our app using express
var port = process.env.PORT || 3000        // set our port

app.set('view engine', 'pug')

app.use('/lib', express.static(__dirname + '/lib'))
app.use('/src', express.static(__dirname + '/src'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/tests', express.static(__dirname + '/tests'))
app.use(express.static(__dirname))

app.get('/', function(req, res){
	res.render('index')
})
app.get('/tests', function(req, res){
	res.render('test')
})
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Lambda Engine JS running on port : ' + port)
