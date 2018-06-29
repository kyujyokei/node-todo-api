// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //db is for db object
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b317de2278db2c6712af60a')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos',err);
    // } );

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: ',count);
    // }, (err) => {
    //     console.log('Unable to fetch todos',err);
    // } );


    db.collection('Users').find({name: 'Bubui'}).toArray().then((docs) => {
        console.log('Todos docs: ',docs);
    }, (err) => {
        console.log('Unable to fetch todos',err);
    } );

    db.collection('Users').find({name: 'Bubui'}).count().then((count) => {
        console.log('Todos count: ',count);
    }, (err) => {
        console.log('Unable to fetch todos',err);
    } );

    // db.close(); // closes the connection with the MongoDB server
});