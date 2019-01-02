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

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
    // \console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
    
  });

  client.close();
});