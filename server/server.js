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

// get all products (route)
// point is to connect to mongodb and get all the products and send it back as a JSON(api response)
app.get("/products", (req, res) => {
  connectToMyDB().then(({ products, client }) => {
    products
      .find({})
      .toArray()
      .then((docs) => {
        // this is the sending back the response to the angular
        res.json(docs);
        client.close();
      });
  });
});

//post add stuff (route)
// http post request to /products
// point it to take the data from req.body and add it to mongodb and send back confirmation.
app.post("/products", (req, res) => {
  connectToMyDB().then(({ products, client }) => {
    products.insertOne(req.body).then(() => {
      res.json({ message: "Product added" });
      client.close();
    });
  });
});

// put update stuff(route)
// point of this route is to take the id from the url ->req.params and then req.body contains the updated stuff. then it will update the product in mongodb and send back confirmation.
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

// delete stuff(route)
// point of this is to read the id from url whatever is in req.params.id and delete the matching product in mongodb and send back confirmation + how many were deleted.
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
