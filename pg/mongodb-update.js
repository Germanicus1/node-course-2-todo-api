// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/';
const dbName = 'TodoApp';

// const client = new MongoClient(url);

MongoClient.connect(url + dbName, {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connectto the MongoDB server');
  }
  console.log('Connected to the MongoDB server');

  const db = client.db(dbName);

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5c2d17ad734b3375e9835d2a')
  }, {
    $set: {
      completed: true
    }
  }, { 
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  // db.close();

});