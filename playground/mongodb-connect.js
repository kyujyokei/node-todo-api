// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //db is for db object
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // // insert new record
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert todo', err);
    //    } 

    //    console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne(
    //     {
    //     name: 'Bubui',
    //     age: 1,
    //     location: 'Fluffy Bed',
    //     }, (err, result) => {
    //         if (err) {
    //             return console.log('Inable to insert user',err);
    //         }

    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     }
    // );

    db.close(); // closes the connection with the MongoDB server
});