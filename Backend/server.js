const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
    cors: {
      origin: "*",
    },
  });
var cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

http.listen(8000, () => {
  console.log("server running...");
});
