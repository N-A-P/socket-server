const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const PORT = 8080;
const connections = [];
io.on("connection", (socket) => {
  //   console.log("a user connected", socket);
  connections.push(socket.id);
  console.log(" connteec ted");

  socket.on(`message`, (msg) => {
    console.log(msg);
    connections
      .filter((c) => c !== msg.senderId)
      .map((c) => {
        io.emit(`message-${c}`, "Calling_you");
        console.log(`message-${c}`, "emittiong");
      });
  });
  //
});
http.listen(PORT, () => console.log("listening on http://localhost:8080"));
