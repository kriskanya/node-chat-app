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

  socket.emit('newMessage', {
    from: 'admin',
    text: 'welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // broadcast emits an event to everyone except for user who joins
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'new user joined',
    createdAt: new Date().getTime()
  });

  // listens to custom event from the client
  socket.on('createMessage', (message) => {
    console.log(message);
    // io.emit() emits an event to every single connection
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    // broadcast emits an event to everyone except for user emitting it
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });


  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, function() { console.log(`app listening on port ${port}` )});