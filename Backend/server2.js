const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// ------------------------------------------------------
app.get("/", (req, res) => {
  res.send("HI");
});

io.on("connection", (socket) => {
  console.log("new user connected");
  console.log(socket.id);
  // --------------------
  socket.on("message", (message) => {
    socket.broadcast.emit("new-message", message);
    console.log(message);
  });
});

server.listen(8000, () => {
  console.log("server running...");
});
