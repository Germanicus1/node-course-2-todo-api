let mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/';
const dbName = 'TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || url + dbName, { useNewUrlParser: true });

module.exports = { mongoose };