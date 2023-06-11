const route = require("express").Router()
const todoController = require('../controller/todoController')

route.get('/getAll', todoController.getAll)
route.post('/addTask', todoController.addTask)
route.delete('/deleteTask/:id', todoController.deleteTask)
route.patch('/completedTask/:id', todoController.completedTask)


module.exports = route