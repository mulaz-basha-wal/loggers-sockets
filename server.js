const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const logger = require("morgan");
const date = require("date-and-time");

const port = process.env.PORT || 4001;
const indexRouter = require("./server_route");

const app = express();

app.use("/index", indexRouter);
app.use(logger("dev"));
app.use(
  logger(
    "Custom Log: :status :method :url :res[content-length] :response-time ms"
  )
);

const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: "*" } });

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const now = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("getTime", date.format(now, "hh:mm:ss A"));
};

server.listen(port, () => console.log(`Listening on port ${port}`));
