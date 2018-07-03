var mongoose = require('mongoose');

// setting up model, takes 2 arguements: name, object
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength :1,
        trim: true
    },
    completed : {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: { // it'd the _id of the creator
        type: mongoose.Schema.Types.ObjectId,
        required: true

    }
});

module.exports = {Todo};