const { StatusCodes } = require('http-status-codes')
const ToDo = require('../model/todoModel')

const todoController = {
    getAll: async (req, res) => {
        try {
            const todos = await ToDo.find({})

            res.status(StatusCodes.OK).json({ msg: 'All List', data: todos })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
        }
    },
    addTask: async (req, res) => {
        try {
            const { task } = req.body

            const newTodo = await ToDo.create({
                task
            })
            res.status(StatusCodes.OK).json({ msg: 'Task added successfully', data: newTodo })
        }
        catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
        }
    },
    deleteTask: async (req, res) => {
        try {
            const id = req.params.id
            await ToDo.deleteOne({ _id: id })
            res.status(StatusCodes.OK).json({ msg: 'Task deleted successfully' })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
        }
    },
    completedTask: async (req, res) => {
        try {
            const id = req.params.id
            await ToDo.updateOne({ _id: id }, {
                completed: "yes"
            })
            res.status(StatusCodes.OK).json({ msg: 'Task updated as completed', data: id })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
        }
    }
}

module.exports = todoController
