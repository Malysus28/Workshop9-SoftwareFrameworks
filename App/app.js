const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const myDatabase = "mydb";
const tableName = "products";

async function connectToMyDB() {
  // create a new mongo client inst using url
  const client = new MongoClient(url);

  //   because js doesnt wait for op to run. it just starts and keeps going.
  await client.connect();
  //   test
  console.log("db connected");
  const db = client.db(myDatabase);
  //   a collection is like a table in SQL
  const products = db.collection(tableName);
  return { products, client, db };
}

module.exports = { connectToMyDB };

// i need some confirmation that it worked.
connectToMyDB()
  .then(() => console.log("connected to my db"))
  .catch((err) => console.error("something went wrong:", err));
