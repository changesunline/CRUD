var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var Students = require('./student')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/students',function (req,res) {
	Students.find(function (err,data) {
		if (err) {res.status(500).send('Server is error...')}
		res.render('index.html',data)
	})
})

router.get('/students/new',function (req,res) {
	res.render('new.html')
})

router.post('/students/new',function (req,res) {
	var newStudent = req.body
	Students.save(newStudent,function (err) {
		if (err) {res.status(500).send('Server is error...')}
		res.redirect('/students')
	})

})

router.get('/students/edit',function (req,res) {
	Students.findById(req.query.id,function (err,data) {
		if (err) {res.status(500).send('Server is error...')}
		res.render('edit.html',data)
	})
})

router.post('/students/edit',function (req,res) {
	// 必须有ID
	var edStudent = req.body
	// edStudent.id = req.query.id(action有参数的时候)
	Students.updateById(edStudent,function (err) {
		if (err) {res.status(500).send('Server is error...')}
		res.redirect('/students')
	})
})

router.get('/students/delete',function (req,res) {
	var id = req.query.id
	Students.deleteById(id,function (err) {
		if (err) {res.status(500).send('Server is error...')}
		res.redirect('/students')
	})
})


// ============= test ==============
// Students.updateById({
// 	"id":"12",
// 	name: "张小三",
// 	age: "13",
// 	gender: "女",
// 	hobby:"dfasdfa"
// },function (err) {
// 	if (err) {console.log(err)}
// })

module.exports = router