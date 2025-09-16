const { connectToMyDB } = require("./app");

// test to see if i can update item in id2
connectToMyDB().then((result) => {
  // results contains products and client(actualmongodb)
  result.products
    //   find the item with id 2 and update its description
    .updateOne({ id: 2 }, { $set: { description: "HB(updated test)" } })
    .then((res) => {
      // for node update.js
      console.log("item updated:", res.matchedCount);
      result.client.close();
    });
});
