const { connectToMyDB } = require("./app");

// test to see if i can delete item in id3
const targetId = 3;

connectToMyDB().then((result) => {
  const products = result.products;
  const client = result.client;

  //   test targetid3 to see if this is working
  products.deleteOne({ id: Number(targetId) }).then((res) => {
    // for node remove.js
    console.log("Deleted:", res.deletedCount);
    return client.close();
  });
});
