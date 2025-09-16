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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
