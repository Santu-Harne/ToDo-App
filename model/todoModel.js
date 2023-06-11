const mongoose = require('mongoose')
const assert = require('assert')

const connect = mongoose.createConnection(process.env.TODO_MONGO_URL, (err) => {
    if (err) assert.deepStrictEqual(err, null)
    // console.log('mongoDB connected successfully');
});

const TodoSchema = connect.model('ToDo', new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: String,
        default: 'no'
    }
}, {
    collection: "todo_list",
    timestamps: true
}))


module.exports = TodoSchema