const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const UserOneId = new ObjectID();
const UserTwoId = new ObjectID();

const users = [{
    // user with valid auth
    _id: UserOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: UserOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    // user without valid auth
    _id: UserTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}];


// array of dummy todos
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: UserOneId
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: UserTwoId
}];

const populateTodos = (done) => {
    // // wipes out db
    // Todo.remove({}).then(() => {done()});

    // insert the todo dummy array
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        // Ppromise.all takes an array of promises, so this only continues after user 1 and 2 are both saved
        return Promise.all([userOne, userTwo]).then(() => done());
    });
};


module.exports = {todos, populateTodos, users, populateUsers};