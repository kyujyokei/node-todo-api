// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //db is for db object
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

//     db.collection('Todos').findOneAndUpdate({
//         // filter: who is getting updated
//         _id: new ObjectID("5b316f7e0d615299a81a042c"),
//     }, {
//         // update
//         $set: {
//             completed: false
//         }
//     }, {
//         // options
//         returnOriginal: false // don't return the non updated data
//     }
// ).then((result) => {
//     console.log(result);
// });

    db.collection('Users').findOneAndUpdate({name: 'Jen'},
    {
        $set: {
            name: 'Bubui'
        }
    },
    { returnOriginal: false}
).then((result) => {
    console.log(result);
})

    // db.close(); // closes the connection with the MongoDB server
});