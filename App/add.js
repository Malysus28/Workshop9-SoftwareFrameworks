const { connectToMyDB } = require("./app");

function runthis() {
  // connect to db
  connectToMyDB().then((result) => {
    // my products collection aka table
    const products = result.products;
    //actual connection to db
    const client = result.client;
    // delete my rows to make a clean slate
    products
      .drop()
      // when delete is done i m trying to tell it to execute code in there.
      .then(() => {
        console.log("dropped products collection(meaning runthis is working)");

        const itemsHardCoded = [
          {
            id: 1,
            name: "pen",
            description: "blue ink",
            price: 122,
            units: 300,
            type: "stationary",
          },
          {
            id: 2,
            name: "pencil",
            description: "HB",
            price: 20,
            units: 500,
            type: "stationary",
          },
          {
            id: 3,
            name: "eraser",
            description: "small",
            price: 10,
            units: 200,
            type: "stationary",
          },
          {
            id: 4,
            name: "notebook",
            description: "200 pages",
            price: 150,
            units: 100,
            type: "stationary",
          },
        ];
        // map to go through each item and get new obj
        const organisedItems = itemsHardCoded.map((item) => ({
          // task 2 products consists of XYZ
          id: Number(item.id),
          name: String(item.name),
          description: String(item.description || "").slice(0, 255),
          price: Number(Number(item.price).toFixed(2)),
          units: Number.isInteger(item.units) ? item.units : 0,
          type: item.type || "",
        }));
        return products.insertMany(organisedItems);
      })
      .then((res) => {
        console.log("hardcoded items added", res.insertedCount);
        return client.close();
      });
  });
}

runthis();
