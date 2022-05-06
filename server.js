require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ws = require("ws");
const client = new ws("wss://mec-storage.herokuapp.com");
//
const wss = new ws.Server({ port: 8082 });

wss.on("connection", (ws) => {
  console.log("New client connected!");

  ws.on("message", (data) => {
    console.log(`Client has sent us: ${data}`);

    ws.send(`Here's the data: ${data}`);
  });

  ws.on("close", () => {
    console.log("Client has disconnected!");
  });
});
//
client.on("open", () => {
  console.log("Connected to websocket!");
});

client.on("message", function message(data, isBinary) {
  const message = isBinary ? data : data.toString();

  console.log(message);
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const ordersRouter = require("./routes/orders");
app.use("/orders", ordersRouter);

app.listen(3000, () => console.log("Server started"));
