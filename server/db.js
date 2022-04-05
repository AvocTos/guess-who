const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;

const getUsers = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const query = {};
  const result = await collection.findOne(query);
  await client.close();
  return result;
};

const getScoreBoard = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const result = await collection.find().sort({ score: -1 }).limit(5).toArray();
  await client.close();
  return result;
};

const findUser = async (username) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const query = { username };
  const result = await collection.findOne(query);
  await client.close();
  return result;
};

const addUser = async (user) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const result = await collection.insertOne(user);
  await client.close();
  return result;
};

const updateUser = async (sessionId, username) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const query = { username };
  const result = await collection.updateOne(query, {
    $set: { sessionId: sessionId },
  });
  await client.close();
  return result;
};

const updatePoints = async (points, username) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const query = { username };
  const result = await collection.updateOne(query, { $inc: { score: points } });
  await client.close();
  return result;
};

const findSessionId = async (sessionId) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db("guess-who-db");
  const collection = database.collection("users");

  const query = { sessionId };
  const result = await collection.findOne(query);
  await client.close();
  return result;
};

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
module.exports.findSessionId = findSessionId;
module.exports.updatePoints = updatePoints;
module.exports.getScoreBoard = getScoreBoard;
