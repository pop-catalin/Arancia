const mongoose = require('mongoose');
const task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [task.schema]
    }
});

module.exports = mongoose.model('User', userSchema);