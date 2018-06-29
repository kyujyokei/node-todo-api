const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b355a93d1ee8efcae3312f2';
var userId = '5b35621a278db2c6712b0928';

// check if the id is valid prior to sending queries
if (!ObjectID.isValid(id)){
    console.log('Object id not valid');
}

if (!ObjectID.isValid(userId)){
    console.log('User id not valid');
}

// // query all todos that matches the id above
// Todo.find({
//     _id: id
// }).then((todos) => {
//     if (!todos) {
//         return console.log('Id not valid')
//     }
//     console.log('Todos', todos);
// });

// // only grabs the first one that match
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log('Id not valid')
//     }
//     console.log('Todo', todo);
// });

// pass in the id as the arguement, probably the best for this case
Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not valid');
    }
    console.log('Todo by id', todo);
}).catch((err) => console.log(err));

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('User not valid');
    }
    console.log('User by Id', user)
}).catch((err) => console.log(err));