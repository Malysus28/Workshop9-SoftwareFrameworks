const { connectToMyDB } = require("./app");

// connect to table+mongodb
connectToMyDB().then((result) => {
  const products = result.products;
  const client = result.client;

  products
    //   get everything in the collection/table (products)
    .find({})
    // make it an array
    .toArray()

    .then((docs) => {
      // for node read.js raw JSON output
      console.log("all products:", docs);
      return client.close();
    });
});
