const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbName = 'TodoApp';

// const client = new MongoClient(url);

MongoClient.connect(url + dbName, {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connectto the MongoDB server');
  }
  console.log('Connected to the MongoDB server');

  const db = client.db(dbName);

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: 'false'
  }, (err, res) => {
    if (err) {
      return console.log('Unable to insert Todo', err);
    }

    console.log(JSON.stringify(res.ops, undefined, 2));
  })

  client.close();
});