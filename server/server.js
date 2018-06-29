var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose}  = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// for Heroku deploy, if not on Heroku then uses port 3000
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // give this json() function as a middle ware to express, so we can send json to application

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

app.listen(port, () => {
    console.log(`Starting on port ${port}`);
});

module.exports = {app};