const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 10
};

// takes your data and creates sign, input: data, secret
var token = jwt.sign(data, '123abc');
console.log(token);

// verifies if your token is valid and reveals the data within token
var decoded = jwt.verify(token, '123abc');
console.log(decoded);


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(hash);

// var data = {
//     id: 4
// };

// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // // a case that users attempt to manipulate other user's data
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash){
//     console.log('NOT changed')
// } else {
//     console.log('Data got changed. Do not trust')
// }



