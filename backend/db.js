const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://crascot:ejusmKCrkaEQsO3v@react-node-test.pobbjct.mongodb.net/?retryWrites=true&w=majority";
const dbName = "react-node-test";

let client;
let connected = false;

async function connectDB() {
  try {
    if (!connected) {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      connected = true;
    }
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
}

module.exports = connectDB;