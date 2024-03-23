// server.js
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

// Serve static files
app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    origin: "*",
  })
);

// Broadcaster route
app.get("/broadcast", (req, res) => {
  res.sendFile(__dirname + "/public/broadcaster.html");
});

// Listeners route
app.get("/listen", (req, res) => {
  res.sendFile(__dirname + "/public/listener.html");
});

// Socket.IO connection
io.on("connection", (socket) => {
  // Handle broadcaster events
  socket.on("broadcast", (data) => {
    io.emit("audio", data); // Broadcast the audio to all listeners
  });

  // Handle listener join event
  socket.on("join", () => {
    // Send a welcome message to the newly connected listener
    socket.emit("message", "Welcome to the radio!");
  });
});

// Start the server
const PORT = process.env.PORT || 3600;
http.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
