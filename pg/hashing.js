const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')

var data = {
  id: 10
}

let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log(decoded);

// jwt.verify

// // let message = 'I am a user number 3';

// let data = {
//   id: 4
// };

// let token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data)+ 'someSecret').toString();
