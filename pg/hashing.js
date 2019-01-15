const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

let password = '123abc';

bcrypt.genSalt(10, (error, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

let hashedPassword = '$2a$10$g/Q9XPEQC5/6ghpRJTN5auTvXUvGIeoI56bHyVRFThCqoJlo3xISm';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})

// var data = {
//   id: 10
// }

// let token = jwt.sign(data, '123abc');
// console.log(token);

// let decoded = jwt.verify(token, '123abc');
// console.log(decoded);

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
