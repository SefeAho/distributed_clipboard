'use strict';

var express = require('express');
var socket = require('socket.io');
var path = require('path');

//Setting express app
var app = express();
const PORT = process.env.PORT || 3000;

 var server = app.listen(PORT, function(){
  console.log(`Listening on ${ PORT }`);
});

//Static files
app.use(express.static('public'));


//Setting up socket
var io = socket(server);

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected'));

  //Send data received from socket back to all sockets
  socket.on('copied', function(data){
    io.sockets.emit('copied', data);
  });
});
