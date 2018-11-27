var fs = require('fs')

/**
 * 获取学生信息列表
 */
exports.find = function (callback) {
	fs.readFile('data.json','utf-8',function (err,data) {
		if (err) {
			return callback(err)
		}
		callback(null,JSON.parse(data))
	})
}

/**
 * 通过id获取学生信息
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.findById = function (id,callback) {
	fs.readFile('data.json','utf-8',function (err,data) {
		if (err) {
			return callback(err)
		}
		id = id.toString()
		var stu = JSON.parse(data).student
		var student = stu.find(function (item) {
			return item.id === id
		})
		callback(null,student)
	})
}

/**
 * 添加学生
 */
exports.save = function (newStudent,callback) {
	fs.readFile('data.json','utf-8',function (err,data) {
		if (err) {
			return callback(err)
		}
		var dataobj = JSON.parse(data)
		var students = dataobj.student
		newStudent.id = Math.floor(Math.random()*1000).toString()
		students.unshift(newStudent)
		fs.writeFile('data.json',JSON.stringify(dataobj,"","\t"),function (err) {
			if (err) {
				return callback(err)
			}
			callback()
		})
	})
}

/**
 * 编辑学生
 */
exports.updateById = function (newStudent,callback) {
	fs.readFile('data.json','utf-8',function (err,data) {
		if (err) {
			return callback(err)
		}
		var dataobj = JSON.parse(data)
		var students = dataobj.student
		var stu = students.find(function (item) {
			return item.id === newStudent.id
		})
		for (var key in newStudent) {
			stu[key] = newStudent[key]
		}
		fs.writeFile('data.json',JSON.stringify(dataobj,"","\t"),function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
	
}

/**
 * 删除学生
 */
exports.deleteById = function (id,callback) {
	fs.readFile('data.json','utf-8',function (err,data) {
		if (err) {
			return callback(err)
		}
		var dataobj = JSON.parse(data)
		var students = dataobj.student
		var stuinx = students.findIndex(function (item) {
			return item.id === id
		})
		students.splice(stuinx,1)
		fs.writeFile('data.json',JSON.stringify(dataobj,"","\t"),function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}