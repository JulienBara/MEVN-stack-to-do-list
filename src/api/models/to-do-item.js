const mongoose = require('mongoose')

const toDoItemSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDoItem', toDoItemSchema)
