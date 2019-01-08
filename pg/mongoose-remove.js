const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User}= require('./../server/models/user');

// let id = '5c336f3980bdfc5deef43789';

Todo.deleteMany({}).then((result) => {
  console.log(result);
});


// Todo.findOneAndDelete
// Todo.findByIdAndDelete

