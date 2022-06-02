const express = require("express");
var cors = require("cors");
const app = express();
// ------------------------------------------------------
//middelwares
app.use(cors());
app.use(express.json());

// ------------------------------------------------------
//  Short Poll
let messages = [];

app.post("/messages/short", (req, res) => {
  const { message } = req.body;
  messages.push(message);
  res.json({
    message: "success",
    data: message,
  });
});

app.get("/messages/short", (req, res) => {
  // const { index } = req.query;
  res.json({
    message: "success",
    data: messages,
  });
  res.status(204).end();
});

// ------------------------------------------------------
//  Long Poll
let subscribers = {}; 
//subscribe
app.get("/messages/long", (req, res) => {//store req here
  const ID = Math.ceil(Math.random() * 100000); //dummy id
  subscribers[ID] = res;
  res.on("close", () => {
    delete subscribers[ID];
  });
});

app.post("/messages/long", (req, res) => {//send req here
  const { body } = req;
  // Object.entries(subscribes).forEach(([ID, response]) => {
  //   response.json(body);
  //   delete subscribes[id];
  // });
  for (let id in subscribers) {
    result = subscribers[id];
    result.json({ message: "success", data: body });
    delete subscribers[id];//delete because req is send one time
  }
  res.status(204).end();
});

app.listen(8001, () => {
  console.log("Server is running...");
});
// ------------------------------------------------------
