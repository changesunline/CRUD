var express = require('express')
var app = express()

var router = require('./router')

app.engine('html', require('express-art-template'))

app.use('/public',express.static('./public/'))

// ==========version 2============
app.use(router)



app.listen(3000,function () {
	console.log('Server is running...')
})