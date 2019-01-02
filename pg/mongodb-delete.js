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

  // deleteMany

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // deleteOne

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Todos').findOneAndDelete({completed: 'false'}).then((result) => {
    console.log(result);
  })


  // findOneAndDelete

  // db.close();

});