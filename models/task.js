const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports.model = mongoose.model('Task', taskSchema);
module.exports.schema = taskSchema;