require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ws = require("ws");
const client = new ws("wss://mec-storage.herokuapp.com");

client.on("open", () => {
  console.log("Connected to websocket!");
});

client.on("message", function message(data, isBinary) {
  const message = isBinary ? data : data.toString();

  console.log(message);
});

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/api-mec", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const ordersRouter = require("./routes/orders");
app.use("/orders", ordersRouter);

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
