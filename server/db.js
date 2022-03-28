const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.MONGO_URI;

const getUsers = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect();
  const database = client.db('guess-who-db');
  const collection = database.collection('users');

  const query = {};
  const result = await collection.findOne(query);
  await client.close();
  return result;
}

module.exports.getUsers = getUsers;