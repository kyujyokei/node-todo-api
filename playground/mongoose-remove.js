const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// // removes all data that matches the criteria, {} removes all
// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// Todo.findOneAndRemove({}).then(() => {

// });

Todo.findByIdAndRemove('5b3588552aa1f2b7f3ac0b80').then((doc) => { // doc is the deleted data passed back
    console.log(doc);
});