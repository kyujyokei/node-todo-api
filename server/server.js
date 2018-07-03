require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose}  = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

// for Heroku deploy, if not on Heroku then uses port 3000
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // give this json() function as a middle ware to express, so we can send json to application

// POST todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },  (err) => {
        res.status(400).send({err});
    })
});

// GET /todos/123
app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        res.status(404).send('ID not valid'); // the ID was not valid (checked by mongoose)
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log('Not found');
            return res.status(404).send({}); // query succeed but found to mathcing result
        }
        res.status(200).send({todo});
    }).catch((err) => {
        console.log('Error');
        res.status(400).send({})
    }); // query got error and failed

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        res.status(404).send('ID not valid');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Not found');
        }

        res.status(200).send({todo});
    }).catch((err) => {
        res.status(400).send({});
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']) // only takes the contents that should be updated

    if (!ObjectID.isValid(id)){
        res.status(404).send('ID not valid');
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {

        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo});

    }).catch((err) => {
        return res.status(400).send();
    });
})

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email','password']);

    // verify user with this email exist
    User.findByCredentials(body.email, body.password).then((user) => {

        // if anything goes wrong here, or nothing could be found by the funtion, it goes down to the catch error phase
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send();
    });

});


app.listen(port, () => {
    console.log(`Starting on port ${port}`);
});


module.exports = {app};