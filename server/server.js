const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
// using http server intead of express server
const server = http.createServer(app);
// web sockets server---can emit or listen to events
const io = socketIO(server);

// middleware to serve up /public folder
app.use(express.static(publicPath));

// io.on() lets you listen for an event (such as a connection)
io.on('connection', (socket) => {
  console.log('client connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, () => console.log(`app listening on port ${port}`));