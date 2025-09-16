const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToMyDB } = require("../App/app");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server/API is running");
});

// note: api call is when a client (angular) makes a request to a specific route in express server. express route can catch the req and talk to mongodb and then it can send a response back.

// get all products
app.get("/products", (req, res) => {
  connectToMyDB().then(({ products, client }) => {
    products
      .find({})
      .toArray()
      .then((docs) => {
        // this is the sending back the response to the angualar
        res.json(docs);
        client.close();
      });
  });
});

//post add stuff
app.post("/products", (req, res) => {
  connectToMyDB().then(({ products, client }) => {
    products.insertOne(req.body).then(() => {
      res.json({ message: "Product added" });
      client.close();
    });
  });
});

// put update stuff
app.put("/products/:id", (req, res) => {
  connectToMyDB().then(({ products, client }) => {
    products
      .updateOne({ id: Number(req.params.id) }, { $set: req.body })
      .then((pds) => {
        res.json({ matched: pds.matchedCount, modified: pds.modifiedCount });
        client.close();
      });
  });
});

// delete stuff
app.delete("/products/:id", (req, res) => {
  connectToMyDB().then(({ products, client }) => {
    products.deleteOne({ id: Number(req.params.id) }).then((pds) => {
      res.json({ deleted: pds.deletedCount });
      client.close();
    });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
