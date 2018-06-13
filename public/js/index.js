// making a request from client to server to intiate connection and leave it open
var socket = io();

// listen for an event on connect
socket.on('connect', function() {
  console.log('connected to server');
});

// fires whenever the server connection drops
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

// listens to a custom event from the server
socket.on('newMessage', function(message) {
  console.log(message);
});

socket.on('welcome', function(message) {
  console.log(message)
});